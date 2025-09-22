"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

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
    upload: "رفع المستندات",
    analyze: "تحليل",
    reports: "التقارير",
    calculator: "حاسبة",
    economicCalendar: "التقويم الاقتصادي",
    news: "الأخبار",
    sentiment: "مزاج السوق",
    aiBot: "البوت الذكي",
    fairPrice: "السعر العادل",
    roi: "العائد على الاستثمار",
    peRatio: "نسبة السعر للأرباح",
    results: "النتائج",
    loading: "جاري التحميل...",
    error: "خطأ",
    success: "نجح",
    calculate: "احسب",
    send: "إرسال",
    reset: "إعادة تعيين",
    save: "حفظ",
    cancel: "إلغاء",
    language: "اللغة"
  },
  en: {
    platformName: "FinClick.AI",
    platformSubtitle: "Revolutionary Intelligent Financial Analysis Platform",
    heroTitle: "FinClick.AI",
    heroSubtitle: "Revolutionary Intelligent Financial Analysis Platform",
    heroDescription: "منصة التحليل المالي الذكية الثورية",
    heroText1: "A revolution and qualitative leap in the world of financial analysis - a system that turns the world upside down",
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
    upload: "Upload Documents",
    analyze: "Analyze",
    reports: "Reports",
    calculator: "Calculator",
    economicCalendar: "Economic Calendar",
    news: "News",
    sentiment: "Market Sentiment",
    aiBot: "AI Bot",
    fairPrice: "Fair Price",
    roi: "Return on Investment",
    peRatio: "Price-to-Earnings Ratio",
    results: "Results",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    calculate: "Calculate",
    send: "Send",
    reset: "Reset",
    save: "Save",
    cancel: "Cancel",
    language: "Language"
  },
}

export function LanguageSwitcher() {
  const [language, setLanguage] = useState<"ar" | "en">("ar")

  const updateContent = (lang: "ar" | "en") => {
    // Update page title
    document.title = lang === "ar"
      ? "FinClick.AI - منصة التحليل المالي الذكية"
      : "FinClick.AI - Intelligent Financial Analysis Platform"

    // Apply page direction and language changes
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
    
    // Add CSS classes for proper styling
    document.documentElement.className = document.documentElement.className.replace(/lang-(ar|en)/g, '')
    document.documentElement.className += ` lang-${lang}`

    // Update body for font and direction
    document.body.className = document.body.className.replace(/lang-(ar|en)/g, '')
    document.body.className += ` lang-${lang}`
    
    // Store language preference
    localStorage.setItem("preferred-language", lang)
    
    // Show notification
    // Remove any existing notifications first
    const existingNotifications = document.querySelectorAll('.language-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement("div")
    notification.className = "language-notification fixed top-20 right-4 bg-[#B48500] text-black px-4 py-2 rounded-lg z-[100] font-semibold transition-all duration-300"
    notification.textContent = lang === "ar" ? "تم تغيير اللغة إلى العربية" : "Language changed to English"
    document.body.appendChild(notification)

    // Remove notification after 2 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove()
      }
    }, 2000)
  }

  const toggleLanguage = () => {
    const newLang = language === "ar" ? "en" : "ar"
    setLanguage(newLang)
    updateContent(newLang)
  }

  useEffect(() => {
    // Load saved language preference on mount
    const savedLang = localStorage.getItem("preferred-language") as "ar" | "en" | null
    if (savedLang && savedLang !== language) {
      setLanguage(savedLang)
      updateContent(savedLang)
    } else {
      updateContent(language)
    }
  }, [])

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 bg-black border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black transition-all duration-300 min-w-[120px] z-50"
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
