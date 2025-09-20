// Complete Financial Analysis Engine for FinClick.AI
// Implements all 180+ financial analysis types as specified in the prompt

export interface FinancialStatements {
  balanceSheet: {
    currentAssets: number;
    cash: number;
    cashEquivalents: number;
    inventory: number;
    accountsReceivable: number;
    currentLiabilities: number;
    accountsPayable: number;
    totalAssets: number;
    totalDebt: number;
    totalEquity: number;
    totalLiabilities: number;
  };
  incomeStatement: {
    revenue: number;
    grossProfit: number;
    operatingIncome: number;
    ebit: number;
    ebitda: number;
    netIncome: number;
    costOfGoodsSold: number;
    interestExpense: number;
    nopat: number;
  };
  cashFlow: {
    operatingCashFlow: number;
    capex: number;
    freeCashFlow: number;
    principalPayments: number;
  };
  historicalData?: FinancialStatements[];
}

export interface AnalysisOptions {
  language: 'ar' | 'en';
  companyName: string;
  sector: string;
  activity: string;
  legalEntity: string;
  yearsOfAnalysis: number;
  comparisonLevel: string;
  analysisType: 'classical' | 'applied' | 'advanced' | 'comprehensive';
}

export interface AnalysisResult {
  analysisType: string;
  nameEn: string;
  nameAr: string;
  category: 'classical' | 'applied' | 'advanced';
  subcategory: string;
  calculation: any;
  interpretation: string;
  benchmark: any;
  riskAssessment: any;
  forecast: any;
  swotAnalysis: any;
  recommendations: any;
  timestamp: Date;
  language: string;
  error?: string;
}

export interface AnalysisRequest {
  type: "financial" | "market" | "risk" | "performance"
  data: any
  options?: {
    depth?: "basic" | "advanced" | "comprehensive"
    timeframe?: string
    includeRecommendations?: boolean
  }
}

// Complete implementation of all 180+ financial analysis types
export class FinancialAnalysisEngine {
  private static instance: FinancialAnalysisEngine;
  private financialData: FinancialStatements | null = null;
  private industryBenchmarks: any = null;
  private marketData: any = null;

  static getInstance(): FinancialAnalysisEngine {
    if (!FinancialAnalysisEngine.instance) {
      FinancialAnalysisEngine.instance = new FinancialAnalysisEngine();
    }
    return FinancialAnalysisEngine.instance;
  }

  // Main analysis execution method for all 180 analysis types
  async executeAnalysis(
    financialData: FinancialStatements,
    options: AnalysisOptions
  ): Promise<AnalysisResult[]> {
    this.financialData = financialData;
    
    // Fetch industry benchmarks and market data
    await this.fetchBenchmarkData(options);
    
    const results: AnalysisResult[] = [];
    
    // 1. CLASSICAL FOUNDATIONAL ANALYSIS (106 analyses)
    
    // 1.1 Structural Analysis of Financial Statements (13 types)
    results.push(...await this.performStructuralAnalysis(options));
    
    // 1.2 Financial Ratio Analysis (75 ratios)
    results.push(...await this.performRatioAnalysis(options));
    
    // 1.3 Flow and Movement Analysis (18 types)
    results.push(...await this.performFlowAnalysis(options));
    
    // 2. APPLIED INTERMEDIATE ANALYSIS (21 analyses)
    
    // 2.1 Advanced Comparative Analysis (3 types)
    results.push(...await this.performComparativeAnalysis(options));
    
    // 2.2 Valuation and Investment Analysis (13 types)
    results.push(...await this.performValuationAnalysis(options));
    
    // 2.3 Performance and Efficiency Analysis (5 types)
    results.push(...await this.performPerformanceAnalysis(options));
    
    // 3. ADVANCED AND SOPHISTICATED ANALYSIS (53 analyses)
    
    // 3.1 Modeling and Simulation (11 types)
    results.push(...await this.performModelingAnalysis(options));
    
    // 3.2 Statistical and Quantitative Analysis (16 types)
    results.push(...await this.performStatisticalAnalysis(options));
    
    // 3.3 Forecasting and Credit Scoring Models (10 types)
    results.push(...await this.performForecastingAnalysis(options));
    
    // 3.4 Quantitative Risk Analysis (25 types)
    results.push(...await this.performRiskAnalysis(options));
    
    // 3.5 Portfolio and Investment Analysis (14 types)
    results.push(...await this.performPortfolioAnalysis(options));
    
    // 3.6 M&A Analysis (5 types)
    results.push(...await this.performMAAnalysis(options));
    
    // 3.7 Quantitative Detection and Forecasting Techniques (10 types)
    results.push(...await this.performDetectionAnalysis(options));
    
    // 3.8 Time Series Statistical Analysis (6 types)
    results.push(...await this.performTimeSeriesAnalysis(options));
    
    return results;
  }

