"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useRouter } from "next/navigation"

interface LanguageContent {
  ar: {
    [key: string]: string
  }
  en: {
    [key: string]: string
  }
}

const content: LanguageContent = {
  ar: {
    platformName: "FinClick.AI",
    platformSubtitle: "منصة التحليل المالي الذكية الثورية",
    heroTitle: "FinClick.AI",
    heroSubtitle: "منصة التحليل المالي الذكية الثورية",
    heroDescription: "Revolutionary Intelligent Financial Analysis Platform",
    heroText1: "ثورة ونقلة نوعية في عالم التحليل المالي - نظام يقلب الدنيا رأساً على عقب ويقلب كل الموازين",
    heroText2: "تقديم 180+ نوع تحليل مالي كمي بالذكاء الاصطناعي في ثوانٍ معدودة",
    startAnalysis: "ابدأ التحليل الآن",
    subscribe: "اشترك الآن",
    analysisTypes: "نوع تحليل مالي",
    accuracy: "دقة التحليل",
    steps: "خطوات بسيطة",
    whyFinClick: "لماذا FinClick.AI",
    beneficiaries: "المستفيدون والأغراض",
    platformSteps: "خطوات المنصة",
    analysisTypesSection: "أنواع التحليل",
    freeTools: "الأدوات المجانية",
    testimonials: "ماذا يقول عملاؤنا",
    pricing: "الاشتراكات والأسعار",
    contact: "التواصل والدعم",
    home: "الصفحة الرئيسية",
    dashboard: "لوحة التحكم",
    company: "الشركة",
    features: "مميزات المنصة",
    searchPlaceholder: "البحث في المنصة...",
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    logout: "تسجيل الخروج",
    welcome: "مرحباً",
  },
  en: {
    platformName: "FinClick.AI",
    platformSubtitle: "Revolutionary Intelligent Financial Analysis Platform",
    heroTitle: "FinClick.AI",
    heroSubtitle: "Revolutionary Intelligent Financial Analysis Platform",
    heroDescription: "منصة التحليل المالي الذكية الثورية",
    heroText1:
      "A revolution and qualitative leap in the world of financial analysis - a system that turns the world upside down",
    heroText2: "Providing 180+ types of quantitative financial analysis with artificial intelligence in seconds",
    startAnalysis: "Start Analysis Now",
    subscribe: "Subscribe Now",
    analysisTypes: "Financial Analysis Types",
    accuracy: "Analysis Accuracy",
    steps: "Simple Steps",
    whyFinClick: "Why FinClick.AI",
    beneficiaries: "Beneficiaries and Purposes",
    platformSteps: "Platform Steps",
    analysisTypesSection: "Analysis Types",
    freeTools: "Free Tools",
    testimonials: "What Our Clients Say",
    pricing: "Subscriptions and Pricing",
    contact: "Contact and Support",
    home: "Home",
    dashboard: "Dashboard",
    company: "Company",
    features: "Platform Features",
    searchPlaceholder: "Search the platform...",
    login: "Login",
    register: "Sign Up",
    logout: "Logout",
    welcome: "Welcome",
  },
}

export function LanguageSwitcher() {
  const [language, setLanguage] = useState<"ar" | "en">("ar")
  const router = useRouter()

  const updateContent = (lang: "ar" | "en") => {
    const elements = document.querySelectorAll("[data-translate]")
    elements.forEach((element) => {
      const key = element.getAttribute("data-translate")
      if (key && content[lang][key]) {
        element.textContent = content[lang][key]
      }
    })

    // Update placeholders
    const inputs = document.querySelectorAll("input[placeholder]")
    inputs.forEach((input) => {
      const htmlInput = input as HTMLInputElement
      if (htmlInput.placeholder.includes("البحث") || htmlInput.placeholder.includes("Search")) {
        htmlInput.placeholder = content[lang].searchPlaceholder
      }
    })

    // Update page title
    document.title =
      lang === "ar"
        ? "FinClick.AI - منصة التحليل المالي الذكية"
        : "FinClick.AI - Intelligent Financial Analysis Platform"

    // Update all text content based on language
    const heroText2 = document.querySelector("[data-hero-text2]")
    if (heroText2) {
      heroText2.textContent = content[lang].heroText2
    }
    
    // Update page direction and styling
    applyLanguageChanges(lang)
  }
  
  const applyLanguageChanges = (lang: "ar" | "en") => {
    // Apply direction changes
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
    
    // Update body classes
    document.body.className = document.body.className.replace(/lang-(ar|en)/g, '')
    document.body.className += ` lang-${lang}`
    
    // Update HTML classes for RTL/LTR
    document.documentElement.className = document.documentElement.className.replace(/dir-(rtl|ltr)/g, '')
    document.documentElement.className += ` dir-${lang === "ar" ? "rtl" : "ltr"}`
    
    // Apply font changes based on language
    const fontClass = lang === "ar" ? "font-arabic" : "font-latin"
    document.body.className = document.body.className.replace(/font-(arabic|latin)/g, '')
    document.body.className += ` ${fontClass}`
    
    // Force re-render of flex directions and text alignments
    const flexElements = document.querySelectorAll('.flex, .grid')
    flexElements.forEach(el => {
      el.classList.remove('flex-row-reverse', 'flex-row')
      if (lang === 'ar') {
        el.classList.add('flex-row-reverse')
      } else {
        el.classList.add('flex-row')
      }
    })
    
    // Update text alignment classes
    const textElements = document.querySelectorAll('[class*="text-"]')
    textElements.forEach(el => {
      el.classList.remove('text-right', 'text-left')
      el.classList.add(lang === 'ar' ? 'text-right' : 'text-left')
    })
  }

  const toggleLanguage = () => {
    const newLang = language === "ar" ? "en" : "ar"
    setLanguage(newLang)

    // Store language preference
    localStorage.setItem("preferred-language", newLang)

    // Update content and apply changes
    updateContent(newLang)

    // Show language change notification
    const notification = document.createElement("div")
    notification.className = "fixed top-4 right-4 bg-[#B48500] text-black px-4 py-2 rounded-lg z-50 font-semibold transition-all duration-300"
    notification.textContent = newLang === "ar" ? "تم تغيير اللغة إلى العربية" : "Language changed to English"
    document.body.appendChild(notification)

    setTimeout(() => {
      notification.remove()
    }, 3000)

    // Apply immediate direction changes without reload
    setTimeout(() => {
      applyLanguageChanges(newLang)
    }, 100)
  }

  useEffect(() => {
    // Load saved language preference on mount
    const savedLang = localStorage.getItem("preferred-language") as "ar" | "en" | null
    if (savedLang && savedLang !== language) {
      setLanguage(savedLang)
      updateContent(savedLang)
    }
  }, [])
  
  useEffect(() => {
    // Apply language changes whenever language state changes
    applyLanguageChanges(language)
  }, [language])

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 bg-black border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black transition-all duration-300"
    >
      <Globe className="w-4 h-4" />
      {language === "ar" ? (
        <span className="flex items-center gap-1">🇸🇦 العربية</span>
      ) : (
        <span className="flex items-center gap-1">🇺🇸 English</span>
      )}
    </Button>
  )
}
