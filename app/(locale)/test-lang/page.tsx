"use client"

import { useLanguage } from '@/components/language-provider'

export default function TestLangPage() {
  const { language, setLanguage } = useLanguage()
  
  return (
    <div className="min-h-screen bg-black text-[#B48500] flex flex-col items-center justify-center p-8" dir={language === "ar" ? "rtl" : "ltr"}>
      <h1 className="text-4xl font-bold mb-8">Test Language Page</h1>
      <p className="text-2xl mb-8">Current language: {language}</p>
      
      <div className="flex gap-4 mt-8">
        <button 
          onClick={() => setLanguage('ar')}
          className="px-6 py-3 bg-[#B48500] text-black rounded-lg font-semibold hover:bg-[#8B6914] transition-colors"
        >
          Arabic Version
        </button>
        <button 
          onClick={() => setLanguage('en')}
          className="px-6 py-3 bg-[#B48500] text-black rounded-lg font-semibold hover:bg-[#8B6914] transition-colors"
        >
          English Version
        </button>
      </div>
    </div>
  )
}