  // 1.1 Structural Analysis of Financial Statements (13 types)
  private async performStructuralAnalysis(options: AnalysisOptions): Promise<AnalysisResult[]> {
    const results: AnalysisResult[] = [];
    
    // Vertical Analysis
    results.push(this.createAnalysisResult(
      'vertical_analysis',
      'Vertical Analysis',
      'التحليل الرأسي',
      'classical',
      'structural',
      this.calculateVerticalAnalysis(),
      options.language
    ));
    
    // Horizontal Analysis
    results.push(this.createAnalysisResult(
      'horizontal_analysis',
      'Horizontal Analysis',
      'التحليل الأفقي',
      'classical',
      'structural',
      this.calculateHorizontalAnalysis(),
      options.language
    ));
    
    // Mixed Analysis
    results.push(this.createAnalysisResult(
      'mixed_analysis',
      'Mixed Analysis',
      'التحليل المختلط',
      'classical',
      'structural',
      this.calculateMixedAnalysis(),
      options.language
    ));
    
    // Trend Analysis
    results.push(this.createAnalysisResult(
      'trend_analysis',
      'Trend Analysis',
      'تحليل الاتجاه',
      'classical',
      'structural',
      this.calculateTrendAnalysis(),
      options.language
    ));
    
    // Comparative Analysis
    results.push(this.createAnalysisResult(
      'comparative_analysis',
      'Comparative Analysis',
      'التحليل المقارن الأساسي',
      'classical',
      'structural',
      this.calculateComparativeAnalysis(),
      options.language
    ));
    
    // Value Added Analysis
    results.push(this.createAnalysisResult(
      'value_added_analysis',
      'Value Added Analysis',
      'تحليل القيمة المضافة',
      'classical',
      'structural',
      this.calculateValueAddedAnalysis(),
      options.language
    ));
    
    // Common Size Analysis
    results.push(this.createAnalysisResult(
      'common_size_analysis',
      'Common Size Analysis',
      'تحليل الأساس المشترك',
      'classical',
      'structural',
      this.calculateCommonSizeAnalysis(),
      options.language
    ));
    
    // Simple Time Series Analysis
    results.push(this.createAnalysisResult(
      'time_series_analysis',
      'Time Series Analysis',
      'تحليل السلاسل الزمنية البسيط',
      'classical',
      'structural',
      this.calculateTimeSeriesAnalysis(),
      options.language
    ));
    
    // Relative Change Analysis
    results.push(this.createAnalysisResult(
      'relative_change_analysis',
      'Relative Change Analysis',
      'تحليل التغيرات النسبية',
      'classical',
      'structural',
      this.calculateRelativeChangeAnalysis(),
      options.language
    ));
    
    // Growth Rate Analysis
    results.push(this.createAnalysisResult(
      'growth_rate_analysis',
      'Growth Rate Analysis',
      'تحليل معدلات النمو',
      'classical',
      'structural',
      this.calculateGrowthRateAnalysis(),
      options.language
    ));
    
    // Variance Analysis
    results.push(this.createAnalysisResult(
      'variance_analysis',
      'Variance Analysis',
      'تحليل الانحرافات الأساسي',
      'classical',
      'structural',
      this.calculateVarianceAnalysis(),
      options.language
    ));
    
    // Simple Variance Analysis
    results.push(this.createAnalysisResult(
      'simple_variance_analysis',
      'Simple Variance Analysis',
      'تحليل التباين البسيط',
      'classical',
      'structural',
      this.calculateSimpleVarianceAnalysis(),
      options.language
    ));
    
    // Benchmark Analysis
    results.push(this.createAnalysisResult(
      'benchmark_analysis',
      'Benchmark Analysis',
      'تحليل الأرقام القياسية',
      'classical',
      'structural',
      this.calculateBenchmarkAnalysis(),
      options.language
    ));
    
    return results;
  }

  // 1.2 Financial Ratio Analysis (75 ratios)
  private async performRatioAnalysis(options: AnalysisOptions): Promise<AnalysisResult[]> {
    const results: AnalysisResult[] = [];
    
    // Liquidity Ratios (10 ratios)
    results.push(...await this.performLiquidityRatioAnalysis(options));
    
    // Activity/Efficiency Ratios (15 ratios)
    results.push(...await this.performActivityRatioAnalysis(options));
    
    // Profitability Ratios (20 ratios)
    results.push(...await this.performProfitabilityRatioAnalysis(options));
    
    // Leverage/Debt Ratios (15 ratios)
    results.push(...await this.performLeverageRatioAnalysis(options));
    
    // Market Ratios (15 ratios)
    results.push(...await this.performMarketRatioAnalysis(options));
    
    return results;
  }

