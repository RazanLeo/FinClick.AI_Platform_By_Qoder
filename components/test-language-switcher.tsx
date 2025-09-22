"use client"

import { useLanguage } from "@/components/language-provider"

export function TestLanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  
  const toggleLanguage = () => {
    const newLang = language === "ar" ? "en" : "ar"
    setLanguage(newLang)
  }
  
  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#B48500]/30 hover:border-[#B48500] bg-black/50 hover:bg-[#B48500]/10 transition-all duration-300 z-50"
    >
      <span className="text-[#B48500] font-medium">
        {language === "ar" ? "AR 🇸🇦" : "EN 🇺🇸"}
      </span>
    </button>
  )
}