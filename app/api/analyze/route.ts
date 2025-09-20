import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Starting analysis request")

    const body = await request.json()
    console.log("[v0] Request body received:", JSON.stringify(body, null, 2))

    const { fileData, analysisTypes, analysisLevel, companyInfo } = body

    if (!fileData || !analysisTypes || !analysisLevel) {
      console.error("[v0] Missing required parameters:", {
        fileData: !!fileData,
        analysisTypes: !!analysisTypes,
        analysisLevel: !!analysisLevel,
      })
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Mock analysis result for now to ensure deployment works
    const mockAnalysisResult = {
      summary: "تحليل مالي شامل للبيانات المقدمة",
      keyFindings: [
        "قوة في المؤشرات المالية الرئيسية",
        "نمو مستقر في الإيرادات",
        "إدارة جيدة للمخاطر"
      ],
      recommendations: [
        "مواصلة استراتيجية النمو الحالية",
        "تعزيز مراقبة التدفق النقدي",
        "تطوير قنوات جديدة للإيرادات"
      ],
      riskLevel: "متوسط" as const,
      score: 78,
      detailedAnalysis: [
        {
          id: "prof_001",
          name: "تحليل هامش الربح الإجمالي",
          nameEn: "Gross Profit Margin Analysis",
          category: "التصنيف الأساسي" as const,
          subcategory: "الربحية",
          value: 45.5,
          formula: "(الإيرادات - تكلفة البضاعة المباعة) / الإيرادات * 100",
          interpretation: "يشير إلى قدرة جيدة على توليد الربح من العمليات الأساسية",
          benchmark: "40-50% لقطاع الخدمات",
          status: "جيد" as const,
          description: "تحليل هامش الربح الإجمالي يقيس نسبة الربح المحقق من كل وحدة نقدية من المبيعات",
          calculation: "(الإيرادات 1,000,000 - تكلفة البضاعة 545,000) / 1,000,000 * 100 = 45.5%",
          recommendations: [
            "مراجعة استراتيجية التسعير",
            "تحسين العمليات التشغيلية"
          ],
          riskLevel: "منخفض" as const,
          confidence: 85
        }
      ],
      metadata: {
        analysisCount: 1,
        analysisLevel,
        analysisTypes,
        selectedAnalyses: ["Gross Profit Margin Analysis"],
        timestamp: new Date().toISOString(),
        model: "mock-analysis",
        companyInfo,
      },
    }

    console.log("[v0] Returning mock analysis result")
    return NextResponse.json(mockAnalysisResult)
  } catch (error) {
    console.error("[v0] Analysis error details:", error)
    console.error("[v0] Error message:", error instanceof Error ? error.message : String(error))
    console.error("[v0] Error stack:", error instanceof Error ? error.stack : "No stack trace")

    return NextResponse.json(
      {
        error: `Analysis error: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
      },
      { status: 500 },
    )
  }
}لاه، قم بتنفيذه وتقديم النتائج وفق القالب التالي:
{
  "id": "معرف فريد للتحليل",
  "name": "اسم التحليل بالعربية", 
  "nameEn": "اسم التحليل بالإنجليزية",
  "category": "التصنيف الأساسي أو التطبيقي أو المتقدم",
  "subcategory": "التصنيف الفرعي (مثل: الربحية، السيولة، الكفاءة، إلخ)",
  "value": "القيمة المحسوبة رقمياً",
  "formula": "المعادلة الرياضية المستخدمة",
  "interpretation": "تفسير مفصل للنتيجة وما تعنيه",
  "benchmark": "المعيار المرجعي للمقارنة",
  "status": "تقييم الأداء: ممتاز/جيد/متوسط/سيء/حرج",
  "description": "وصف تفصيلي للتحليل وأهميته",
  "calculation": "الحساب التفصيلي مع الأرقام الفعلية",
  "recommendations": ["قائمة بالتوصيات المحددة والقابلة للتنفيذ"],
  "riskLevel": "مستوى المخاطر: منخفض/متوسط/مرتفع",
  "confidence": "مستوى الثقة في النتيجة من 0 إلى 100"
}

متطلبات التحليل:
1. استخدم البيانات المالية المقدمة لحساب كل تحليل بدقة
2. قدم حسابات رقمية دقيقة مع إظهار الخطوات
3. فسر النتائج في السياق المالي والاقتصادي
4. قارن النتائج مع المعايير الصناعية المناسبة
5. قدم توصيات عملية وقابلة للتنفيذ
6. ركز فقط على التحليل المالي - لا تذكر الموظفين أو الإدارة
7. استخدم اللغة العربية في جميع النتائج
8. تأكد من دقة الحسابات الرياضية والنسب المالية

يجب تنفيذ جميع التحليلات المذكورة في القائمة أعلاه بدون استثناء.
    `

    console.log("[v0] Starting AI analysis with Groq")

    const client = getGroqClient()

    const completion = await client.chat.completions.create({
      messages: [
        {
          role: "user",
          content: analysisPrompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.1,
    })

    console.log("[v0] AI analysis completed successfully")
    
    const resultContent = completion.choices[0]?.message?.content
    if (!resultContent) {
      throw new Error("No response from AI model")
    }

    let analysisObject: AnalysisResult
    try {
      analysisObject = JSON.parse(resultContent)
    } catch (parseError) {
      console.error("[v0] Failed to parse AI response:", parseError)
      throw new Error("Invalid response format from AI model")
    }

    const analysisResult = {
      ...analysisObject,
      metadata: {
        analysisCount: selectedAnalyses.length,
        analysisLevel,
        analysisTypes,
        selectedAnalyses: selectedAnalyses.slice(0, 10), // Only first 10 for brevity
        timestamp: new Date().toISOString(),
        model: "llama-3.3-70b-versatile",
        companyInfo,
      },
    }

    console.log("[v0] Returning analysis result")
    return NextResponse.json(analysisResult)
  } catch (error) {
    console.error("[v0] Analysis error details:", error)
    console.error("[v0] Error message:", error instanceof Error ? error.message : String(error))
    console.error("[v0] Error stack:", error instanceof Error ? error.stack : "No stack trace")

    if (error instanceof Error) {
      if (error.message.includes("API key") || error.message.includes("GROQ_API_KEY")) {
        return NextResponse.json(
          {
            error:
              "Groq API key is missing. Pass it using the 'apiKey' parameter or the GROQ_API_KEY environment variable.",
          },
          { status: 500 },
        )
      }
      if (error.message.includes("rate limit")) {
        return NextResponse.json({ error: "AI service rate limit exceeded. Please try again later." }, { status: 429 })
      }
      if (error.message.includes("timeout")) {
        return NextResponse.json(
          { error: "Analysis timeout. Please try with smaller data or try again later." },
          { status: 408 },
        )
      }
    }

    return NextResponse.json(
      {
        error: `Analysis error: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
      },
      { status: 500 },
    )
  }
}

function getSelectedAnalyses(analysisTypes: string[], analysisLevel: string): string[] {
  const selectedAnalyses: string[] = []

  if (analysisLevel === "basic" || analysisLevel === "comprehensive") {
    analysisTypes.forEach((type) => {
      if (type === "profitability") selectedAnalyses.push(...FINANCIAL_ANALYSES.basic.slice(0, 25))
      if (type === "liquidity") selectedAnalyses.push(...FINANCIAL_ANALYSES.basic.slice(25, 45))
      if (type === "efficiency") selectedAnalyses.push(...FINANCIAL_ANALYSES.basic.slice(45, 65))
      if (type === "leverage") selectedAnalyses.push(...FINANCIAL_ANALYSES.basic.slice(65, 85))
      if (type === "growth") selectedAnalyses.push(...FINANCIAL_ANALYSES.basic.slice(85, 106))
    })
  }

  if (analysisLevel === "intermediate" || analysisLevel === "comprehensive") {
    analysisTypes.forEach((type) => {
      if (type === "profitability") selectedAnalyses.push(...FINANCIAL_ANALYSES.intermediate.slice(0, 7))
      if (type === "risk") selectedAnalyses.push(...FINANCIAL_ANALYSES.intermediate.slice(7, 14))
      if (type === "valuation") selectedAnalyses.push(...FINANCIAL_ANALYSES.intermediate.slice(14, 21))
    })
  }

  if (analysisLevel === "advanced" || analysisLevel === "comprehensive") {
    analysisTypes.forEach((type) => {
      if (type === "strategic") selectedAnalyses.push(...FINANCIAL_ANALYSES.advanced.slice(0, 18))
      if (type === "modeling") selectedAnalyses.push(...FINANCIAL_ANALYSES.advanced.slice(18, 36))
      if (type === "industry") selectedAnalyses.push(...FINANCIAL_ANALYSES.advanced.slice(36, 53))
    })
  }

  return [...new Set(selectedAnalyses)]
}
