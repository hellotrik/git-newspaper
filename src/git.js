import simpleGit from 'simple-git'
import path from 'path'

export async function collectGitData(repoPath, { since, limit = 500 } = {}) {
  const git = simpleGit(repoPath)

  const isRepo = await git.checkIsRepo().catch(() => false)
  if (!isRepo) throw new Error(`Not a git repository: ${repoPath}`)

  const logArgs = ['--stat', '--format=%H|%an|%ae|%at|%s', '-n', String(limit)]
  if (since) logArgs.push(`--since=${since}`)

  const [rawLog, status, remotes] = await Promise.all([
    git.raw(['log', ...logArgs]),
    git.status(),
    git.getRemotes(true),
  ])

  const commits = parseStatLog(rawLog)
  if (!commits.length) throw new Error('No commits found in the given range.')

  const remote = remotes[0]?.refs?.fetch ?? null

  const allAuthors = {}
  for (const c of commits) {
    allAuthors[c.author] = (allAuthors[c.author] ?? 0) + 1
  }

  const deletedFiles = []
  const addedFiles   = []

  for (const c of commits) {
    for (const f of c.files) {
      if (isGenerated(f.name)) continue
      if (f.deletions > 0 && f.insertions === 0) deletedFiles.push({ file: f.name, commit: c })
      if (f.insertions > 0 && f.deletions === 0)  addedFiles.push({ file: f.name, commit: c })
    }
  }

  const churnMap = {}
  for (const c of commits) {
    for (const f of c.files) {
      if (isGenerated(f.name)) continue
      churnMap[f.name] = (churnMap[f.name] ?? 0) + f.insertions + f.deletions
    }
  }
  const mostChurned = Object.entries(churnMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([file, churn]) => ({ file, churn }))

  const biggestCommit = [...commits].sort((a, b) => b.totalChanged - a.totalChanged)[0]

  const firstCommit = commits[commits.length - 1]
  const lastCommit  = commits[0]

  const totalInsertions = commits.reduce((s, c) => s + c.insertions, 0)
  const totalDeletions  = commits.reduce((s, c) => s + c.deletions, 0)

  const repoName = path.basename(repoPath)

  const sentimentScore = scoreSentiment(commits)

  return {
    repoName,
    repoPath,
    remote,
    commits,
    firstCommit,
    lastCommit,
    totalCommits: commits.length,
    totalInsertions,
    totalDeletions,
    allAuthors,
    topAuthors: Object.entries(allAuthors).sort((a, b) => b[1] - a[1]).slice(0, 5),
    deletedFiles: dedupeByFile(deletedFiles),
    addedFiles:   dedupeByFile(addedFiles),
    mostChurned,
    biggestCommit,
    sentimentScore,
  }
}

function parseStatLog(raw) {
  const commits = []
  const blocks  = raw.trim().split(/\n(?=[a-f0-9]{40}\|)/)

  for (const block of blocks) {
    const lines = block.trim().split('\n')
    if (!lines.length) continue

    const header = lines[0]
    const parts  = header.split('|')
    if (parts.length < 5) continue

    const [hash, author, , atStr, ...subjParts] = parts
    const subject = subjParts.join('|')
    const ts      = parseInt(atStr, 10) * 1000

    const files = []
    let insertions = 0
    let deletions  = 0

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()

      const statLine = line.match(/^(.+?)\s*\|\s*(\d+)\s+([+\-]+)$/)
      if (statLine) {
        const [, name, , plusminus] = statLine
        const ins = (plusminus.match(/\+/g) ?? []).length
        const del = (plusminus.match(/-/g) ?? []).length
        files.push({ name: name.trim(), insertions: ins, deletions: del })
        insertions += ins
        deletions  += del
        continue
      }

      const summaryLine = line.match(/(\d+) file.*?(\d+) insertion.*?(\d+) deletion/)
      if (summaryLine) {
        insertions = parseInt(summaryLine[2], 10)
        deletions  = parseInt(summaryLine[3], 10)
      }
    }

    commits.push({
      hash: hash.slice(0, 7),
      author,
      date: new Date(ts),
      subject,
      files,
      insertions,
      deletions,
      totalChanged: insertions + deletions,
    })
  }

  return commits
}

function dedupeByFile(list) {
  const seen = new Set()
  return list.filter(item => {
    if (seen.has(item.file)) return false
    seen.add(item.file)
    return true
  })
}

const GENERATED_EXACT = new Set([
  'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'pnpm-lock.yml',
  'Gemfile.lock', 'poetry.lock', 'Cargo.lock', 'go.sum', 'go.mod',
  'composer.lock', 'packages.lock.json', 'Pipfile.lock', 'shrinkwrap.json',
])

const GENERATED_PATTERN = /(^|[/\\])node_modules[/\\]|(^|[/\\])(dist|build|out|\.next|\.nuxt|coverage|__pycache__)[/\\]|\.(min\.js|min\.css|bundle\.js|chunk\.js)$|\.(pb\.go|generated\.ts|g\.dart|pb2\.py|pb2_grpc\.py)$|\.snap$|(^|[/\\])\.yarn[/\\]/

function isGenerated(filePath) {
  const base = filePath.split(/[/\\]/).pop()
  if (GENERATED_EXACT.has(base)) return true
  if (GENERATED_PATTERN.test(filePath)) return true
  return false
}

function scoreSentiment(commits) {
  const good = /fix|feat|add|improve|refactor|clean|perf|optim|update/i
  const bad  = /revert|wip|hack|broken|temp|todo|debug|hotfix|emergency/i
  let score  = 0
  for (const c of commits) {
    if (good.test(c.subject)) score++
    if (bad.test(c.subject))  score--
  }
  return Math.max(-1, Math.min(1, score / Math.max(commits.length, 1)))
}