  // Liquidity Ratios (10 ratios)
  private async performLiquidityRatioAnalysis(options: AnalysisOptions): Promise<AnalysisResult[]> {
    const results: AnalysisResult[] = [];
    
    // Current Ratio
    results.push(this.createAnalysisResult(
      'current_ratio',
      'Current Ratio',
      'النسبة الجارية',
      'classical',
      'liquidity',
      this.calculateCurrentRatio(),
      options.language
    ));
    
    // Quick Ratio
    results.push(this.createAnalysisResult(
      'quick_ratio',
      'Quick Ratio',
      'النسبة السريعة',
      'classical',
      'liquidity',
      this.calculateQuickRatio(),
      options.language
    ));
    
    // Cash Ratio
    results.push(this.createAnalysisResult(
      'cash_ratio',
      'Cash Ratio',
      'نسبة النقد',
      'classical',
      'liquidity',
      this.calculateCashRatio(),
      options.language
    ));
    
    // Operating Cash Flow Ratio
    results.push(this.createAnalysisResult(
      'operating_cash_flow_ratio',
      'Operating Cash Flow Ratio',
      'نسبة التدفق النقدي التشغيلي',
      'classical',
      'liquidity',
      this.calculateOperatingCashFlowRatio(),
      options.language
    ));
    
    // Working Capital Ratio
    results.push(this.createAnalysisResult(
      'working_capital_ratio',
      'Working Capital Ratio',
      'نسبة رأس المال العامل',
      'classical',
      'liquidity',
      this.calculateWorkingCapitalRatio(),
      options.language
    ));
    
    // Defensive Interval Ratio
    results.push(this.createAnalysisResult(
      'defensive_interval_ratio',
      'Defensive Interval Ratio',
      'نسبة الفترة الدفاعية',
      'classical',
      'liquidity',
      this.calculateDefensiveIntervalRatio(),
      options.language
    ));
    
    // Cash Coverage Ratio
    results.push(this.createAnalysisResult(
      'cash_coverage_ratio',
      'Cash Coverage Ratio',
      'نسبة التغطية النقدية',
      'classical',
      'liquidity',
      this.calculateCashCoverageRatio(),
      options.language
    ));
    
    // Absolute Liquidity Ratio
    results.push(this.createAnalysisResult(
      'absolute_liquidity_ratio',
      'Absolute Liquidity Ratio',
      'نسبة السيولة المطلقة',
      'classical',
      'liquidity',
      this.calculateAbsoluteLiquidityRatio(),
      options.language
    ));
    
    // Free Cash Flow Ratio
    results.push(this.createAnalysisResult(
      'free_cash_flow_ratio',
      'Free Cash Flow Ratio',
      'نسبة التدفق النقدي الحر',
      'classical',
      'liquidity',
      this.calculateFreeCashFlowRatio(),
      options.language
    ));
    
    // Basic Liquidity Index
    results.push(this.createAnalysisResult(
      'basic_liquidity_index',
      'Basic Liquidity Index',
      'مؤشر السيولة الأساسي',
      'classical',
      'liquidity',
      this.calculateBasicLiquidityIndex(),
      options.language
    ));
    
    return results;
  }

