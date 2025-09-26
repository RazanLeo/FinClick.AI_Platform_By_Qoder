"use client"

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TestScreen() {
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const switchLanguage = (newLocale: string) => {
    const newPath = `/${newLocale}${pathname.substring(3)}`;
    router.replace(newPath);
  };

  if (!isClient) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-[#B48500] p-8" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Language & Translation Test Screen</h1>
        
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Current Language Status</h2>
          <p className="mb-2">Current Language: <span className="font-mono bg-gray-800 px-2 py-1 rounded">{locale}</span></p>
          <p className="mb-2">Direction: <span className="font-mono bg-gray-800 px-2 py-1 rounded">{locale === "ar" ? "RTL" : "LTR"}</span></p>
          <p className="mb-4">Document Direction: <span className="font-mono bg-gray-800 px-2 py-1 rounded">{document.documentElement.dir}</span></p>
          
          <button
            onClick={() => switchLanguage(locale === "ar" ? "en" : "ar")}
            className="bg-[#B48500] hover:bg-[#8B6914] text-black px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Switch to {locale === "ar" ? "English" : "Arabic"}
          </button>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Translation Test</h2>
          <p className="mb-2">Testing `hero.title`: <span className="font-mono bg-gray-800 px-2 py-1 rounded">{t('hero.title')}</span></p>
          <p className="mb-2">Testing a nested key `nav.home`: <span className="font-mono bg-gray-800 px-2 py-1 rounded">{t('nav.home')}</span></p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Text Direction Test</h2>
          <p className="mb-4">This paragraph should be aligned to the {locale === "ar" ? "right" : "left"}.</p>
          <p>This is a longer paragraph to test text flow and direction. The text should flow properly based on the current language direction settings. In Arabic, it should flow from right to left, and in English, it should flow from left to right.</p>
        </div>
      </div>
    </div>
  );
}
