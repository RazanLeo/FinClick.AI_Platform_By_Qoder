"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'

export function Navigation() {
  const pathname = usePathname()
  const currentLocale = pathname.split('/')[1] as typeof locales[number] | undefined
  const currentPath = pathname.replace(/^\/(ar|en)/, '')

  const switchLocale = (locale: string) => {
    // Preserve the current path when switching locales
    return `/${locale}${currentPath || ''}`
  }

  return (
    <div className="flex items-center gap-2">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={switchLocale(locale)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            currentLocale === locale
              ? 'bg-[#B48500] text-black'
              : 'text-[#B48500] hover:bg-[#B48500]/10'
          }`}
        >
          {locale === 'ar' ? '🇸🇦 AR' : '🇺🇸 EN'}
        </Link>
      ))}
    </div>
  )
}