import { collectGitData } from './git.js'
import { buildContent } from './content.js'
import { renderNewspaper } from './template.js'
import { resolveLocale, getMessages } from './locale/index.js'

export async function generate({ repoPath = process.cwd(), since, limit = 500, locale: rawLocale } = {}) {
  const locale = resolveLocale(rawLocale)
  const messages = getMessages(locale)
  const data = await collectGitData(repoPath, { since, limit, errors: messages.errors })
  const content = buildContent(data, { locale, messages })
  const html = renderNewspaper(content, { locale, messages })
  return { html, data, hitLimit: data.totalCommits >= limit, locale }
}