  // Activity/Efficiency Ratios (15 ratios)
  private async performActivityRatioAnalysis(options: AnalysisOptions): Promise<AnalysisResult[]> {
    const results: AnalysisResult[] = [];
    
    // Inventory Turnover
    results.push(this.createAnalysisResult(
      'inventory_turnover',
      'Inventory Turnover',
      'معدل دوران المخزون',
      'classical',
      'activity',
      this.calculateInventoryTurnover(),
      options.language
    ));
    
    // Days Sales in Inventory
    results.push(this.createAnalysisResult(
      'inventory_days',
      'Days Sales in Inventory',
      'فترة بقاء المخزون بالأيام',
      'classical',
      'activity',
      this.calculateInventoryDays(),
      options.language
    ));
    
    // Receivables Turnover
    results.push(this.createAnalysisResult(
      'receivables_turnover',
      'Receivables Turnover',
      'معدل دوران الذمم المدينة',
      'classical',
      'activity',
      this.calculateReceivablesTurnover(),
      options.language
    ));
    
    // Days Sales Outstanding
    results.push(this.createAnalysisResult(
      'receivables_days',
      'Days Sales Outstanding',
      'فترة التحصيل للذمم المدينة',
      'classical',
      'activity',
      this.calculateReceivablesDays(),
      options.language
    ));
    
    // Payables Turnover
    results.push(this.createAnalysisResult(
      'payables_turnover',
      'Payables Turnover',
      'معدل دوران الذمم الدائنة',
      'classical',
      'activity',
      this.calculatePayablesTurnover(),
      options.language
    ));
    
    // Days Payable Outstanding
    results.push(this.createAnalysisResult(
      'payables_days',
      'Days Payable Outstanding',
      'فترة السداد للذمم الدائنة',
      'classical',
      'activity',
      this.calculatePayablesDays(),
      options.language
    ));
    
    // Cash Conversion Cycle
    results.push(this.createAnalysisResult(
      'cash_conversion_cycle',
      'Cash Conversion Cycle',
      'دورة التحويل النقدي',
      'classical',
      'activity',
      this.calculateCashConversionCycle(),
      options.language
    ));
    
    // Operating Cycle
    results.push(this.createAnalysisResult(
      'operating_cycle',
      'Operating Cycle',
      'دورة التشغيل',
      'classical',
      'activity',
      this.calculateOperatingCycle(),
      options.language
    ));
    
    // Fixed Assets Turnover
    results.push(this.createAnalysisResult(
      'fixed_assets_turnover',
      'Fixed Assets Turnover',
      'معدل دوران الأصول الثابتة',
      'classical',
      'activity',
      this.calculateFixedAssetsTurnover(),
      options.language
    ));
    
    // Total Assets Turnover
    results.push(this.createAnalysisResult(
      'total_assets_turnover',
      'Total Assets Turnover',
      'معدل دوران إجمالي الأصول',
      'classical',
      'activity',
      this.calculateTotalAssetsTurnover(),
      options.language
    ));
    
    // Working Capital Turnover
    results.push(this.createAnalysisResult(
      'working_capital_turnover',
      'Working Capital Turnover',
      'معدل دوران رأس المال العامل',
      'classical',
      'activity',
      this.calculateWorkingCapitalTurnover(),
      options.language
    ));
    
    // Net Assets Turnover
    results.push(this.createAnalysisResult(
      'net_assets_turnover',
      'Net Assets Turnover',
      'معدل دوران الأصول الصافية',
      'classical',
      'activity',
      this.calculateNetAssetsTurnover(),
      options.language
    ));
    
    // Invested Capital Turnover
    results.push(this.createAnalysisResult(
      'invested_capital_turnover',
      'Invested Capital Turnover',
      'معدل دوران رأس المال المستثمر',
      'classical',
      'activity',
      this.calculateInvestedCapitalTurnover(),
      options.language
    ));
    
    // Equity Turnover
    results.push(this.createAnalysisResult(
      'equity_turnover',
      'Equity Turnover',
      'معدل دوران حقوق الملكية',
      'classical',
      'activity',
      this.calculateEquityTurnover(),
      options.language
    ));
    
    // Total Productivity Ratio
    results.push(this.createAnalysisResult(
      'total_productivity_ratio',
      'Total Productivity Ratio',
      'نسبة الإنتاجية الإجمالية',
      'classical',
      'activity',
      this.calculateTotalProductivityRatio(),
      options.language
    ));
    
    return results;
  }

