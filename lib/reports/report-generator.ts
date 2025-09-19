// Comprehensive Report Generation System for FinClick.AI
// Generates PDF, Word, Excel, and PowerPoint reports

import jsPDF from 'jspdf'
import 'jspdf-autotable'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import mammoth from 'mammoth'
import PptxGenJS from 'pptxgenjs'

export interface ReportData {
  companyName: string
  analysisDate: Date
  analysisType: 'classical' | 'applied' | 'advanced' | 'comprehensive'
  financialData: any
  analysisResults: any[]
  benchmarkData?: any
  recommendations?: string[]
  riskAssessment?: any
  forecast?: any
  swotAnalysis?: any
  language: 'ar' | 'en'
}

export interface ReportOptions {
  format: 'pdf' | 'word' | 'excel' | 'powerpoint'
  template: 'standard' | 'executive' | 'detailed' | 'investor'
  includeCharts: boolean
  includeBenchmarks: boolean
  includeRecommendations: boolean
  includeAppendix: boolean
  customLogo?: string
  branding: {
    primaryColor: string
    secondaryColor: string
    companyName: string
  }
}

class ReportGenerator {
  private static instance: ReportGenerator
  private arabicFont: any = null

  static getInstance(): ReportGenerator {
    if (!ReportGenerator.instance) {
      ReportGenerator.instance = new ReportGenerator()
    }
    return ReportGenerator.instance
  }

  // Main report generation method
  async generateReport(data: ReportData, options: ReportOptions): Promise<Blob> {
    try {
      switch (options.format) {
        case 'pdf':
          return await this.generatePDFReport(data, options)
        case 'word':
          return await this.generateWordReport(data, options)
        case 'excel':
          return await this.generateExcelReport(data, options)
        case 'powerpoint':
          return await this.generatePowerPointReport(data, options)
        default:
          throw new Error(`Unsupported report format: ${options.format}`)
      }
    } catch (error) {
      console.error('Report generation failed:', error)
      throw error
    }
  }

  // PDF Report Generation
  private async generatePDFReport(data: ReportData, options: ReportOptions): Promise<Blob> {
    const doc = new jsPDF('p', 'mm', 'a4')
    
    // Load Arabic font if needed
    if (data.language === 'ar' && !this.arabicFont) {
      // In production, you would load a proper Arabic font
      // For now, we'll use default with RTL support
    }

    let yPosition = 20

    // Header and Logo
    if (options.customLogo) {
      // Add logo (would require base64 conversion)
      // doc.addImage(options.customLogo, 'PNG', 20, 10, 30, 15)
    }

    // Title
    doc.setFontSize(24)
    doc.setTextColor(180, 133, 0) // Gold color
    const title = data.language === 'ar' 
      ? `تقرير التحليل المالي الشامل - ${data.companyName}`
      : `Comprehensive Financial Analysis Report - ${data.companyName}`
    
    doc.text(title, 20, yPosition, { align: data.language === 'ar' ? 'right' : 'left' })
    yPosition += 15

    // Date and Analysis Type
    doc.setFontSize(12)
    doc.setTextColor(50, 50, 50)
    const dateText = data.language === 'ar' 
      ? `تاريخ التحليل: ${data.analysisDate.toLocaleDateString('ar-SA')}`
      : `Analysis Date: ${data.analysisDate.toLocaleDateString('en-US')}`
    
    doc.text(dateText, 20, yPosition)
    yPosition += 10

    const typeText = data.language === 'ar' 
      ? `نوع التحليل: ${this.getAnalysisTypeText(data.analysisType, 'ar')}`
      : `Analysis Type: ${this.getAnalysisTypeText(data.analysisType, 'en')}`
    
    doc.text(typeText, 20, yPosition)
    yPosition += 20

    // Executive Summary
    doc.setFontSize(16)
    doc.setTextColor(180, 133, 0)
    const summaryTitle = data.language === 'ar' ? 'الملخص التنفيذي' : 'Executive Summary'
    doc.text(summaryTitle, 20, yPosition)
    yPosition += 10

    doc.setFontSize(10)
    doc.setTextColor(50, 50, 50)
    const summaryText = this.generateExecutiveSummary(data)
    const splitSummary = doc.splitTextToSize(summaryText, 170)
    doc.text(splitSummary, 20, yPosition)
    yPosition += splitSummary.length * 5 + 10

    // Financial Ratios Table
    if (data.analysisResults && data.analysisResults.length > 0) {
      yPosition = this.addFinancialRatiosTable(doc, data, yPosition)
    }

    // Add new page for detailed results
    doc.addPage()
    yPosition = 20

    // Detailed Analysis Results
    yPosition = this.addDetailedAnalysis(doc, data, yPosition)

    // Recommendations
    if (options.includeRecommendations && data.recommendations) {
      yPosition = this.addRecommendations(doc, data, yPosition)
    }

    // SWOT Analysis
    if (data.swotAnalysis) {
      yPosition = this.addSWOTAnalysis(doc, data, yPosition)
    }

    // Footer
    this.addFooter(doc, options.branding)

    return new Blob([doc.output('blob')], { type: 'application/pdf' })
  }

