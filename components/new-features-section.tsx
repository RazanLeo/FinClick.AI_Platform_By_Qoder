"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import { 
  Zap, 
  Users, 
  Bot, 
  BarChart3, 
  Cloud, 
  Eye, 
  Clock, 
  Layers, 
  Target, 
  Shield, 
  TrendingUp, 
  FileText, 
  Globe, 
  Award,
  CheckCircle
} from "lucide-react"

const features = [
  {
    icon: Zap,
    titleAr: "ثورة ونقلة نوعية في عالم التحليل المالي",
    titleEn: "Revolution and paradigm shift in financial analysis",
    descriptionAr: "نظام يقلب الدنيا رأساً على عقب ويقلب كل الموازين. ثورة يعجز أمامها جميع متخصصين وخبراء التحليل المالي العالميين",
    descriptionEn: "A system that turns the world upside down and changes all the rules. A revolution that amazes all global financial analysis specialists and experts"
  },
  {
    icon: Users,
    titleAr: "يخدم كل مستفيدي التحليل المالي وكل أغراض التحليل المالي",
    titleEn: "Serves all financial analysis beneficiaries and all financial analysis purposes",
    descriptionAr: "أفراد، مؤسسات، شركات، منظمات - جميع من يحتاج للتحليل المالي",
    descriptionEn: "Individuals, institutions, companies, organizations - everyone who needs financial analysis"
  },
  {
    icon: Bot,
    titleAr: "يقوم على الذكاء الاصطناعي",
    titleEn: "Powered by Artificial Intelligence",
    descriptionAr: "تقنيات الذكاء الاصطناعي المتقدمة لتحليل دقيق وفوري",
    descriptionEn: "Advanced AI technologies for accurate and instant analysis"
  },
  {
    icon: BarChart3,
    titleAr: "يقدم جميع أنواع التحليل المالي الكمي المعروفة في العالم. ١٨٠+ تحليل مالي",
    titleEn: "Provides all quantitative financial analysis types known worldwide. 180+ financial analyses",
    descriptionAr: "مجموعة شاملة من التحليلات المالية من الأساسية إلى المتقدمة",
    descriptionEn: "Comprehensive collection of financial analyses from basic to advanced"
  },
  {
    icon: Cloud,
    titleAr: "بيئة سحابية تستطيع فتحه من أي مكان وفي أي وقت ومن أي متصفح وعلى أي جهاز",
    titleEn: "Cloud environment accessible from anywhere, anytime, any browser, any device",
    descriptionAr: "وصول سهل ومرن من جميع الأجهزة والمتصفحات",
    descriptionEn: "Easy and flexible access from all devices and browsers"
  },
  {
    icon: Eye,
    titleAr: "واجهة واضحة واحترافية وطريقة عرض للتحليلات تناسب الجميع",
    titleEn: "Clear professional interface with analysis presentation suitable for everyone",
    descriptionAr: "حتى لو لم تكن لديك معرفة أو خلفية مالية",
    descriptionEn: "Even if you don't have financial knowledge or background"
  },
  {
    icon: Clock,
    titleAr: "السرعة – أحصل على التحليل في ثواني معدودة بضغطة زر",
    titleEn: "Speed – Get analysis in seconds with one click",
    descriptionAr: "تحليل فوري بدون انتظار",
    descriptionEn: "Instant analysis without waiting"
  },
  {
    icon: Layers,
    titleAr: "السهولة – ٣ خطوات (أرفق قوائمك – حدد خيارات التحليل – اضغط زر التحليل)",
    titleEn: "Simplicity – 3 steps (Upload statements – Select analysis options – Click analyze)",
    descriptionAr: "عملية بسيطة ومباشرة للجميع",
    descriptionEn: "Simple and straightforward process for everyone"
  },
  {
    icon: Target,
    titleAr: "الدقة والكفاءة المتناهية (دقة بنسبة ٩٩٪)",
    titleEn: "Ultimate accuracy and efficiency (99% accuracy)",
    descriptionAr: "نتائج موثوقة ودقيقة للغاية",
    descriptionEn: "Reliable and highly accurate results"
  },
  {
    icon: Shield,
    titleAr: "أمان عالي",
    titleEn: "High Security",
    descriptionAr: "حماية شاملة لبياناتك المالية الحساسة",
    descriptionEn: "Comprehensive protection for your sensitive financial data"
  },
  {
    icon: TrendingUp,
    titleAr: "محلل مالي خارق يساعد كل شخص يتخذ القرارات المالية اللحظية",
    titleEn: "Super financial analyst helping everyone make instant financial decisions",
    descriptionAr: "مساعد ذكي لاتخاذ القرارات المالية الصحيحة",
    descriptionEn: "Smart assistant for making correct financial decisions"
  },
  {
    icon: FileText,
    titleAr: "تقارير تفصيلة وعروض تقديمية جاهزة للعرض والمناقشة والتسليم",
    titleEn: "Detailed reports and presentations ready for meetings and submission",
    descriptionAr: "مخرجات احترافية جاهزة للاستخدام المباشر",
    descriptionEn: "Professional outputs ready for direct use"
  },
  {
    icon: Globe,
    titleAr: "مقارنات معيارية ومقارنات متوسط الصناعة علي جميع المستويات الجغرافية",
    titleEn: "Benchmark comparisons and industry averages at all geographical levels",
    descriptionAr: "مقارنات شاملة على المستوى المحلي والإقليمي والعالمي",
    descriptionEn: "Comprehensive comparisons at local, regional, and global levels"
  },
  {
    icon: Award,
    titleAr: "جودة عالمية",
    titleEn: "Global Quality",
    descriptionAr: "معايير عالمية في التحليل والتقييم المالي",
    descriptionEn: "Global standards in financial analysis and evaluation"
  }
]

