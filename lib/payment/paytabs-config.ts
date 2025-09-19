// PayTabs Payment Integration for FinClick.AI
// Payment gateway configuration for Saudi Arabia compliance

export interface PayTabsConfig {
  profileId: string
  serverKey: string
  environment: 'production' | 'sandbox'
  currency: 'SAR' | 'USD' | 'EUR'
  language: 'ar' | 'en'
}

export interface PaymentRequest {
  amount: number
  currency: string
  description: string
  customerEmail: string
  customerName: string
  customerPhone: string
  orderId: string
  returnUrl: string
  callbackUrl: string
}

export interface SubscriptionPlan {
  id: string
  nameAr: string
  nameEn: string
  price: number
  currency: string
  duration: number // in months
  features: string[]
  analysisLimit: number
  reportsLimit: number
  priority: 'standard' | 'premium' | 'enterprise'
}

export class PayTabsService {
  private config: PayTabsConfig
  private isEnabled: boolean = false // Disabled for guest testing

  constructor(config: PayTabsConfig) {
    this.config = config
  }

  // Enable/disable payment system
  setEnabled(enabled: boolean) {
    this.isEnabled = enabled
  }

  isPaymentEnabled(): boolean {
    return this.isEnabled
  }

  // Create payment request
  async createPayment(request: PaymentRequest): Promise<any> {
    if (!this.isEnabled) {
      throw new Error('Payment system is currently disabled for guest testing')
    }

    try {
      const paymentData = {
        profile_id: this.config.profileId,
        tran_type: 'sale',
        tran_class: 'ecom',
        cart_id: request.orderId,
        cart_description: request.description,
        cart_currency: request.currency,
        cart_amount: request.amount,
        callback: request.callbackUrl,
        return: request.returnUrl,
        customer_details: {
          name: request.customerName,
          email: request.customerEmail,
          phone: request.customerPhone,
        },
        hide_shipping: true,
        lang: this.config.language,
      }

      const response = await fetch('https://secure.paytabs.sa/payment/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.config.serverKey,
        },
        body: JSON.stringify(paymentData),
      })

      if (!response.ok) {
        throw new Error(`PayTabs API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('PayTabs payment creation error:', error)
      throw error
    }
  }

  // Verify payment callback
  async verifyPayment(callback: any): Promise<boolean> {
    if (!this.isEnabled) {
      return false
    }

    try {
      const verificationData = {
        profile_id: this.config.profileId,
        tran_ref: callback.tran_ref,
      }

      const response = await fetch('https://secure.paytabs.sa/payment/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.config.serverKey,
        },
        body: JSON.stringify(verificationData),
      })

      if (!response.ok) {
        return false
      }

      const result = await response.json()
      return result.payment_result?.response_status === 'A'
    } catch (error) {
      console.error('PayTabs verification error:', error)
      return false
    }
  }

  // Get subscription plans
  getSubscriptionPlans(): SubscriptionPlan[] {
    return [
      {
        id: 'monthly',
        nameAr: 'الاشتراك الشهري',
        nameEn: 'Monthly Subscription',
        price: 5000,
        currency: 'SAR',
        duration: 1,
        features: [
          'جميع التحليلات - 180 نوع',
          'تحليلات غير محدودة شهرياً',
          'جميع أنواع التقارير (PDF, Word, Excel, PowerPoint)',
          'الذكاء الاصطناعي المتقدم',
          'دعم MADA, Visa, PayPal',
          'الدعم الفني المتميز 24/7',
          'تحديثات فورية للبيانات',
          'تحليل SWOT متقدم',
          'مقارنات القطاع والصناعة'
        ],
        analysisLimit: -1, // unlimited
        reportsLimit: -1, // unlimited
        priority: 'premium'
      },
      {
        id: 'annual',
        nameAr: 'الاشتراك السنوي',
        nameEn: 'Annual Subscription',
        price: 54000,
        currency: 'SAR',
        duration: 12,
        features: [
          'جميع التحليلات - 180 نوع',
          'تحليلات غير محدودة على مدار السنة',
          'جميع أنواع التقارير (PDF, Word, Excel, PowerPoint)',
          'الذكاء الاصطناعي المتقدم',
          'دعم MADA, Visa, PayPal',
          'الدعم الفني المتميز 24/7',
          'تحديثات فورية للبيانات',
          'تحليل SWOT متقدم',
          'مقارنات القطاع والصناعة',
          'توفير 6000 ريال (خصم سنوي)',
          'أولوية في المعالجة',
          'تدريب شخصي مجاني',
          'استشارات مالية ربع سنوية'
        ],
        analysisLimit: -1, // unlimited
        reportsLimit: -1, // unlimited
        priority: 'enterprise'
      }
    ]
  }

  // Format amount for display
  formatAmount(amount: number, currency: string = 'SAR'): string {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount)
  }
}

// Create default PayTabs service instance
export const payTabsService = new PayTabsService({
  profileId: process.env.NEXT_PUBLIC_PAYTABS_PROFILE_ID || '',
  serverKey: process.env.PAYTABS_SERVER_KEY || '',
  environment: (process.env.NODE_ENV === 'production' ? 'production' : 'sandbox') as 'production' | 'sandbox',
  currency: 'SAR',
  language: 'ar'
})

// Disable payment system for guest testing period
payTabsService.setEnabled(false)

export default payTabsService