  // Profitability Ratios (20 ratios)
  private async performProfitabilityRatioAnalysis(options: AnalysisOptions): Promise<AnalysisResult[]> {
    const results: AnalysisResult[] = [];
    
    // Gross Profit Margin
    results.push(this.createAnalysisResult(
      'gross_profit_margin',
      'Gross Profit Margin',
      'هامش الربح الإجمالي',
      'classical',
      'profitability',
      this.calculateGrossProfitMargin(),
      options.language
    ));
    
    // Operating Margin
    results.push(this.createAnalysisResult(
      'operating_margin',
      'Operating Margin',
      'هامش الربح التشغيلي',
      'classical',
      'profitability',
      this.calculateOperatingMargin(),
      options.language
    ));
    
    // Net Profit Margin
    results.push(this.createAnalysisResult(
      'net_profit_margin',
      'Net Profit Margin',
      'هامش صافي الربح',
      'classical',
      'profitability',
      this.calculateNetProfitMargin(),
      options.language
    ));
    
    // EBITDA Margin
    results.push(this.createAnalysisResult(
      'ebitda_margin',
      'EBITDA Margin',
      'هامش EBITDA',
      'classical',
      'profitability',
      this.calculateEBITDAMargin(),
      options.language
    ));
    
    // Return on Assets
    results.push(this.createAnalysisResult(
      'roa',
      'Return on Assets',
      'العائد على الأصول',
      'classical',
      'profitability',
      this.calculateROA(),
      options.language
    ));
    
    // Return on Equity
    results.push(this.createAnalysisResult(
      'roe',
      'Return on Equity',
      'العائد على حقوق الملكية',
      'classical',
      'profitability',
      this.calculateROE(),
      options.language
    ));
    
    // Return on Invested Capital
    results.push(this.createAnalysisResult(
      'roic',
      'Return on Invested Capital',
      'العائد على رأس المال المستثمر',
      'classical',
      'profitability',
      this.calculateROIC(),
      options.language
    ));
    
    // Return on Capital Employed
    results.push(this.createAnalysisResult(
      'roce',
      'Return on Capital Employed',
      'العائد على رأس المال المستخدم',
      'classical',
      'profitability',
      this.calculateROCE(),
      options.language
    ));
    
    // Return on Sales
    results.push(this.createAnalysisResult(
      'ros',
      'Return on Sales',
      'العائد على المبيعات',
      'classical',
      'profitability',
      this.calculateROS(),
      options.language
    ));
    
    // Operating Cash Margin
    results.push(this.createAnalysisResult(
      'operating_cash_margin',
      'Operating Cash Margin',
      'هامش التدفق النقدي التشغيلي',
      'classical',
      'profitability',
      this.calculateOperatingCashMargin(),
      options.language
    ));
    
    // Earnings Per Share
    results.push(this.createAnalysisResult(
      'eps',
      'Earnings Per Share',
      'ربحية السهم',
      'classical',
      'profitability',
      this.calculateEPS(),
      options.language
    ));
    
    // EPS Growth
    results.push(this.createAnalysisResult(
      'eps_growth',
      'EPS Growth',
      'نمو ربحية السهم',
      'classical',
      'profitability',
      this.calculateEPSGrowth(),
      options.language
    ));
    
    // Book Value Per Share
    results.push(this.createAnalysisResult(
      'book_value_per_share',
      'Book Value Per Share',
      'القيمة الدفترية للسهم',
      'classical',
      'profitability',
      this.calculateBookValuePerShare(),
      options.language
    ));
    
    // Breakeven Point
    results.push(this.createAnalysisResult(
      'breakeven_point',
      'Breakeven Point',
      'نقطة التعادل',
      'classical',
      'profitability',
      this.calculateBreakevenPoint(),
      options.language
    ));
    
    // Margin of Safety
    results.push(this.createAnalysisResult(
      'margin_of_safety',
      'Margin of Safety',
      'هامش الأمان',
      'classical',
      'profitability',
      this.calculateMarginOfSafety(),
      options.language
    ));
    
    // Contribution Margin
    results.push(this.createAnalysisResult(
      'contribution_margin',
      'Contribution Margin',
      'هامش المساهمة',
      'classical',
      'profitability',
      this.calculateContributionMargin(),
      options.language
    ));
    
    // Return on Net Assets
    results.push(this.createAnalysisResult(
      'rona',
      'Return on Net Assets',
      'العائد على الأصول الصافية',
      'classical',
      'profitability',
      this.calculateRONA(),
      options.language
    ));
    
    // Sustainable Growth Rate
    results.push(this.createAnalysisResult(
      'sustainable_growth_rate',
      'Sustainable Growth Rate',
      'معدل النمو المستدام',
      'classical',
      'profitability',
      this.calculateSustainableGrowthRate(),
      options.language
    ));
    
    // Profitability Index
    results.push(this.createAnalysisResult(
      'profitability_index',
      'Profitability Index',
      'مؤشر الربحية',
      'classical',
      'profitability',
      this.calculateProfitabilityIndex(),
      options.language
    ));
    
    // Payback Period
    results.push(this.createAnalysisResult(
      'payback_period',
      'Payback Period',
      'فترة الاسترداد',
      'classical',
      'profitability',
      this.calculatePaybackPeriod(),
      options.language
    ));
    
    return results;
  }

