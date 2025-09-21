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
    
    const userMessage = chatInputs.question
    setChatInputs(prev => ({
      ...prev,
      messages: [...prev.messages, { type: 'user', content: userMessage }],
      question: ''
    }))
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    let response = ''
    const question = userMessage.toLowerCase()
    
    if (question.includes('سهم') || question.includes('أسهم') || question.includes('stock')) {
      response = 'بناءً على تحليلي المتقدم للبيانات المالية، أنصح بدراسة المؤشرات المالية الأساسية مثل نسبة السعر للأرباح ونمو الإيرادات. كما يجب مراعاة الوضع الاقتصادي العام وقطاع الشركة قبل اتخاذ قرار الاستثمار. يمكنني تقديم تحليل شامل لأي سهم تريد دراسته.'
    } else if (question.includes('تحليل') || question.includes('تقييم') || question.includes('analysis')) {
      response = 'للحصول على تحليل شامل، أستخدم خوارزميات متطورة تدرس 180+ مؤشر مالي بما في ذلك التحليل الفني والأساسي. ننصح بالتركيز على القطاعات ذات النمو المستدام والشركات ذات الميزانيات القوية. منصة FinClick.AI تقدم تحليلاً شاملاً في ثوانٍ معدودة.'
    } else if (question.includes('استثمار') || question.includes('محفظة') || question.includes('investment')) {
      response = 'لبناء محفظة استثمارية متوازنة، أنصح بتنويع الاستثمارات عبر 3-5 قطاعات مختلفة. احرص على ألا تتجاوز استثماراتك في قطاع واحد 30% من إجمالي المحفظة، وراجع أداء المحفظة شهرياً. مع منصة FinClick.AI يمكنك مراقبة أداء محفظتك بشكل آني.'
    } else if (question.includes('مخاطر') || question.includes('خسارة') || question.includes('risk')) {
      response = 'إدارة المخاطر أساس الاستثمار الناجح. أنصح بوضع حد أقصى للخسارة (Stop Loss) عند 8-10% من قيمة الاستثمار، وتجنب الاستثمار بأموال قد تحتاجها خلال السنتين القادمتين. منصة FinClick.AI تقدم تقييماً شاملاً للمخاطر مع التوصيات.'
    } else if (question.includes('سوق') || question.includes('اقتصاد') || question.includes('market')) {
      response = 'الأسواق المالية متقلبة بطبيعتها. حالياً نشهد تحسناً في المؤشرات الاقتصادية مع نمو متوقع 4.2% للاقتصاد السعودي. أنصح بالتركيز على الشركات ذات النماذج التجارية المستدامة والنمو المتسق. مع منصة FinClick.AI يمكنك متابعة الاتجاهات في الوقت الحقيقي.'
    } else {
      response = 'شكراً لسؤالك. كمساعد مالي ذكي، أستطيع تقديم تحليلات مخصصة للأسهم ونصائح استثمارية مبنية على البيانات. لمساعدتك بشكل أفضل، يمكنك سؤالي عن تحليل سهم معين، أو استراتيجيات الاستثمار، أو إدارة المخاطر. للحصول على تحليل شامل وفوري، يمكنك استخدام منصة FinClick.AI الكاملة.'
    }
    
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
    }
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
    <section id="free-tools" data-section="free-tools" className="py-20 bg-gradient-to-b from-black to-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#B48500] mb-6">الأدوات المجانية</h2>
          <p className="text-xl text-[#8B6914] max-w-3xl mx-auto">
            مجموعة من الأدوات المالية المجانية لمساعدتك في اتخاذ قرارات مالية مدروسة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Economic Calendar */}
          <Card className="bg-black border-[#B48500] hover:border-[#8B6914] transition-colors">
            <CardHeader className="text-center">
              <Calendar className="w-12 h-12 text-[#B48500] mx-auto mb-2" />
              <CardTitle className="text-lg text-[#B48500]">التقويم الاقتصادي المباشر</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {economicEvents.map((event, index) => (
                  <div key={index} className="p-2 hover:bg-[#1a1a1a] rounded transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="text-[#B48500] font-bold">{event.time}</span>
                      <span className="text-[#8B6914]">{event.currency}</span>
                    </div>
                    <p className="text-[#B48500] text-sm">{event.event}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Financial News */}
          <Card className="bg-black border-[#B48500] hover:border-[#8B6914] transition-colors">
            <CardHeader className="text-center">
              <Newspaper className="w-12 h-12 text-[#B48500] mx-auto mb-2" />
              <CardTitle className="text-lg text-[#B48500]">الأخبار المالية العاجلة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {financialNews.map((news, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 hover:bg-[#1a1a1a] rounded transition-colors">
                    <div className="text-lg">{getNewsImpactIcon(news.impact)}</div>
                    <div>
                      <p className="text-sm text-[#B48500] leading-relaxed">{news.title}</p>
                      <p className="text-xs text-[#8B6914]">{news.time}</p>
                    </div>
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

              {selectedTool === "fair-price" && (
                <div className="space-y-3 p-4 border border-[#B48500] rounded">
                  <h4 className="text-[#B48500] font-semibold">حاسبة السعر العادل للسهم</h4>
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
                  <h4 className="text-[#B48500] font-semibold">حاسبة العائد على الاستثمار (ROI)</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Input 
                      placeholder="الاستثمار الأولي (ريال)" 
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
                    احسب العائد على الاستثمار
                  </Button>
                  {calculatorResults.roi && (
                    <div className="mt-3 p-3 bg-[#B48500]/10 rounded border border-[#B48500]">
                      <p className="text-[#B48500] font-semibold">
                        عائد الاستثمار: {calculatorResults.roi.percentage.toFixed(2)}%
                      </p>
                      <p className="text-[#8B6914]">
                        الربح: {calculatorResults.roi.profit.toFixed(2)} ريال
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
                  <h4 className="text-[#B48500] font-semibold">حاسبة نسبة السعر للأرباح (P/E Ratio)</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Input 
                      placeholder="سعر السهم (ريال)" 
                      className="bg-black border-[#B48500] text-[#B48500]"
                      value={calculatorInputs.peRatio.stockPrice}
                      onChange={(e) => setCalculatorInputs(prev => ({
                        ...prev,
                        peRatio: { ...prev.peRatio, stockPrice: e.target.value }
                      }))}
                    />
                    <Input 
                      placeholder="ربحية السهم (ريال)" 
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
                    احسب نسبة السعر للأرباح
                  </Button>
                  {calculatorResults.peRatio && (
                    <div className="mt-3 p-3 bg-[#B48500]/10 rounded border border-[#B48500]">
                      <p className="text-[#B48500] font-semibold">
                        نسبة P/E: {calculatorResults.peRatio.ratio.toFixed(2)}
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