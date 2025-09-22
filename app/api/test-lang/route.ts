import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lang = searchParams.get('lang') || 'ar'
  
  // Simple test response
  const testData = {
    language: lang,
    direction: lang === 'ar' ? 'rtl' : 'ltr',
    translations: {
      nav: {
        home: lang === 'ar' ? 'الصفحة الرئيسية' : 'Home',
        dashboard: lang === 'ar' ? 'لوحة التحكم' : 'Dashboard'
      },
      hero: {
        title: 'FinClick.AI',
        subtitle: lang === 'ar' ? 'منصة التحليل المالي الذكية الثورية' : 'Revolutionary Intelligent Financial Analysis Platform'
      }
    }
  }
  
  return NextResponse.json(testData)
}