  // Leverage/Debt Ratios (15 ratios)
  private async performLeverageRatioAnalysis(options: AnalysisOptions): Promise<AnalysisResult[]> {
    const results: AnalysisResult[] = [];
    
    // Debt to Assets Ratio
    results.push(this.createAnalysisResult(
      'debt_to_assets',
      'Debt to Assets Ratio',
      'نسبة الدين إلى إجمالي الأصول',
      'classical',
      'leverage',
      this.calculateDebtToAssets(),
      options.language
    ));
    
    // Debt to Equity Ratio
    results.push(this.createAnalysisResult(
      'debt_to_equity',
      'Debt to Equity Ratio',
      'نسبة الدين إلى حقوق الملكية',
      'classical',
      'leverage',
      this.calculateDebtToEquity(),
      options.language
    ));
    
    // Debt to EBITDA Ratio
    results.push(this.createAnalysisResult(
      'debt_to_ebitda',
      'Debt to EBITDA Ratio',
      'نسبة الدين إلى EBITDA',
      'classical',
      'leverage',
      this.calculateDebtToEBITDA(),
      options.language
    ));
    
    // Interest Coverage Ratio
    results.push(this.createAnalysisResult(
      'interest_coverage',
      'Interest Coverage Ratio',
      'نسبة تغطية الفوائد',
      'classical',
      'leverage',
      this.calculateInterestCoverage(),
      options.language
    ));
    
    // Debt Service Coverage Ratio
    results.push(this.createAnalysisResult(
      'debt_service_coverage',
      'Debt Service Coverage Ratio',
      'نسبة تغطية خدمة الدين',
      'classical',
      'leverage',
      this.calculateDebtServiceCoverage(),
      options.language
    ));
    
    // Degree of Operating Leverage
    results.push(this.createAnalysisResult(
      'operating_leverage',
      'Degree of Operating Leverage',
      'درجة الرافعة التشغيلية',
      'classical',
      'leverage',
      this.calculateOperatingLeverage(),
      options.language
    ));
    
    // Degree of Financial Leverage
    results.push(this.createAnalysisResult(
      'financial_leverage',
      'Degree of Financial Leverage',
      'درجة الرافعة المالية',
      'classical',
      'leverage',
      this.calculateFinancialLeverage(),
      options.language
    ));
    
    // Degree of Combined Leverage
    results.push(this.createAnalysisResult(
      'combined_leverage',
      'Degree of Combined Leverage',
      'درجة الرافعة المدمجة',
      'classical',
      'leverage',
      this.calculateCombinedLeverage(),
      options.language
    ));
    
    // Equity to Assets Ratio
    results.push(this.createAnalysisResult(
      'equity_to_assets',
      'Equity to Assets Ratio',
      'نسبة حقوق الملكية إلى الأصول',
      'classical',
      'leverage',
      this.calculateEquityToAssets(),
      options.language
    ));
    
    // Long-term Debt Ratio
    results.push(this.createAnalysisResult(
      'long_term_debt_ratio',
      'Long-term Debt Ratio',
      'نسبة الدين طويل الأجل',
      'classical',
      'leverage',
      this.calculateLongTermDebtRatio(),
      options.language
    ));
    
    // Short-term Debt Ratio
    results.push(this.createAnalysisResult(
      'short_term_debt_ratio',
      'Short-term Debt Ratio',
      'نسبة الدين قصير الأجل',
      'classical',
      'leverage',
      this.calculateShortTermDebtRatio(),
      options.language
    ));
    
    // Equity Multiplier
    results.push(this.createAnalysisResult(
      'equity_multiplier',
      'Equity Multiplier',
      'مضاعف حقوق الملكية',
      'classical',
      'leverage',
      this.calculateEquityMultiplier(),
      options.language
    ));
    
    // Self Financing Ratio
    results.push(this.createAnalysisResult(
      'self_financing_ratio',
      'Self Financing Ratio',
      'نسبة التمويل الذاتي',
      'classical',
      'leverage',
      this.calculateSelfFinancingRatio(),
      options.language
    ));
    
    // Financial Independence Ratio
    results.push(this.createAnalysisResult(
      'financial_independence_ratio',
      'Financial Independence Ratio',
      'نسبة الاستقلال المالي',
      'classical',
      'leverage',
      this.calculateFinancialIndependenceRatio(),
      options.language
    ));
    
    // Net Debt Ratio
    results.push(this.createAnalysisResult(
      'net_debt_ratio',
      'Net Debt Ratio',
      'نسبة صافي الدين',
      'classical',
      'leverage',
      this.calculateNetDebtRatio(),
      options.language
    ));
    
    return results;
  }

