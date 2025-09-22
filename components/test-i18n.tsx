"use client"

import { useTranslations } from 'use-intl'
import { useLanguage } from '@/components/language-provider'

export function TestI18n() {
  const t = useTranslations('hero')
  const { language } = useLanguage()
  
  return (
    <div className="p-4 bg-black border border-[#B48500] rounded-lg m-4">
      <h2 className="text-2xl font-bold text-[#B48500] mb-4">Internationalization Test</h2>
      <p className="text-lg mb-2">Current Language: <span className="font-bold">{language}</span></p>
      <p className="text-lg mb-2">Platform Title: <span className="font-bold">{t('title')}</span></p>
      <p className="text-lg mb-2">Platform Subtitle: <span className="font-bold">{t('subtitle')}</span></p>
      <p className="text-lg">Platform Description: <span className="font-bold">{t('description')}</span></p>
    </div>
  )
}