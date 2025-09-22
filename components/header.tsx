"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/components/auth/auth-provider"
import {
  Search,
  Bell,
  Home,
  BarChart3,
  Building,
  TrendingUp,
  Star,
  CreditCard,
  PlayCircle,
  Phone,
  ChevronUp,
  ChevronDown,
  Globe,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { usePathname } from 'next/navigation'

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const { user, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const pathname = usePathname()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const searchTerm = searchQuery.toLowerCase()
      
      // Navigate to home page first if not already there
      if (typeof window !== 'undefined' && !pathname.startsWith("/")) {
        router.push("/")
        // Wait for navigation to complete before scrolling
        setTimeout(() => {
          performSearch(searchTerm)
        }, 500)
      } else {
        performSearch(searchTerm)
      }
      
      setSearchQuery("") // Clear search after use
    }
  }
  
  const performSearch = (searchTerm: string) => {
    // Enhanced search functionality with better matching
    const term = searchTerm.toLowerCase().trim()
    
    // Search mappings for Arabic and English terms
    const searchMappings = {
      // Analysis related
      "تحليل": "analysis-types",
      "analysis": "analysis-types",
      "أنواع": "analysis-types",
      "types": "analysis-types",
      "مالي": "analysis-types",
      "financial": "analysis-types",
      
      // Features related
      "مميزات": "features",
      "features": "features",
      "خصائص": "features",
      "benefits": "features",
      "فوائد": "features",
      
      // Pricing related
      "أسعار": "pricing",
      "pricing": "pricing",
      "اشتراك": "pricing",
      "subscription": "pricing",
      "خطة": "pricing",
      "plan": "pricing",
      "دفع": "pricing",
      "payment": "pricing",
      
      // Company related
      "شركة": "company-modal",
      "company": "company-modal",
      "عنا": "company-modal",
      "about": "company-modal",
      "معلومات": "company-modal",
      "info": "company-modal",
      
      // Steps related
      "خطوات": "steps",
      "steps": "steps",
      "طريقة": "steps",
      "how": "steps",
      "كيف": "steps",
      "method": "steps",
      
      // Tools related
      "أدوات": "free-tools",
      "tools": "free-tools",
      "مجاني": "free-tools",
      "free": "free-tools",
      "حاسبة": "free-tools",
      "calculator": "free-tools",
      "تقويم": "free-tools",
      "calendar": "free-tools",
      "أخبار": "free-tools",
      "news": "free-tools",
      "مزاج": "free-tools",
      "sentiment": "free-tools",
      "بوت": "free-tools",
      "bot": "free-tools",
      "gpt": "free-tools",
      
      // Contact related
      "تواصل": "contact",
      "contact": "contact",
      "دعم": "contact",
      "support": "contact",
      "مساعدة": "contact",
      "help": "contact",
      
      // Dashboard related
      "لوحة": "dashboard",
      "dashboard": "dashboard",
      "تحكم": "dashboard",
      "control": "dashboard",
      
      // Home related
      "رئيسي": "hero",
      "home": "hero",
      "صفحة": "hero",
      "page": "hero",
      "بداية": "hero",
      "start": "hero"
    }
    
    // Check for direct matches first
    for (const [keyword, sectionId] of Object.entries(searchMappings)) {
      if (term.includes(keyword)) {
        if (sectionId === "company-modal") {
          const modal = document.getElementById("company-modal")
          if (modal) {
            modal.style.display = "flex"
            return
          }
        } else if (sectionId === "dashboard") {
          router.push("/dashboard")
          return
        } else if (sectionId === "hero") {
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          return
        } else if (sectionId === "pricing") {
          const pricingSection = document.querySelector('[data-section="pricing"]')
          if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: "smooth" })
            return
          }
        } else if (sectionId === "free-tools") {
          const toolsSection = document.querySelector('[data-section="free-tools"]')
          if (toolsSection) {
            toolsSection.scrollIntoView({ behavior: "smooth" })
            return
          }
        } else {
          const element = document.getElementById(sectionId)
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
            return
          }
        }
      }
    }
    
    // If no direct match, try partial content search
    const contentSearch = [
      { keywords: ["الذكاء", "ai", "artificial", "اصطناعي"], target: "features" },
      { keywords: ["تقرير", "report", "نتائج", "results"], target: "features" },
      { keywords: ["سعر", "price", "تكلفة", "cost"], target: "pricing" },
      { keywords: ["مبتدئ", "beginner", "سهل", "easy"], target: "steps" },
      { keywords: ["قطاع", "sector", "صناعة", "industry"], target: "analysis-types" },
      { keywords: ["عميل", "client", "آراء", "testimonial"], target: "testimonials" }
    ]
    
    for (const search of contentSearch) {
      for (const keyword of search.keywords) {
        if (term.includes(keyword)) {
          const element = document.getElementById(search.target)
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
            return
          }
        }
      }
    }
    
    // Default to hero section if no match found
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: "smooth" })
      
      // Show "no results" message
      const notification = document.createElement("div")
      notification.className = "fixed top-4 left-1/2 transform -translate-x-1/2 bg-yellow-600 text-white px-4 py-2 rounded-lg z-50 font-semibold"
      notification.textContent = language === "ar" 
        ? "لم يتم العثور على نتائج. جرب البحث عن: تحليل، مميزات، أسعار، أدوات" 
        : "No results found. Try searching for: analysis, features, pricing, tools"
      document.body.appendChild(notification)
      
      setTimeout(() => {
        notification.remove()
      }, 4000)
    }
  }

  const goToHomePage = () => {
    if (typeof window !== 'undefined' && !pathname.startsWith("/")) {
      router.push("/")
    } else {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    }
  }

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "hero") {
      goToHomePage()
    } else if (sectionId === "pricing") {
      const pricingSection = document.querySelector('[data-section="pricing"]')
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: "smooth" })
      }
    } else if (sectionId === "free-tools") {
      const toolsSection = document.querySelector('[data-section="free-tools"]')
      if (toolsSection) {
        toolsSection.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    }
  }

  const toggleLanguage = () => {
    const newLang = language === "ar" ? "en" : "ar"
    setLanguage(newLang)
  }

  return (
    <header className="bg-black border-b border-[#B48500] sticky top-0 z-50" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        {/* Top Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src="/images/finclick-logo.png"
                alt="FinClick.AI Logo"
                width={60}
                height={60}
                className="cursor-pointer"
                onClick={goToHomePage}
              />
            </div>
            <div>
              <h1 
                className="text-2xl font-bold text-[#B48500] cursor-pointer" 
                onClick={goToHomePage}
              >
                FinClick.AI
              </h1>
              <p className="text-sm text-[#8B6914]">{t("hero.subtitle")}</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className={`absolute ${language === "ar" ? "left-3" : "right-3"} top-1/2 transform -translate-y-1/2 text-[#B48500] w-4 h-4`} />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === "ar" ? "البحث في المنصة..." : "Search platform..."}
                className={`bg-black border-[#B48500] text-[#B48500] placeholder:text-[#8B6914] ${language === "ar" ? "pl-10 text-right" : "pr-10 text-left"}`}
              />
            </form>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#B48500]/30 hover:border-[#B48500] bg-black/50 hover:bg-[#B48500]/10 transition-all duration-300"
            >
              <Globe className="w-4 h-4 text-[#B48500]" />
              <span className="text-[#B48500] font-medium">
                {language === "ar" ? "EN 🇺🇸" : "AR 🇸🇦"}
              </span>
            </button>
            <Button variant="ghost" size="sm" className="text-[#B48500] hover:bg-[#B48500] hover:text-black">
              <Bell className="w-4 h-4" />
            </Button>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-[#B48500]">
                  {language === "ar" ? "مرحباً،" : "Welcome,"} {user.name}
                </span>
                <Button
                  onClick={logout}
                  variant="outline"
                  className="bg-black border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black"
                >
                  {language === "ar" ? "تسجيل الخروج" : "Logout"}
                </Button>
              </div>
            ) : (
              <>
                <Link href="/auth?mode=register">
                  <Button
                    variant="outline"
                    className="bg-black border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black"
                  >
                    {language === "ar" ? "إنشاء حساب" : "Create Account"}
                  </Button>
                </Link>
                <Link href="/auth?mode=login">
                  <Button className="bg-[#B48500] text-black hover:bg-[#8B6914]">
                    {language === "ar" ? "تسجيل الدخول" : "Login"}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="border-t border-[#B48500] py-3">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-6 ${language === "ar" ? "flex-row-reverse" : "flex-row"}`}>
              <button
                onClick={goToHomePage}
                className="flex items-center gap-2 text-[#B48500] hover:text-[#8B6914] transition-colors"
              >
                <Home className="w-4 h-4" />
                {t("nav.home")}
              </button>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-[#B48500] hover:text-[#8B6914] transition-colors font-semibold"
              >
                <BarChart3 className="w-4 h-4" />
                {t("nav.dashboard")}
              </Link>
              <button
                onClick={() => {
                  const modal = document.getElementById("company-modal")
                  if (modal) modal.style.display = "flex"
                }}
                className="flex items-center gap-2 text-[#B48500] hover:text-[#8B6914] transition-colors"
              >
                <Building className="w-4 h-4" />
                {t("nav.company")}
              </button>
              <button
                onClick={() => scrollToSection("analysis-types")}
                className="flex items-center gap-2 text-[#B48500] hover:text-[#8B6914] transition-colors"
              >
                <TrendingUp className="w-4 h-4" />
                {t("nav.analysisTypes")}
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="flex items-center gap-2 text-[#B48500] hover:text-[#8B6914] transition-colors"
              >
                <Star className="w-4 h-4" />
                {t("nav.features")}
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="flex items-center gap-2 text-[#B48500] hover:text-[#8B6914] transition-colors"
              >
                <CreditCard className="w-4 h-4" />
                {t("nav.pricing")}
              </button>
              <button
                onClick={() => scrollToSection("steps")}
                className="flex items-center gap-2 text-[#B48500] hover:text-[#8B6914] transition-colors"
              >
                <PlayCircle className="w-4 h-4" />
                {t("nav.steps")}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="flex items-center gap-2 text-[#B48500] hover:text-[#8B6914] transition-colors"
              >
                <Phone className="w-4 h-4" />
                {t("nav.contact")}
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* No duplicate language switcher here */}
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}