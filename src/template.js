import { intlLocaleFor } from './locale/resolve.js'
import { INLINE_FONTS } from './fonts.js'

const ARCHETYPE_DINGBAT = {
  REVERT_CRISIS:    '\u2020',  // †  Dagger
  SOLO_MARATHON:    '\u2042',  // ⁂  Asterism
  GHOST_TOWN:       '\u2619',  // ☙  Reversed fleuron
  DEPENDENCY_CHURN: '\u00A7',  // §  Section sign
  REFACTOR_SWEEP:   '\u00B6',  // ¶  Pilcrow — editorial, structural
  BUGFIX_CRISIS:    '\u2021',  // ‡  Double dagger
  FEATURE_SPRINT:   '\u2726',  // ✦  Four-pointed star
  COLLABORATIVE:    '\u2766',  // ❦  Floral heart
  BALANCED:         '\u2720',  // ✠  Maltese cross
}

function renderTimeline(timeline, intlLocale) {
  if (!timeline?.points?.length) return ''
  const { points, timelineLabel, peakLabel, oldest, newest, peakIdx, peakCount } = timeline

  const W = 1000, H = 56, PAD_Y = 6
  const n    = points.length
  const max  = Math.max(...points.map(p => p.count), 1)
  const fmt  = d => d.toLocaleDateString(intlLocale, { month: 'short', year: 'numeric' })

  const xOf  = i => Math.round((i / Math.max(n - 1, 1)) * W)
  const yOf  = v => Math.round(H - PAD_Y - (v / max) * (H - PAD_Y * 2))

  const coords = points.map((p, i) => [xOf(i), yOf(p.count)])

  // Smooth cubic bezier path
  const pathD = coords.reduce((d, [x, y], i) => {
    if (i === 0) return `M ${x},${y}`
    const [px, py] = coords[i - 1]
    const cpx = Math.round((px + x) / 2)
    return `${d} C ${cpx},${py} ${cpx},${y} ${x},${y}`
  }, '')

  // Area fill — same path closed back along the baseline
  const areaD = `${pathD} L ${coords[n-1][0]},${H} L ${coords[0][0]},${H} Z`

  const peakX = xOf(peakIdx)
  const peakY = yOf(peakCount)

  // Dots only when there are few enough points to not crowd
  const dots = n <= 80 ? coords.map(([x, y]) =>
    `<circle cx="${x}" cy="${y}" r="1.8" fill="#1a1209" opacity="0.7"/>`
  ).join('') : ''

  return `
<div class="timeline-wrap">
  <div class="timeline-label">${timelineLabel}</div>
  <svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" xmlns="http://www.w3.org/2000/svg" style="display:block;overflow:visible">
    <defs>
      <linearGradient id="tl-fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="#1a1209" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#1a1209" stop-opacity="0.02"/>
      </linearGradient>
    </defs>
    <line x1="0" y1="${H}" x2="${W}" y2="${H}" stroke="#2a1f0e" stroke-width="0.75"/>
    <path d="${areaD}" fill="url(#tl-fill)"/>
    <path d="${pathD}" fill="none" stroke="#1a1209" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
    ${dots}
    <line x1="${peakX}" y1="${PAD_Y}" x2="${peakX}" y2="${H}" stroke="#7a1a1a" stroke-width="0.75" stroke-dasharray="2,2"/>
    <circle cx="${peakX}" cy="${peakY}" r="3" fill="#7a1a1a"/>
  </svg>
  <div class="timeline-axis">
    <span>${fmt(oldest)}</span>
    <span class="timeline-peak">${peakLabel}</span>
    <span>${fmt(newest)}</span>
  </div>
</div>`
}

