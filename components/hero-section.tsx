"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sparkles, CreditCard } from "lucide-react"
import { useState, useEffect } from "react"

export function HeroSection() {
  const [isLogoHovered, setIsLogoHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section 
      id="hero" 
      className="relative py-20 overflow-hidden min-h-screen flex items-center justify-center"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6))`
      }}
    >
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px) scale(1.05)`,
          transition: 'transform 0.1s ease-out',
          zIndex: 1
        }}
      >
        <Image
          src="/Hero_Section_Background.JPG"
          alt="FinClick.AI Hero Background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>
      
      {/* Interactive Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/70"
        style={{ zIndex: 2 }}
      />
      
      {/* Animated Golden Particles */}
      <div className="absolute inset-0" style={{ zIndex: 3 }}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#FFD700] rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              opacity: 0.3 + Math.random() * 0.4
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative" style={{ zIndex: 10 }}>
        <div className="text-center max-w-4xl mx-auto">
          {/* Remove the duplicate logo since the background already contains it */}
          
          <div className="mt-32"> {/* Add margin top to position text below background logo */}
            <h1 
              className="text-6xl md:text-8xl font-bold text-[#B48500] mb-6 transition-all duration-300 hover:text-[#FFD700] hover:drop-shadow-lg cursor-default"
              style={{
                textShadow: '0 0 20px rgba(180, 133, 0, 0.5)',
                animation: 'pulse-gold 2s ease-in-out infinite alternate'
              }}
            >
              FinClick.AI
            </h1>

            <p 
              className="text-2xl md:text-3xl text-[#B48500] mb-8 font-semibold transition-all duration-300 hover:text-[#FFD700] cursor-default"
              style={{
                textShadow: '0 0 15px rgba(180, 133, 0, 0.3)'
              }}
            >
              منصة التحليل المالي الذكية الثورية
            </p>

            <p 
              className="text-xl md:text-2xl text-[#B48500] mb-12 opacity-90 transition-all duration-300 hover:opacity-100 hover:text-[#FFD700] cursor-default"
              style={{
                textShadow: '0 0 10px rgba(180, 133, 0, 0.2)'
              }}
            >
              Revolutionary Intelligent Financial Analysis Platform
            </p>

            <div className="max-w-3xl mx-auto mb-12">
              <p 
                className="text-lg text-[#B48500] leading-relaxed mb-6 transition-all duration-300 hover:text-[#FFD700] cursor-default"
                style={{
                  textShadow: '0 0 8px rgba(180, 133, 0, 0.2)'
                }}
              >
                ثورة ونقلة نوعية في عالم التحليل المالي - نظام يقلب الدنيا رأساً على عقب ويقلب كل الموازين
              </p>
              <p 
                className="text-lg text-[#B48500] leading-relaxed transition-all duration-300 hover:text-[#FFD700] cursor-default" 
                data-hero-text2
                style={{
                  textShadow: '0 0 8px rgba(180, 133, 0, 0.2)'
                }}
              >
                تقديم 180+ نوع تحليل مالي كمي بالذكاء الاصطناعي في ثوانٍ معدودة
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-[#B48500] text-black hover:bg-[#FFD700] hover:scale-105 text-xl px-8 py-4 transition-all duration-300 transform hover:shadow-xl"
                style={{
                  boxShadow: '0 0 20px rgba(180, 133, 0, 0.3)',
                  border: '2px solid #B48500'
                }}
              >
                <Sparkles className="w-6 h-6 ml-2" />
                ابدأ التحليل الآن
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black hover:scale-105 text-xl px-8 py-4 transition-all duration-300 transform hover:shadow-xl"
                style={{
                  boxShadow: '0 0 15px rgba(180, 133, 0, 0.2)'
                }}
                onClick={() => {
                  const pricingSection = document.querySelector('[data-section="pricing"]')
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                <CreditCard className="w-6 h-6 ml-2" />
                اشترك الآن
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div 
              className="text-center p-6 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-black/30 cursor-default"
              style={{
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 215, 0, 0.2)'
              }}
            >
              <div 
                className="text-4xl font-bold text-[#FFD700] mb-2 transition-all duration-300 hover:text-white"
                style={{
                  textShadow: '0 0 15px rgba(255, 215, 0, 0.5)'
                }}
              >
                180+
              </div>
              <div className="text-[#FFD700] transition-all duration-300 hover:text-white">نوع تحليل مالي</div>
            </div>
            <div 
              className="text-center p-6 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-black/30 cursor-default"
              style={{
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 215, 0, 0.2)'
              }}
            >
              <div 
                className="text-4xl font-bold text-[#FFD700] mb-2 transition-all duration-300 hover:text-white"
                style={{
                  textShadow: '0 0 15px rgba(255, 215, 0, 0.5)'
                }}
              >
                99%
              </div>
              <div className="text-[#FFD700] transition-all duration-300 hover:text-white">دقة التحليل</div>
            </div>
            <div 
              className="text-center p-6 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-black/30 cursor-default"
              style={{
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 215, 0, 0.2)'
              }}
            >
              <div 
                className="text-4xl font-bold text-[#FFD700] mb-2 transition-all duration-300 hover:text-white"
                style={{
                  textShadow: '0 0 15px rgba(255, 215, 0, 0.5)'
                }}
              >
                3
              </div>
              <div className="text-[#FFD700] transition-all duration-300 hover:text-white">خطوات بسيطة</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
