export const i18n = {
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  localeDetection: true,
} as const

export type Locale = (typeof i18n)['locales'][number]