function renderTypeChart(typeBreakdown, locale) {
  if (!typeBreakdown?.length) return ''
  const top = typeBreakdown.slice(0, 6)
  const max = top[0][1]
  const rowH = 14, labelW = 62, barAreaW = 80, countW = 20
  const W = labelW + barAreaW + countW
  const H = top.length * rowH

  const rows = top.map(([type, count], i) => {
    const barW = Math.round((count / max) * barAreaW)
    const y = i * rowH
    const midY = y + rowH * 0.72
    const label = locale === 'zh' ? type : type.toUpperCase()
    return `
    <text x="0"          y="${midY}" font-family="Cinzel,serif" font-size="6.5" fill="#6b5a42" letter-spacing="0.8">${label}</text>
    <rect x="${labelW}"  y="${y + 2}" width="${barW}" height="${rowH - 5}" fill="#1a1209" opacity="0.72" rx="1"/>
    <text x="${labelW + barW + 4}" y="${midY}" font-family="Cinzel,serif" font-size="6.5" fill="#3a2c1a">${count}</text>`
  }).join('')

  return `<svg viewBox="0 0 ${W} ${H}" width="100%" xmlns="http://www.w3.org/2000/svg" style="display:block">${rows}</svg>`
}

function getLayout(archetype) {
  if (['REVERT_CRISIS', 'BUGFIX_CRISIS'].includes(archetype))         return 'stack'
  if (['GHOST_TOWN', 'DEPENDENCY_CHURN'].includes(archetype))         return 'sparse'
  return 'hero'
}

