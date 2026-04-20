/**
 * @typedef {'en' | 'zh'} LocaleKey
 */

export const SUPPORTED = /** @type {const} */ (['en', 'zh'])

/**
 * @param {string | undefined} input
 * @returns {LocaleKey}
 */
export function resolveLocale(input) {
  if (!input || typeof input !== 'string') return 'zh'
  const n = input.trim().toLowerCase().replace(/_/g, '-')
  if (n === 'zh' || n === 'zh-cn' || n === 'zh-hans' || n === 'cn') return 'zh'
  return 'en'
}

/**
 * BCP 47 tag for Intl (dates, numbers).
 * @param {LocaleKey} locale
 */
export function intlLocaleFor(locale) {
  return locale === 'zh' ? 'zh-CN' : 'en-US'
}
