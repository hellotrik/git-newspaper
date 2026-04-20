import { intlLocaleFor } from './locale/resolve.js'

/**
 * @param {Date} date
 * @param {import('./locale/resolve.js').LocaleKey} [locale]
 */
export function format(date, locale = 'en') {
  return date.toLocaleDateString(intlLocaleFor(locale), {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * @param {Date} date
 * @param {import('./locale/resolve.js').LocaleKey} [locale]
 */
export function formatShort(date, locale = 'en') {
  return date.toLocaleDateString(intlLocaleFor(locale), {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
