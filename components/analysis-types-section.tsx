"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, PieChart, LineChart } from "lucide-react"

const analysisTypes = [
  {
    title: "التحليل الأساسي الكلاسيكي",
    count: 106,
    icon: BarChart3,
  },
  {
    title: "التحليل التطبيقي المتوسط",
    count: 21,
    icon: PieChart,
  },
  {
    title: "التحليل المتقدم والمتطور",
    count: 53,
    icon: LineChart,
  },
]

export function AnalysisTypesSection() {
  return (
    <section id="analysis-types" className="py-20 bg-gradient-to-b from-black to-[#0a0a0a] scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#B48500] mb-6">أنواع التحليل المالي</h2>
          <p className="text-xl text-[#8B6914]">180+ نوع تحليل مالي شامل ومتطور</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {analysisTypes.map((type, index) => (
            <Card key={index} className="bg-black border-[#B48500] text-center p-8">
              <CardContent>
                <type.icon className="w-16 h-16 text-[#B48500] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#B48500] mb-2">{type.title}</h3>
                <div className="text-4xl font-bold text-[#8B6914] mb-2">{type.count}</div>
                <p className="text-[#8B6914]">نوع تحليل</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}