export function NewFeaturesSection() {
  const { language, t } = useLanguage()
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleFeatures(prev => [...prev, index])
          }
        })
      },
      { threshold: 0.1 }
    )

    const featureElements = document.querySelectorAll(".feature-card")
    featureElements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-black to-[#0a0a0a]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#B48500] mb-6">
            {t("whyFinClick")}
          </h2>
          <p className="text-xl text-[#8B6914] max-w-3xl mx-auto leading-relaxed">
            اكتشف مميزات منصة FinClick.AI الثورية التي تجعلها الخيار الأمثل لجميع احتياجات التحليل المالي
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isVisible = visibleFeatures.includes(index)
            
            return (
              <div
                key={index}
                data-index={index}
                className={`feature-card group relative p-6 rounded-xl border border-[#B48500]/20 bg-gradient-to-br from-black/50 to-[#1a1a1a]/50 hover:border-[#B48500]/60 hover:shadow-xl hover:shadow-[#B48500]/10 transition-all duration-500 transform hover:-translate-y-2 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#B48500]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#B48500] to-[#8B6914] mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-black" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#B48500] mb-4 leading-tight">
                    {language === "ar" ? feature.titleAr : feature.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="text-[#8B6914] text-sm leading-relaxed">
                    {language === "ar" ? feature.descriptionAr : feature.descriptionEn}
                  </p>

                  {/* Check Mark */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <CheckCircle className="w-5 h-5 text-[#B48500]" />
                  </div>
                </div>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-[#B48500] to-[#8B6914] opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                     style={{ 
                       mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                       maskComposite: "xor",
                       WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                       WebkitMaskComposite: "xor"
                     }} />
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#B48500]/10 to-[#8B6914]/10 border border-[#B48500]/30 rounded-full">
            <Award className="w-5 h-5 text-[#B48500]" />
            <span className="text-[#B48500] font-semibold">
              منصة تقدم خدمة يعجز أمامها جميع متخصصين وخبراء التحليل المالي العالميين
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}