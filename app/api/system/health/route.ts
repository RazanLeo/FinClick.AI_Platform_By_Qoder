import { NextRequest, NextResponse } from 'next/server'
import { systemInitializer } from '@/lib/initialization/system-init'

export async function GET(request: NextRequest) {
  try {
    // Get comprehensive health report
    const healthReport = systemInitializer.getHealthReport()
    
    return NextResponse.json({
      success: true,
      ...healthReport,
      platform: 'FinClick.AI',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date()
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    switch (action) {
      case 'restart':
        const status = await systemInitializer.restart()
        return NextResponse.json({
          success: true,
          message: 'System restarted successfully',
          status
        })

      case 'enable_payments':
        await systemInitializer.enablePayments()
        return NextResponse.json({
          success: true,
          message: 'Payments enabled'
        })

      case 'disable_payments':
        await systemInitializer.disablePayments()
        return NextResponse.json({
          success: true,
          message: 'Payments disabled'
        })

      case 'maintenance':
        await systemInitializer.performMaintenance()
        return NextResponse.json({
          success: true,
          message: 'Maintenance completed'
        })

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action'
        }, { status: 400 })
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}