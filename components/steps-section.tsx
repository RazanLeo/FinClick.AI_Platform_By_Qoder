"use client"

export function StepsSection() {
  const steps = [
    { number: 1, title: "أرفق المستندات", description: "ارفع القوائم المالية بأي صيغة" },
    { number: 2, title: "حدد الخيارات", description: "اختر القطاع والنشاط ونوع المقارنة" },
    { number: 3, title: "احصل على النتائج", description: "تحليل شامل في ثوانٍ معدودة" },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#B48500] mb-6">كيف تعمل المنصة؟</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 bg-[#B48500] text-black rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-[#B48500] mb-2">{step.title}</h3>
              <p className="text-[#8B6914]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
