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
      {/* Clean Background without logo */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
          zIndex: 1
        }}
      />
      
      {/* Clean overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/50"
        style={{ zIndex: 2 }}
      />

      <div className="container mx-auto px-4 relative" style={{ zIndex: 10 }}>
        <div className="text-center max-w-4xl mx-auto">
          {/* Small FinClick Logo */}
          <div className="mb-8">
            <Image
              src="/images/finclick-logo.png"
              alt="FinClick.AI Logo"
              width={80}
              height={80}
              className="mx-auto finclick-logo"
            />
          </div>
          
          <div> {/* Content positioned below small logo */}
            <h1 className="text-5xl md:text-7xl font-bold text-[#B48500] mb-6">
              FinClick.AI
            </h1>

            <p className="text-xl md:text-2xl text-[#B48500] mb-6 font-semibold">
              منصة التحليل المالي الذكية الثورية
            </p>

            <p className="text-lg md:text-xl text-[#B48500] mb-8">
              Revolutionary Intelligent Financial Analysis Platform
            </p>

            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-base text-[#B48500] leading-relaxed mb-4">
                ثورة ونقلة نوعية في عالم التحليل المالي - نظام يقلب الدنيا رأساً على عقب ويقلب كل الموازين
              </p>
              <p className="text-base text-[#B48500] leading-relaxed">
                تقديم 180+ نوع تحليل مالي كمي بالذكاء الاصطناعي في ثوانٍ معدودة
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-[#B48500] text-black hover:bg-[#FFD700] text-lg px-8 py-3"
                onClick={() => {
                  window.location.href = '/dashboard'
                }}
              >
                <Sparkles className="w-5 h-5 ml-2" />
                ابدأ التحليل الآن
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black text-lg px-8 py-3"
                onClick={() => {
                  const pricingSection = document.querySelector('[data-section="pricing"]')
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                <CreditCard className="w-5 h-5 ml-2" />
                اشترك الآن
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
            <div className="text-center p-6 rounded-lg border border-[#B48500]/20">
              <div className="text-4xl font-bold text-[#B48500] mb-2">
                180+
              </div>
              <div className="text-[#B48500]">نوع تحليل مالي</div>
            </div>
            <div className="text-center p-6 rounded-lg border border-[#B48500]/20">
              <div className="text-4xl font-bold text-[#B48500] mb-2">
                99%
              </div>
              <div className="text-[#B48500]">دقة التحليل</div>
            </div>
            <div className="text-center p-6 rounded-lg border border-[#B48500]/20">
              <div className="text-4xl font-bold text-[#B48500] mb-2">
                3
              </div>
              <div className="text-[#B48500]">خطوات بسيطة</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