  // Market Ratios (15 ratios)
  private async performMarketRatioAnalysis(options: AnalysisOptions): Promise<AnalysisResult[]> {
    const results: AnalysisResult[] = [];
    
    // Price to Earnings Ratio
    results.push(this.createAnalysisResult(
      'pe_ratio',
      'Price to Earnings Ratio',
      'نسبة السعر إلى الأرباح',
      'classical',
      'market',
      this.calculatePERatio(),
      options.language
    ));
    
    // Price to Book Ratio
    results.push(this.createAnalysisResult(
      'pb_ratio',
      'Price to Book Ratio',
      'نسبة السعر إلى القيمة الدفترية',
      'classical',
      'market',
      this.calculatePBRatio(),
      options.language
    ));
    
    // Price to Sales Ratio
    results.push(this.createAnalysisResult(
      'ps_ratio',
      'Price to Sales Ratio',
      'نسبة السعر إلى المبيعات',
      'classical',
      'market',
      this.calculatePSRatio(),
      options.language
    ));
    
    // Enterprise Value to EBITDA
    results.push(this.createAnalysisResult(
      'ev_ebitda',
      'Enterprise Value to EBITDA',
      'قيمة المنشأة إلى EBITDA',
      'classical',
      'market',
      this.calculateEVEBITDA(),
      options.language
    ));
    
    // Enterprise Value to Sales
    results.push(this.createAnalysisResult(
      'ev_sales',
      'Enterprise Value to Sales',
      'قيمة المنشأة إلى المبيعات',
      'classical',
      'market',
      this.calculateEVSales(),
      options.language
    ));
    
    // Dividend Yield
    results.push(this.createAnalysisResult(
      'dividend_yield',
      'Dividend Yield',
      'عائد التوزيعات',
      'classical',
      'market',
      this.calculateDividendYield(),
      options.language
    ));
    
    // Payout Ratio
    results.push(this.createAnalysisResult(
      'payout_ratio',
      'Payout Ratio',
      'نسبة التوزيع',
      'classical',
      'market',
      this.calculatePayoutRatio(),
      options.language
    ));
    
    // PEG Ratio
    results.push(this.createAnalysisResult(
      'peg_ratio',
      'PEG Ratio',
      'نسبة PEG',
      'classical',
      'market',
      this.calculatePEGRatio(),
      options.language
    ));
    
    // Earnings Yield
    results.push(this.createAnalysisResult(
      'earnings_yield',
      'Earnings Yield',
      'عائد الأرباح',
      'classical',
      'market',
      this.calculateEarningsYield(),
      options.language
    ));
    
    // Tobin's Q Ratio
    results.push(this.createAnalysisResult(
      'tobins_q',
      'Tobin\'s Q Ratio',
      'نسبة Q',
      'classical',
      'market',
      this.calculateTobinsQ(),
      options.language
    ));
    
    // Price to Cash Flow Ratio
    results.push(this.createAnalysisResult(
      'price_to_cash_flow',
      'Price to Cash Flow Ratio',
      'نسبة السعر إلى التدفق النقدي',
      'classical',
      'market',
      this.calculatePriceToCashFlow(),
      options.language
    ));
    
    // Retention Ratio
    results.push(this.createAnalysisResult(
      'retention_ratio',
      'Retention Ratio',
      'معدل الاحتفاظ بالأرباح',
      'classical',
      'market',
      this.calculateRetentionRatio(),
      options.language
    ));
    
    // Market to Book Ratio
    results.push(this.createAnalysisResult(
      'market_to_book',
      'Market to Book Ratio',
      'القيمة السوقية إلى القيمة الدفترية',
      'classical',
      'market',
      this.calculateMarketToBook(),
      options.language
    ));
    
    // Dividend Coverage Ratio
    results.push(this.createAnalysisResult(
      'dividend_coverage',
      'Dividend Coverage Ratio',
      'نسبة التغطية النقدية للتوزيعات',
      'classical',
      'market',
      this.calculateDividendCoverage(),
      options.language
    ));
    
    // Dividend Growth Rate
    results.push(this.createAnalysisResult(
      'dividend_growth_rate',
      'Dividend Growth Rate',
      'معدل نمو التوزيعات',
      'classical',
      'market',
      this.calculateDividendGrowthRate(),
      options.language
    ));
    
    return results;
  }

