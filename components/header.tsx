"use client"

import type React from "react"
import Link from "next/link"
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
} from "lucide-react"

export function Header() {
  const locale = useLocale();
  const t = useTranslations();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const searchTerm = searchQuery.toLowerCase();
      
      if (typeof window !== 'undefined' && !pathname.startsWith("/")) {
        router.push("/");
        setTimeout(() => performSearch(searchTerm), 500);
      } else {
        performSearch(searchTerm);
      }
      
      setSearchQuery("");
    }
  };
  
  const performSearch = (searchTerm: string) => {
    const term = searchTerm.toLowerCase().trim();
    const searchMappings: { [key: string]: string } = {
      "تحليل": "analysis-types", "analysis": "analysis-types", "أنواع": "analysis-types", "types": "analysis-types",
      "مميزات": "features", "features": "features",
      "أسعار": "pricing", "pricing": "pricing", "اشتراك": "pricing", "subscription": "pricing",
      "شركة": "company-modal", "company": "company-modal", "عنا": "company-modal", "about": "company-modal",
      "خطوات": "steps", "steps": "steps",
      "أدوات": "free-tools", "tools": "free-tools",
      "تواصل": "contact", "contact": "contact",
      "لوحة": "dashboard", "dashboard": "dashboard",
      "رئيسي": "hero", "home": "hero",
    };

    for (const [keyword, sectionId] of Object.entries(searchMappings)) {
      if (term.includes(keyword)) {
        if (sectionId === "company-modal") {
          const modal = document.getElementById("company-modal");
          if (modal) modal.style.display = "flex";
          return;
        } else if (sectionId === "dashboard") {
          router.push("/dashboard");
          return;
        } else if (sectionId === "hero") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        } else {
          const element = document.getElementById(sectionId) ?? document.querySelector(`[data-section='${sectionId}']`);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            return;
          }
        }
      }
    }
    
    const notification = document.createElement("div");
    notification.className = "fixed top-4 left-1/2 transform -translate-x-1/2 bg-yellow-600 text-white px-4 py-2 rounded-lg z-50 font-semibold";
    notification.textContent = locale === "ar" 
      ? "لم يتم العثور على نتائج. جرب البحث عن: تحليل، مميزات، أسعار، أدوات" 
      : "No results found. Try searching for: analysis, features, pricing, tools";
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 4000);
  };

  const goToHomePage = () => {
    if (!pathname.startsWith("/")) {
      router.push("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId) ?? document.querySelector(`[data-section='${sectionId}']`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="bg-black border-b border-[#B48500] sticky top-0 z-50" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <img
              src="/images/finclick-logo.png"
              alt="FinClick.AI Logo"
              width={60}
              height={60}
              className="cursor-pointer"
              onClick={goToHomePage}
            />
            <div>
              <h1 className="text-2xl font-bold text-[#B48500] cursor-pointer" onClick={goToHomePage}>
                FinClick.AI
              </h1>
              <p className="text-sm text-[#8B6914]">{t("hero.subtitle")}</p>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className={`absolute ${locale === "ar" ? "left-3" : "right-3"} top-1/2 transform -translate-y-1/2 text-[#B48500] w-4 h-4`} />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('header.searchPlaceholder')}
                className={`bg-black border-[#B48500] text-[#B48500] placeholder:text-[#8B6914] ${locale === "ar" ? "pl-10 text-right" : "pr-10 text-left"}`}
              />
            </form>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-[#B48500] hover:bg-[#B48500] hover:text-black">
              <Bell className="w-4 h-4" />
            </Button>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-[#B48500]">{t('header.welcome', { name: user.name })}</span>
                <Button
                  onClick={logout}
                  variant="outline"
                  className="bg-black border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black"
                >
                  {t('header.logout')}
                </Button>
              </div>
            ) : (
              <>
                <Link href="/auth?mode=register">
                  <Button
                    variant="outline"
                    className="bg-black border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black"
                  >
                    {t('header.createAccount')}
                  </Button>
                </Link>
                <Link href="/auth?mode=login">
                  <Button className="bg-[#B48500] text-black hover:bg-[#8B6914]">
                    {t('header.login')}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        <nav className="border-t border-[#B48500] py-3">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-6 ${locale === "ar" ? "flex-row-reverse" : "flex-row"}`}>
              <button onClick={goToHomePage} className="flex items-center gap-2 text-[#B48500] hover:text-[#8B6914] transition-colors"><Home className="w-4 h-4" />{t("nav.home")}</button>
              <Link href="/dashboard" className="flex items-center gap-2 text-[#B48500] hover:text-[#8B6914] transition-colors font-semibold"><BarChart3 className="w-4 h-4" />{t("nav.dashboard")}</Link>
              <button onClick={() => { const modal = document.getElementById("company-modal"); if (modal) modal.style.display = "flex"; }} className="flex items-center gap-2 text-[#B48500] hover:text-[#8B6914] transition-colors"><Building className="w-4 h-4" />{t("nav.company")}</button>
              <button onClick={() => scrollToSection("analysis-types")} className="flex items-center gap-2 text-[#B48500] hover:text-[#8B6914] transition-colors"><TrendingUp className="w-4 h-4" />{t("nav.analysisTypes")}</button>
              <button onClick={() => scrollToSection("features")} className="flex items-center gap-2 text-[#B48500] hover:text-[#8B6914] transition-colors"><Star className="w-4 h-4" />{t("nav.features")}</button>
              <button onClick={() => scrollToSection("pricing")} className="flex items-center gap-2 text-[#B48500] hover:text-[#8B6914] transition-colors"><CreditCard className="w-4 h-4" />{t("nav.pricing")}</button>
              <button onClick={() => scrollToSection("steps")} className="flex items-center gap-2 text-[#B48500] hover:text-[#8B6914] transition-colors"><PlayCircle className="w-4 h-4" />{t("nav.steps")}</button>
              <button onClick={() => scrollToSection("contact")} className="flex items-center gap-2 text-[#B48500] hover:text-[#8B6914] transition-colors"><Phone className="w-4 h-4" />{t("nav.contact")}</button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
