"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | 'loading'>('loading')

  useEffect(() => {
    const tranRef = searchParams.get('tran_ref')
    const respCode = searchParams.get('resp_code')
    
    if (respCode === '100') {
      setPaymentStatus('success')
    } else {
      setPaymentStatus('failed')
    }
  }, [searchParams])

  if (paymentStatus === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#B48500] text-xl">جاري التحقق من حالة الدفع...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black border-[#B48500] text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            {paymentStatus === 'success' ? (
              <CheckCircle className="w-16 h-16 text-green-500" />
            ) : (
              <XCircle className="w-16 h-16 text-red-500" />
            )}
          </div>
          <CardTitle className="text-2xl text-[#B48500]">
            {paymentStatus === 'success' ? 'تم الدفع بنجاح!' : 'فشل في عملية الدفع'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-[#8B6914]">
            {paymentStatus === 'success' 
              ? 'تم تفعيل اشتراكك بنجاح. يمكنك الآن الاستفادة من جميع مزايا المنصة.'
              : 'حدث خطأ أثناء معالجة الدفع. يرجى المحاولة مرة أخرى أو التواصل مع الدعم الفني.'
            }
          </p>
          <div className="space-y-2">
            <Button 
              onClick={() => router.push('/dashboard')}
              className="w-full bg-[#B48500] text-black hover:bg-[#8B6914]"
            >
              <ArrowLeft className="w-4 h-4 ml-2" />
              العودة للوحة التحكم
            </Button>
            {paymentStatus === 'failed' && (
              <Button 
                onClick={() => router.push('/payment')}
                variant="outline"
                className="w-full border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black"
              >
                المحاولة مرة أخرى
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}