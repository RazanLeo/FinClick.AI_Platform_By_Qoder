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
        <div className="text-center">
          <Badge className="bg-[#B48500] text-black text-lg px-6 py-2">قريباً</Badge>
        </div>
      </div>
    </section>
  )
}
