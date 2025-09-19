import { NextRequest, NextResponse } from 'next/server'
import { payTabsService } from '@/lib/payment/paytabs-config'

export async function POST(request: NextRequest) {
  try {
    if (!payTabsService.isPaymentEnabled()) {
      return NextResponse.json({
        error: 'Payment system is currently disabled for guest testing period',
        message: 'Please contact admin for subscription activation'
      }, { status: 503 })
    }

    const body = await request.json()
    const { planId, customerInfo } = body

    if (!planId || !customerInfo) {
      return NextResponse.json({
        error: 'Missing required parameters'
      }, { status: 400 })
    }

    const plans = payTabsService.getSubscriptionPlans()
    const selectedPlan = plans.find(p => p.id === planId)

    if (!selectedPlan) {
      return NextResponse.json({
        error: 'Invalid subscription plan'
      }, { status: 400 })
    }

    const orderId = `finclick_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const paymentRequest = {
      amount: selectedPlan.price,
      currency: selectedPlan.currency,
      description: `FinClick.AI Subscription - ${selectedPlan.nameAr}`,
      customerEmail: customerInfo.email,
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      orderId: orderId,
      returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/callback`
    }

    const paymentResponse = await payTabsService.createPayment(paymentRequest)

    return NextResponse.json({
      success: true,
      paymentUrl: paymentResponse.redirect_url,
      orderId: orderId,
      amount: selectedPlan.price,
      currency: selectedPlan.currency
    })

  } catch (error: any) {
    console.error('Payment creation error:', error)
    return NextResponse.json({
      error: 'Failed to create payment',
      message: error.message
    }, { status: 500 })
  }
}

export async function GET() {
  // Return subscription plans
  try {
    const plans = payTabsService.getSubscriptionPlans()
    
    return NextResponse.json({
      plans: plans,
      paymentEnabled: payTabsService.isPaymentEnabled(),
      message: payTabsService.isPaymentEnabled() 
        ? 'Payment system is active' 
        : 'Payment system is disabled for guest testing'
    })
  } catch (error: any) {
    return NextResponse.json({
      error: 'Failed to fetch subscription plans',
      message: error.message
    }, { status: 500 })
  }
}