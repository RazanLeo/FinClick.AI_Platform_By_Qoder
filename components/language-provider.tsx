"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { usePathname, useRouter } from 'next/navigation'

type Language = "ar" | "en"
type Direction = "rtl" | "ltr"

interface LanguageContextType {
  language: Language
  direction: Direction
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
  locale: string
}

export function LanguageProvider({ children, locale }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(locale as Language || "ar")
  const [direction, setDirection] = useState<Direction>(locale === "ar" ? "rtl" : "ltr")
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Update language state when locale changes
    if (locale) {
      setLanguageState(locale as Language)
      setDirection(locale === "ar" ? "rtl" : "ltr")
      
      // Apply document direction
      if (typeof document !== 'undefined') {
        document.documentElement.dir = locale === "ar" ? "rtl" : "ltr"
        document.documentElement.lang = locale
      }
    }
  }, [locale])

  const setLanguage = (lang: Language) => {
    // Save the new language preference
    localStorage.setItem("preferred-language", lang)
    
    // Update state
    setLanguageState(lang)
    setDirection(lang === "ar" ? "rtl" : "ltr")
    
    // Apply document direction
    if (typeof document !== 'undefined') {
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = lang
    }
    
    // Update URL with new locale
    const newPath = pathname.replace(/^\/(ar|en)/, `/${lang}`)
    router.push(newPath)
  }

  const t = (key: string): string => {
    // Simple translation function - in a real app this would use the actual translation files
    return key
  }

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      <div dir={direction} className={direction === "rtl" ? "rtl" : "ltr"}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}