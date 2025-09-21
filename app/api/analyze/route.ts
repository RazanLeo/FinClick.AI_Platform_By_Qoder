import { NextRequest, NextResponse } from 'next/server'

// Configure route segment
export const runtime = 'nodejs'
export const maxDuration = 60

// Increase memory and handling limits
export const dynamic = 'force-dynamic'
export const preferredRegion = 'auto'

interface AnalysisRequest {
  fileData?: Array<{
    name: string
    type: string
    data: string
  }>
  analysisTypes?: string[]
  analysisLevel?: string
  companyInfo?: {
    companyName?: string
    sector?: string
    activity?: string
    legalEntity?: string
    yearsOfAnalysis?: number
    comparisonLevel?: string
  }
}

interface AnalysisResultItem {
  id: string
  name: string
  nameEn: string
  nameAr: string
  category: 'classical' | 'applied' | 'advanced'
  subcategory: string
  value: number | string | object
  status: 'ممتاز' | 'جيد جداً' | 'جيد' | 'مقبول' | 'ضعيف'
  description: string
  calculationMethod: string
  industryBenchmark?: number
  peerComparison?: number
  riskLevel?: 'منخفض' | 'متوسط' | 'مرتفع' | 'عالي جداً'
  recommendations?: string[]
}

export async function POST(request: NextRequest) {
  try {
    const data: AnalysisRequest = await request.json()
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Generate mock analysis results
    const detailedAnalysis: AnalysisResultItem[] = [
      {
        id: 'liquidity_01',
        name: 'Current Ratio',
        nameEn: 'Current Ratio',
        nameAr: 'نسبة السيولة الجارية',
        category: 'classical',
        subcategory: 'liquidity',
        value: 2.4,
        status: 'جيد',
        description: 'يقيس قدرة الشركة على الوفاء بالتزاماتها قصيرة الأجل',
        calculationMethod: 'الأصول المتداولة ÷ الخصوم المتداولة',
        industryBenchmark: 2.1,
        peerComparison: 2.2,
        riskLevel: 'منخفض',
        recommendations: ['الحفاظ على المستوى الحالي للسيولة', 'مراقبة التدفق النقدي']
      },
      {
        id: 'profitability_01',
        name: 'Net Profit Margin',
        nameEn: 'Net Profit Margin',
        nameAr: 'هامش صافي الربح',
        category: 'classical',
        subcategory: 'profitability',
        value: 0.15,
        status: 'جيد جداً',
        description: 'يظهر نسبة صافي الربح من إجمالي الإيرادات',
        calculationMethod: 'صافي الربح ÷ صافي الإيرادات',
        industryBenchmark: 0.12,
        peerComparison: 0.13,
        riskLevel: 'منخفض',
        recommendations: ['استمرار تحسين الكفاءة التشغيلية', 'تطوير استراتيجيات زيادة الربحية']
      },
      {
        id: 'leverage_01',
        name: 'Debt to Equity Ratio',
        nameEn: 'Debt to Equity Ratio',
        nameAr: 'نسبة الدين إلى حقوق الملكية',
        category: 'classical',
        subcategory: 'leverage',
        value: 0.6,
        status: 'مقبول',
        description: 'يقيس مدى اعتماد الشركة على الديون مقارنة بحقوق الملكية',
        calculationMethod: 'إجمالي الديون ÷ حقوق الملكية',
        industryBenchmark: 0.5,
        peerComparison: 0.55,
        riskLevel: 'متوسط',
        recommendations: ['إعادة هيكلة الديون', 'تحسين هيكل رأس المال']
      },
      {
        id: 'activity_01',
        name: 'Asset Turnover',
        nameEn: 'Asset Turnover',
        nameAr: 'معدل دوران الأصول',
        category: 'classical',
        subcategory: 'activity',
        value: 1.8,
        status: 'جيد',
        description: 'يقيس كفاءة الشركة في استخدام أصولها لتوليد الإيرادات',
        calculationMethod: 'صافي الإيرادات ÷ متوسط إجمالي الأصول',
        industryBenchmark: 1.6,
        peerComparison: 1.7,
        riskLevel: 'منخفض',
        recommendations: ['تحسين استخدام الأصول', 'زيادة الكفاءة التشغيلية']
      },
      {
        id: 'growth_01',
        name: 'Revenue Growth Rate',
        nameEn: 'Revenue Growth Rate',
        nameAr: 'معدل نمو الإيرادات',
        category: 'applied',
        subcategory: 'growth',
        value: 0.12,
        status: 'جيد',
        description: 'يقيس معدل نمو الإيرادات مقارنة بالفترة السابقة',
        calculationMethod: '(الإيرادات الحالية - الإيرادات السابقة) ÷ الإيرادات السابقة',
        industryBenchmark: 0.10,
        peerComparison: 0.11,
        riskLevel: 'منخفض',
        recommendations: ['تطوير استراتيجيات النمو', 'التوسع في الأسواق الجديدة']
      }
    ]
    
    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      companyName: data.companyInfo?.companyName || 'الشركة',
      analysisType: data.analysisLevel || 'شامل',
      detailedAnalysis,
      summary: {
        overallScore: 75,
        overallRating: 'جيد',
        keyStrengths: [
          'مستوى سيولة جيد',
          'هامش ربح مقبول',
          'كفاءة في استخدام الأصول'
        ],
        keyWeaknesses: [
          'نسبة دين مرتفعة نسبياً',
          'معدل نمو محدود'
        ],
        riskFactors: [
          'مخاطر السيولة',
          'مخاطر الائتمان'
        ]
      },
      keyFindings: [
        'الشركة تحافظ على مستوى سيولة جيد يمكنها من الوفاء بالتزاماتها قصيرة الأجل',
        'هامش الربح يظهر كفاءة جيدة في إدارة التكاليف',
        'نسبة الدين تحتاج إلى مراجعة لتحسين هيكل رأس المال'
      ],
      recommendations: [
        'تحسين إدارة النقدية لزيادة السيولة',
        'مراجعة هيكل الديون وخفض نسبة الاعتماد على التمويل الخارجي',
        'تطوير استراتيجيات لزيادة معدل النمو',
        'تحسين كفاءة استخدام الأصول'
      ],
      riskLevel: 'متوسط',
      score: 75,
      processingTime: '2.3 seconds'
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Analysis API error:', error)
    
    // Handle specific error types
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON format', message: 'تنسيق البيانات غير صحيح' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to process analysis', message: 'فشل في معالجة التحليل. يرجى المحاولة مرة أخرى.', details: error },
      { status: 500 }
    )
  }
}