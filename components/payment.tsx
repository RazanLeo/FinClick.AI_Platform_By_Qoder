"use client"

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { 
  CreditCard, 
  Check, 
  Star, 
  Users, 
  BarChart3, 
  FileText, 
  Shield, 
  AlertTriangle,
  Crown
} from "lucide-react"

interface SubscriptionPlan {
  id: string
  nameAr: string
  nameEn: string
  price: number
  currency: string
  duration: number
  features: string[]
  analysisLimit: number
  reportsLimit: number
  priority: 'standard' | 'premium' | 'enterprise'
}

export function Payment() {
  const { user } = useAuth()
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<string>('professional')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentEnabled, setPaymentEnabled] = useState(false)
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: ''
  })

  useEffect(() => {
    fetchSubscriptionPlans()
  }, [])

  const fetchSubscriptionPlans = async () => {
    try {
      const response = await fetch('/api/payment/subscribe')
      const data = await response.json()
      setPlans(data.plans || [])
      setPaymentEnabled(data.paymentEnabled || false)
    } catch (error) {
      console.error('Failed to fetch subscription plans:', error)
    }
  }

  const handleSubscribe = async () => {
    if (!paymentEnabled) {
      alert('نظام الدفع معطل حالياً لفترة التجارب المجانية للضيوف')
      return
    }

    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      alert('يرجى إكمال جميع البيانات المطلوبة')
      return
    }

    setIsProcessing(true)
    
    try {
      const response = await fetch('/api/payment/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: selectedPlan,
          customerInfo: customerInfo
        }),
      })

      const data = await response.json()
      
      if (data.success && data.paymentUrl) {
        // Redirect to PayTabs payment page
        if (typeof window !== 'undefined') {
          window.location.href = data.paymentUrl
        }
      } else {
        throw new Error(data.message || 'فشل في إنشاء عملية الدفع')
      }
    } catch (error: any) {
      alert('حدث خطأ: ' + error.message)
    } finally {
      setIsProcessing(false)
    }
  }

  const getPlanIcon = (priority: string) => {
    switch (priority) {
      case 'standard':
        return <Users className="w-8 h-8" />
      case 'premium':
        return <Star className="w-8 h-8" />
      case 'enterprise':
        return <Crown className="w-8 h-8" />
      default:
        return <BarChart3 className="w-8 h-8" />
    }
  }

  const getPlanColor = (priority: string) => {
    switch (priority) {
      case 'standard':
        return 'border-blue-500 bg-blue-500/10'
      case 'premium':
        return 'border-[#B48500] bg-[#B48500]/10'
      case 'enterprise':
        return 'border-purple-500 bg-purple-500/10'
      default:
        return 'border-gray-500 bg-gray-500/10'
    }
  }

  if (!user) {
    router.push('/auth')
    return null
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#B48500] mb-4">
            اختر باقة الاشتراك المناسبة
          </h1>
          <p className="text-[#8B6914] text-lg max-w-2xl mx-auto">
            احصل على إمكانيات التحليل المالي الذكي الكاملة مع باقاتنا المرنة
          </p>
          
          {!paymentEnabled && (
            <Alert className="mt-6 max-w-2xl mx-auto border-yellow-500 bg-yellow-500/10">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-yellow-400">
                نظام الدفع معطل حالياً لفترة التجارب المجانية للضيوف. سيتم تفعيله قريباً.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Subscription Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedPlan === plan.id 
                  ? getPlanColor(plan.priority) + ' border-2' 
                  : 'bg-black border-gray-700 hover:border-[#B48500]'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.priority === 'premium' && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-[#B48500] text-black font-bold px-4 py-1">
                    الأكثر شعبية
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 text-[#B48500]">
                  {getPlanIcon(plan.priority)}
                </div>
                <CardTitle className="text-2xl text-[#B48500]">
                  {plan.nameAr}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-[#8B6914] mr-2">
                    {plan.currency} / شهر
                  </span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-[#8B6914] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 p-4 bg-[#1a1a1a] rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8B6914]">حد التحليلات الشهرية:</span>
                    <span className="text-[#B48500] font-semibold">
                      {plan.analysisLimit === -1 ? 'غير محدود' : plan.analysisLimit}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-[#8B6914]">حد التقارير الشهرية:</span>
                    <span className="text-[#B48500] font-semibold">
                      {plan.reportsLimit === -1 ? 'غير محدود' : plan.reportsLimit}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Customer Information */}
        <Card className="bg-black border-[#B48500] max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-[#B48500] flex items-center gap-2">
              <CreditCard className="w-6 h-6" />
              معلومات العميل
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#B48500]">الاسم الكامل *</Label>
                <Input
                  id="name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  className="bg-black border-[#B48500] text-[#B48500]"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#B48500]">البريد الإلكتروني *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  className="bg-black border-[#B48500] text-[#B48500]"
                  placeholder="example@email.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[#B48500]">رقم الهاتف *</Label>
              <Input
                id="phone"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                className="bg-black border-[#B48500] text-[#B48500]"
                placeholder="+966xxxxxxxxx"
              />
            </div>

            {/* Payment Button */}
            <div className="pt-6">
              <Button
                onClick={handleSubscribe}
                disabled={isProcessing || !paymentEnabled}
                className="w-full bg-[#B48500] text-black hover:bg-[#8B6914] font-bold py-6 text-lg"
              >
                {isProcessing ? (
                  'جاري المعالجة...'
                ) : paymentEnabled ? (
                  `اشترك الآن - ${plans.find(p => p.id === selectedPlan)?.price || 0} ريال`
                ) : (
                  'الدفع معطل حالياً - تجربة مجانية للضيوف'
                )}
              </Button>
              
              {!paymentEnabled && (
                <p className="text-center text-[#8B6914] text-sm mt-4">
                  يمكنك استخدام جميع المزايا مجاناً خلال فترة التجارب
                </p>
              )}
            </div>

            {/* Security Notice */}
            <div className="flex items-center gap-2 p-4 bg-[#1a1a1a] rounded-lg mt-4">
              <Shield className="w-5 h-5 text-green-500" />
              <div className="text-sm">
                <p className="text-green-400 font-semibold">آمان وموثوقية</p>
                <p className="text-[#8B6914]">
                  جميع عمليات الدفع محمية بتشفير SSL وتتم عبر PayTabs المعتمد في السعودية
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}