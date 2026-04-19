#!/usr/bin/env node
import { program } from 'commander'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { generate } from '../src/index.js'

program
  .name('git-newspaper')
  .description('Generate a newspaper front page from your git repository history')
  .version('0.1.0')
  .option('-r, --repo <path>',   'path to git repository', process.cwd())
  .option('-o, --output <file>', 'output HTML file', 'newspaper.html')
  .option('--since <date>',      'only include commits since this date (e.g. "2 weeks ago", "2024-01-01")')
  .option('--limit <n>',         'max commits to analyse', '500')
  .option('--format <fmt>',      'output format: html or png', 'html')
  .option('--no-open',           'do not open the output file after generating')
  .parse()

const opts = program.opts()

;(async () => {
  const repoPath = resolve(opts.repo)
  const limit    = parseInt(opts.limit, 10)
  const format   = opts.format.toLowerCase()

  const outFile  = resolve(
    opts.output === 'newspaper.html' && format === 'png'
      ? 'newspaper.png'
      : opts.output
  )

  console.log(`\n  git-newspaper\n`)
  console.log(`  Repository : ${repoPath}`)
  if (opts.since) console.log(`  Since      : ${opts.since}`)
  console.log(`  Limit      : ${limit} commits`)
  console.log(`  Format     : ${format}`)
  console.log(`  Output     : ${outFile}\n`)

  try {
    const { html, data, hitLimit } = await generate({ repoPath, since: opts.since, limit })

    console.log(`✓  Analysed ${data.totalCommits} commit${data.totalCommits !== 1 ? 's' : ''} across ${Object.keys(data.allAuthors).length} contributor(s)`)
    if (hitLimit) console.log(`   (showing most recent ${limit} commits — use --limit to adjust)`)

    if (format === 'png') {
      let chromium, playwright
      try {
        playwright = await import('playwright')
        chromium   = playwright.chromium
      } catch {
        console.error(`\n✗  PNG export requires playwright: npm install -D playwright && npx playwright install chromium\n`)
        process.exit(1)
      }

      const tmpHtml = outFile.replace(/\.png$/, '.tmp.html')
      writeFileSync(tmpHtml, html, 'utf8')

      const browser = await chromium.launch()
      const page    = await browser.newPage()
      await page.setViewportSize({ width: 1280, height: 900 })
      await page.goto(`file:///${tmpHtml.replace(/\\/g, '/')}`)
      await page.waitForLoadState('networkidle')
      await page.screenshot({ path: outFile, fullPage: true })
      await browser.close()

      const { unlinkSync } = await import('fs')
      unlinkSync(tmpHtml)

      console.log(`✓  Screenshot saved to ${outFile}`)
    } else {
      writeFileSync(outFile, html, 'utf8')
      console.log(`✓  Newspaper written to ${outFile}`)
    }

    if (opts.open) {
      const { default: open } = await import('open')
      await open(outFile)
      console.log(`✓  Opened`)
    }

    console.log(`\n   Share it, print it, frame it.\n`)
  } catch (err) {
    console.error(`\n✗  Error: ${err.message}\n`)
    process.exit(1)
  }
})()
