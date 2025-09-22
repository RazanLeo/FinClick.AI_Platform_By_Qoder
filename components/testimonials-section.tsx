"use client"

import { Badge } from "@/components/ui/badge"

export function TestimonialsSection() {
  return (
    <section data-section="testimonials" className="py-20 bg-gradient-to-b from-black to-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#B48500] mb-6">آراء العملاء</h2>
          <p className="text-xl text-[#8B6914]">ماذا يقول عملاؤنا عن المنصة</p>
        </div>
        <div className="text-center">
          <Badge className="bg-[#B48500] text-black text-lg px-6 py-2">قريباً</Badge>
        </div>
      </div>
    </section>
  )
}
