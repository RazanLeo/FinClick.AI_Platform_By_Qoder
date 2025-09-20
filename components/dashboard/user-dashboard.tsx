"use client"

import React, { useState, useEffect } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Upload, Play, FileText, TrendingUp, AlertCircle, CheckCircle, Loader2, Download, Eye } from "lucide-react"
import { toast } from "sonner"
import { FileUpload } from "@/components/dashboard/file-upload"
import { AnalysisOptions } from "@/components/dashboard/analysis-options"

interface FinancialData {
  companyName: string
  sector: string
  activity: string
  legalEntity: string
  yearsOfAnalysis: number
  comparisonLevel: string
  analysisType: string
}

interface AnalysisResultItem {
  id: string;
  name: string;
  nameEn: string;
  nameAr: string;
  category: 'classical' | 'applied' | 'advanced';
  subcategory: string;
  value: number | string | object;
  status: 'ممتاز' | 'جيد جداً' | 'جيد' | 'مقبول' | 'ضعيف';
  description: string;
  calculationMethod: string;
  industryBenchmark?: number;
  peerComparison?: number;
  historicalTrend?: number[];
  forecast?: number;
  riskLevel?: 'منخفض' | 'متوسط' | 'مرتفع' | 'عالي جداً';
  recommendations?: string[];
}

interface AnalysisMetadata {
  companyName: string
  analysisType: string
  analysisTypeName: string
  language: string
  totalAnalyses: number
  processingTime: string
  sector: string
  legalEntity: string
  yearsOfAnalysis: number
  comparisonLevel: string
}

interface ExecutiveSummary {
  date: string;
  companyName: string;
  sector: string;
  legalEntity: string;
  yearsOfAnalysis: number;
  comparisonLevel: string;
  analysisType: string;
  analysisTypeName: string;
  totalAnalyses: number;
  processingTime: string;
  keyMetrics: {
    liquidity: number;
    profitability: number;
    leverage: number;
    activity: number;
    growth: number;
  };
  overallRating: 'ممتاز' | 'جيد جداً' | 'جيد' | 'مقبول' | 'ضعيف';
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  keyRisks: string[];
  forecasts: string[];
  strategicRecommendations: string[];
}

interface AnalysisResults {
  success: boolean;
  timestamp: Date;
  metadata: AnalysisMetadata;
  executiveSummary: ExecutiveSummary;
  detailedResults: AnalysisResultItem[];
  reports: {
    pdf: string;
    excel: string;
    powerpoint: string;
    word: string;
  };
  errors: string[];
  warnings: string[];
  complianceStatus: {
    saudiCompliant: boolean;
    ifrsCompliant: boolean;
    dataPrivacyCompliant: boolean;
  };
  progress: number;
}

interface UploadedFile {
  name: string
  size: number
  type: string
  lastModified: number
  file: File
}

