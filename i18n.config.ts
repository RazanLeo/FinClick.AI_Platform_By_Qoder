export const i18n = {
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  localeDetection: false, // Changed from true to false
} as const

export type Locale = (typeof i18n)['locales'][number]