  // Excel Report Generation
  private async generateExcelReport(data: ReportData, options: ReportOptions): Promise<Blob> {
    const workbook = XLSX.utils.book_new()

    // Summary Sheet
    const summaryData = [
      [data.language === 'ar' ? 'اسم الشركة' : 'Company Name', data.companyName],
      [data.language === 'ar' ? 'تاريخ التحليل' : 'Analysis Date', data.analysisDate.toLocaleDateString()],
      [data.language === 'ar' ? 'نوع التحليل' : 'Analysis Type', this.getAnalysisTypeText(data.analysisType, data.language)],
      [''],
      [data.language === 'ar' ? 'ملخص النتائج' : 'Results Summary'],
    ]

    if (data.analysisResults) {
      summaryData.push([''], [data.language === 'ar' ? 'النسب المالية' : 'Financial Ratios'])
      data.analysisResults.slice(0, 20).forEach(result => {
        summaryData.push([
          result.analysisType?.nameAr || result.name || 'Analysis',
          result.calculation?.value || result.value || 'N/A',
          result.calculation?.unit || result.unit || '',
          result.interpretation || 'No interpretation'
        ])
      })
    }

    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData)
    XLSX.utils.book_append_sheet(workbook, summarySheet, data.language === 'ar' ? 'الملخص' : 'Summary')

    // Detailed Results Sheet
    if (data.analysisResults && data.analysisResults.length > 0) {
      const detailedData = [
        [
          data.language === 'ar' ? 'نوع التحليل' : 'Analysis Type',
          data.language === 'ar' ? 'القيمة' : 'Value',
          data.language === 'ar' ? 'الوحدة' : 'Unit',
          data.language === 'ar' ? 'التفسير' : 'Interpretation',
          data.language === 'ar' ? 'مستوى المخاطر' : 'Risk Level'
        ]
      ]

      data.analysisResults.forEach(result => {
        detailedData.push([
          result.analysisType?.nameAr || result.name || 'Analysis',
          result.calculation?.value || result.value || 'N/A',
          result.calculation?.unit || result.unit || '',
          result.interpretation || 'No interpretation',
          result.riskAssessment?.level || 'N/A'
        ])
      })

      const detailedSheet = XLSX.utils.aoa_to_sheet(detailedData)
      XLSX.utils.book_append_sheet(workbook, detailedSheet, data.language === 'ar' ? 'التفاصيل' : 'Details')
    }

    // Financial Data Sheet
    if (data.financialData) {
      const financialSheet = this.createFinancialDataSheet(data.financialData, data.language)
      XLSX.utils.book_append_sheet(workbook, financialSheet, data.language === 'ar' ? 'البيانات المالية' : 'Financial Data')
    }

