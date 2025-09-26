"use client"

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function TestLangPage() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    // The pathname includes the current locale, so we need to remove it
    const newPath = `/${newLocale}${pathname.substring(3)}`;
    router.replace(newPath);
  };

  return (
    <div className="min-h-screen bg-black text-[#B48500] flex flex-col items-center justify-center p-8" dir={locale === "ar" ? "rtl" : "ltr"}>
      <h1 className="text-4xl font-bold mb-8">Test Language Page</h1>
      <p className="text-2xl mb-8">Current language: {locale}</p>
      
      <div className="flex gap-4 mt-8">
        <button 
          onClick={() => switchLanguage('ar')}
          className="px-6 py-3 bg-[#B48500] text-black rounded-lg font-semibold hover:bg-[#8B6914] transition-colors disabled:opacity-50"
          disabled={locale === 'ar'}
        >
          Arabic Version
        </button>
        <button 
          onClick={() => switchLanguage('en')}
          className="px-6 py-3 bg-[#B48500] text-black rounded-lg font-semibold hover:bg-[#8B6914] transition-colors disabled:opacity-50"
          disabled={locale === 'en'}
        >
          English Version
        </button>
      </div>
    </div>
  )
}
