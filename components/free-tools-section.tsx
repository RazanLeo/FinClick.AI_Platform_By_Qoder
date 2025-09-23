"use client"

import { Badge } from "@/components/ui/badge"

export function FreeToolsSection() {
  return (
    <section data-section="free-tools" className="py-20 bg-gradient-to-b from-[#0a0a0a] to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#B48500] mb-6">أدوات مجانية</h2>
          <p className="text-xl text-[#8B6914]">أدوات مساعدة مجانية للتحليل المالي</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-black/50 border border-[#B48500]/30 rounded-lg p-6 hover:border-[#B48500]/60 transition-all duration-300">
            <h3 className="text-2xl font-bold text-[#B48500] mb-4">حاسبة المالية الشخصية</h3>
            <p className="text-[#8B6914] mb-4">احسب حالتك المالية الشخصية بسهولة</p>
            <button className="bg-[#B48500] text-black px-4 py-2 rounded-lg hover:bg-[#8B6914] transition-colors">
              ابدأ الآن
            </button>
          </div>
          <div className="bg-black/50 border border-[#B48500]/30 rounded-lg p-6 hover:border-[#B48500]/60 transition-all duration-300">
            <h3 className="text-2xl font-bold text-[#B48500] mb-4">تقويم الاقتصاد العالمي</h3>
            <p className="text-[#8B6914] mb-4">تابع الأحداث الاقتصادية العالمية</p>
            <button className="bg-[#B48500] text-black px-4 py-2 rounded-lg hover:bg-[#8B6914] transition-colors">
              ابدأ الآن
            </button>
          </div>
          <div className="bg-black/50 border border-[#B48500]/30 rounded-lg p-6 hover:border-[#B48500]/60 transition-all duration-300">
            <h3 className="text-2xl font-bold text-[#B48500] mb-4">مزاج السوق</h3>
            <p className="text-[#8B6914] mb-4">تعرف على مزاج السوق المالي العالمي</p>
            <button className="bg-[#B48500] text-black px-4 py-2 rounded-lg hover:bg-[#8B6914] transition-colors">
              ابدأ الآن
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
