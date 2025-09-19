import { NextRequest, NextResponse } from 'next/server'
import { payTabsService } from '@/lib/payment/paytabs-config'

export async function POST(request: NextRequest) {
  try {
    if (!payTabsService.isPaymentEnabled()) {
      return NextResponse.json({
        success: false,
        message: 'Payment system is disabled'
      }, { status: 503 })
    }

    const body = await request.json()
    
    // Verify the payment with PayTabs
    const isValid = await payTabsService.verifyPayment(body)
    
    if (isValid) {
      // Here you would typically:
      // 1. Update user subscription in database
      // 2. Send confirmation email
      // 3. Log the transaction
      
      console.log('Payment verified successfully:', body)
      
      return NextResponse.json({
        success: true,
        message: 'Payment verified and subscription activated'
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Payment verification failed'
      }, { status: 400 })
    }

  } catch (error: any) {
    console.error('Payment callback error:', error)
    return NextResponse.json({
      success: false,
      message: 'Payment callback processing failed'
    }, { status: 500 })
  }
}