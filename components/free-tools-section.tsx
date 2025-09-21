"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Newspaper, Calculator, TrendingUp, MessageCircle, Smile, Meh, Frown } from "lucide-react"
import { toast } from "sonner"

interface EconomicEvent {
  time: string
  currency: string
  event: string
  importance: "high" | "medium" | "low"
  actual?: string
  forecast?: string
  previous?: string
  impact?: "positive" | "negative" | "neutral"
}

interface CalculatorInputs {
  fairPrice: {
    eps: string
    growthRate: string
  }
  roi: {
    initialInvestment: string
    currentValue: string
  }
  peRatio: {
    stockPrice: string
    eps: string
  }
}

interface ChatInputs {
  question: string
  messages: Array<{type: 'user' | 'bot', content: string}>
  isLoading: boolean
}

interface CalculatorResults {
  fairPrice?: {
    value: number
    recommendation: string
  }
  roi?: {
    percentage: number
    profit: number
    status: string
  }
  peRatio?: {
    ratio: number
    valuation: string
  }
}

export function FreeToolsSection() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [marketSentiment, setMarketSentiment] = useState(65)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'bot', message: string}>>([{
    type: 'bot',
    message: 'مرحباً! أنا مساعدك المالي الذكي. يمكنني مساعدتك في تحليل الأسهم وفهم المؤشرات الاقتصادية. كيف يمكنني مساعدتك اليوم؟'
  }])
  
  // Calculator states
  const [calculatorInputs, setCalculatorInputs] = useState<CalculatorInputs>({
    fairPrice: { eps: '', growthRate: '' },
    roi: { initialInvestment: '', currentValue: '' },
    peRatio: { stockPrice: '', eps: '' }
  })
  
  const [calculatorResults, setCalculatorResults] = useState<CalculatorResults>({})
  
  // Chat states with single welcome message
  const [chatInputs, setChatInputs] = useState<ChatInputs>({
    question: '',
    messages: [{
      type: 'bot',
      content: 'مرحباً! أنا مساعدك المالي الذكي. يمكنني مساعدتك في تحليل الأسهم وفهم المؤشرات الاقتصادية. كيف يمكنني مساعدتك اليوم؟'
    }],
    isLoading: false
  })
  
  // Calculator functions
  const calculateFairPrice = () => {
    const eps = parseFloat(calculatorInputs.fairPrice.eps)
    const growthRate = parseFloat(calculatorInputs.fairPrice.growthRate)
    
    if (isNaN(eps) || isNaN(growthRate)) {
      toast.error('يرجى إدخال قيم صحيحة')
      return
    }
    
    // Using PEG ratio method: Fair Price = EPS * (Growth Rate + 8)
    const fairPrice = eps * (growthRate + 8)
    const recommendation = growthRate > 15 ? 'شراء قوي' : growthRate > 10 ? 'شراء' : growthRate > 5 ? 'محايد' : 'بيع'
    
    setCalculatorResults(prev => ({
      ...prev,
      fairPrice: { value: fairPrice, recommendation }
    }))
    
    toast.success(`السعر العادل: ${fairPrice.toFixed(2)} ريال - ${recommendation}`)
  }
  
  const calculateROI = () => {
    const initial = parseFloat(calculatorInputs.roi.initialInvestment)
    const current = parseFloat(calculatorInputs.roi.currentValue)
    
    if (isNaN(initial) || isNaN(current) || initial <= 0) {
      toast.error('يرجى إدخال قيم صحيحة')
      return
    }
    
    const profit = current - initial
    const percentage = (profit / initial) * 100
    const status = percentage > 20 ? 'ممتاز' : percentage > 10 ? 'جيد' : percentage > 0 ? 'مقبول' : 'خسارة'
    
    setCalculatorResults(prev => ({
      ...prev,
      roi: { percentage, profit, status }
    }))
    
    toast.success(`عائد الاستثمار: ${percentage.toFixed(2)}% - ${status}`)
  }
  
  const calculatePERatio = () => {
    const price = parseFloat(calculatorInputs.peRatio.stockPrice)
    const eps = parseFloat(calculatorInputs.peRatio.eps)
    
    if (isNaN(price) || isNaN(eps) || eps <= 0) {
      toast.error('يرجى إدخال قيم صحيحة')
      return
    }
    
    const ratio = price / eps
    const valuation = ratio < 15 ? 'مقيم بأقل من قيمته' : ratio < 25 ? 'مقيم عادل' : 'مقيم بأعلى من قيمته'
    
    setCalculatorResults(prev => ({
      ...prev,
      peRatio: { ratio, valuation }
    }))
    
    toast.success(`نسبة السعر للأرباح: ${ratio.toFixed(2)} - ${valuation}`)
  }
  
  const handleChatSubmit = async () => {
    if (!chatInputs.question.trim()) return
    
    setChatInputs(prev => ({ ...prev, isLoading: true }))
    
    // Add user message
    const userMessage = chatInputs.question
    setChatInputs(prev => ({
      ...prev,
      messages: [...prev.messages, { type: 'user', content: userMessage }],
      question: ''
    }))
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Generate contextual AI response based on question content
    let response = ''
    const question = userMessage.toLowerCase()
    
    if (question.includes('سهم') || question.includes('أسهم') || question.includes('stock')) {
      response = 'بناءً على تحليلي المتقدم للبيانات المالية، أنصح بدراسة المؤشرات المالية الأساسية مثل نسبة السعر للأرباح ونمو الإيرادات. كما يجب مراعاة الوضع الاقتصادي العام وقطاع الشركة قبل اتخاذ قرار الاستثمار.'
    } else if (question.includes('تحليل') || question.includes('تقييم') || question.includes('analysis')) {
      response = 'للحصول على تحليل شامل، أستخدم خوارزميات متطورة تدرس 15+ مؤشر مالي بما في ذلك التحليل الفني والأساسي. ننصح بالتركيز على القطاعات ذات النمو المستدام والشركات ذات الميزانيات القوية.'
    } else if (question.includes('استثمار') || question.includes('محفظة') || question.includes('investment')) {
      response = 'لبناء محفظة استثمارية متوازنة، أنصح بتنويع الاستثمارات عبر 3-5 قطاعات مختلفة. احرص على ألا تتجاوز استثماراتك في قطاع واحد 30% من إجمالي المحفظة، وراجع أداء المحفظة شهرياً.'
    } else if (question.includes('مخاطر') || question.includes('خسارة') || question.includes('risk')) {
      response = 'إدارة المخاطر أساس الاستثمار الناجح. أنصح بوضع حد أقصى للخسارة (Stop Loss) عند 8-10% من قيمة الاستثمار، وتجنب الاستثمار بأموال قد تحتاجها خلال السنتين القادمتين.'
    } else if (question.includes('سوق') || question.includes('اقتصاد') || question.includes('market')) {
      response = 'الأسواق المالية متقلبة بطبيعتها. حالياً نشهد تحسناً في المؤشرات الاقتصادية مع نمو متوقع 4.2% للاقتصاد السعودي. أنصح بالتركيز على الشركات ذات النماذج التجارية المستدامة والنمو المتسق.'
    } else {
      response = 'شكراً لسؤالك. كمساعد مالي ذكي، أستطيع تقديم تحليلات مخصصة للأسهم ونصائح استثمارية مبنية على البيانات. لمساعدتك بشكل أفضل، يمكنك سؤالي عن تحليل سهم معين، أو استراتيجيات الاستثمار، أو إدارة المخاطر.'
    }
    
    // Add AI response
    setChatInputs(prev => ({
      ...prev,
      messages: [...prev.messages, { type: 'bot', content: response }],
      isLoading: false
    }))
    
    toast.success('تم إرسال الإجابة بنجاح')
  }
  const [economicEvents, setEconomicEvents] = useState<EconomicEvent[]>([
    {
      time: "15:30",
      currency: "USD",
      event: "مؤشر أسعار المستهلك الأمريكي (CPI)",
      importance: "high",
      actual: "3.2%",
      forecast: "3.1%",
      previous: "3.0%",
      impact: "positive",
    },
    {
      time: "14:00",
      currency: "SAR",
      event: "قرار البنك المركزي السعودي بشأن أسعار الفائدة",
      importance: "high",
      forecast: "5.50%",
      previous: "5.50%",
      impact: "neutral",
    },
    {
      time: "13:30",
      currency: "USD",
      event: "طلبات إعانة البطالة الأولية",
      importance: "medium",
      actual: "220K",
      forecast: "225K",
      previous: "218K",
      impact: "positive",
    },
    {
      time: "12:00",
      currency: "SAR",
      event: "بيانات التضخم السعودي",
      importance: "medium",
      actual: "2.1%",
      forecast: "2.0%",
      previous: "1.9%",
      impact: "negative",
    },
    {
      time: "11:00",
      currency: "EUR",
      event: "مؤشر مديري المشتريات الألماني للتصنيع",
      importance: "medium",
      actual: "45.2",
      forecast: "45.5",
      previous: "44.8",
      impact: "negative",
    },
    {
      time: "10:30",
      currency: "GBP",
      event: "مبيعات التجزئة البريطانية",
      importance: "low",
      actual: "0.3%",
      forecast: "0.2%",
      previous: "-0.1%",
      impact: "positive",
    },
    {
      time: "09:30",
      currency: "JPY",
      event: "مؤشر أسعار المنتجين الياباني",
      importance: "low",
      actual: "0.8%",
      forecast: "0.7%",
      previous: "0.6%",
      impact: "neutral",
    },
    {
      time: "08:00",
      currency: "CNY",
      event: "الناتج المحلي الإجمالي الصيني",
      importance: "high",
      actual: "5.2%",
      forecast: "5.0%",
      previous: "4.9%",
      impact: "positive",
    },
  ])

  const [financialNews, setFinancialNews] = useState([
    {
      title: "ارتفاع مؤشر تاسي بنسبة 2.5% في جلسة اليوم",
      time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
      impact: "positive",
    },
    {
      title: "أرامكو تعلن عن أرباح فصلية قياسية بقيمة 32.6 مليار ريال",
      time: new Date(Date.now() - 300000).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
      impact: "positive",
    },
    {
      title: "صندوق الاستثمارات العامة يستحوذ على حصة في شركة تقنية عالمية",
      time: new Date(Date.now() - 600000).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
      impact: "positive",
    },
    {
      title: "البنك المركزي السعودي يبقي على أسعار الفائدة دون تغيير",
      time: new Date(Date.now() - 900000).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
      impact: "neutral",
    },
    {
      title: "تحديث توقعات النمو الاقتصادي السعودي إلى 4.2%",
      time: new Date(Date.now() - 1200000).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
      impact: "positive",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      // Update current date and time
      setCurrentDate(new Date())

      // Simulate live market sentiment changes
      setMarketSentiment((prev) => {
        const change = (Math.random() - 0.5) * 3
        return Math.max(0, Math.min(100, prev + change))
      })

      // Simulate real-time economic data updates
      setEconomicEvents((prev) =>
        prev.map((event) => {
          if (event.actual && Math.random() < 0.3) {
            // 30% chance to update
            const baseValue = Number.parseFloat(event.actual.replace(/[^\d.-]/g, ""))
            const variation = (Math.random() - 0.5) * 0.2
            const newValue = (baseValue + variation).toFixed(1)

            return {
              ...event,
              actual: newValue + (event.actual.includes("%") ? "%" : event.actual.includes("K") ? "K" : ""),
              impact: Math.random() > 0.5 ? "positive" : "negative",
            }
          }
          return event
        }),
      )

      // Add new financial news occasionally
      if (Math.random() < 0.1) {
        // 10% chance to add news
        const newNews = [
          "تحديث: مؤشر السوق السعودي يسجل مستويات جديدة",
          "عاجل: إعلان نتائج مالية إيجابية لشركة كبرى",
          "البنوك السعودية تحقق أرباحاً قوية في الربع الحالي",
          "قطاع البتروكيماويات يشهد نمواً ملحوظاً",
          "استثمارات جديدة في قطاع التقنية المالية",
        ]

        setFinancialNews((prev) => [
          {
            title: newNews[Math.floor(Math.random() * newNews.length)],
            time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
            impact: Math.random() > 0.3 ? "positive" : "neutral",
          },
          ...prev.slice(0, 4), // Keep only 5 news items
        ])
      }
    }, 15000) // Update every 15 seconds

    return () => clearInterval(interval)
  }, [])

  const getSentimentIcon = (score: number) => {
    if (score >= 70) return <Smile className="w-8 h-8 text-green-500" />
    if (score >= 40) return <Meh className="w-8 h-8 text-yellow-500" />
    return <Frown className="w-8 h-8 text-red-500" />
  }

  const getSentimentColor = (score: number) => {
    if (score >= 70) return "bg-green-500"
    if (score >= 40) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getSentimentText = (score: number) => {
    if (score >= 70) return "متفائل"
    if (score >= 40) return "محايد"
    return "متشائم"
  }

  const getImpactColor = (impact?: string) => {
    switch (impact) {
      case "positive":
        return "text-green-400"
      case "negative":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getNewsImpactIcon = (impact: string) => {
    switch (impact) {
      case "positive":
        return "📈"
      case "negative":
        return "📉"
      default:
        return "📊"
    }
  }

  return (
    <section id="free-tools" className="py-20 bg-gradient-to-b from-black to-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#B48500] mb-6">الأدوات المجانية</h2>
          <p className="text-xl text-[#8B6914] max-w-3xl mx-auto">
            مجموعة من الأدوات المالية المجانية لمساعدتك في اتخاذ قرارات مالية مدروسة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Enhanced Economic Calendar */}
          <Card className="bg-black border-[#B48500] hover:border-[#8B6914] transition-colors">
            <CardHeader className="text-center">
              <Calendar className="w-12 h-12 text-[#B48500] mx-auto mb-2" />
              <CardTitle className="text-lg text-[#B48500]">التقويم الاقتصادي المباشر</CardTitle>
              <p className="text-sm text-[#8B6914]">
                {currentDate.toLocaleDateString("ar-SA", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {/* Header */}
                <div className="grid grid-cols-12 gap-1 text-xs font-semibold text-[#B48500] border-b border-[#B48500] pb-2 sticky top-0 bg-black">
                  <div className="col-span-2">الوقت</div>
                  <div className="col-span-1">العملة</div>
                  <div className="col-span-1">الأهمية</div>
                  <div className="col-span-4">الحدث الاقتصادي</div>
                  <div className="col-span-1">الفعلي</div>
                  <div className="col-span-1">المتوقع</div>
                  <div className="col-span-2">السابق</div>
                </div>

                {/* Events */}
                {economicEvents.map((event, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-1 text-xs text-[#8B6914] hover:bg-[#1a1a1a] p-2 rounded transition-colors"
                  >
                    <div className="col-span-2 text-[#B48500] font-mono font-bold">{event.time}</div>
                    <div className="col-span-1">
                      <span className="px-1 py-0.5 bg-[#B48500] text-black rounded text-xs font-bold">
                        {event.currency}
                      </span>
                    </div>
                    <div className="col-span-1">
                      <div className="flex">
                        {[1, 2, 3].map((level) => (
                          <div
                            key={level}
                            className={`w-1.5 h-1.5 mr-0.5 rounded-full ${
                              level <= (event.importance === "high" ? 3 : event.importance === "medium" ? 2 : 1)
                                ? "bg-red-500"
                                : "bg-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="col-span-4 text-[#B48500] text-xs leading-tight">{event.event}</div>
                    <div className={`col-span-1 font-bold ${getImpactColor(event.impact)}`}>{event.actual || "-"}</div>
                    <div className="col-span-1 text-yellow-400">{event.forecast || "-"}</div>
                    <div className="col-span-2 text-gray-400">{event.previous || "-"}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-[#8B6914] text-center border-t border-[#B48500] pt-2 flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                بيانات حية مباشرة • تحديث كل 15 ثانية
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Financial News */}
          <Card className="bg-black border-[#B48500] hover:border-[#8B6914] transition-colors">
            <CardHeader className="text-center">
              <Newspaper className="w-12 h-12 text-[#B48500] mx-auto mb-2" />
              <CardTitle className="text-lg text-[#B48500]">الأخبار المالية العاجلة</CardTitle>
              <p className="text-sm text-[#8B6914]">آخر التطورات في الأسواق المالية</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {financialNews.map((news, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 hover:bg-[#1a1a1a] rounded transition-colors border-l-2 border-[#B48500]"
                  >
                    <div className="text-lg flex-shrink-0 mt-1">{getNewsImpactIcon(news.impact)}</div>
                    <div className="flex-1">
                      <p className="text-sm text-[#B48500] leading-relaxed font-medium">{news.title}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <p className="text-xs text-[#8B6914]">{news.time}</p>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            news.impact === "positive"
                              ? "bg-green-900 text-green-300"
                              : news.impact === "negative"
                                ? "bg-red-900 text-red-300"
                                : "bg-gray-900 text-gray-300"
                          }`}
                        >
                          {news.impact === "positive" ? "إيجابي" : news.impact === "negative" ? "سلبي" : "محايد"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-[#8B6914] text-center border-t border-[#B48500] pt-2 flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                تحديث مباشر كل دقيقة
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Financial Calculators */}
          <Card className="bg-black border-[#B48500] hover:border-[#8B6914] transition-colors">
            <CardHeader className="text-center">
              <Calculator className="w-12 h-12 text-[#B48500] mx-auto mb-2" />
              <CardTitle className="text-lg text-[#B48500]">الحاسبات المالية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <button
                  className="border border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black bg-transparent p-2 rounded transition-colors"
                  onClick={() => setSelectedTool(selectedTool === "fair-price" ? null : "fair-price")}
                >
                  السعر العادل
                </button>
                <button
                  className="border border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black bg-transparent p-2 rounded transition-colors"
                  onClick={() => setSelectedTool(selectedTool === "roi" ? null : "roi")}
                >
                  العائد على الاستثمار
                </button>
                <button
                  className="border border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black bg-transparent p-2 rounded transition-colors"
                  onClick={() => setSelectedTool(selectedTool === "pe-ratio" ? null : "pe-ratio")}
                >
                  نسبة السعر للأرباح
                </button>
              </div>
              <div className="mt-4 text-center text-sm text-[#8B6914]">
                <p>جميع الحاسبات المالية مجانية لتجربة قدرات النظام</p>
              </div>

              {selectedTool === "fair-price" && (
                <div className="space-y-4 p-4 border border-[#B48500] rounded">
                  <h4 className="text-[#B48500] font-semibold">حاسبة السعر العادل للسهم</h4>
                  
                  {/* الطريقة الأولى: رمز الشركة */}
                  <div className="mb-4">
                    <h5 className="text-[#B48500] text-sm mb-2">الطريقة الأولى: إدخال رمز الشركة</h5>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="رمز الشركة (مثل: 2222)" 
                        className="bg-black border-[#B48500] text-[#B48500] flex-1"
                      />
                      <Button 
                        className="bg-[#B48500] text-black hover:bg-[#8B6914] px-6"
                        onClick={() => {
                          toast.success('تم جلب بيانات الشركة - ربحية السهم: 2.45 ريال')
                        }}
                      >
                        جلب البيانات
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-center text-[#8B6914] text-sm mb-4">أو</div>
                  
                  {/* الطريقة الثانية: إدخال يدوي */}
                  <div>
                    <h5 className="text-[#B48500] text-sm mb-2">الطريقة الثانية: إدخال يدوي</h5>
                    <div className="grid grid-cols-2 gap-2">
                      <Input 
                        placeholder="ربحية السهم (ريال)" 
                        className="bg-black border-[#B48500] text-[#B48500]"
                        value={calculatorInputs.fairPrice.eps}
                        onChange={(e) => setCalculatorInputs(prev => ({
                          ...prev,
                          fairPrice: { ...prev.fairPrice, eps: e.target.value }
                        }))}
                      />
                      <Input 
                        placeholder="معدل النمو المتوقع (%)" 
                        className="bg-black border-[#B48500] text-[#B48500]"
                        value={calculatorInputs.fairPrice.growthRate}
                        onChange={(e) => setCalculatorInputs(prev => ({
                          ...prev,
                          fairPrice: { ...prev.fairPrice, growthRate: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-[#B48500] text-black hover:bg-[#8B6914]"
                    onClick={calculateFairPrice}
                  >
                    احسب السعر العادل
                  </Button>
                  {calculatorResults.fairPrice && (
                    <div className="mt-3 p-3 bg-[#B48500]/10 rounded border border-[#B48500]">
                      <p className="text-[#B48500] font-semibold">
                        السعر العادل: {calculatorResults.fairPrice.value.toFixed(2)} ريال
                      </p>
                      <p className="text-[#8B6914]">
                        التوصية: {calculatorResults.fairPrice.recommendation}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {selectedTool === "roi" && (
                <div className="space-y-3 p-4 border border-[#B48500] rounded">
                  <h4 className="text-[#B48500] font-semibold">حاسبة العائد على الاستثمار</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Input 
                      placeholder="قيمة الاستثمار الأولي (ريال)" 
                      className="bg-black border-[#B48500] text-[#B48500]"
                      value={calculatorInputs.roi.initialInvestment}
                      onChange={(e) => setCalculatorInputs(prev => ({
                        ...prev,
                        roi: { ...prev.roi, initialInvestment: e.target.value }
                      }))}
                    />
                    <Input 
                      placeholder="القيمة الحالية (ريال)" 
                      className="bg-black border-[#B48500] text-[#B48500]"
                      value={calculatorInputs.roi.currentValue}
                      onChange={(e) => setCalculatorInputs(prev => ({
                        ...prev,
                        roi: { ...prev.roi, currentValue: e.target.value }
                      }))}
                    />
                  </div>
                  <Button 
                    className="w-full bg-[#B48500] text-black hover:bg-[#8B6914]"
                    onClick={calculateROI}
                  >
                    احسب العائد
                  </Button>
                  {calculatorResults.roi && (
                    <div className="mt-3 p-3 bg-[#B48500]/10 rounded border border-[#B48500]">
                      <p className="text-[#B48500] font-semibold">
                        نسبة العائد: {calculatorResults.roi.percentage.toFixed(2)}%
                      </p>
                      <p className="text-[#8B6914]">
                        الربح/الخسارة: {calculatorResults.roi.profit.toFixed(2)} ريال
                      </p>
                      <p className="text-[#8B6914]">
                        الحالة: {calculatorResults.roi.status}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {selectedTool === "pe-ratio" && (
                <div className="space-y-3 p-4 border border-[#B48500] rounded">
                  <h4 className="text-[#B48500] font-semibold">حاسبة نسبة السعر للأرباح</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Input 
                      placeholder="سعر السهم" 
                      className="bg-black border-[#B48500] text-[#B48500]"
                      value={calculatorInputs.peRatio.stockPrice}
                      onChange={(e) => setCalculatorInputs(prev => ({
                        ...prev,
                        peRatio: { ...prev.peRatio, stockPrice: e.target.value }
                      }))}
                    />
                    <Input 
                      placeholder="ربحية السهم" 
                      className="bg-black border-[#B48500] text-[#B48500]"
                      value={calculatorInputs.peRatio.eps}
                      onChange={(e) => setCalculatorInputs(prev => ({
                        ...prev,
                        peRatio: { ...prev.peRatio, eps: e.target.value }
                      }))}
                    />
                  </div>
                  <Button 
                    className="w-full bg-[#B48500] text-black hover:bg-[#8B6914]"
                    onClick={calculatePERatio}
                  >
                    احسب النسبة
                  </Button>
                  {calculatorResults.peRatio && (
                    <div className="mt-3 p-3 bg-[#B48500]/10 rounded border border-[#B48500]">
                      <p className="text-[#B48500] font-semibold">
                        نسبة السعر للأرباح: {calculatorResults.peRatio.ratio.toFixed(2)}
                      </p>
                      <p className="text-[#8B6914]">
                        التقييم: {calculatorResults.peRatio.valuation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Market Sentiment */}
          <Card className="bg-black border-[#B48500] hover:border-[#8B6914] transition-colors">
            <CardHeader className="text-center">
              <TrendingUp className="w-12 h-12 text-[#B48500] mx-auto mb-2" />
              <CardTitle className="text-lg text-[#B48500]">مؤشر مزاج السوق المباشر</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4">{getSentimentIcon(marketSentiment)}</div>
              <div className="relative w-full h-4 bg-gray-800 rounded-full mb-4">
                <div
                  className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ${getSentimentColor(marketSentiment)}`}
                  style={{ width: `${marketSentiment}%` }}
                ></div>
              </div>
              <div className="text-2xl font-bold text-[#B48500] mb-2">{Math.round(marketSentiment)}%</div>
              <div className="text-[#8B6914] mb-2">{getSentimentText(marketSentiment)}</div>
              <div className="text-xs text-[#8B6914] flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                تحديث مباشر كل 15 ثانية
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* AI Financial Bot */}
          <Card className="bg-black border-[#B48500] hover:border-[#8B6914] transition-colors">
            <CardHeader className="text-center">
              <MessageCircle className="w-12 h-12 text-[#B48500] mx-auto mb-2" />
              <CardTitle className="text-lg text-[#B48500]">المساعد المالي الذكي - GPT</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-[#1a1a1a] p-4 rounded-lg border-r-4 border-[#B48500]">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🤖</div>
                    <div>
                      <p className="text-sm text-[#B48500] font-medium mb-2">مرحباً! أنا مساعدك المالي الذكي</p>
                      <p className="text-sm text-[#8B6914]">
                        يمكنني مساعدتك في تحليل الأسهم، فهم المؤشرات الاقتصادية، وتقديم نصائح استثمارية مخصصة. اسألني أي
                        سؤال مالي وسأقدم لك إجابة مفصلة ومدعومة بالبيانات.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-lg border border-[#B48500]/20 min-h-[300px] max-h-[400px] overflow-y-auto">
                    {chatInputs.messages.map((message, index) => (
                      <div key={index} className={`mb-4 p-3 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-[#B48500]/20 ml-8' 
                          : 'bg-white/10 mr-8'
                      }`}>
                        <div className="text-xs text-[#B48500] mb-2 font-semibold">
                          {message.type === 'user' ? '👤 أنت' : '🤖 مساعد FinClick AI'}
                        </div>
                        <div className="text-white text-sm leading-relaxed">{message.content}</div>
                      </div>
                    ))}
                    {chatInputs.isLoading && (
                      <div className="bg-white/10 mr-8 p-3 rounded-lg animate-pulse">
                        <div className="text-xs text-[#B48500] mb-2 font-semibold">🤖 مساعد FinClick AI</div>
                        <div className="text-white text-sm">جاري كتابة الإجابة...</div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="مثال: ما رأيك في الاستثمار في أسهم التقنية حالياً؟"
                      className="bg-black border-[#B48500] text-[#B48500] flex-1"
                      value={chatInputs.question}
                      onChange={(e) => setChatInputs(prev => ({ ...prev, question: e.target.value }))}
                      onKeyPress={(e) => e.key === 'Enter' && !chatInputs.isLoading && handleChatSubmit()}
                      disabled={chatInputs.isLoading}
                    />
                    <Button 
                      className="bg-[#B48500] text-black hover:bg-[#8B6914] px-6"
                      onClick={handleChatSubmit}
                      disabled={chatInputs.isLoading}
                    >
                      {chatInputs.isLoading ? 'جاري الإرسال...' : 'إرسال'}
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-[#8B6914] text-center flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  مدعوم بأحدث تقنيات الذكاء الاصطناعي
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
