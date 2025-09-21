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
    // Additional translations for better coverage
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
    confirm: "تأكيد",
    back: "رجوع",
    next: "التالي",
    finish: "إنهاء",
    close: "إغلاق",
    open: "فتح",
    edit: "تعديل",
    delete: "حذف",
    view: "عرض",
    download: "تحميل",
    print: "طباعة",
    share: "مشاركة",
    search: "بحث",
    filter: "تصفية",
    sort: "ترتيب",
    language: "اللغة",
    settings: "الإعدادات",
    profile: "الملف الشخصي",
    help: "المساعدة",
    about: "حول",
    terms: "الشروط",
    privacy: "الخصوصية",
    support: "الدعم",
    feedback: "الملاحظات",
    version: "الإصدار",
    update: "تحديث",
    refresh: "تحديث الصفحة",
    retry: "إعادة المحاولة",
    continue: "متابعة",
    skip: "تخطي",
    select: "اختيار",
    unselect: "إلغاء الاختيار",
    selectAll: "اختيار الكل",
    unselectAll: "إلغاء اختيار الكل",
    today: "اليوم",
    yesterday: "أمس",
    tomorrow: "غداً",
    thisWeek: "هذا الأسبوع",
    thisMonth: "هذا الشهر",
    thisYear: "هذا العام",
    notifications: "التنبيهات",
    messages: "الرسائل",
    inbox: "صندوق الوارد",
    sent: "المرسل",
    draft: "المسودة",
    trash: "المحذوفات",
    archive: "الأرشيف",
    favorites: "المفضلة",
    recent: "الحديث",
    popular: "الشائع",
    recommended: "المقترح",
    trending: "الرائج",
    new: "جديد",
    updated: "محدث",
    featured: "مميز",
    premium: "مميز",
    free: "مجاني",
    paid: "مدفوع",
    trial: "تجريبي",
    expired: "منتهي الصلاحية",
    active: "نشط",
    inactive: "غير نشط",
    enabled: "مفعل",
    disabled: "معطل",
    online: "متصل",
    offline: "غير متصل",
    available: "متاح",
    unavailable: "غير متاح",
    busy: "مشغول",
    away: "غائب",
    invisible: "مخفي"
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
    // Additional translations for better coverage
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
    confirm: "Confirm",
    back: "Back",
    next: "Next",
    finish: "Finish",
    close: "Close",
    open: "Open",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    download: "Download",
    print: "Print",
    share: "Share",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    language: "Language",
    settings: "Settings",
    profile: "Profile",
    help: "Help",
    about: "About",
    terms: "Terms",
    privacy: "Privacy",
    support: "Support",
    feedback: "Feedback",
    version: "Version",
    update: "Update",
    refresh: "Refresh",
    retry: "Retry",
    continue: "Continue",
    skip: "Skip",
    select: "Select",
    unselect: "Unselect",
    selectAll: "Select All",
    unselectAll: "Unselect All",
    today: "Today",
    yesterday: "Yesterday",
    tomorrow: "Tomorrow",
    thisWeek: "This Week",
    thisMonth: "This Month",
    thisYear: "This Year",
    notifications: "Notifications",
    messages: "Messages",
    inbox: "Inbox",
    sent: "Sent",
    draft: "Draft",
    trash: "Trash",
    archive: "Archive",
    favorites: "Favorites",
    recent: "Recent",
    popular: "Popular",
    recommended: "Recommended",
    trending: "Trending",
    new: "New",
    updated: "Updated",
    featured: "Featured",
    premium: "Premium",
    free: "Free",
    paid: "Paid",
    trial: "Trial",
    expired: "Expired",
    active: "Active",
    inactive: "Inactive",
    enabled: "Enabled",
    disabled: "Disabled",
    online: "Online",
    offline: "Offline",
    available: "Available",
    unavailable: "Unavailable",
    busy: "Busy",
    away: "Away",
    invisible: "Invisible"
  },
}