export function renderNewspaper(
  { masthead, headline, lead, weather, obituaries, opinion, stats, classifieds, bylineBar, charts, archetype },
  { locale, messages }
) {
  const t = messages.template
  const intlLocale = intlLocaleFor(locale)
  const htmlLang = locale === 'zh' ? 'zh-CN' : 'en'
  const bodyFont = locale === 'zh'
    ? "'Noto Serif SC', 'Source Han Serif CN', 'IM Fell English', 'Georgia', serif"
    : "'IM Fell English', 'Georgia', serif"

  const layout = getLayout(archetype)
  const obitsHtml = obituaries.length
    ? obituaries.map(o => `
        <div class="obit-item">
          <div class="obit-name">${o.name}</div>
          <div class="obit-path">${o.path}</div>
          <p class="obit-text">${o.epitaph}</p>
        </div>`).join('<div class="obit-divider">* * *</div>')
    : `<p class="empty-note">${t.emptyObits}</p>`

  const statsRows = [
    [t.statsCommitsExamined, stats.totalCommits.toLocaleString(intlLocale)],
    [t.statsLinesIntroduced, stats.totalInsertions.toLocaleString(intlLocale)],
    [t.statsLinesExpunged, stats.totalDeletions.toLocaleString(intlLocale)],
    [t.statsAvgChange, stats.avgPerCommit.toLocaleString(intlLocale) + ' ' + t.statsLinesUnit],
  ]

  const maxAuthorCount = stats.topAuthors[0]?.[1] ?? 1

  return `<!DOCTYPE html>
<html lang="${htmlLang}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${t.htmlTitleSuffix} — ${masthead.repo}</title>
<style>${INLINE_FONTS}</style>
<style>

/* ── Reset ─────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --paper:     #f0e6cc;
  --paper-alt: #ede0c0;
  --ink:       #1a1209;
  --ink-mid:   #3a2c1a;
  --ink-faint: #6b5a42;
  --rule:      #2a1f0e;
  --rule-lt:   #b8a88a;
  --red:       #7a1a1a;
  --col-gap:   14px;
}

html {
  background: #c4b8a0;
}

body {
  overflow-wrap:    break-word;
  word-break:       break-word;
  background-color: var(--paper);
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E"),
    repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(0,0,0,0.018) 23px, rgba(0,0,0,0.018) 24px);
  color:       var(--ink);
  font-family: ${bodyFont};
  font-size:   15.5px;
  line-height: 1.6;
  max-width:   1180px;
  margin:      32px auto;
  padding:     0 28px 48px;
  box-shadow:  0 6px 48px rgba(0,0,0,0.40), inset 0 0 120px rgba(0,0,0,0.04);
}

/* ── Ornamental rules ─────────────────────────────────────── */
.rule-single  { border: none; border-top: 1px solid var(--rule);    margin: 0; }
.rule-thin    { border: none; border-top: 1px solid var(--rule-lt); margin: 0; }
.rule-thick   { border: none; border-top: 3px solid var(--rule);    margin: 0; }
.rule-double  { border: none; border-top: 4px double var(--rule);   margin: 0; }
.rule-deck {
  border: none;
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  height: 3px;
  background: transparent;
  margin: 0;
}

/* ── Section header ornament ──────────────────────────────── */
.sec-head {
  font-family:    'Cinzel', serif;
  font-size:      8.5px;
  font-weight:    600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color:          var(--ink);
  padding:        4px 0 3px;
  display:        flex;
  align-items:    center;
  gap:            8px;
  white-space:    nowrap;
  line-height:    1;
}
.sec-head::before,
.sec-head::after {
  content:    '';
  flex:       1;
  border-top: 1px solid var(--rule);
  position:   relative;
  top:        0;
}

/* ── Masthead ─────────────────────────────────────────────── */
.masthead {
  text-align:  center;
  padding:     18px 0 0;
}

.mast-topbar {
  font-family:    'Cinzel', serif;
  font-size:      8px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color:          var(--ink-mid);
  display:        flex;
  justify-content: space-between;
  padding-bottom: 5px;
}

.mast-title {
  font-family:  'UnifrakturMaguntia', cursive;
  font-size:    clamp(56px, 9vw, 106px);
  line-height:  1;
  color:        var(--ink);
  letter-spacing: 0.01em;
  margin:       6px 0 4px;
}

.mast-repo {
  font-family:    'Cinzel', serif;
  font-size:      10px;
  font-weight:    600;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color:          var(--red);
  margin-bottom:  4px;
}

.mast-tagline {
  font-family: 'IM Fell English', serif;
  font-style:  italic;
  font-size:   12px;
  color:       var(--ink-faint);
  margin-bottom: 10px;
}

/* ── Section nav ──────────────────────────────────────────── */
.section-nav {
  display:         flex;
  justify-content: center;
  font-family:     'Cinzel', serif;
  font-size:       8px;
  letter-spacing:  0.18em;
  text-transform:  uppercase;
  color:           var(--ink);
  padding:         5px 0 4px;
}
.section-nav span {
  padding:      0 12px;
  border-right: 1px solid var(--rule-lt);
}
.section-nav span:last-child { border-right: none; }

/* ── Body layout ──────────────────────────────────────────── */
.body-upper {
  display: flex;
  align-items: stretch;
  gap: 0;
  padding-top: 10px;
}

.col-stats {
  flex:          0 0 var(--col-stats-w);
  min-width:     0;
  padding-right: var(--col-gap);
  border-right:  1px solid var(--rule-lt);
  overflow:      hidden;
}

.col-lead {
  flex:         0 0 var(--col-lead-w);
  min-width:    0;
  padding:      0 var(--col-gap);
  border-right: 1px solid var(--rule-lt);
  overflow:     hidden;
}

.col-right {
  flex:        0 0 var(--col-right-w);
  min-width:   0;
  padding-left: var(--col-gap);
  overflow:     hidden;
}

.body-lower {
  display:    flex;
  gap:        0;
  padding-top: 10px;
}

.col-opinion {
  flex:          0 0 var(--col-opinion-w);
  min-width:     0;
  padding-right: var(--col-gap);
  border-right:  1px solid var(--rule-lt);
  overflow:      hidden;
}

.col-classif {
  flex:        0 0 var(--col-classif-w);
  min-width:   0;
  padding-left: var(--col-gap);
  overflow:     hidden;
}

/* ── Stat sidebar ─────────────────────────────────────────── */
.stat-block { margin-bottom: 10px; padding-bottom: 10px; }

.stat-item {
  display:        flex;
  justify-content: space-between;
  font-family:    'Cinzel', serif;
  font-size:      8.5px;
  padding:        2px 0;
  border-bottom:  1px dotted var(--rule-lt);
  color:          var(--ink-mid);
  letter-spacing: 0.05em;
}
.stat-item strong {
  font-family: 'IM Fell English', serif;
  font-size:   11px;
  color:       var(--ink);
}

.author-item { margin-bottom: 5px; }

.author-name {
  font-family: 'IM Fell English', serif;
  font-style:  italic;
  font-size:   11px;
  color:       var(--ink);
}

.author-meta {
  font-family:    'Cinzel', serif;
  font-size:      8px;
  color:          var(--ink-faint);
  letter-spacing: 0.08em;
}

.author-bar-wrap {
  background: var(--rule-lt);
  height:     3px;
  margin-top: 2px;
}
.author-bar-fill {
  height:     3px;
  background: var(--ink-mid);
}

/* ── Headline ─────────────────────────────────────────────── */
.kicker {
  font-family:    'Cinzel', serif;
  font-size:      8.5px;
  font-weight:    700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color:          var(--red);
  margin-bottom:  5px;
}

.hed {
  font-family:   'Cinzel', serif;
  font-weight:   700;
  line-height:   1.12;
  letter-spacing: -0.01em;
  margin-bottom: 8px;
  color:         var(--ink);
}

.deck {
  font-family:  'IM Fell English', serif;
  font-style:   italic;
  font-size:    16px;
  line-height:  1.5;
  color:        var(--ink-mid);
  margin-bottom: 6px;
}

.byline-line {
  font-family:    'Cinzel', serif;
  font-size:      8px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color:          var(--ink-faint);
  margin-bottom:  8px;
}

/* ── Lead article ─────────────────────────────────────────── */
.lead-body {
  column-gap:   var(--col-gap);
  column-rule:  1px solid var(--rule-lt);
  text-align:   justify;
  hyphens:      auto;
}

.lead-body p { margin-bottom: 0.7em; orphans: 3; widows: 3; }

.lead-body p:first-child::first-letter {
  font-family:  'UnifrakturMaguntia', cursive;
  font-size:    4.6em;
  line-height:  0.78;
  float:        left;
  margin-right: 4px;
  margin-top:   5px;
  color:        var(--ink);
}

/* ── Weather ──────────────────────────────────────────────── */
.weather-block { margin-bottom: 14px; }

.weather-cond {
  font-family:   'Cinzel', serif;
  font-weight:   700;
  font-size:     15px;
  line-height:   1.1;
  color:         var(--ink);
}

.weather-temp {
  font-family:    'Cinzel', serif;
  font-size:      8px;
  color:          var(--ink-faint);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.weather-text {
  font-size:  14px;
  font-style: italic;
  color:      var(--ink-mid);
  text-align: justify;
  hyphens:    auto;
}

/* ── Obituaries ───────────────────────────────────────────── */
.obit-item    { margin-bottom: 8px; }

.obit-name {
  font-family: 'Cinzel', serif;
  font-weight: 700;
  font-size:   11px;
  color:       var(--ink);
  border-bottom: 1px solid var(--rule-lt);
  padding-bottom: 1px;
  margin-bottom: 2px;
}

.obit-path {
  font-family:    'Cinzel', serif;
  font-size:      7.5px;
  color:          var(--ink-faint);
  letter-spacing: 0.06em;
  word-break:     break-all;
  margin-bottom:  3px;
}

.obit-text {
  font-style: italic;
  font-size:  13.5px;
  color:      var(--ink-mid);
  text-align: justify;
  hyphens:    auto;
}

.obit-divider {
  text-align:   center;
  color:        var(--rule-lt);
  font-size:    10px;
  margin:       6px 0;
  letter-spacing: 6px;
}

/* ── Opinion ──────────────────────────────────────────────── */
.opinion-eyebrow {
  font-family:    'Cinzel', serif;
  font-size:      8px;
  font-weight:    600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color:          var(--red);
  text-align:     center;
  margin-bottom:  5px;
}

.opinion-hed {
  font-family:   'Cinzel', serif;
  font-weight:   700;
  font-size:     clamp(14px, 2vw, 20px);
  line-height:   1.2;
  margin-bottom: 2px;
}

.opinion-sub {
  font-family:    'Cinzel', serif;
  font-size:      8px;
  color:          var(--ink-faint);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom:  8px;
}

.opinion-body {
  column-count: 2;
  column-gap:   var(--col-gap);
  column-rule:  1px solid var(--rule-lt);
  text-align:   justify;
  hyphens:      auto;
}

.opinion-body p { font-size: 14.5px; margin-bottom: 0.65em; orphans: 3; widows: 3; }

.pull-quote {
  font-family:   'IM Fell English', serif;
  font-style:    italic;
  font-weight:   400;
  font-size:     15px;
  line-height:   1.4;
  color:         var(--red);
  border-top:    2px solid var(--red);
  border-bottom: 1px solid var(--red);
  padding:       7px 4px;
  margin:        10px 0;
  column-span:   all;
  text-align:    center;
}

/* ── Classifieds ──────────────────────────────────────────── */
.classif-grid {
  display:               grid;
  grid-template-columns: 1fr 1fr;
  gap:                   10px 16px;
}

.classif-cat {
  font-family:    'Cinzel', serif;
  font-size:      8px;
  font-weight:    700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color:          var(--red);
  border-bottom:  1px solid var(--red);
  padding-bottom: 1px;
  margin-bottom:  3px;
}

.classif-text { font-size: 13px; color: var(--ink-mid); text-align: justify; hyphens: auto; }

/* ── Column close ornament ────────────────────────────────── */
.col-close {
  margin-top:  20px;
  padding-top: 14px;
  border-top:  2px solid var(--rule);
  text-align:  center;
}

.col-close-rule {
  border: none;
  border-top: 1px solid var(--rule-lt);
  margin: 5px auto;
  width: 60%;
}

.col-close-text {
  font-family:    'Cinzel', serif;
  font-size:      7.5px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color:          var(--ink-faint);
  display:        inline-block;
  padding:        4px 10px;
}

.col-close-dingbat {
  font-family:    'UnifrakturMaguntia', cursive;
  font-size:      26px;
  line-height:    1;
  color:          var(--ink-faint);
  display:        block;
  margin-top:     6px;
  opacity:        0.6;
}

/* ── Footer ───────────────────────────────────────────────── */
.footer {
  display:         flex;
  justify-content: space-between;
  align-items:     baseline;
  font-family:     'Cinzel', serif;
  font-size:       7.5px;
  letter-spacing:  0.1em;
  text-transform:  uppercase;
  color:           var(--ink-faint);
  padding-top:     8px;
}

.empty-note { font-style: italic; font-size: 12px; color: var(--ink-faint); }

/* ── Charts ───────────────────────────────────────────────── */
.timeline-wrap {
  margin: 10px 0 14px;
  padding: 8px 0 6px;
  border-top: 1px solid var(--rule-lt);
  border-bottom: 1px solid var(--rule-lt);
}

.timeline-label {
  font-family:    'Cinzel', serif;
  font-size:      7.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color:          var(--ink-faint);
  margin-bottom:  5px;
  text-align:     center;
}

.timeline-axis {
  display:         flex;
  justify-content: space-between;
  font-family:     'Cinzel', serif;
  font-size:       7px;
  color:           var(--ink-faint);
  letter-spacing:  0.06em;
  margin-top:      3px;
}

.timeline-peak { color: var(--red); }


/* ── Spacing helpers ──────────────────────────────────────── */
.mt4  { margin-top:    4px; }
.mt8  { margin-top:    8px; }
.mt10 { margin-top:   10px; }
.mb4  { margin-bottom: 4px; }
.mb8  { margin-bottom: 8px; }
.mb10 { margin-bottom:10px; }

/* ── Layout variants ──────────────────────────────────────── */

/* hero (default) */
:root {
  --col-stats-w:   17%;
  --col-lead-w:    52%;
  --col-right-w:   31%;
  --col-opinion-w: 48%;
  --col-classif-w: 52%;
  --hed-size:      clamp(20px, 3.2vw, 36px);
  --lead-cols:     2;
  --lead-size:     15.5px;
  --page-pt:       18px;
}

/* stack — crisis/emergency: dense, equal columns, urgent */
[data-layout="stack"] {
  --col-stats-w:   13%;
  --col-lead-w:    40%;
  --col-right-w:   47%;
  --col-opinion-w: 50%;
  --col-classif-w: 50%;
  --hed-size:      clamp(16px, 2.4vw, 28px);
  --lead-cols:     1;
  --lead-size:     14.5px;
  --page-pt:       10px;
}

/* sparse — ghost town / admin: wide centre, lots of air */
[data-layout="sparse"] {
  --col-stats-w:   11%;
  --col-lead-w:    62%;
  --col-right-w:   27%;
  --col-opinion-w: 55%;
  --col-classif-w: 45%;
  --hed-size:      clamp(30px, 5vw, 54px);
  --lead-cols:     2;
  --lead-size:     16px;
  --page-pt:       32px;
}

/* wire layout vars into components */
.col-stats    { flex: 0 0 var(--col-stats-w); }
.col-lead     { flex: 0 0 var(--col-lead-w); }
.col-right    { flex: 0 0 var(--col-right-w); }
.col-opinion  { flex: 0 0 var(--col-opinion-w); }
.col-classif  { flex: 0 0 var(--col-classif-w); }
.hed          { font-size: var(--hed-size); }
.lead-body    { column-count: var(--lead-cols); font-size: var(--lead-size); }
.masthead     { padding-top: var(--page-pt); }

/* stack-specific: crisis band above masthead */
.crisis-band {
  display:         none;
  background:      var(--red);
  color:           var(--paper);
  font-family:     'Cinzel', serif;
  font-size:       9px;
  font-weight:     700;
  letter-spacing:  0.3em;
  text-transform:  uppercase;
  text-align:      center;
  padding:         5px 0;
}
[data-layout="stack"] .crisis-band { display: block; }

/* stack-specific: section nav gets red background */
[data-layout="stack"] .section-nav {
  background:   var(--red);
  color:        var(--paper);
  border-color: var(--red);
  padding:      6px 0;
}
[data-layout="stack"] .section-nav span { border-color: rgba(255,255,255,0.3); }

/* sparse-specific: more breathing room */
[data-layout="sparse"] .body-upper { padding-top: 20px; }
[data-layout="sparse"] .hed        { letter-spacing: -0.02em; line-height: 1.05; }
[data-layout="sparse"] .body-lower { padding-top: 18px; }

@media print {
  html { background: white; }
  body { box-shadow: none; margin: 0; padding: 0 10mm; max-width: none; }
}
</style>
</head>
<body data-layout="${layout}">

<div class="crisis-band">${t.crisisBreaking} — ${masthead.edition}</div>

<!-- ══ MASTHEAD ══════════════════════════════════════════════════════════ -->
<header class="masthead">
  <div class="mast-topbar">
    <span>${t.mastEstablished} <code>git init</code></span>
    <span>${t.mastVol} &nbsp;·&nbsp; ${t.mastNo} &nbsp;·&nbsp; ${masthead.edition}</span>
    <span>${masthead.date}</span>
  </div>

  <hr class="rule-thick" />
  <div style="height:3px"></div>
  <hr class="rule-single" />

  <div class="mast-title">${t.mastTitle}</div>
  <div class="mast-repo">${masthead.repo}</div>
  <div class="mast-tagline">${masthead.tagline}</div>

  <hr class="rule-single" />
  <div style="height:3px"></div>
  <hr class="rule-thick" />

  <nav class="section-nav">
    <span>${t.navFrontPage}</span>
    <span>${t.navMeteorology}</span>
    <span>${t.navObituaries}</span>
    <span>${t.navOpinion}</span>
    <span>${t.navClassifieds}</span>
    <span>${t.navVitalStats}</span>
  </nav>
  <hr class="rule-double" />
</header>

<!-- ══ UPPER BODY ════════════════════════════════════════════════════════ -->
<div class="body-upper">

  <!-- STATS SIDEBAR -->
  <aside class="col-stats">
    <div class="sec-head">${t.vitalStats}</div>

    <div class="stat-block mt4">
      ${statsRows.map(([label, val]) => `
      <div class="stat-item"><span>${label}</span><strong>${val}</strong></div>`).join('')}
    </div>

    <hr class="rule-thin" />
    <div class="sec-head mt8">${t.contributors}</div>
    <div class="mt4">
      ${stats.topAuthors.map(([name, count]) => {
        const pct = Math.round((count / maxAuthorCount) * 100)
        return `
      <div class="author-item">
        <div class="author-name">${name}</div>
        <div class="author-meta">${t.authorCommits(count)}</div>
        <div class="author-bar-wrap"><div class="author-bar-fill" style="width:${pct}%"></div></div>
      </div>`}).join('')}
    </div>

    ${stats.mostChurned.length ? `
    <hr class="rule-thin mt8" />
    <div class="sec-head mt8">${t.mostVexed}</div>
    <div class="mt4">
      ${stats.mostChurned.map(({ file, churn }) => {
        const name = file.split(/[/\\]/).pop()
        return `
      <div class="author-item">
        <div class="author-name" style="word-break:break-all;font-size:10px">${name}</div>
        <div class="author-meta">${t.fileChanges(churn)}</div>
      </div>`}).join('')}
    </div>` : ''}

    ${stats.typeBreakdown.length ? `
    <hr class="rule-thin mt8" />
    <div class="sec-head mt8">${t.commitTypes}</div>
    <div class="mt4">${renderTypeChart(stats.typeBreakdown, locale)}</div>` : ''}

  </aside>

  <!-- LEAD STORY -->
  <main class="col-lead">
    <div class="kicker">${headline.kicker}</div>
    <h1 class="hed">${headline.headline}</h1>
    <hr class="rule-deck" />
    <p class="deck mt4">${headline.deck}</p>
    <div class="byline-line mb8">${t.bylinePrefix} ${headline.byline} &nbsp;·&nbsp; ${headline.date} &nbsp;·&nbsp; ${t.bylineCommitWord} ${headline.hash}</div>
    <hr class="rule-single mb8" />
    <div class="lead-body">
      ${lead.paragraphs.map(p => `<p>${p}</p>`).join('\n      ')}
    </div>
  </main>

  <!-- WEATHER + OBITUARIES -->
  <aside class="col-right">
    <div class="sec-head">${t.meteorologicalReport}</div>
    <div class="weather-block mt8">
      <div class="weather-cond">${weather.condition}</div>
      <div class="weather-temp">${weather.temp}°F &nbsp;·&nbsp; ${t.weatherClimate}</div>
      <p class="weather-text mt4">${weather.forecast}</p>
    </div>

    <hr class="rule-single mb8 mt8" />

    <div class="sec-head">${t.obituaries}</div>
    <div class="mt8">
      ${obitsHtml}
    </div>
  </aside>
</div>

<!-- ══ SECTION BREAK ══════════════════════════════════════════════════ -->
<div class="mt10"></div>
<hr class="rule-thick" />
${renderTimeline(charts?.timeline, intlLocale)}
<hr class="rule-thick" />
<hr class="rule-single" />

<!-- ══ LOWER BODY ════════════════════════════════════════════════════════ -->
<div class="body-lower mt10">

  <!-- OPINION COLUMN -->
  ${opinion ? `
  <section class="col-opinion">
    <div class="opinion-eyebrow">${t.opinionEyebrow}</div>
    <h2 class="opinion-hed">${opinion.title}</h2>
    <div class="opinion-sub">${opinion.subtitle}</div>
    <hr class="rule-deck mb8" />
    <div class="opinion-body">
      ${opinion.body.map((p, i) =>
        i === 1
          ? `<p class="pull-quote">"${p.slice(0, 90).trim()}${t.ellipsis}"</p><p>${p}</p>`
          : `<p>${p}</p>`
      ).join('\n      ')}
    </div>
  </section>` : `<section class="col-opinion"><p class="empty-note">${t.noOpinion}</p></section>`}

  <!-- CLASSIFIEDS -->
  <section class="col-classif">
    <div class="sec-head">${t.classifiedNotices}</div>
    <div class="classif-grid mt8">
      ${classifieds.map(ad => `
      <div>
        <div class="classif-cat">${ad.category}</div>
        <p class="classif-text">${ad.body}</p>
      </div>`).join('')}
    </div>

    <div class="col-close">
      <hr class="col-close-rule" />
      <span class="col-close-text">${masthead.edition}</span>
      <hr class="col-close-rule" />
      <span class="col-close-dingbat">${ARCHETYPE_DINGBAT[archetype] ?? '\u2767'}</span>
    </div>
  </section>

</div>

<!-- ══ FOOTER ═════════════════════════════════════════════════════════ -->
<div class="mt10"></div>
<hr class="rule-thick" />
<div style="height:2px"></div>
<hr class="rule-single" />

<footer class="footer mt8">
  <div>${bylineBar.contributors.map(c => `${c.name} (${c.count})`).join(' &nbsp;·&nbsp; ')}</div>
  <div>${bylineBar.totalCommits} ${messages.charts.footerExamined} &nbsp;·&nbsp; ${messages.charts.footerGenerated} ${new Date().toLocaleDateString(intlLocale, { year:'numeric', month:'long', day:'numeric' })}</div>
  <div>git-newspaper &nbsp;·&nbsp; ${t.footerNpx}</div>
</footer>

</body>
</html>`
}