    // Recommendations Sheet
    if (data.recommendations && data.recommendations.length > 0) {
      const recommendationsData = [
        [data.language === 'ar' ? 'التوصيات' : 'Recommendations'],
        ['']
      ]
      
      data.recommendations.forEach((recommendation, index) => {
        recommendationsData.push([`${index + 1}. ${recommendation}`])
      })

      const recommendationsSheet = XLSX.utils.aoa_to_sheet(recommendationsData)
      XLSX.utils.book_append_sheet(workbook, recommendationsSheet, data.language === 'ar' ? 'التوصيات' : 'Recommendations')
    }

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    return new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  }

  // PowerPoint Report Generation
  private async generatePowerPointReport(data: ReportData, options: ReportOptions): Promise<Blob> {
    const pptx = new PptxGenJS()

    // Set presentation properties
    pptx.author = 'FinClick.AI'
    pptx.company = options.branding.companyName
    pptx.title = data.language === 'ar' 
      ? `تقرير التحليل المالي - ${data.companyName}`
      : `Financial Analysis Report - ${data.companyName}`

    // Title Slide
    const titleSlide = pptx.addSlide()
    titleSlide.addText(
      data.language === 'ar' 
        ? `تقرير التحليل المالي الشامل`
        : 'Comprehensive Financial Analysis Report',
      {
        x: 1,
        y: 2,
        w: 8,
        h: 1.5,
        fontSize: 32,
        color: 'B48500',
        bold: true,
        align: 'center'
      }
    )

    titleSlide.addText(data.companyName, {
      x: 1,
      y: 3.5,
      w: 8,
      h: 1,
      fontSize: 24,
      color: '333333',
      align: 'center'
    })

    titleSlide.addText(
      data.analysisDate.toLocaleDateString(data.language === 'ar' ? 'ar-SA' : 'en-US'),
      {
        x: 1,
        y: 5,
        w: 8,
        h: 0.5,
        fontSize: 16,
        color: '666666',
        align: 'center'
      }
    )

    // Executive Summary Slide
    const summarySlide = pptx.addSlide()
    summarySlide.addText(
      data.language === 'ar' ? 'الملخص التنفيذي' : 'Executive Summary',
      {
        x: 0.5,
        y: 0.5,
        w: 9,
        h: 1,
        fontSize: 24,
        color: 'B48500',
        bold: true
      }
    )

    const summaryPoints = this.getExecutiveSummaryPoints(data)
    summarySlide.addText(summaryPoints, {
      x: 0.5,
      y: 1.5,
      w: 9,
      h: 5,
      fontSize: 14,
      color: '333333'
    })

    // Key Ratios Slide
    if (data.analysisResults && data.analysisResults.length > 0) {
      const ratiosSlide = pptx.addSlide()
      ratiosSlide.addText(
        data.language === 'ar' ? 'النسب المالية الرئيسية' : 'Key Financial Ratios',
        {
          x: 0.5,
          y: 0.5,
          w: 9,
          h: 1,
          fontSize: 24,
          color: 'B48500',
          bold: true
        }
      )

      const tableData = this.prepareRatiosTableData(data.analysisResults.slice(0, 10), data.language)
      ratiosSlide.addTable(tableData, {
        x: 0.5,
        y: 1.5,
        w: 9,
        h: 4.5,
        colW: [4, 2, 3],
        fontSize: 12,
        color: '333333'
      })
    }

    // Recommendations Slide
    if (data.recommendations && data.recommendations.length > 0) {
      const recsSlide = pptx.addSlide()
      recsSlide.addText(
        data.language === 'ar' ? 'التوصيات الرئيسية' : 'Key Recommendations',
        {
          x: 0.5,
          y: 0.5,
          w: 9,
          h: 1,
          fontSize: 24,
          color: 'B48500',
          bold: true
        }
      )

      const recsText = data.recommendations.slice(0, 5).map((rec, idx) => `${idx + 1}. ${rec}`).join('\n\n')
      recsSlide.addText(recsText, {
        x: 0.5,
        y: 1.5,
        w: 9,
        h: 5,
        fontSize: 14,
        color: '333333'
      })
    }

    return new Blob([await pptx.write('blob')], { 
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' 
    })
  }

  // Word Report Generation
  private async generateWordReport(data: ReportData, options: ReportOptions): Promise<Blob> {
    // Create a simple HTML structure that can be converted to Word
    const htmlContent = this.generateWordHTML(data, options)
    
    // Convert HTML to Word document
    const wordBlob = new Blob([htmlContent], { 
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
    })
    
    return wordBlob
  }

  // Helper Methods
  private generateWordHTML(data: ReportData, options: ReportOptions): string {
    const isArabic = data.language === 'ar'
    
    return `
    <!DOCTYPE html>
    <html dir="${isArabic ? 'rtl' : 'ltr'}" lang="${data.language}">
    <head>
        <meta charset="UTF-8">
        <title>${isArabic ? 'تقرير التحليل المالي' : 'Financial Analysis Report'}</title>
        <style>
            body { font-family: ${isArabic ? 'Arial, sans-serif' : 'Arial, sans-serif'}; margin: 20px; }
            .header { color: #B48500; text-align: center; margin-bottom: 30px; }
            .section { margin-bottom: 25px; }
            .section-title { color: #B48500; font-size: 18px; font-weight: bold; margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: ${isArabic ? 'right' : 'left'}; }
            th { background-color: #f5f5f5; font-weight: bold; }
            .recommendation { margin-bottom: 10px; padding: 10px; background-color: #f9f9f9; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>${isArabic ? 'تقرير التحليل المالي الشامل' : 'Comprehensive Financial Analysis Report'}</h1>
            <h2>${data.companyName}</h2>
            <p>${data.analysisDate.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}</p>
        </div>
        
        <div class="section">
            <h3 class="section-title">${isArabic ? 'الملخص التنفيذي' : 'Executive Summary'}</h3>
            <p>${this.generateExecutiveSummary(data)}</p>
        </div>
        
        ${this.generateWordAnalysisSection(data)}
        
        ${data.recommendations ? this.generateWordRecommendations(data.recommendations, isArabic) : ''}
        
        <div class="section">
            <p><strong>${isArabic ? 'تم إنشاؤه بواسطة' : 'Generated by'}:</strong> FinClick.AI</p>
            <p><strong>${isArabic ? 'التاريخ' : 'Date'}:</strong> ${new Date().toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}</p>
        </div>
    </body>
    </html>
    `
  }

  private generateWordAnalysisSection(data: ReportData): string {
    if (!data.analysisResults || data.analysisResults.length === 0) return ''
    
    const isArabic = data.language === 'ar'
    let html = `<div class="section">
        <h3 class="section-title">${isArabic ? 'نتائج التحليل المالي' : 'Financial Analysis Results'}</h3>
        <table>`
    
    html += `<tr>
        <th>${isArabic ? 'نوع التحليل' : 'Analysis Type'}</th>
        <th>${isArabic ? 'القيمة' : 'Value'}</th>
        <th>${isArabic ? 'التفسير' : 'Interpretation'}</th>
    </tr>`
    
    data.analysisResults.slice(0, 20).forEach(result => {
      html += `<tr>
        <td>${result.analysisType?.nameAr || result.name || 'Analysis'}</td>
        <td>${result.calculation?.value || result.value || 'N/A'}</td>
        <td>${result.interpretation || 'No interpretation available'}</td>
      </tr>`
    })
    
    html += '</table></div>'
    return html
  }

  private generateWordRecommendations(recommendations: string[], isArabic: boolean): string {
    let html = `<div class="section">
        <h3 class="section-title">${isArabic ? 'التوصيات' : 'Recommendations'}</h3>`
    
    recommendations.forEach((rec, index) => {
      html += `<div class="recommendation">${index + 1}. ${rec}</div>`
    })
    
    html += '</div>'
    return html
  }

  private generateExecutiveSummary(data: ReportData): string {
    const isArabic = data.language === 'ar'
    
    if (isArabic) {
      return `تم إجراء تحليل مالي شامل لشركة ${data.companyName} باستخدام ${data.analysisResults?.length || 0} نوع من التحليلات المالية المتقدمة. ` +
             `يشمل التحليل دراسة شاملة للوضع المالي للشركة، تقييم الأداء، وتحليل المخاطر المالية. ` +
             `تم تطبيق أحدث تقنيات الذكاء الاصطناعي للحصول على نتائج دقيقة وتوصيات عملية.`
    } else {
      return `A comprehensive financial analysis was conducted for ${data.companyName} using ${data.analysisResults?.length || 0} advanced financial analysis types. ` +
             `The analysis includes a thorough study of the company's financial position, performance evaluation, and financial risk analysis. ` +
             `Latest AI technologies were applied to achieve accurate results and practical recommendations.`
    }
  }

  private getExecutiveSummaryPoints(data: ReportData): string {
    const isArabic = data.language === 'ar'
    const points = []
    
    if (isArabic) {
      points.push(`• تم تحليل ${data.analysisResults?.length || 0} نسبة مالية متقدمة`)
      points.push(`• نوع التحليل: ${this.getAnalysisTypeText(data.analysisType, 'ar')}`)
      points.push('• تطبيق تقنيات الذكاء الاصطناعي المتقدمة')
      points.push('• توصيات عملية لتحسين الأداء المالي')
      if (data.riskAssessment) points.push('• تقييم شامل للمخاطر المالية')
    } else {
      points.push(`• Analyzed ${data.analysisResults?.length || 0} advanced financial ratios`)
      points.push(`• Analysis Type: ${this.getAnalysisTypeText(data.analysisType, 'en')}`)
      points.push('• Applied advanced AI technologies')
      points.push('• Practical recommendations for performance improvement')
      if (data.riskAssessment) points.push('• Comprehensive financial risk assessment')
    }
    
    return points.join('\n')
  }

  private getAnalysisTypeText(type: string, language: 'ar' | 'en'): string {
    const types = {
      classical: { ar: 'التحليل الأساسي الكلاسيكي', en: 'Classical Basic Analysis' },
      applied: { ar: 'التحليل التطبيقي المتوسط', en: 'Applied Intermediate Analysis' },
      advanced: { ar: 'التحليل المتقدم والمتطور', en: 'Advanced Analysis' },
      comprehensive: { ar: 'التحليل الشامل', en: 'Comprehensive Analysis' }
    }
    
    return types[type as keyof typeof types]?.[language] || type
  }

  private addFinancialRatiosTable(doc: any, data: ReportData, yPosition: number): number {
    if (!data.analysisResults || data.analysisResults.length === 0) return yPosition

    const isArabic = data.language === 'ar'
    
    // Table headers
    const headers = isArabic 
      ? [['نوع التحليل', 'القيمة', 'الوحدة', 'التفسير']]
      : [['Analysis Type', 'Value', 'Unit', 'Interpretation']]

    // Table data (first 10 results)
    const tableData = data.analysisResults.slice(0, 10).map(result => [
      result.analysisType?.nameAr || result.name || 'Analysis',
      (result.calculation?.value || result.value || 'N/A').toString(),
      result.calculation?.unit || result.unit || '',
      (result.interpretation || 'No interpretation').substring(0, 50) + '...'
    ])

    // Add table using autoTable plugin
    ;(doc as any).autoTable({
      head: headers,
      body: tableData,
      startY: yPosition,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [180, 133, 0],
        textColor: [0, 0, 0],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      }
    })

    return (doc as any).lastAutoTable.finalY + 10
  }

  private addDetailedAnalysis(doc: any, data: ReportData, yPosition: number): number {
    const isArabic = data.language === 'ar'
    
    doc.setFontSize(16)
    doc.setTextColor(180, 133, 0)
    const title = isArabic ? 'تفاصيل التحليل المالي' : 'Detailed Financial Analysis'
    doc.text(title, 20, yPosition)
    yPosition += 15

    if (data.analysisResults && data.analysisResults.length > 0) {
      doc.setFontSize(10)
      doc.setTextColor(50, 50, 50)
      
      // Group results by category
      const categories = this.groupAnalysisByCategory(data.analysisResults)
      
      Object.entries(categories).forEach(([category, results]) => {
        doc.setFontSize(12)
        doc.setTextColor(180, 133, 0)
        doc.text(category, 20, yPosition)
        yPosition += 8

        doc.setFontSize(9)
        doc.setTextColor(50, 50, 50)
        
        results.forEach(result => {
          const text = `${result.analysisType?.nameAr || result.name}: ${result.calculation?.value || result.value} - ${result.interpretation || 'No interpretation'}`
          const splitText = doc.splitTextToSize(text, 170)
          doc.text(splitText, 25, yPosition)
          yPosition += splitText.length * 4 + 2
        })
        yPosition += 5
      })
    }

    return yPosition
  }

  private addRecommendations(doc: any, data: ReportData, yPosition: number): number {
    if (!data.recommendations || data.recommendations.length === 0) return yPosition

    const isArabic = data.language === 'ar'
    
    doc.setFontSize(16)
    doc.setTextColor(180, 133, 0)
    const title = isArabic ? 'التوصيات' : 'Recommendations'
    doc.text(title, 20, yPosition)
    yPosition += 15

    doc.setFontSize(10)
    doc.setTextColor(50, 50, 50)
    
    data.recommendations.forEach((recommendation, index) => {
      const text = `${index + 1}. ${recommendation}`
      const splitText = doc.splitTextToSize(text, 170)
      doc.text(splitText, 20, yPosition)
      yPosition += splitText.length * 5 + 5
    })

    return yPosition + 10
  }

  private addSWOTAnalysis(doc: any, data: ReportData, yPosition: number): number {
    if (!data.swotAnalysis) return yPosition

    const isArabic = data.language === 'ar'
    
    doc.setFontSize(16)
    doc.setTextColor(180, 133, 0)
    const title = isArabic ? 'تحليل SWOT' : 'SWOT Analysis'
    doc.text(title, 20, yPosition)
    yPosition += 15

    const sections = [
      { key: 'strengths', title: isArabic ? 'نقاط القوة' : 'Strengths' },
      { key: 'weaknesses', title: isArabic ? 'نقاط الضعف' : 'Weaknesses' },
      { key: 'opportunities', title: isArabic ? 'الفرص' : 'Opportunities' },
      { key: 'threats', title: isArabic ? 'التهديدات' : 'Threats' }
    ]

    sections.forEach(section => {
      if (data.swotAnalysis[section.key] && data.swotAnalysis[section.key].length > 0) {
        doc.setFontSize(12)
        doc.setTextColor(180, 133, 0)
        doc.text(section.title, 20, yPosition)
        yPosition += 8

        doc.setFontSize(9)
        doc.setTextColor(50, 50, 50)
        
        data.swotAnalysis[section.key].forEach((item: string) => {
          const text = `• ${item}`
          const splitText = doc.splitTextToSize(text, 170)
          doc.text(splitText, 25, yPosition)
          yPosition += splitText.length * 4 + 2
        })
        yPosition += 5
      }
    })

    return yPosition
  }

  private addFooter(doc: any, branding: any): void {
    const pageCount = doc.internal.getNumberOfPages()
    
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(128, 128, 128)
      
      // Footer text
      doc.text('Generated by FinClick.AI - Revolutionary Intelligent Financial Analysis Platform', 20, 285)
      doc.text(`Page ${i} of ${pageCount}`, 180, 285)
      doc.text(new Date().toISOString().split('T')[0], 20, 290)
    }
  }

  private createFinancialDataSheet(financialData: any, language: 'ar' | 'en'): any {
    const isArabic = language === 'ar'
    
    const headers = isArabic 
      ? ['البيان', 'القيمة', 'الوحدة']
      : ['Item', 'Value', 'Unit']
    
    const data = [headers]
    
    // Add financial data rows
    if (financialData.balanceSheet) {
      const bs = financialData.balanceSheet
      data.push([isArabic ? 'الأصول المتداولة' : 'Current Assets', bs.currentAssets?.toString() || 'N/A', 'Currency'])
      data.push([isArabic ? 'إجمالي الأصول' : 'Total Assets', bs.totalAssets?.toString() || 'N/A', 'Currency'])
      data.push([isArabic ? 'الخصوم المتداولة' : 'Current Liabilities', bs.currentLiabilities?.toString() || 'N/A', 'Currency'])
      data.push([isArabic ? 'إجمالي حقوق الملكية' : 'Total Equity', bs.totalEquity?.toString() || 'N/A', 'Currency'])
    }
    
    if (financialData.incomeStatement) {
      const is = financialData.incomeStatement
      data.push([isArabic ? 'الإيرادات' : 'Revenue', is.revenue?.toString() || 'N/A', 'Currency'])
      data.push([isArabic ? 'الربح الإجمالي' : 'Gross Profit', is.grossProfit?.toString() || 'N/A', 'Currency'])
      data.push([isArabic ? 'صافي الربح' : 'Net Income', is.netIncome?.toString() || 'N/A', 'Currency'])
    }
    
    return XLSX.utils.aoa_to_sheet(data)
  }

  private prepareRatiosTableData(results: any[], language: 'ar' | 'en'): any[][] {
    const isArabic = language === 'ar'
    
    const headers = isArabic 
      ? ['نوع التحليل', 'القيمة', 'التفسير']
      : ['Analysis Type', 'Value', 'Interpretation']
    
    const data = [headers]
    
    results.forEach(result => {
      data.push([
        result.analysisType?.nameAr || result.name || 'Analysis',
        (result.calculation?.value || result.value || 'N/A').toString(),
        (result.interpretation || 'No interpretation').substring(0, 100)
      ])
    })
    
    return data
  }

  private groupAnalysisByCategory(results: any[]): { [key: string]: any[] } {
    const categories: { [key: string]: any[] } = {}
    
    results.forEach(result => {
      const category = result.analysisType?.category || result.category || 'General'
      if (!categories[category]) {
        categories[category] = []
      }
      categories[category].push(result)
    })
    
    return categories
  }

  // Public utility methods
  async downloadReport(data: ReportData, options: ReportOptions, filename?: string): Promise<void> {
    try {
      const blob = await this.generateReport(data, options)
      const defaultFilename = `${data.companyName}_Analysis_${data.analysisDate.toISOString().split('T')[0]}.${this.getFileExtension(options.format)}`
      
      saveAs(blob, filename || defaultFilename)
    } catch (error) {
      console.error('Report download failed:', error)
      throw error
    }
  }

  private getFileExtension(format: string): string {
    const extensions = {
      pdf: 'pdf',
      word: 'docx',
      excel: 'xlsx',
      powerpoint: 'pptx'
    }
    return extensions[format as keyof typeof extensions] || 'pdf'
  }

  // Report templates
  getDefaultReportOptions(): ReportOptions {
    return {
      format: 'pdf',
      template: 'standard',
      includeCharts: true,
      includeBenchmarks: true,
      includeRecommendations: true,
      includeAppendix: false,
      branding: {
        primaryColor: '#B48500',
        secondaryColor: '#8B6914',
        companyName: 'FinClick.AI'
      }
    }
  }

  // Validation
  validateReportData(data: ReportData): { valid: boolean; errors: string[] } {
    const errors: string[] = []
    
    if (!data.companyName) errors.push('Company name is required')
    if (!data.analysisDate) errors.push('Analysis date is required')
    if (!data.analysisType) errors.push('Analysis type is required')
    if (!data.language) errors.push('Language is required')
    
    return {
      valid: errors.length === 0,
      errors
    }
  }
}

// Export singleton instance
export const reportGenerator = ReportGenerator.getInstance()

export default reportGenerator