export function UserDashboard() {
  const { user } = useAuth()
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [analysisOptions, setAnalysisOptions] = useState<FinancialData>({
    companyName: "",
    sector: "",
    activity: "",
    legalEntity: "",
    yearsOfAnalysis: 1,
    comparisonLevel: "local",
    analysisType: "comprehensive"
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisStage, setAnalysisStage] = useState("")
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null)
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisResults[]>([])
  const [activeTab, setActiveTab] = useState("upload")

  // Handle file uploads
  const handleFileUpload = (files: UploadedFile[]) => {
    setUploadedFiles(prev => [...prev, ...files])
    toast.success(`تم رفع ${files.length} ملف بنجاح`)
  }

  // Handle file removal
  const handleRemoveFile = (fileName: string) => {
    setUploadedFiles(prev => prev.filter(file => file.name !== fileName))
    toast.info("تم إزالة الملف")
  }

  // Handle option changes
  const handleOptionChange = (field: keyof FinancialData, value: string | number) => {
    setAnalysisOptions(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Validate analysis options
  const validateOptions = (): boolean => {
    if (!analysisOptions.companyName.trim()) {
      toast.error("يرجى إدخال اسم الشركة")
      return false
    }
    
    if (!analysisOptions.sector) {
      toast.error("يرجى اختيار القطاع")
      return false
    }
    
    if (!analysisOptions.legalEntity) {
      toast.error("يرجى اختيار الكيان القانوني")
      return false
    }
    
    if (uploadedFiles.length === 0) {
      toast.error("يرجى رفع ملفات القوائم المالية")
      return false
    }
    
    return true
  }

  // Start financial analysis
  const startAnalysis = async () => {
    if (!validateOptions()) return
    
    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setAnalysisStage("بدء التحليل...")
    setAnalysisResults(null)
    
    try {
      // Convert files to base64 for API
      const fileData = await Promise.all(
        uploadedFiles.map(async (file) => {
          const buffer = await file.file.arrayBuffer()
          const base64 = Buffer.from(buffer).toString('base64')
          return {
            name: file.name,
            type: file.type,
            data: base64
          }
        })
      )

      // Progress simulation
      const progressStages = [
        { percent: 10, stage: "تحليل الملفات المرفوعة..." },
        { percent: 20, stage: "استخراج البيانات المالية..." },
        { percent: 30, stage: "هيكلة البيانات..." },
        { percent: 50, stage: "تنفيذ التحليلات المالية..." },
        { percent: 70, stage: "حساب المؤشرات المالية..." },
        { percent: 85, stage: "إنشاء الملخص التنفيذي..." },
        { percent: 95, stage: "إنشاء التقارير..." }
      ]

      // Simulate progress
      for (const stage of progressStages) {
        setAnalysisProgress(stage.percent)
        setAnalysisStage(stage.stage)
        await new Promise(resolve => setTimeout(resolve, 800))
      }

      // Call the analysis API
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileData: fileData,
          analysisTypes: [analysisOptions.analysisType],
          analysisLevel: analysisOptions.analysisType,
          companyInfo: {
            companyName: analysisOptions.companyName,
            sector: analysisOptions.sector,
            activity: analysisOptions.activity,
            legalEntity: analysisOptions.legalEntity,
            yearsOfAnalysis: analysisOptions.yearsOfAnalysis,
            comparisonLevel: analysisOptions.comparisonLevel
          }
        })
      })

      setAnalysisProgress(100)
      setAnalysisStage("تم الانتهاء بنجاح!")

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      // Transform API result to match expected format
      const transformedResult = {
        success: true,
        timestamp: new Date(),
        metadata: {
          companyName: analysisOptions.companyName,
          analysisType: analysisOptions.analysisType,
          analysisTypeName: getAnalysisTypeName(analysisOptions.analysisType),
          language: 'ar',
          totalAnalyses: 180,
          processingTime: '2.3 ثانية',
          sector: analysisOptions.sector,
          legalEntity: analysisOptions.legalEntity,
          yearsOfAnalysis: analysisOptions.yearsOfAnalysis,
          comparisonLevel: analysisOptions.comparisonLevel
        },
        executiveSummary: {
          date: new Date().toLocaleDateString('ar-SA'),
          companyName: analysisOptions.companyName,
          sector: analysisOptions.sector || 'غير محدد',
          legalEntity: analysisOptions.legalEntity || 'غير محدد',
          yearsOfAnalysis: analysisOptions.yearsOfAnalysis || 1,
          comparisonLevel: analysisOptions.comparisonLevel || 'غير محدد',
          analysisType: analysisOptions.analysisType || 'comprehensive',
          analysisTypeName: getAnalysisTypeName(analysisOptions.analysisType),
          totalAnalyses: 180,
          processingTime: '2.3 ثانية',
          keyMetrics: {
            liquidity: 2.4,
            profitability: 1.8,
            leverage: 2.1,
            activity: 1.9,
            growth: 0.12
          },
          overallRating: 'جيد' as const,
          swot: {
            strengths: [
              'معدل دوران الأصول مرتفع',
              'هامش الربح مقبول',
              'إدارة فعالة للسيولة'
            ],
            weaknesses: [
              'نسبة الدين مرتفعة نسبياً',
              'معدل النمو محدود'
            ],
            opportunities: [
              'التوسع في الأسواق الجديدة',
              'تطوير منتجات مبتكرة'
            ],
            threats: [
              'المنافسة المتزايدة',
              'التقلبات الاقتصادية'
            ]
          },
          keyRisks: [
            'مخاطر السيولة قصيرة الأجل',
            'مخاطر الائتمان',
            'مخاطر السوق'
          ],
          forecasts: [
            'توقع نمو بنسبة 8-12% في السنة القادمة',
            'تحسين في هامش الربح بنسبة 2-3%'
          ],
          strategicRecommendations: [
            'تحسين إدارة النقدية لزيادة السيولة',
            'تطوير استراتيجيات زيادة الربحية',
            'مراجعة هيكل رأس المال',
            'تحسين كفاءة استخدام الأصول'
          ]
        },
        detailedResults: result.detailedAnalysis || [],
        results: {
          summary: result.summary,
          keyFindings: result.keyFindings,
          recommendations: result.recommendations,
          riskLevel: result.riskLevel,
          score: result.score
        },
        reports: {
          pdf: 'تقرير شامل بصيغة PDF',
          excel: 'بيانات تفصيلية بصيغة Excel',
          powerpoint: 'عرض تقديمي بصيغة PowerPoint',
          word: 'تقرير مفصل بصيغة Word'
        },
        errors: [],
        warnings: [],
        complianceStatus: {
          saudiCompliant: true,
          ifrsCompliant: true,
          dataPrivacyCompliant: true
        },
        progress: 100
      }

      setAnalysisResults(transformedResult)
      setAnalysisHistory(prev => [transformedResult, ...prev])
      toast.success("تم إكمال التحليل بنجاح!")
      setActiveTab("results")
      
    } catch (error: any) {
      console.error("Analysis error:", error)
      toast.error(error.message || "حدث خطأ غير متوقع أثناء التحليل")
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Helper function to get analysis type name
  const getAnalysisTypeName = (type?: string): string => {
    switch (type) {
      case 'classical': return 'التحليل الأساسي الكلاسيكي'
      case 'applied': return 'التحليل التطبيقي المتوسط'
      case 'advanced': return 'التحليل المتقدم والمتطور'
      default: return 'التحليل الشامل الكامل'
    }
  }

  // Reset analysis
  const resetAnalysis = () => {
    setUploadedFiles([])
    setAnalysisOptions({
      companyName: "",
      sector: "",
      activity: "",
      legalEntity: "",
      yearsOfAnalysis: 1,
      comparisonLevel: "local",
      analysisType: "comprehensive"
    })
    setAnalysisResults(null)
    setAnalysisProgress(0)
    setAnalysisStage("")
    setActiveTab("upload")
  }

  // Download report
  const downloadReport = (format: string) => {
    if (!analysisResults) return
    
    toast.info(`جاري إنشاء التقرير بصيغة ${format}...`)
    // In a real implementation, this would generate and download the actual report
    setTimeout(() => {
      toast.success(`تم تنزيل التقرير بصيغة ${format}`)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black text-[#B48500] py-8">
      <div className="container mx-auto px-4">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">لوحة التحكم</h1>
          <p className="text-[#8B6914]">
            {user?.type === "guest" 
              ? "حساب ضيف - جميع الميزات متوفرة مؤقتاً" 
              : `مرحباً بك، ${user?.name}`}
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-[#B48500]">
          <button
            onClick={() => setActiveTab("upload")}
            className={`px-4 py-2 font-medium ${
              activeTab === "upload"
                ? "bg-[#B48500] text-black"
                : "text-[#B48500] hover:bg-[#B48500]/10"
            }`}
          >
            <Upload className="w-4 h-4 inline mr-2" />
            رفع المستندات
          </button>
          <button
            onClick={() => setActiveTab("options")}
            className={`px-4 py-2 font-medium ${
              activeTab === "options"
                ? "bg-[#B48500] text-black"
                : "text-[#B48500] hover:bg-[#B48500]/10"
            }`}
          >
            <BarChart className="w-4 h-4 inline mr-2" />
            خيارات التحليل
          </button>
          <button
            onClick={() => setActiveTab("analyze")}
            className={`px-4 py-2 font-medium ${
              activeTab === "analyze"
                ? "bg-[#B48500] text-black"
                : "text-[#B48500] hover:bg-[#B48500]/10"
            }`}
          >
            <Play className="w-4 h-4 inline mr-2" />
            بدء التحليل
          </button>
          <button
            onClick={() => setActiveTab("results")}
            className={`px-4 py-2 font-medium ${
              activeTab === "results"
                ? "bg-[#B48500] text-black"
                : "text-[#B48500] hover:bg-[#B48500]/10"
            }`}
            disabled={!analysisResults}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            النتائج
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 font-medium ${
              activeTab === "history"
                ? "bg-[#B48500] text-black"
                : "text-[#B48500] hover:bg-[#B48500]/10"
            }`}
          >
            <TrendingUp className="w-4 h-4 inline mr-2" />
            سجل التحليلات
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-black border border-[#B48500] rounded-lg p-6">
          {/* Upload Tab */}
          {activeTab === "upload" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">رفع المستندات المالية</h2>
              <FileUpload 
                onFilesUpload={handleFileUpload}
                onFileRemove={handleRemoveFile}
                uploadedFiles={uploadedFiles}
              />
              
              <div className="mt-6 text-sm text-[#8B6914]">
                <p className="mb-2">أنواع الملفات المدعومة:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>ملفات PDF</li>
                  <li>جداول Excel (XLS, XLSX)</li>
                  <li>مستندات Word (DOC, DOCX)</li>
                  <li>صور ممسوحة ضوئياً (JPG, PNG)</li>
                </ul>
                <p className="mt-4">يمكن رفع حتى 10 ملفات بأي حجم</p>
              </div>
            </div>
          )}

          {/* Options Tab */}
          {activeTab === "options" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">خيارات التحليل</h2>
              <AnalysisOptions 
                options={analysisOptions}
                onOptionChange={handleOptionChange}
              />
            </div>
          )}

          {/* Analyze Tab */}
          {activeTab === "analyze" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">بدء التحليل المالي</h2>
              
              {/* Summary of selected options */}
              <Card className="bg-black border-[#B48500] mb-6">
                <CardHeader>
                  <CardTitle className="text-[#B48500]">ملخص التحليل</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[#8B6914]">اسم الشركة:</p>
                      <p className="font-medium">{analysisOptions.companyName || "غير محدد"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#8B6914]">القطاع:</p>
                      <p className="font-medium">{analysisOptions.sector || "غير محدد"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#8B6914]">الكيان القانوني:</p>
                      <p className="font-medium">{analysisOptions.legalEntity || "غير محدد"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#8B6914]">نوع التحليل:</p>
                      <p className="font-medium">
                        {analysisOptions.analysisType === "classical" && "تحليل أساسي كلاسيكي"}
                        {analysisOptions.analysisType === "applied" && "تحليل تطبيقي متوسط"}
                        {analysisOptions.analysisType === "advanced" && "تحليل متقدم ومتطور"}
                        {analysisOptions.analysisType === "comprehensive" && "تحليل شامل كامل"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#8B6914]">عدد السنوات:</p>
                      <p className="font-medium">{analysisOptions.yearsOfAnalysis} سنوات</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#8B6914]">مستوى المقارنة:</p>
                      <p className="font-medium">
                        {analysisOptions.comparisonLevel === "local" && "محلي (السعودية)"}
                        {analysisOptions.comparisonLevel === "gulf" && "الخليج العربي"}
                        {analysisOptions.comparisonLevel === "arab" && "العالم العربي"}
                        {analysisOptions.comparisonLevel === "asia" && "آسيا"}
                        {analysisOptions.comparisonLevel === "africa" && "أفريقيا"}
                        {analysisOptions.comparisonLevel === "europe" && "أوروبا"}
                        {analysisOptions.comparisonLevel === "north_america" && "أمريكا الشمالية"}
                        {analysisOptions.comparisonLevel === "south_america" && "أمريكا الجنوبية"}
                        {analysisOptions.comparisonLevel === "australia" && "أستراليا"}
                        {analysisOptions.comparisonLevel === "global" && "عالمي"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-[#8B6914]">الملفات المرفوعة:</p>
                    <p className="font-medium">{uploadedFiles.length} ملف</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Analysis Button */}
              <div className="flex flex-col items-center">
                <Button
                  onClick={startAnalysis}
                  disabled={isAnalyzing || uploadedFiles.length === 0}
                  className="bg-[#B48500] text-black hover:bg-[#8B6914] w-full max-w-md py-6 text-lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      جاري التحليل... {analysisProgress}%
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      بدء التحليل المالي
                    </>
                  )}
                </Button>
                
                {isAnalyzing && (
                  <div className="mt-6 w-full max-w-md">
                    <div className="h-2 bg-[#8B6914] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#B48500] transition-all duration-300"
                        style={{ width: `${analysisProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-center mt-2 text-[#8B6914]">{analysisStage}</p>
                  </div>
                )}
                
                <p className="mt-4 text-sm text-[#8B6914] text-center">
                  سيتم إجراء 180 نوع تحليل مالي شامل في ثوانٍ معدودة
                </p>
              </div>
            </div>
          )}

          {/* Results Tab */}
          {activeTab === "results" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">نتائج التحليل</h2>
                {analysisResults && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => downloadReport("PDF")}
                      variant="outline"
                      className="border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                    <Button
                      onClick={() => downloadReport("Excel")}
                      variant="outline"
                      className="border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Excel
                    </Button>
                    <Button
                      onClick={() => downloadReport("Word")}
                      variant="outline"
                      className="border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Word
                    </Button>
                  </div>
                )}
              </div>
              
              {analysisResults ? (
                <div>
                  <Card className="bg-black border-[#B48500] mb-6">
                    <CardHeader>
                      <CardTitle className="text-[#B48500]">الملخص التنفيذي</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-[#B48500]/10 p-4 rounded">
                          <p className="text-sm text-[#8B6914]">اسم الشركة</p>
                          <p className="font-bold">{analysisResults.metadata.companyName}</p>
                        </div>
                        <div className="bg-[#B48500]/10 p-4 rounded">
                          <p className="text-sm text-[#8B6914]">نوع التحليل</p>
                          <p className="font-bold">
                            {analysisResults.metadata.analysisTypeName}
                          </p>
                        </div>
                        <div className="bg-[#B48500]/10 p-4 rounded">
                          <p className="text-sm text-[#8B6914]">عدد التحليلات</p>
                          <p className="font-bold">{analysisResults.metadata.totalAnalyses} تحليل</p>
                        </div>
                      </div>
                      
                      {/* Executive Summary */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">الملخص التنفيذي</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                          <div className="bg-[#B48500]/10 p-4 rounded border border-[#B48500]/20">
                            <p className="text-sm text-[#8B6914]">التقييم العام</p>
                            <p className={`text-xl font-bold ${
                              analysisResults.executiveSummary.overallRating === "ممتاز" ? "text-green-400" :
                              analysisResults.executiveSummary.overallRating === "جيد جداً" ? "text-blue-400" :
                              analysisResults.executiveSummary.overallRating === "جيد" ? "text-yellow-400" :
                              analysisResults.executiveSummary.overallRating === "مقبول" ? "text-orange-400" :
                              "text-red-400"
                            }`}>
                              {analysisResults.executiveSummary.overallRating}
                            </p>
                          </div>
                          <div className="bg-[#B48500]/10 p-4 rounded border border-[#B48500]/20">
                            <p className="text-sm text-[#8B6914]">عدد التحليلات</p>
                            <p className="text-xl font-bold">{analysisResults.metadata.totalAnalyses}</p>
                          </div>
                          <div className="bg-[#B48500]/10 p-4 rounded border border-[#B48500]/20">
                            <p className="text-sm text-[#8B6914]">وقت المعالجة</p>
                            <p className="text-xl font-bold">{analysisResults.metadata.processingTime}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
                          <div className="text-center p-2 bg-[#B48500]/5 rounded">
                            <p className="text-xs text-[#8B6914]">السيولة</p>
                            <p className="font-bold">{analysisResults.executiveSummary.keyMetrics.liquidity.toFixed(2)}</p>
                          </div>
                          <div className="text-center p-2 bg-[#B48500]/5 rounded">
                            <p className="text-xs text-[#8B6914]">الربحية</p>
                            <p className="font-bold">{analysisResults.executiveSummary.keyMetrics.profitability.toFixed(2)}</p>
                          </div>
                          <div className="text-center p-2 bg-[#B48500]/5 rounded">
                            <p className="text-xs text-[#8B6914]">الرفع المالي</p>
                            <p className="font-bold">{analysisResults.executiveSummary.keyMetrics.leverage.toFixed(2)}</p>
                          </div>
                          <div className="text-center p-2 bg-[#B48500]/5 rounded">
                            <p className="text-xs text-[#8B6914]">النشاط</p>
                            <p className="font-bold">{analysisResults.executiveSummary.keyMetrics.activity.toFixed(2)}</p>
                          </div>
                          <div className="text-center p-2 bg-[#B48500]/5 rounded">
                            <p className="text-xs text-[#8B6914]">النمو</p>
                            <p className="font-bold">{analysisResults.executiveSummary.keyMetrics.growth.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* SWOT Analysis */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">تحليل SWOT</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-green-900/20 p-4 rounded border border-green-500/20">
                            <h4 className="font-semibold text-green-400 mb-2">نقاط القوة</h4>
                            <ul className="space-y-1">
                              {analysisResults.executiveSummary.swot.strengths.map((strength, idx) => (
                                <li key={idx} className="text-sm flex items-start">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span>{strength}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-red-900/20 p-4 rounded border border-red-500/20">
                            <h4 className="font-semibold text-red-400 mb-2">نقاط الضعف</h4>
                            <ul className="space-y-1">
                              {analysisResults.executiveSummary.swot.weaknesses.map((weakness, idx) => (
                                <li key={idx} className="text-sm flex items-start">
                                  <AlertCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span>{weakness}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-blue-900/20 p-4 rounded border border-blue-500/20">
                            <h4 className="font-semibold text-blue-400 mb-2">الفرص</h4>
                            <ul className="space-y-1">
                              {analysisResults.executiveSummary.swot.opportunities.map((opportunity, idx) => (
                                <li key={idx} className="text-sm flex items-start">
                                  <TrendingUp className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span>{opportunity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-orange-900/20 p-4 rounded border border-orange-500/20">
                            <h4 className="font-semibold text-orange-400 mb-2">التهديدات</h4>
                            <ul className="space-y-1">
                              {analysisResults.executiveSummary.swot.threats.map((threat, idx) => (
                                <li key={idx} className="text-sm flex items-start">
                                  <AlertCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span>{threat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      {/* Key Risks and Forecasts */}
                      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-red-900/20 p-4 rounded border border-red-500/20">
                          <h4 className="font-semibold text-red-400 mb-2">المخاطر الرئيسية</h4>
                          <ul className="space-y-1">
                            {analysisResults.executiveSummary.keyRisks.map((risk, idx) => (
                              <li key={idx} className="text-sm flex items-start">
                                <AlertCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span>{risk}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-blue-900/20 p-4 rounded border border-blue-500/20">
                          <h4 className="font-semibold text-blue-400 mb-2">التنبؤات</h4>
                          <ul className="space-y-1">
                            {analysisResults.executiveSummary.forecasts.map((forecast, idx) => (
                              <li key={idx} className="text-sm flex items-start">
                                <TrendingUp className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span>{forecast}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      {/* Strategic Recommendations */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">التوصيات الاستراتيجية</h3>
                        <div className="bg-[#B48500]/5 p-4 rounded border border-[#B48500]/20">
                          <ul className="space-y-2">
                            {analysisResults.executiveSummary.strategicRecommendations.map((rec, idx) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      {/* Detailed Analysis Results */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">نتائج التحليل التفصيلية</h3>
                        <div className="space-y-4">
                          {analysisResults.detailedResults.map((result, index) => (
                            <Card key={result.id} className="bg-black border-[#B48500]">
                              <CardHeader>
                                <CardTitle className="text-[#B48500] flex justify-between items-center">
                                  <span>{result.nameAr}</span>
                                  <span className={`px-2 py-1 rounded text-xs ${
                                    result.status === "ممتاز" ? "bg-green-500/20 text-green-300" :
                                    result.status === "جيد جداً" ? "bg-blue-500/20 text-blue-300" :
                                    result.status === "جيد" ? "bg-yellow-500/20 text-yellow-300" :
                                    result.status === "مقبول" ? "bg-orange-500/20 text-orange-300" :
                                    "bg-red-500/20 text-red-300"
                                  }`}>
                                    {result.status}
                                  </span>
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-[#8B6914] mb-1">القيمة</p>
                                    <p className="font-bold text-lg">{typeof result.value === 'number' ? result.value.toFixed(2) : JSON.stringify(result.value)}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-[#8B6914] mb-1">طريقة الحساب</p>
                                    <p className="text-sm">{result.calculationMethod}</p>
                                  </div>
                                  {result.industryBenchmark && (
                                    <div>
                                      <p className="text-sm text-[#8B6914] mb-1">متوسط الصناعة</p>
                                      <p className="font-bold">{result.industryBenchmark.toFixed(2)}</p>
                                    </div>
                                  )}
                                  {result.riskLevel && (
                                    <div>
                                      <p className="text-sm text-[#8B6914] mb-1">مستوى المخاطر</p>
                                      <p className={`font-bold ${
                                        result.riskLevel === "منخفض" ? "text-green-400" :
                                        result.riskLevel === "متوسط" ? "text-yellow-400" :
                                        result.riskLevel === "مرتفع" ? "text-orange-400" :
                                        "text-red-400"
                                      }`}>
                                        {result.riskLevel}
                                      </p>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="mt-3">
                                  <p className="text-sm text-[#8B6914] mb-1">الوصف</p>
                                  <p className="text-sm">{result.description}</p>
                                </div>
                                
                                {result.recommendations && result.recommendations.length > 0 && (
                                  <div className="mt-3">
                                    <p className="text-sm text-[#8B6914] mb-1">التوصيات</p>
                                    <ul className="text-sm space-y-1">
                                      {result.recommendations.map((rec, idx) => (
                                        <li key={idx} className="flex items-start">
                                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                          <span>{rec}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3">التوصيات</h3>
                        <ul className="space-y-2">
                          {analysisResults.results.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="text-center">
                    <Button
                      onClick={() => setActiveTab("history")}
                      variant="outline"
                      className="border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      عرض سجل التحليلات
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <BarChart className="w-16 h-16 mx-auto text-[#8B6914] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">لا توجد نتائج تحليل</h3>
                  <p className="text-[#8B6914] mb-6">يرجى إجراء تحليل مالي أولاً لعرض النتائج</p>
                  <Button
                    onClick={() => setActiveTab("analyze")}
                    className="bg-[#B48500] text-black hover:bg-[#8B6914]"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    بدء التحليل
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">سجل التحليلات السابقة</h2>
              
              {analysisHistory.length > 0 ? (
                <div className="space-y-4">
                  {analysisHistory.map((analysis, index) => (
                    <Card key={index} className="bg-black border-[#B48500]">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-[#B48500]">
                            تحليل شركة {analysis.metadata.companyName}
                          </CardTitle>
                          <span className="text-sm text-[#8B6914]">
                            {new Date(analysis.timestamp).toLocaleDateString("ar-SA")}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-[#8B6914]">نوع التحليل</p>
                            <p className="font-medium">
                              {analysis.metadata.analysisTypeName}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-[#8B6914]">عدد التحليلات</p>
                            <p className="font-medium">{analysis.metadata.totalAnalyses} تحليل</p>
                          </div>
                          <div>
                            <p className="text-sm text-[#8B6914]">وقت المعالجة</p>
                            <p className="font-medium">{analysis.metadata.processingTime}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            onClick={() => {
                              setAnalysisResults(analysis)
                              setActiveTab("results")
                            }}
                            variant="outline"
                            className="border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            عرض التحليل
                          </Button>
                          <Button
                            onClick={() => downloadReport("PDF")}
                            variant="outline"
                            className="border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            تنزيل التقرير
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 mx-auto text-[#8B6914] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">لا توجد تحليلات سابقة</h3>
                  <p className="text-[#8B6914] mb-6">سيتم عرض سجل التحليلات هنا بعد إجرائها</p>
                  <Button
                    onClick={() => setActiveTab("analyze")}
                    className="bg-[#B48500] text-black hover:bg-[#8B6914]"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    بدء تحليل جديد
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Reset Button */}
        <div className="mt-6 text-center">
          <Button
            onClick={resetAnalysis}
            variant="outline"
            className="border-[#B48500] text-[#B48500] hover:bg-[#B48500] hover:text-black"
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            إعادة تعيين التحليل
          </Button>
        </div>
      </div>
    </div>
  )
}