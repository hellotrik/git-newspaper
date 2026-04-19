import { collectGitData }  from './git.js'
import { buildContent }    from './content.js'
import { renderNewspaper } from './template.js'

export async function generate({ repoPath = process.cwd(), since, limit = 500 } = {}) {
  const data    = await collectGitData(repoPath, { since, limit })
  const content = buildContent(data)
  const html    = renderNewspaper(content)
  return { html, data, hitLimit: data.totalCommits >= limit }
}
