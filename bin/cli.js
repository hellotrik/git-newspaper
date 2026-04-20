#!/usr/bin/env node
import { program } from 'commander'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { generate } from '../src/index.js'
import { getMessages, resolveLocale } from '../src/locale/index.js'

program
  .name('git-newspaper')
  .description('Generate a newspaper front page from your git repository history')
  .version('0.1.0')
  .option('-r, --repo <path>',   'path to git repository', process.cwd())
  .option('-o, --output <file>', 'output HTML file', 'newspaper.html')
  .option('--since <date>',      'only include commits since this date (e.g. "2 weeks ago", "2024-01-01")')
  .option('--limit <n>',         'max commits to analyse', '500')
  .option('--format <fmt>',      'output format: html or png', 'html')
  .option('--locale <code>',     'output language: en or zh (default: en)', 'en')
  .option('--no-open',           'do not open the output file after generating')
  .parse()

const opts = program.opts()

;(async () => {
  const repoPath = resolve(opts.repo)
  const limit = parseInt(opts.limit, 10)
  const format = opts.format.toLowerCase()
  const locale = resolveLocale(opts.locale)
  const cli = getMessages(locale).cli

  const outFile = resolve(
    opts.output === 'newspaper.html' && format === 'png'
      ? 'newspaper.png'
      : opts.output
  )

  console.log(`\n  ${cli.banner}\n`)
  console.log(`  ${cli.repository} : ${repoPath}`)
  if (opts.since) console.log(`  ${cli.since}      : ${opts.since}`)
  console.log(`  ${cli.limit}      : ${limit} ${cli.commits}`)
  console.log(`  ${cli.format}     : ${format}`)
  console.log(`  ${cli.localeLabel}    : ${locale}`)
  console.log(`  ${cli.output}     : ${outFile}\n`)

  try {
    const { html, data, hitLimit } = await generate({ repoPath, since: opts.since, limit, locale })

    console.log(`✓  ${cli.analysed(data.totalCommits, Object.keys(data.allAuthors).length)}`)
    if (hitLimit) console.log(`   ${cli.hitLimit(limit)}`)

    if (format === 'png') {
      let chromium, playwright
      try {
        playwright = await import('playwright')
        chromium = playwright.chromium
      } catch {
        console.error(`\n✗  ${cli.pngPlaywright}\n`)
        process.exit(1)
      }

      const tmpHtml = outFile.replace(/\.png$/, '.tmp.html')
      writeFileSync(tmpHtml, html, 'utf8')

      const browser = await chromium.launch()
      const page = await browser.newPage()
      await page.setViewportSize({ width: 1280, height: 900 })
      await page.goto(`file:///${tmpHtml.replace(/\\/g, '/')}`)
      await page.waitForLoadState('networkidle')
      await page.screenshot({ path: outFile, fullPage: true })
      await browser.close()

      const { unlinkSync } = await import('fs')
      unlinkSync(tmpHtml)

      console.log(`✓  ${cli.screenshotSaved(outFile)}`)
    } else {
      writeFileSync(outFile, html, 'utf8')
      console.log(`✓  ${cli.newspaperWritten(outFile)}`)
    }

    if (opts.open) {
      const { default: open } = await import('open')
      await open(outFile)
      console.log(`✓  ${cli.opened}`)
    }

    console.log(`\n   ${cli.tagline}\n`)
  } catch (err) {
    console.error(`\n✗  ${cli.errorPrefix}: ${err.message}\n`)
    process.exit(1)
  }
})()
