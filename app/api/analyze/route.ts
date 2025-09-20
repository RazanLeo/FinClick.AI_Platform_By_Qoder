import { NextRequest, NextResponse } from 'next/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('[v0] Starting analysis request')

    const body = await request.json()
    console.log('[v0] Request body received:', JSON.stringify(body, null, 2))

    const { fileData, analysisTypes, analysisLevel, companyInfo } = body

    if (!fileData || !analysisTypes || !analysisLevel) {
      console.error('[v0] Missing required parameters:', {
        fileData: !!fileData,
        analysisTypes: !!analysisTypes,
        analysisLevel: !!analysisLevel,
      })
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
    }

    // Mock analysis result for deployment testing
    const mockAnalysisResult = {
      summary: 'تحليل مالي شامل للبيانات المقدمة',
      keyFindings: [
        'قوة في المؤشرات المالية الرئيسية',
        'نمو مستقر في الإيرادات',
        'إدارة جيدة للمخاطر'
      ],
      recommendations: [
        'مواصلة استراتيجية النمو الحالية',
        'تعزيز مراقبة التدفق النقدي',
        'تطوير قنوات جديدة للإيرادات'
      ],
      riskLevel: 'متوسط',
      score: 78,
      detailedAnalysis: [
        {
          id: 'prof_001',
          name: 'تحليل هامش الربح الإجمالي',
          nameEn: 'Gross Profit Margin Analysis',
          category: 'التصنيف الأساسي',
          subcategory: 'الربحية',
          value: 45.5,
          formula: '(الإيرادات - تكلفة البضاعة المباعة) / الإيرادات * 100',
          interpretation: 'يشير إلى قدرة جيدة على توليد الربح من العمليات الأساسية',
          benchmark: '40-50% لقطاع الخدمات',
          status: 'جيد',
          description: 'تحليل هامش الربح الإجمالي يقيس نسبة الربح المحقق من كل وحدة نقدية من المبيعات',
          calculation: '(الإيرادات 1,000,000 - تكلفة البضاعة 545,000) / 1,000,000 * 100 = 45.5%',
          recommendations: [
            'مراجعة استراتيجية التسعير',
            'تحسين العمليات التشغيلية'
          ],
          riskLevel: 'منخفض',
          confidence: 85
        }
      ],
      metadata: {
        analysisCount: 1,
        analysisLevel,
        analysisTypes,
        selectedAnalyses: ['Gross Profit Margin Analysis'],
        timestamp: new Date().toISOString(),
        model: 'mock-analysis',
        companyInfo,
      },
    }

    console.log('[v0] Returning mock analysis result')
    return NextResponse.json(mockAnalysisResult)
  } catch (error) {
    console.error('[v0] Analysis error details:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('[v0] Error message:', errorMessage)

    return NextResponse.json(
      {
        error: `Analysis error: ${errorMessage}`,
      },
      { status: 500 },
    )
  }
}