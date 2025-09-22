import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n'

export default function TestLangPage() {
  const t = useTranslations('hero')
  
  return (
    <div className="min-h-screen bg-black text-[#B48500] flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
      <p className="text-2xl mb-8">{t('subtitle')}</p>
      <p className="text-xl mb-8">{t('description')}</p>
      
      <div className="flex gap-4 mt-8">
        <Link href="/" locale="ar">
          <button className="px-6 py-3 bg-[#B48500] text-black rounded-lg font-semibold hover:bg-[#8B6914] transition-colors">
            Arabic Version
          </button>
        </Link>
        <Link href="/" locale="en">
          <button className="px-6 py-3 bg-[#B48500] text-black rounded-lg font-semibold hover:bg-[#8B6914] transition-colors">
            English Version
          </button>
        </Link>
      </div>
    </div>
  )
}