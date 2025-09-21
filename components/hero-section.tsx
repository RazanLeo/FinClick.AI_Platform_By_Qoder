"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sparkles, CreditCard } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 min-h-screen flex items-center justify-center">
      {/* الخلفية الجديدة بدون شعار */}
      <div className="absolute inset-0">
        <Image
          src="/Hero_Section_Background_Add_Logo.jpg"
          alt="FinClick Hero Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* طبقة شفافة خفيفة */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
        
        {/* الشعار الأصلي بحجم متوسط */}
        <div className="mb-8">
          <Image
            src="/images/finclick-logo.png"
            alt="FinClick.AI Logo"
            width={120}
            height={120}
            className="mx-auto"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.8))',
              background: 'transparent'
            }}
          />
        </div>
        
        {/* المحتوى النصي تحت الشعار */}
        <div>
        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-[#B48500] mb-6 text-center">
          FinClick.AI
        </h1>
        
        {/* Arabic subtitle */}
        <p className="text-xl md:text-2xl text-[#B48500] mb-6 font-semibold text-center">
          منصة التحليل المالي الذكية الثورية
        </p>
        
        {/* English subtitle */}
        <p className="text-lg md:text-xl text-[#B48500] mb-8 text-center">
          Revolutionary Intelligent Financial Analysis Platform
        </p>
        
        {/* Description */}
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <p className="text-base text-[#B48500] mb-4 leading-relaxed">
            ثورة ونقلة نوعية في عالم التحليل المالي - نظام يقلب الدنيا رأساً على عقب ويقلب كل الموازين
          </p>
          <p className="text-base text-[#B48500] leading-relaxed">
            تقديم 180+ نوع تحليل مالي كمي بالذكاء الاصطناعي في ثوانٍ معدودة
          </p>
        </div>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg"
            className="bg-[#B48500] text-black hover:bg-[#FFD700] text-lg px-8 py-3"
            onClick={() => window.location.href = '/dashboard'}
          >
            <Sparkles className="w-5 h-5 ml-2" />
            ابدأ التحليل الآن
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="bg-transparent border-2 border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black text-lg px-8 py-3"
          >
            <CreditCard className="w-5 h-5 ml-2" />
            اشترك الآن
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="text-center p-6 rounded-lg border border-[#B48500]/20">
            <div className="text-4xl font-bold text-[#B48500] mb-2">180+</div>
            <div className="text-[#B48500]">نوع تحليل مالي</div>
          </div>
          <div className="text-center p-6 rounded-lg border border-[#B48500]/20">
            <div className="text-4xl font-bold text-[#B48500] mb-2">99%</div>
            <div className="text-[#B48500]">دقة التحليل</div>
          </div>
          <div className="text-center p-6 rounded-lg border border-[#B48500]/20">
            <div className="text-4xl font-bold text-[#B48500] mb-2">3</div>
            <div className="text-[#B48500]">خطوات بسيطة</div>
          </div>
        </div>
        </div>
        </div>
      </div>
    </section>
  )
}
