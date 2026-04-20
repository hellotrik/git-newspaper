import { createEnMessages } from './en.js'
import { createZhMessages } from './zh.js'
import { resolveLocale, intlLocaleFor, SUPPORTED } from './resolve.js'

const factories = {
  en: createEnMessages,
  zh: createZhMessages,
}

/**
 * @param {string | undefined} locale
 */
export function getMessages(locale) {
  const key = resolveLocale(locale)
  const factory = factories[key]
  return factory ? factory() : createEnMessages()
}

export { resolveLocale, intlLocaleFor, SUPPORTED }
