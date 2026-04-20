import { format } from './util.js'
import { makeRng, hashSeed } from './rng.js'
import { detectArchetype } from './archetype.js'

/**
 * @param {Awaited<ReturnType<typeof import('./git.js').collectGitData>>} data
 * @param {{ locale: import('./locale/resolve.js').LocaleKey, messages: ReturnType<import('./locale/index.js').getMessages> }} opts
 */
export function buildContent(data, { locale, messages }) {
  const archetype = detectArchetype(data)
  const seed = hashSeed(data.firstCommit?.hash ?? data.repoName)
  const rng = makeRng(seed)
  const C = messages.content
  const m = messages

  return {
    masthead: buildMasthead(data, archetype, locale, m),
    headline: buildHeadline(data, archetype, rng, locale, C),
    lead: buildLead(data, archetype, rng, locale, C),
    weather: buildWeather(archetype, rng, C),
    obituaries: buildObituaries({ deletedFiles: data.deletedFiles, repoName: data.repoName }, rng, C),
    charts: buildCharts(data.commits, messages),
    opinion: buildOpinion({ mostChurned: data.mostChurned, repoName: data.repoName }, archetype, rng, C, m.masthead.paperName),
    stats: buildStats(data, C),
    classifieds: buildClassifieds(data, archetype, rng, C),
    bylineBar: buildBylineBar(data),
    archetype,
  }
}

function buildMasthead(data, archetype, locale, messages) {
  const d = data.lastCommit?.date ?? new Date()
  return {
    name: messages.masthead.paperName,
    repo: data.repoName,
    tagline: messages.masthead.tagline,
    date: format(d, locale),
    edition: messages.archetypeEdition[archetype],
    price: messages.masthead.price,
  }
}

function buildHeadline(data, archetype, rng, locale, C) {
  if (!data.biggestCommit) {
    const i = C.inaugural
    return {
      kicker: i.kicker,
      headline: i.headline,
      deck: '',
      byline: i.byline,
      date: format(new Date(), locale),
      hash: i.hashUnknown,
    }
  }

  const c = data.biggestCommit
  const clean = c.subject.replace(/^(feat|fix|chore|refactor|docs|test|perf|style|ci|build)(\(.+?\))?:\s*/i, '')
  const opener = rng.pick(C.headlineOpeners[archetype])
  const qual = rng.pick(C.headlineQualifiers[archetype])
  const hed = [opener, titleCase(clean)].filter(Boolean).join(' ') + qual

  return {
    kicker: classifyKicker(c.subject, archetype, C),
    headline: hed,
    deck: buildDeck(c, data.repoName, archetype, rng, C),
    byline: c.author,
    date: format(c.date, locale),
    hash: c.hash,
  }
}

function buildDeck(commit, repoName, archetype, rng, C) {
  const templates = C.deckTemplates[archetype] ?? C.deckTemplates.BALANCED
  return rng.pick(templates)(commit, repoName)
}

function buildLead(data, archetype, rng, locale, C) {
  const { biggestCommit: c, repoName, totalCommits, firstCommit, lastCommit, allAuthors } = data
  if (!c) return { paragraphs: [] }

  const topFile = c.files.sort((a, b) => (b.insertions + b.deletions) - (a.insertions + a.deletions))[0]
  const span =
    firstCommit && lastCommit
      ? C.leadSpanFromTo(format(firstCommit.date, locale), format(lastCommit.date, locale))
      : C.leadSpanRecorded
  const nAuthors = Object.keys(allAuthors).length

  const opener = rng.pick(C.leadOpeners[archetype] ?? C.leadOpeners.BALANCED)(c, repoName, totalCommits, allAuthors)
  const middle = rng.pick(C.leadMiddles)(topFile, c)
  const closer = rng.pick(C.leadClosers)(totalCommits, span, nAuthors)

  return { paragraphs: [opener, middle, closer].filter(Boolean) }
}

function buildWeather(archetype, rng, C) {
  return rng.pick(C.weatherConditions[archetype] ?? C.weatherConditions.BALANCED)
}

function classifyDeletedFile(file, churnMap) {
  const churn = churnMap[file] ?? 0
  if (churn > 100) return 'high_churn'
  if (churn === 0) return 'untouched'
  return 'normal'
}

function buildObituaries({ deletedFiles, repoName }, rng, C) {
  const churnMap = {}
  return deletedFiles.slice(0, 4).map(({ file, commit }) => {
    const name = file.split(/[/\\]/).pop()
    const dir = file.includes('/') || file.includes('\\') ? file.replace(/[^/\\]+$/, '').slice(0, -1) : repoName
    const category = classifyDeletedFile(file, churnMap)
    const pool = C.epitaphs[category] ?? C.epitaphs.normal
    return {
      name,
      path: file,
      survived: C.obitSurvived(commit.author),
      epitaph: rng.pick(pool)(name, dir),
    }
  })
}

