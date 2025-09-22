"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/components/language-provider"
import { 
  Home, 
  LayoutDashboard, 
  Building2, 
  BarChart3, 
  Star, 
  CreditCard, 
  Route, 
  MessageCircle,
  Bell,
  UserPlus,
  LogIn,
  Search,
  ArrowUp,
  ArrowDown
} from "lucide-react"

export function NewHeader() {
  const { language, setLanguage, t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleLanguage = () => {
    const newLang = language === "ar" ? "en" : "ar"
    setLanguage(newLang)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Search functionality - scroll to relevant section
      const searchLower = searchQuery.toLowerCase()
      let targetSection = ""
      
      if (searchLower.includes("تحليل") || searchLower.includes("analysis")) {
        targetSection = "analysis-types"
      } else if (searchLower.includes("مميزات") || searchLower.includes("features")) {
        targetSection = "features"
      } else if (searchLower.includes("خطوات") || searchLower.includes("steps")) {
        targetSection = "steps"
      } else if (searchLower.includes("أسعار") || searchLower.includes("pricing")) {
        targetSection = "pricing"
      } else if (searchLower.includes("أدوات") || searchLower.includes("tools")) {
        targetSection = "free-tools"
      }
      
      if (targetSection) {
        document.getElementById(targetSection)?.scrollIntoView({ behavior: "smooth" })
      }
      setSearchQuery("")
    }
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-black/95 backdrop-blur-md border-b border-[#B48500]/20" 
        : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#B48500] to-[#8B6914] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <div className="w-8 h-8 rounded-full border-2 border-black bg-[#B48500] animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-[#B48500] group-hover:text-[#8B6914] transition-colors">
                {t("platformName")}
              </h1>
              <p className="text-xs text-[#8B6914] leading-tight">
                {t("platformSlogan")}
              </p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder={language === "ar" ? "البحث في المنصة..." : "Search platform..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/50 border-[#B48500]/30 text-[#B48500] placeholder:text-[#8B6914] focus:border-[#B48500] pr-10"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8B6914] hover:text-[#B48500] transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#B48500]/30 hover:border-[#B48500] bg-black/50 hover:bg-[#B48500]/10 transition-all duration-300"
          >
            <span className="text-[#B48500] font-medium">
              {language === "ar" ? "AR 🇸🇦" : "EN 🇺🇸"}
            </span>
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-[#B48500]/10 transition-colors">
            <Bell className="w-5 h-5 text-[#B48500]" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </button>

          {/* Navigation Menu - Desktop */}
          <nav className="hidden xl:flex items-center gap-1">
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#B48500] hover:bg-[#B48500]/10 transition-all duration-300"
            >
              <Home className="w-4 h-4" />
              <span>{t("home")}</span>
            </button>
            
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#B48500] hover:bg-[#B48500]/10 transition-all duration-300"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{t("dashboard")}</span>
            </Link>
            
            <button
              onClick={() => scrollToSection("beneficiaries")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#B48500] hover:bg-[#B48500]/10 transition-all duration-300"
            >
              <Building2 className="w-4 h-4" />
              <span>{t("company")}</span>
            </button>
            
            <button
              onClick={() => scrollToSection("analysis-types")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#B48500] hover:bg-[#B48500]/10 transition-all duration-300"
            >
              <BarChart3 className="w-4 h-4" />
              <span>{t("analysisTypes")}</span>
            </button>
            
            <button
              onClick={() => scrollToSection("features")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#B48500] hover:bg-[#B48500]/10 transition-all duration-300"
            >
              <Star className="w-4 h-4" />
              <span>{t("features")}</span>
            </button>
            
            <button
              onClick={() => scrollToSection("pricing")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#B48500] hover:bg-[#B48500]/10 transition-all duration-300"
            >
              <CreditCard className="w-4 h-4" />
              <span>{t("pricing")}</span>
            </button>
            
            <button
              onClick={() => scrollToSection("steps")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#B48500] hover:bg-[#B48500]/10 transition-all duration-300"
            >
              <Route className="w-4 h-4" />
              <span>{t("steps")}</span>
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              onClick={() => router.push("/auth?mode=register")}
              variant="outline"
              className="hidden sm:flex border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              {t("createAccount")}
            </Button>
            
            <Button
              onClick={() => router.push("/auth?mode=login")}
              className="bg-[#B48500] text-black hover:bg-[#8B6914]"
            >
              <LogIn className="w-4 h-4 mr-2" />
              {t("login")}
            </Button>
          </div>

          {/* Scroll Navigation Buttons */}
          <div className="hidden lg:flex flex-col gap-1 ml-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="p-1 rounded border border-[#B48500]/30 text-[#B48500] hover:bg-[#B48500]/10 transition-colors"
              title="أعلى الصفحة"
            >
              <ArrowUp className="w-3 h-3" />
            </button>
            <button
              onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })}
              className="p-1 rounded border border-[#B48500]/30 text-[#B48500] hover:bg-[#B48500]/10 transition-colors"
              title="أسفل الصفحة"
            >
              <ArrowDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}