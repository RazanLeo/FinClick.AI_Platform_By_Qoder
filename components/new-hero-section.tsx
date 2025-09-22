"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { ArrowDown, Sparkles, TrendingUp, BarChart3, Calculator } from "lucide-react"

export function NewHeroSection() {
  const { t } = useLanguage()
  const [animatedElements, setAnimatedElements] = useState(false)
  const [gridMatrix, setGridMatrix] = useState<Array<{ id: number; active: boolean; delay: number }>>([])

  useEffect(() => {
    // Initialize grid matrix animation
    const matrix = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      active: Math.random() > 0.7,
      delay: Math.random() * 2
    }))
    setGridMatrix(matrix)

    // Trigger animations
    const timer = setTimeout(() => setAnimatedElements(true), 500)
    
    // Update matrix periodically
    const matrixInterval = setInterval(() => {
      setGridMatrix(prev => 
        prev.map(item => ({
          ...item,
          active: Math.random() > 0.8,
          delay: Math.random() * 2
        }))
      )
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearInterval(matrixInterval)
    }
  }, [])

  const scrollToNextSection = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Animated Background Grid Matrix */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-10 gap-4 h-full w-full p-8">
          {gridMatrix.map((item) => (
            <div
              key={item.id}
              className={`relative transition-all duration-1000 ${
                item.active ? "bg-[#B48500]/30" : "bg-transparent"
              }`}
              style={{ 
                animationDelay: `${item.delay}s`,
                borderRadius: "4px"
              }}
            >
              {item.active && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#B48500]/40 to-[#8B6914]/20 animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Neural Network Lines */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B48500" />
              <stop offset="100%" stopColor="#8B6914" />
            </linearGradient>
          </defs>
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i}>
              <line
                x1={`${(i * 12.5)}%`}
                y1="0%"
                x2={`${100 - (i * 12.5)}%`}
                y2="100%"
                stroke="url(#lineGradient)"
                strokeWidth="1"
                opacity="0.3"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
              <line
                x1="0%"
                y1={`${(i * 12.5)}%`}
                x2="100%"
                y2={`${100 - (i * 12.5)}%`}
                stroke="url(#lineGradient)"
                strokeWidth="1"
                opacity="0.2"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Floating Financial Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[TrendingUp, BarChart3, Calculator, Sparkles].map((Icon, index) => (
          <Icon
            key={index}
            className={`absolute text-[#B48500]/20 transition-all duration-1000 ${
              animatedElements ? "animate-bounce" : "opacity-0"
            }`}
            size={32}
            style={{
              top: `${20 + (index * 20)}%`,
              left: `${10 + (index * 20)}%`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: `${3 + index}s`
            }}
          />
        ))}
        {[TrendingUp, BarChart3, Calculator, Sparkles].map((Icon, index) => (
          <Icon
            key={`right-${index}`}
            className={`absolute text-[#B48500]/20 transition-all duration-1000 ${
              animatedElements ? "animate-bounce" : "opacity-0"
            }`}
            size={24}
            style={{
              top: `${30 + (index * 15)}%`,
              right: `${5 + (index * 15)}%`,
              animationDelay: `${index * 0.7}s`,
              animationDuration: `${4 + index}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Logo Section */}
        <div className={`mb-8 transition-all duration-1000 ${
          animatedElements ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <div className="w-32 h-32 mx-auto mb-6 relative">
            {/* Main Logo Circle */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#B48500] to-[#8B6914] flex items-center justify-center relative overflow-hidden group">
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border-4 border-[#B48500]/30 animate-ping" />
              <div className="absolute inset-2 rounded-full border-2 border-[#B48500]/50 animate-pulse" />
              
              {/* Inner golden circle */}
              <div className="w-20 h-20 rounded-full border-4 border-black bg-[#B48500] relative flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#B48500] animate-pulse" />
                </div>
              </div>
              
              {/* Rotating outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#B48500]/40 animate-spin" style={{ animationDuration: "10s" }} />
            </div>
          </div>
        </div>

        {/* Platform Name */}
        <h1 className={`text-6xl md:text-8xl font-bold text-[#B48500] mb-4 transition-all duration-1000 ${
          animatedElements ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`} style={{ animationDelay: "0.2s" }}>
          {t("platformName")}
        </h1>

        {/* Platform Slogan */}
        <p className={`text-2xl md:text-3xl text-[#8B6914] mb-8 transition-all duration-1000 ${
          animatedElements ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`} style={{ animationDelay: "0.4s" }}>
          {t("platformSlogan")}
        </p>

        {/* Key Features */}
        <div className={`grid md:grid-cols-3 gap-6 mb-12 transition-all duration-1000 ${
          animatedElements ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`} style={{ animationDelay: "0.6s" }}>
          <div className="bg-gradient-to-br from-[#B48500]/10 to-[#8B6914]/5 border border-[#B48500]/20 rounded-xl p-6 hover:border-[#B48500]/40 transition-all duration-300 hover:scale-105">
            <BarChart3 className="w-12 h-12 text-[#B48500] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#B48500] mb-2">180+ تحليل مالي</h3>
            <p className="text-[#8B6914] text-sm">جميع أنواع التحليل المالي الكمي في العالم</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#B48500]/10 to-[#8B6914]/5 border border-[#B48500]/20 rounded-xl p-6 hover:border-[#B48500]/40 transition-all duration-300 hover:scale-105">
            <Sparkles className="w-12 h-12 text-[#B48500] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#B48500] mb-2">ذكاء اصطناعي</h3>
            <p className="text-[#8B6914] text-sm">تحليل فوري ودقيق بالذكاء الاصطناعي</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#B48500]/10 to-[#8B6914]/5 border border-[#B48500]/20 rounded-xl p-6 hover:border-[#B48500]/40 transition-all duration-300 hover:scale-105">
            <TrendingUp className="w-12 h-12 text-[#B48500] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#B48500] mb-2">تقارير احترافية</h3>
            <p className="text-[#8B6914] text-sm">تقارير وعروض تقديمية جاهزة للاستخدام</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-1000 ${
          animatedElements ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`} style={{ animationDelay: "0.8s" }}>
          <Button
            size="lg"
            className="bg-[#B48500] text-black hover:bg-[#8B6914] text-xl px-8 py-4 rounded-xl font-bold transform hover:scale-105 transition-all duration-300"
            onClick={() => document.getElementById("free-tools")?.scrollIntoView({ behavior: "smooth" })}
          >
            جرب الأدوات المجانية
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black text-xl px-8 py-4 rounded-xl font-bold transform hover:scale-105 transition-all duration-300"
            onClick={() => document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" })}
          >
            ابدأ التحليل المالي
          </Button>
        </div>

        {/* Scroll Down Indicator */}
        <div className={`transition-all duration-1000 ${
          animatedElements ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`} style={{ animationDelay: "1s" }}>
          <button
            onClick={scrollToNextSection}
            className="group flex flex-col items-center gap-2 text-[#8B6914] hover:text-[#B48500] transition-colors duration-300"
          >
            <span className="text-sm">اكتشف المزيد</span>
            <ArrowDown className="w-6 h-6 animate-bounce group-hover:animate-pulse" />
          </button>
        </div>
      </div>

      {/* Animated corner decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-[#B48500]/30 opacity-50" />
      <div className="absolute top-10 right-10 w-20 h-20 border-r-2 border-t-2 border-[#B48500]/30 opacity-50" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border-l-2 border-b-2 border-[#B48500]/30 opacity-50" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-[#B48500]/30 opacity-50" />
    </section>
  )
}