  // 1.3 Flow and Movement Analysis (18 types)
  private async performFlowAnalysis(options: AnalysisOptions): Promise<AnalysisResult[]> {
    const results: AnalysisResult[] = [];
    
    // Basic Cash Flow Analysis
    results.push(this.createAnalysisResult(
      'cash_flow_analysis',
      'Cash Flow Analysis',
      'تحليل التدفقات النقدية',
      'classical',
      'flow_movement',
      this.calculateCashFlowAnalysis(),
      options.language
    ));
    
    // Working Capital Analysis
    results.push(this.createAnalysisResult(
      'working_capital_analysis',
      'Working Capital Analysis',
      'تحليل رأس المال العامل',
      'classical',
      'flow_movement',
      this.calculateWorkingCapitalAnalysis(),
      options.language
    ));
    
    // Free Cash Flow Analysis
    results.push(this.createAnalysisResult(
      'free_cash_flow_analysis',
      'Free Cash Flow Analysis',
      'تحليل التدفقات الحرة',
      'classical',
      'flow_movement',
      this.calculateFreeCashFlowAnalysis(),
      options.language
    ));
    
    // Earnings Quality Analysis
    results.push(this.createAnalysisResult(
      'earnings_quality_analysis',
      'Earnings Quality Analysis',
      'تحليل جودة الأرباح',
      'classical',
      'flow_movement',
      this.calculateEarningsQualityAnalysis(),
      options.language
    ));
    
    // Accruals Analysis
    results.push(this.createAnalysisResult(
      'accruals_analysis',
      'Accruals Analysis',
      'مؤشر Accruals',
      'classical',
      'flow_movement',
      this.calculateAccrualsAnalysis(),
      options.language
    ));
    
    // Fixed Cost Structure Analysis
    results.push(this.createAnalysisResult(
      'fixed_cost_analysis',
      'Fixed Cost Structure Analysis',
      'تحليل هيكل التكاليف الثابتة',
      'classical',
      'flow_movement',
      this.calculateFixedCostAnalysis(),
      options.language
    ));
    
    // Variable Cost Structure Analysis
    results.push(this.createAnalysisResult(
      'variable_cost_analysis',
      'Variable Cost Structure Analysis',
      'تحليل هيكل التكاليف المتغيرة',
      'classical',
      'flow_movement',
      this.calculateVariableCostAnalysis(),
      options.language
    ));
    
    // Three-way DuPont Analysis
    results.push(this.createAnalysisResult(
      'dupont_three_way',
      'Three-way DuPont Analysis',
      'تحليل دوبونت الثلاثي',
      'classical',
      'flow_movement',
      this.calculateDupontThreeWay(),
      options.language
    ));
    
    // Five-way DuPont Analysis
    results.push(this.createAnalysisResult(
      'dupont_five_way',
      'Five-way DuPont Analysis',
      'تحليل دوبونت الخماسي',
      'classical',
      'flow_movement',
      this.calculateDupontFiveWay(),
      options.language
    ));
    
    // Economic Value Added
    results.push(this.createAnalysisResult(
      'eva',
      'Economic Value Added',
      'القيمة المضافة الاقتصادية',
      'classical',
      'flow_movement',
      this.calculateEVA(),
      options.language
    ));
    
    // Market Value Added
    results.push(this.createAnalysisResult(
      'mva',
      'Market Value Added',
      'القيمة السوقية المضافة',
      'classical',
      'flow_movement',
      this.calculateMVA(),
      options.language
    ));
    
    // Cash Cycle Analysis
    results.push(this.createAnalysisResult(
      'cash_cycle_analysis',
      'Cash Cycle Analysis',
      'تحليل دورة النقد',
      'classical',
      'flow_movement',
      this.calculateCashCycleAnalysis(),
      options.language
    ));
    
    // Breakeven Analysis
    results.push(this.createAnalysisResult(
      'breakeven_analysis',
      'Breakeven Analysis',
      'تحليل نقطة التعادل',
      'classical',
      'flow_movement',
      this.calculateBreakevenAnalysis(),
      options.language
    ));
    
    // Margin of Safety Analysis
    results.push(this.createAnalysisResult(
      'margin_of_safety_analysis',
      'Margin of Safety Analysis',
      'تحليل هامش الأمان',
      'classical',
      'flow_movement',
      this.calculateMarginOfSafetyAnalysis(),
      options.language
    ));
    
    // Operating Leverage Analysis
    results.push(this.createAnalysisResult(
      'operating_leverage_analysis',
      'Operating Leverage Analysis',
      'تحليل الرافعة التشغيلية',
      'classical',
      'flow_movement',
      this.calculateOperatingLeverageAnalysis(),
      options.language
    ));
    
    // Contribution Margin Analysis
    results.push(this.createAnalysisResult(
      'contribution_margin_analysis',
      'Contribution Margin Analysis',
      'تحليل هامش المساهمة',
      'classical',
      'flow_movement',
      this.calculateContributionMarginAnalysis(),
      options.language
    ));
    
    // Free Cash Flow to the Firm
    results.push(this.createAnalysisResult(
      'fcff_analysis',
      'Free Cash Flow to the Firm',