function buildOpinion({ mostChurned, repoName }, archetype, rng, C, paperName) {
  if (!mostChurned.length) return null
  const top = mostChurned[0]
  const name = top.file.split(/[/\\]/).pop()
  const churn = top.churn
  const body = rng.pick(C.opinionBodies)(name, churn, repoName)

  const picker = rng.pick(C.opinionTitles)
  const title = picker.length === 0 ? picker() : picker(churn)

  return {
    columnist: name,
    title,
    subtitle: C.opinionSubtitle(name, paperName),
    body,
  }
}

function buildStats(data, C) {
  const types = {}
  for (const c of data.commits) {
    const t = commitType(c.subject, C.commitTypes)
    types[t] = (types[t] ?? 0) + 1
  }
  return {
    totalCommits: data.totalCommits,
    totalInsertions: data.totalInsertions,
    totalDeletions: data.totalDeletions,
    avgPerCommit: data.totalCommits
      ? Math.round((data.totalInsertions + data.totalDeletions) / data.totalCommits)
      : 0,
    topAuthors: data.topAuthors,
    mostChurned: data.mostChurned.slice(0, 3),
    typeBreakdown: Object.entries(types).sort((a, b) => b[1] - a[1]),
  }
}

function buildClassifieds(data, archetype, rng, C) {
  const pool = [...(C.classifiedPools[archetype] ?? []), ...C.classifiedPools.BALANCED]
  const picked = rng.pickN(pool, 4)
  return picked.map(ad => ({ category: ad.category, body: ad.body(data) }))
}

function buildBylineBar({ topAuthors, totalCommits }) {
  return { contributors: topAuthors.map(([name, count]) => ({ name, count })), totalCommits }
}

function buildCharts(commits, messages) {
  return { timeline: buildTimeline(commits, messages) }
}

function buildTimeline(commits, messages) {
  if (commits.length < 2) return null

  const oldest = commits[commits.length - 1].date.getTime()
  const newest = commits[0].date.getTime()
  const spanDays = (newest - oldest) / 86400000

  const DAY = 86400000
  const bucketMs = spanDays <= 21 ? DAY : spanDays <= 120 ? DAY * 7 : DAY * 30
  const granularity = spanDays <= 21 ? 'daily' : spanDays <= 120 ? 'weekly' : 'monthly'

  const buckets = new Map()
  for (const c of commits) {
    const key = Math.floor(c.date.getTime() / bucketMs)
    buckets.set(key, (buckets.get(key) ?? 0) + 1)
  }

  const minKey = Math.min(...buckets.keys())
  const maxKey = Math.max(...buckets.keys())

  const points = []
  for (let k = minKey; k <= maxKey; k++) {
    points.push({ count: buckets.get(k) ?? 0, date: new Date(k * bucketMs) })
  }

  const peakIdx = points.reduce((best, p, i) => (p.count > points[best].count ? i : best), 0)
  const peakCount = points[peakIdx]?.count ?? 0
  const ch = messages.charts
  const gLabel = ch.granularity[granularity]
  const timelineLabel = `${ch.commitActivity} — ${gLabel}`

  return {
    points,
    granularity,
    timelineLabel,
    peakLabel: ch.peakLabel(peakCount),
    oldest: new Date(oldest),
    newest: new Date(newest),
    peakIdx,
    peakCount,
  }
}

function classifyKicker(subject, archetype, C) {
  const TYPE_KICKER = C.typeKicker
  const m = subject.match(/^(\w+)(\(.+?\))?:/)
  if (m && TYPE_KICKER[m[1].toLowerCase()]) return TYPE_KICKER[m[1].toLowerCase()]

  const ARCH_KICKER = C.archKicker
  return ARCH_KICKER[archetype] ?? C.defaultKicker
}

function titleCase(str) {
  return str.replace(/\b\w/g, c => c.toUpperCase())
}

function commitType(subject, labels) {
  if (/^feat/i.test(subject)) return labels.Feature
  if (/^fix/i.test(subject)) return labels.Fix
  if (/^refactor/i.test(subject)) return labels.Refactor
  if (/^docs/i.test(subject)) return labels.Docs
  if (/^test/i.test(subject)) return labels.Tests
  if (/^chore/i.test(subject)) return labels.Chore
  if (/^perf/i.test(subject)) return labels.Perf
  if (/^revert/i.test(subject)) return labels.Revert
  return labels.Other
}
