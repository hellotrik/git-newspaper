export const ARCHETYPES = {
  REVERT_CRISIS:    'REVERT_CRISIS',
  SOLO_MARATHON:    'SOLO_MARATHON',
  GHOST_TOWN:       'GHOST_TOWN',
  DEPENDENCY_CHURN: 'DEPENDENCY_CHURN',
  REFACTOR_SWEEP:   'REFACTOR_SWEEP',
  BUGFIX_CRISIS:    'BUGFIX_CRISIS',
  FEATURE_SPRINT:   'FEATURE_SPRINT',
  COLLABORATIVE:    'COLLABORATIVE',
  BALANCED:         'BALANCED',
}

export function detectArchetype(data) {
  const { commits, allAuthors, totalCommits } = data
  if (!totalCommits) return ARCHETYPES.GHOST_TOWN

  const revertCount   = commits.filter(c => /^revert/i.test(c.subject)).length
  const fixCount      = commits.filter(c => /^fix|hotfix/i.test(c.subject)).length
  const featCount     = commits.filter(c => /^feat/i.test(c.subject)).length
  const refactorCount = commits.filter(c => /^refactor/i.test(c.subject)).length

  const depCommits = commits.filter(c =>
    c.files.some(f => /package(-lock)?\.json|yarn\.lock|pnpm-lock|requirements\.txt|Gemfile\.lock|go\.sum|Cargo\.lock/i.test(f.name))
  ).length

  const authorCounts   = Object.values(allAuthors).sort((a, b) => b - a)
  const nAuthors       = authorCounts.length
  const topAuthorShare = authorCounts[0] / totalCommits

  // Thresholds calibrated against 11 real repos (April 2026).
  // Original values were too conservative — 7/11 landed on BALANCED.
  // Loosening + adding COLLABORATIVE brought that to ~2/11.
  // Re-calibrate against the 15–20 repo grid before 1.0:
  //   if >25% land on BALANCED → thresholds still too tight
  //   if 0% land on BALANCED   → BALANCED is dead code, thresholds too loose
  if (totalCommits < 8)                              return ARCHETYPES.GHOST_TOWN
  if (revertCount / totalCommits > 0.12)             return ARCHETYPES.REVERT_CRISIS
  if (topAuthorShare > 0.70)                         return ARCHETYPES.SOLO_MARATHON
  if (nAuthors >= 5 && totalCommits >= 40)           return ARCHETYPES.COLLABORATIVE
  if (depCommits    / totalCommits > 0.35)           return ARCHETYPES.DEPENDENCY_CHURN
  if (refactorCount / totalCommits > 0.25)           return ARCHETYPES.REFACTOR_SWEEP
  if (fixCount      / totalCommits > 0.35)           return ARCHETYPES.BUGFIX_CRISIS
  if (featCount     / totalCommits > 0.35)           return ARCHETYPES.FEATURE_SPRINT
  return ARCHETYPES.BALANCED
}

/** Edition titles for display come from i18n (`src/locale/`); `label` kept for reference / tooling. */
export const ARCHETYPE_META = {
  REVERT_CRISIS:    { tone: 'scandal',       label: 'CRISIS EDITION',         layout: 'stack'  },
  SOLO_MARATHON:    { tone: 'admiring',      label: 'PROFILE EDITION',        layout: 'hero'   },
  GHOST_TOWN:       { tone: 'melancholy',    label: 'QUIET EDITION',          layout: 'sparse' },
  DEPENDENCY_CHURN: { tone: 'bureaucratic',  label: 'ADMINISTRATIVE NOTICE',  layout: 'sparse' },
  REFACTOR_SWEEP:   { tone: 'civic',         label: 'INFRASTRUCTURE REPORT',  layout: 'hero'   },
  BUGFIX_CRISIS:    { tone: 'urgent',        label: 'EMERGENCY EDITION',      layout: 'stack'  },
  FEATURE_SPRINT:   { tone: 'triumphant',    label: 'LAUNCH EDITION',         layout: 'hero'   },
  COLLABORATIVE:    { tone: 'democratic',    label: 'COLLABORATIVE EDITION',  layout: 'hero'   },
  BALANCED:         { tone: 'neutral',       label: 'MORNING EDITION',        layout: 'hero'   },
}