export function LanguageSwitcher() {
  const [language, setLanguage] = useState<"ar" | "en">("ar")
  const router = useRouter()

  const updateContent = (lang: "ar" | "en") => {
    // Update all elements with data-translate attributes
    const elements = document.querySelectorAll("[data-translate]")
    elements.forEach((element) => {
      const key = element.getAttribute("data-translate")
      if (key && content[lang][key]) {
        element.textContent = content[lang][key]
      }
    })

    // Update placeholders for inputs
    const inputs = document.querySelectorAll("input[placeholder]")
    inputs.forEach((input) => {
      const htmlInput = input as HTMLInputElement
      const placeholderKey = htmlInput.getAttribute("data-placeholder-key")
      if (placeholderKey && content[lang][placeholderKey]) {
        htmlInput.placeholder = content[lang][placeholderKey]
      } else if (htmlInput.placeholder.includes("البحث") || htmlInput.placeholder.includes("Search")) {
        htmlInput.placeholder = content[lang].searchPlaceholder
      }
    })

    // Update page title
    document.title =
      lang === "ar"
        ? "FinClick.AI - منصة التحليل المالي الذكية"
        : "FinClick.AI - Intelligent Financial Analysis Platform"

    // Update specific elements by ID or data attributes
    const heroText2 = document.querySelector("[data-hero-text2]")
    if (heroText2) {
      heroText2.textContent = content[lang].heroText2
    }
    
    // Update button texts
    const buttons = document.querySelectorAll("button[data-translate], .btn[data-translate]")
    buttons.forEach((button) => {
      const key = button.getAttribute("data-translate")
      if (key && content[lang][key]) {
        button.textContent = content[lang][key]
      }
    })
    
    // Update navigation links
    const navLinks = document.querySelectorAll("nav a[data-translate], nav button[data-translate]")
    navLinks.forEach((link) => {
      const key = link.getAttribute("data-translate")
      if (key && content[lang][key]) {
        link.textContent = content[lang][key]
      }
    })
    
    // Apply page direction and styling changes
    applyLanguageChanges(lang)
  }
  
  const applyLanguageChanges = (lang: "ar" | "en") => {
    // Apply direction changes
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
    
    // Update body classes for language
    document.body.className = document.body.className.replace(/lang-(ar|en)/g, '')
    document.body.className += ` lang-${lang}`
    
    // Update HTML classes for RTL/LTR
    document.documentElement.className = document.documentElement.className.replace(/dir-(rtl|ltr)/g, '')
    document.documentElement.className += ` dir-${lang === "ar" ? "rtl" : "ltr"}`
    
    // Apply font changes based on language
    const fontClass = lang === "ar" ? "font-arabic" : "font-latin"
    document.body.className = document.body.className.replace(/font-(arabic|latin)/g, '')
    document.body.className += ` ${fontClass}`
    
    // Update CSS custom properties for direction-aware styling
    document.documentElement.style.setProperty('--text-align', lang === 'ar' ? 'right' : 'left')
    document.documentElement.style.setProperty('--flex-direction', lang === 'ar' ? 'row-reverse' : 'row')
    
    // NO MORE PAGE RELOAD - Apply changes immediately
    // Show language change notification
    const notification = document.createElement("div")
    notification.className = "fixed top-4 right-4 bg-[#B48500] text-black px-4 py-2 rounded-lg z-50 font-semibold transition-all duration-300 transform translate-x-0"
    notification.textContent = lang === "ar" ? "تم تغيير اللغة إلى العربية" : "Language changed to English"
    document.body.appendChild(notification)

    // Animate notification in
    setTimeout(() => {
      notification.style.transform = "translateX(-100%)"
    }, 100)

    // Remove notification
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        notification.remove()
      }, 300)
    }, 2000)
  }

  const toggleLanguage = () => {
    const newLang = language === "ar" ? "en" : "ar"
    
    // Update state immediately
    setLanguage(newLang)
    
    // Store language preference
    localStorage.setItem("preferred-language", newLang)
    
    // Update content immediately without page reload
    updateContent(newLang)
  }

  useEffect(() => {
    // Load saved language preference on mount
    const savedLang = localStorage.getItem("preferred-language") as "ar" | "en" | null
    if (savedLang && savedLang !== language) {
      setLanguage(savedLang)
    }
  }, [])

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
