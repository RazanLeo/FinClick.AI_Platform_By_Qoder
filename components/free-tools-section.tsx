"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Newspaper, Calculator, TrendingUp, MessageCircle, Smile, Meh, Frown } from "lucide-react"

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

export function FreeToolsSection() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [marketSentiment, setMarketSentiment] = useState(65)
  const [currentDate, setCurrentDate] = useState(new Date())
  
  // Calculator states with results display
  const [fairPriceInputs, setFairPriceInputs] = useState({ eps: '', growthRate: '' })
  const [fairPriceResult, setFairPriceResult] = useState<{value: number, recommendation: string} | null>(null)
  
  const [roiInputs, setRoiInputs] = useState({ initial: '', current: '' })
  const [roiResult, setRoiResult] = useState<{percentage: number, profit: number, status: string} | null>(null)
  
  const [peInputs, setPeInputs] = useState({ price: '', eps: '' })
  const [peResult, setPeResult] = useState<{ratio: number, valuation: string} | null>(null)
  
  // Chat states
  const [chatQuestion, setChatQuestion] = useState('')
  const [chatMessages, setChatMessages] = useState<Array<{type: 'user' | 'bot', content: string}>>([{
    type: 'bot',
    content: 'مرحباً! أنا مساعدك المالي الذكي. يمكنني مساعدتك في تحليل الأسهم وفهم المؤشرات الاقتصادية. كيف يمكنني مساعدتك اليوم؟'
  }])
  const [isLoading, setIsLoading] = useState(false)
  
  // Enhanced calculator functions with better display
  const calculateFairPrice = () => {
    const eps = parseFloat(fairPriceInputs.eps)
    const growthRate = parseFloat(fairPriceInputs.growthRate)
    
    if (isNaN(eps) || isNaN(growthRate)) {
      alert('يرجى إدخال قيم صحيحة')
      return
    }
    
    const fairPrice = eps * (growthRate + 8)
    const recommendation = growthRate > 15 ? 'شراء قوي' : growthRate > 10 ? 'شراء' : growthRate > 5 ? 'محايد' : 'بيع'
    
    setFairPriceResult({ value: fairPrice, recommendation })
  }
  
  const calculateROI = () => {
    const initial = parseFloat(roiInputs.initial)
    const current = parseFloat(roiInputs.current)
    
    if (isNaN(initial) || isNaN(current) || initial <= 0) {
      alert('يرجى إدخال قيم صحيحة')
      return
    }
    
    const profit = current - initial
    const percentage = (profit / initial) * 100
    const status = percentage > 20 ? 'ممتاز' : percentage > 10 ? 'جيد' : percentage > 0 ? 'مقبول' : 'خسارة'
    
    setRoiResult({ percentage, profit, status })
  }
  
  const calculatePERatio = () => {
    const price = parseFloat(peInputs.price)
    const eps = parseFloat(peInputs.eps)
    
    if (isNaN(price) || isNaN(eps) || eps <= 0) {
      alert('يرجى إدخال قيم صحيحة')
      return
    }
    
    const ratio = price / eps
    const valuation = ratio < 15 ? 'مقيم بأقل من قيمته' : ratio < 25 ? 'مقيم عادل' : 'مقيم بأعلى من قيمته'
    
    setPeResult({ ratio, valuation })
  }
  
  const handleChatSubmit = async () => {
    if (!chatQuestion.trim()) return
    
    setIsLoading(true)
    
    const userMessage = chatQuestion
    setChatMessages(prev => [...prev, { type: 'user', content: userMessage }])
    setChatQuestion('')
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    let response = 'شكراً لسؤالك. كمساعد مالي ذكي، أستطيع تقديم تحليلات مخصصة للأسهم ونصائح استثمارية مبنية على البيانات. للحصول على تحليل شامل وفوري، يمكنك استخدام منصة FinClick.AI الكاملة.'
    
    const question = userMessage.toLowerCase()
    
    if (question.includes('سهم') || question.includes('أسهم') || question.includes('stock')) {
      response = 'بناءً على تحليلي المتقدم للبيانات المالية، أنصح بدراسة المؤشرات المالية الأساسية مثل نسبة السعر للأرباح ونمو الإيرادات. كما يجب مراعاة الوضع الاقتصادي العام وقطاع الشركة قبل اتخاذ قرار الاستثمار.'
    } else if (question.includes('تحليل') || question.includes('تقييم') || question.includes('analysis')) {
      response = 'للحصول على تحليل شامل، أستخدم خوارزميات متطورة تدرس 180+ مؤشر مالي بما في ذلك التحليل الفني والأساسي. منصة FinClick.AI تقدم تحليلاً شاملاً في ثوانٍ معدودة.'
    } else if (question.includes('استثمار') || question.includes('محفظة') || question.includes('investment')) {
      response = 'لبناء محفظة استثمارية متوازنة، أنصح بتنويع الاستثمارات عبر 3-5 قطاعات مختلفة. احرص على ألا تتجاوز استثماراتك في قطاع واحد 30% من إجمالي المحفظة.'
    }
    
    setChatMessages(prev => [...prev, { type: 'bot', content: response }])
    setIsLoading(false)
  }

  const [economicEvents] = useState<EconomicEvent[]>([
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
      time: "13:15",
      currency: "EUR",
      event: "بيانات التضخم في منطقة اليورو",
      importance: "medium",
      actual: "2.1%",
      forecast: "2.0%",
      previous: "1.9%",
      impact: "positive",
    },
    {
      time: "12:00",
      currency: "GBP",
      event: "بيانات الناتج المحلي الإجمالي البريطاني",
      importance: "high",
      forecast: "0.3%",
      previous: "0.2%",
      impact: "neutral",
    },
    {
      time: "10:30",
      currency: "JPY",
      event: "مؤشر أسعار المنتجين الياباني",
      importance: "medium",
      actual: "1.8%",
      forecast: "1.5%",
      previous: "1.4%",
      impact: "positive",
    }
  ])

  const [financialNews] = useState([
    {
      title: "ارتفاع مؤشر تاسي بنسبة 2.5% في جلسة اليوم",
      time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
      impact: "positive",
      source: "السوق المالية السعودية"
    },
    {
      title: "أرامكو تعلن عن أرباح فصلية قياسية بقيمة 32.6 مليار ريال",
      time: new Date(Date.now() - 300000).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
      impact: "positive",
      source: "أرامكو"
    },
    {
      title: "البنك المركزي السعودي يحافظ على أسعار الفائدة عند 5.5%",
      time: new Date(Date.now() - 900000).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
      impact: "neutral",
      source: "بنك الرياض"
    },
    {
      title: "قطاع البتروكيماويات يقود مكاسب البورصة بنسبة 4.2%",
      time: new Date(Date.now() - 1800000).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
      impact: "positive",
      source: "بلومبيرغ"
    },
    {
      title: "مؤشرات قوية لقطاع العقارات والتطوير في الرياض",
      time: new Date(Date.now() - 2700000).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
      impact: "positive",
      source: "رويترز"
    }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date())
      setMarketSentiment((prev) => {
        const change = (Math.random() - 0.5) * 3
        return Math.max(0, Math.min(100, prev + change))
      })
    }, 15000)

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
    <section id="free-tools" data-section="free-tools" className="py-20 bg-gradient-to-b from-black to-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 data-translate="freeTools" className="text-5xl font-bold text-[#B48500] mb-6">الأدوات المجانية</h2>
          <p className="text-xl text-[#8B6914] max-w-3xl mx-auto">
            مجموعة من الأدوات المالية المجانية لمساعدتك في اتخاذ قرارات مالية مدروسة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Economic Calendar */}
          <Card className="bg-black border-[#B48500] hover:border-[#8B6914] transition-colors">
            <CardHeader className="text-center">
              <Calendar className="w-12 h-12 text-[#B48500] mx-auto mb-2" />
              <CardTitle data-translate="economicCalendar" className="text-lg text-[#B48500]">التقويم الاقتصادي المباشر</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {economicEvents.map((event, index) => (
                  <div key={index} className="p-3 hover:bg-[#1a1a1a] rounded transition-colors border-l-4 border-l-[#B48500]">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[#B48500] font-bold text-lg">{event.time}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          event.importance === 'high' ? 'bg-red-500/20 text-red-400' :
                          event.importance === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {event.importance === 'high' ? 'عالي' : event.importance === 'medium' ? 'متوسط' : 'منخفض'}
                        </span>
                      </div>
                      <span className="text-[#8B6914] font-semibold bg-[#B48500]/10 px-2 py-1 rounded">{event.currency}</span>
                    </div>
                    <p className="text-[#B48500] text-sm font-medium mb-2">{event.event}</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {event.actual && (
                        <div className="text-center">
                          <p className="text-[#8B6914]">فعلي</p>
                          <p className="text-[#B48500] font-semibold">{event.actual}</p>
                        </div>
                      )}
                      {event.forecast && (
                        <div className="text-center">
                          <p className="text-[#8B6914]">متوقع</p>
                          <p className="text-[#B48500] font-semibold">{event.forecast}</p>
                        </div>
                      )}
                      {event.previous && (
                        <div className="text-center">
                          <p className="text-[#8B6914]">سابق</p>
                          <p className="text-[#B48500] font-semibold">{event.previous}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Financial News */}
          <Card className="bg-black border-[#B48500] hover:border-[#8B6914] transition-colors">
            <CardHeader className="text-center">
              <Newspaper className="w-12 h-12 text-[#B48500] mx-auto mb-2" />
              <CardTitle data-translate="news" className="text-lg text-[#B48500]">الأخبار المالية العاجلة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {financialNews.map((news, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 hover:bg-[#1a1a1a] rounded transition-colors border border-[#B48500]/20">
                    <div className="text-2xl flex-shrink-0">{getNewsImpactIcon(news.impact)}</div>
                    <div className="flex-1">
                      <p className="text-sm text-[#B48500] leading-relaxed font-medium mb-2">{news.title}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-[#8B6914]">{news.time}</p>
                        <span className="text-xs text-[#8B6914] bg-[#B48500]/10 px-2 py-1 rounded">{news.source}</span>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${
                      news.impact === 'positive' ? 'bg-green-500' :
                      news.impact === 'negative' ? 'bg-red-500' :
                      'bg-yellow-500'
                    }`}></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Financial Calculators */}
          <Card className="bg-black border-[#B48500] hover:border-[#8B6914] transition-colors">
            <CardHeader className="text-center">
              <Calculator className="w-12 h-12 text-[#B48500] mx-auto mb-2" />
              <CardTitle data-translate="calculator" className="text-lg text-[#B48500]">الحاسبات المالية</CardTitle>
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

              {selectedTool === "fair-price" && (
                <div className="space-y-3 p-4 border border-[#B48500] rounded">
                  <h4 className="text-[#B48500] font-semibold">حاسبة السعر العادل للسهم</h4>
                  <div className="space-y-3">
                    <div className="text-sm text-[#8B6914] font-medium">الطريقة الأولى: نموذج PEG</div>
                    <div className="grid grid-cols-3 gap-2">
                      <Input 
                        placeholder="ربحية السهم (ريال)" 
                        className="bg-black border-[#B48500] text-[#B48500]"
                        value={fairPriceInputs.eps}
                        onChange={(e) => setFairPriceInputs(prev => ({ ...prev, eps: e.target.value }))}
                      />
                      <Input 
                        placeholder="معدل النمو المتوقع (%)" 
                        className="bg-black border-[#B48500] text-[#B48500]"
                        value={fairPriceInputs.growthRate}
                        onChange={(e) => setFairPriceInputs(prev => ({ ...prev, growthRate: e.target.value }))}
                      />
                      <Button 
                        className="bg-[#B48500] text-black hover:bg-[#8B6914]"
                        onClick={calculateFairPrice}
                      >
                        احسب PEG
                      </Button>
                    </div>
                    <div className="text-sm text-[#8B6914] font-medium">الطريقة الثانية: نموذج Gordon</div>
                    <div className="grid grid-cols-3 gap-2">
                      <Input 
                        placeholder="توزيعات الأرباح (ريال)" 
                        className="bg-black border-[#B48500] text-[#B48500]"
                      />
                      <Input 
                        placeholder="معدل العائد المطلوب (%)" 
                        className="bg-black border-[#B48500] text-[#B48500]"
                      />
                      <Button 
                        className="bg-[#B48500] text-black hover:bg-[#8B6914]"
                      >
                        احسب Gordon
                      </Button>
                    </div>
                  </div>
                  {fairPriceResult && (
                    <div className="mt-3 p-3 bg-[#B48500]/10 rounded border border-[#B48500]">
                      <p className="text-[#B48500] font-semibold text-lg">
                        السعر العادل: {fairPriceResult.value.toFixed(2)} ريال
                      </p>
                      <p className="text-[#8B6914] font-medium">
                        التوصية: {fairPriceResult.recommendation}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {selectedTool === "roi" && (
                <div className="space-y-3 p-4 border border-[#B48500] rounded">
                  <h4 className="text-[#B48500] font-semibold">حاسبة العائد على الاستثمار (ROI)</h4>
                  <div className="space-y-3">
                    <div className="text-sm text-[#8B6914] font-medium">الطريقة الأولى: ROI بسيط</div>
                    <div className="grid grid-cols-3 gap-2">
                      <Input 
                        placeholder="الاستثمار الأولي (ريال)" 
                        className="bg-black border-[#B48500] text-[#B48500]"
                        value={roiInputs.initial}
                        onChange={(e) => setRoiInputs(prev => ({ ...prev, initial: e.target.value }))}
                      />
                      <Input 
                        placeholder="القيمة الحالية (ريال)" 
                        className="bg-black border-[#B48500] text-[#B48500]"
                        value={roiInputs.current}
                        onChange={(e) => setRoiInputs(prev => ({ ...prev, current: e.target.value }))}
                      />
                      <Button 
                        className="bg-[#B48500] text-black hover:bg-[#8B6914]"
                        onClick={calculateROI}
                      >
                        احسب ROI
                      </Button>
                    </div>
                    <div className="text-sm text-[#8B6914] font-medium">الطريقة الثانية: ROI سنوي</div>
                    <div className="grid grid-cols-4 gap-2">
                      <Input 
                        placeholder="رأس المال" 
                        className="bg-black border-[#B48500] text-[#B48500]"
                      />
                      <Input 
                        placeholder="العائد السنوي" 
                        className="bg-black border-[#B48500] text-[#B48500]"
                      />
                      <Input 
                        placeholder="عدد السنوات" 
                        className="bg-black border-[#B48500] text-[#B48500]"
                      />
                      <Button 
                        className="bg-[#B48500] text-black hover:bg-[#8B6914]"
                      >
                        احسب سنوي
                      </Button>
                    </div>
                  </div>
                  {roiResult && (
                    <div className="mt-3 p-3 bg-[#B48500]/10 rounded border border-[#B48500]">
                      <p className="text-[#B48500] font-semibold text-lg">
                        عائد الاستثمار: {roiResult.percentage.toFixed(2)}%
                      </p>
                      <p className="text-[#8B6914] font-medium">
                        الربح: {roiResult.profit.toFixed(2)} ريال
                      </p>
                      <p className="text-[#8B6914] font-medium">
                        الحالة: {roiResult.status}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {selectedTool === "pe-ratio" && (
                <div className="space-y-3 p-4 border border-[#B48500] rounded">
                  <h4 className="text-[#B48500] font-semibold">حاسبة نسبة السعر للأرباح (P/E Ratio)</h4>
                  <div className="space-y-3">
                    <div className="text-sm text-[#8B6914] font-medium">الطريقة الأولى: P/E بسيط</div>
                    <div className="grid grid-cols-3 gap-2">
                      <Input 
                        placeholder="سعر السهم (ريال)" 
                        className="bg-black border-[#B48500] text-[#B48500]"
                        value={peInputs.price}
                        onChange={(e) => setPeInputs(prev => ({ ...prev, price: e.target.value }))}
                      />
                      <Input 
                        placeholder="ربحية السهم (ريال)" 
                        className="bg-black border-[#B48500] text-[#B48500]"
                        value={peInputs.eps}
                        onChange={(e) => setPeInputs(prev => ({ ...prev, eps: e.target.value }))}
                      />
                      <Button 
                        className="bg-[#B48500] text-black hover:bg-[#8B6914]"
                        onClick={calculatePERatio}
                      >
                        احسب P/E
                      </Button>
                    </div>
                    <div className="text-sm text-[#8B6914] font-medium">الطريقة الثانية: PEG Ratio</div>
                    <div className="grid grid-cols-4 gap-2">
                      <Input 
                        placeholder="سعر السهم" 
                        className="bg-black border-[#B48500] text-[#B48500]"
                      />
                      <Input 
                        placeholder="ربحية السهم" 
                        className="bg-black border-[#B48500] text-[#B48500]"
                      />
                      <Input 
                        placeholder="نمو الأرباح (%)" 
                        className="bg-black border-[#B48500] text-[#B48500]"
                      />
                      <Button 
                        className="bg-[#B48500] text-black hover:bg-[#8B6914]"
                      >
                        احسب PEG
                      </Button>
                    </div>
                  </div>
                  {peResult && (
                    <div className="mt-3 p-3 bg-[#B48500]/10 rounded border border-[#B48500]">
                      <p className="text-[#B48500] font-semibold text-lg">
                        نسبة P/E: {peResult.ratio.toFixed(2)}
                      </p>
                      <p className="text-[#8B6914] font-medium">
                        التقييم: {peResult.valuation}
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
              <CardTitle data-translate="sentiment" className="text-lg text-[#B48500]">مؤشر مزاج السوق المباشر</CardTitle>
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
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* AI Financial Bot */}
          <Card className="bg-black border-[#B48500] hover:border-[#8B6914] transition-colors">
            <CardHeader className="text-center">
              <MessageCircle className="w-12 h-12 text-[#B48500] mx-auto mb-2" />
              <CardTitle data-translate="aiBot" className="text-lg text-[#B48500]">المساعد المالي الذكي - GPT</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-white/5 p-4 rounded-lg border border-[#B48500]/20 min-h-[300px] max-h-[400px] overflow-y-auto">
                  {chatMessages.map((message, index) => (
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
                  {isLoading && (
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
                    value={chatQuestion}
                    onChange={(e) => setChatQuestion(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleChatSubmit()}
                    disabled={isLoading}
                  />
                  <Button 
                    className="bg-[#B48500] text-black hover:bg-[#8B6914] px-6"
                    onClick={handleChatSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? 'جاري الإرسال...' : 'إرسال'}
                  </Button>
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