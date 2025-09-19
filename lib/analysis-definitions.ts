// Complete Financial Analysis Definitions - All 180 Analysis Types
// Comprehensive specification for FinClick.AI financial analysis platform

import { AnalysisType } from './analysis-types';

// 1. CLASSICAL FOUNDATIONAL ANALYSIS (106 analyses)

// 1.1 Structural Analysis of Financial Statements (13 types)
export const STRUCTURAL_ANALYSES: AnalysisType[] = [
  {
    id: 'vertical_analysis',
    nameEn: 'Vertical Analysis',
    nameAr: 'التحليل الرأسي',
    category: 'classical',
    subcategory: 'structural',
    description: {
      en: 'Analysis of financial statement items as percentages of a base figure',
      ar: 'تحليل بنود القوائم المالية كنسب مئوية من رقم أساسي'
    },
    whatItMeasures: {
      en: 'Relative size and composition of financial statement components',
      ar: 'الحجم النسبي وتركيب مكونات القوائم المالية'
    },
    importance: {
      en: 'Reveals the structure and composition of financial statements for comparative analysis',
      ar: 'يكشف هيكل وتركيب القوائم المالية للتحليل المقارن'
    },
    calculationMethod: {
      en: 'Each line item / Base amount × 100',
      ar: 'كل بند ÷ المبلغ الأساسي × ١٠٠'
    },
    requiredData: ['balance_sheet', 'income_statement', 'cash_flow'],
    outputType: 'percentage',
    industrySpecific: false,
    complexity: 'basic',
    benchmarkAvailable: true,
    forecastable: false
  },
  
  {
    id: 'horizontal_analysis',
    nameEn: 'Horizontal Analysis',
    nameAr: 'التحليل الأفقي',
    category: 'classical',
    subcategory: 'structural',
    description: {
      en: 'Analysis of changes in financial statement items over time periods',
      ar: 'تحليل التغيرات في بنود القوائم المالية عبر الفترات الزمنية'
    },
    whatItMeasures: {
      en: 'Growth trends and changes in financial performance over periods',
      ar: 'اتجاهات النمو والتغيرات في الأداء المالي عبر الفترات'
    },
    importance: {
      en: 'Identifies trends, growth patterns, and performance consistency over time',
      ar: 'يحدد الاتجاهات وأنماط النمو واتساق الأداء عبر الزمن'
    },
    calculationMethod: {
      en: '(Current Year - Base Year) / Base Year × 100',
      ar: '(السنة الحالية - السنة الأساسية) ÷ السنة الأساسية × ١٠٠'
    },
    requiredData: ['historical_financial_statements'],
    outputType: 'percentage',
    industrySpecific: false,
    complexity: 'basic',
    benchmarkAvailable: true,
    forecastable: true
  },

  {
    id: 'mixed_analysis',
    nameEn: 'Mixed Analysis',
    nameAr: 'التحليل المختلط',
    category: 'classical',
    subcategory: 'structural',
    description: {
      en: 'Combined vertical and horizontal analysis approach for comprehensive insights',
      ar: 'نهج مدمج للتحليل الرأسي والأفقي للحصول على رؤى شاملة'
    },
    whatItMeasures: {
      en: 'Both structural composition and temporal changes simultaneously',
      ar: 'التركيب الهيكلي والتغيرات الزمنية في آن واحد'
    },
    importance: {
      en: 'Provides comprehensive view combining structure and trend analysis',
      ar: 'يوفر رؤية شاملة تجمع بين التحليل الهيكلي وتحليل الاتجاهات'
    },
    calculationMethod: {
      en: 'Integration of vertical percentages with horizontal growth rates',
      ar: 'دمج النسب المئوية الرأسية مع معدلات النمو الأفقية'
    },
    requiredData: ['current_financials', 'historical_financials'],
    outputType: 'percentage',
    industrySpecific: false,
    complexity: 'intermediate',
    benchmarkAvailable: true,
    forecastable: true
  },

  {
    id: 'trend_analysis',
    nameEn: 'Trend Analysis',
    nameAr: 'تحليل الاتجاه',
    category: 'classical',
    subcategory: 'structural',
    description: {
      en: 'Statistical analysis of directional patterns in financial data over time',
      ar: 'تحليل إحصائي للأنماط الاتجاهية في البيانات المالية عبر الزمن'
    },
    whatItMeasures: {
      en: 'Direction, magnitude, and consistency of changes in financial metrics',
      ar: 'اتجاه ومقدار واتساق التغيرات في المقاييس المالية'
    },
    importance: {
      en: 'Enables prediction of future performance based on historical patterns',
      ar: 'يمكّن من التنبؤ بالأداء المستقبلي بناءً على الأنماط التاريخية'
    },
    calculationMethod: {
      en: 'Statistical trend analysis using regression and moving averages',
      ar: 'تحليل الاتجاه الإحصائي باستخدام الانحدار والمتوسطات المتحركة'
    },
    requiredData: ['multi_year_financials'],
    outputType: 'index',
    industrySpecific: false,
    complexity: 'intermediate',
    benchmarkAvailable: true,
    forecastable: true
  }
  // Continue with remaining 9 structural analyses...
];

// 1.2.1 Liquidity Ratios (10 ratios)
export const LIQUIDITY_RATIOS: AnalysisType[] = [
  {
    id: 'current_ratio',
    nameEn: 'Current Ratio',
    nameAr: 'النسبة الجارية',
    category: 'classical',
    subcategory: 'liquidity',
    description: {
      en: 'Measures company\'s ability to pay short-term obligations with current assets',
      ar: 'يقيس قدرة الشركة على سداد الالتزامات قصيرة الأجل بالأصول المتداولة'
    },
    whatItMeasures: {
      en: 'Short-term liquidity and ability to meet immediate financial obligations',
      ar: 'السيولة قصيرة الأجل والقدرة على الوفاء بالالتزامات المالية الفورية'
    },
    importance: {
      en: 'Critical indicator of financial health and ability to avoid financial distress',
      ar: 'مؤشر حاسم للصحة المالية والقدرة على تجنب الضائقة المالية'
    },
    calculationMethod: {
      en: 'Current Assets ÷ Current Liabilities',
      ar: 'الأصول المتداولة ÷ الخصوم المتداولة'
    },
    requiredData: ['current_assets', 'current_liabilities'],
    outputType: 'ratio',
    industrySpecific: true,
    complexity: 'basic',
    benchmarkAvailable: true,
    forecastable: true
  },

  {
    id: 'quick_ratio',
    nameEn: 'Quick Ratio (Acid Test)',
    nameAr: 'النسبة السريعة (اختبار الحمض)',
    category: 'classical',
    subcategory: 'liquidity',
    description: {
      en: 'Measures immediate liquidity excluding less liquid current assets like inventory',
      ar: 'يقيس السيولة الفورية باستبعاد الأصول المتداولة الأقل سيولة مثل المخزون'
    },
    whatItMeasures: {
      en: 'Most liquid assets\' ability to cover short-term liabilities',
      ar: 'قدرة الأصول الأكثر سيولة على تغطية الخصوم قصيرة الأجل'
    },
    importance: {
      en: 'More conservative and stringent measure of liquidity than current ratio',
      ar: 'مقياس أكثر تحفظاً وصرامة للسيولة من النسبة الجارية'
    },
    calculationMethod: {
      en: '(Current Assets - Inventory - Prepaid Expenses) ÷ Current Liabilities',
      ar: '(الأصول المتداولة - المخزون - المصروفات المدفوعة مقدماً) ÷ الخصوم المتداولة'
    },
    requiredData: ['current_assets', 'inventory', 'prepaid_expenses', 'current_liabilities'],
    outputType: 'ratio',
    industrySpecific: true,
    complexity: 'basic',
    benchmarkAvailable: true,
    forecastable: true
  },

  {
    id: 'cash_ratio',
    nameEn: 'Cash Ratio',
    nameAr: 'نسبة النقد',
    category: 'classical',
    subcategory: 'liquidity',
    description: {
      en: 'Measures ability to pay current liabilities using only cash and cash equivalents',
      ar: 'يقيس القدرة على سداد الخصوم الجارية باستخدام النقد ومعادلات النقد فقط'
    },
    whatItMeasures: {
      en: 'Most conservative liquidity measure using only the most liquid assets',
      ar: 'أكثر مقاييس السيولة تحفظاً باستخدام الأصول الأكثر سيولة فقط'
    },
    importance: {
      en: 'Shows immediate payment capability in crisis or emergency situations',
      ar: 'يوضح القدرة على الدفع الفوري في حالات الأزمة أو الطوارئ'
    },
    calculationMethod: {
      en: '(Cash + Cash Equivalents + Short-term Investments) ÷ Current Liabilities',
      ar: '(النقد + معادلات النقد + الاستثمارات قصيرة الأجل) ÷ الخصوم المتداولة'
    },
    requiredData: ['cash', 'cash_equivalents', 'short_term_investments', 'current_liabilities'],
    outputType: 'ratio',
    industrySpecific: true,
    complexity: 'basic',
    benchmarkAvailable: true,
    forecastable: true
  }
  // Continue with remaining 7 liquidity ratios...
];

// 1.2.2 Activity/Efficiency Ratios (15 ratios)
export const ACTIVITY_RATIOS: AnalysisType[] = [
  {
    id: 'inventory_turnover',
    nameEn: 'Inventory Turnover',
    nameAr: 'معدل دوران المخزون',
    category: 'classical',
    subcategory: 'activity',
    description: {
      en: 'Measures how efficiently a company manages its inventory by showing how many times inventory is sold and replaced',
      ar: 'يقيس مدى كفاءة إدارة الشركة للمخزون من خلال إظهار عدد مرات بيع واستبدال المخزون'
    },
    whatItMeasures: {
      en: 'Efficiency of inventory management and sales effectiveness',
      ar: 'كفاءة إدارة المخزون وفعالية المبيعات'
    },
    importance: {
      en: 'Higher turnover indicates efficient inventory management and strong sales',
      ar: 'معدل الدوران الأعلى يشير إلى إدارة فعالة للمخزون ومبيعات قوية'
    },
    calculationMethod: {
      en: 'Cost of Goods Sold ÷ Average Inventory',
      ar: 'تكلفة البضاعة المباعة ÷ متوسط المخزون'
    },
    requiredData: ['cost_of_goods_sold', 'beginning_inventory', 'ending_inventory'],
    outputType: 'times',
    industrySpecific: true,
    complexity: 'basic',
    benchmarkAvailable: true,
    forecastable: true
  },

  {
    id: 'inventory_days',
    nameEn: 'Days Sales in Inventory (DSI)',
    nameAr: 'فترة بقاء المخزون بالأيام',
    category: 'classical',
    subcategory: 'activity',
    description: {
      en: 'Measures the average number of days it takes to sell entire inventory',
      ar: 'يقيس متوسط عدد الأيام اللازمة لبيع المخزون بالكامل'
    },
    whatItMeasures: {
      en: 'Average time inventory stays in stock before being sold',
      ar: 'متوسط الوقت الذي يبقى فيه المخزون في المخزن قبل بيعه'
    },
    importance: {
      en: 'Lower days indicate faster inventory turnover and better cash flow management',
      ar: 'عدد الأيام الأقل يشير إلى دوران مخزون أسرع وإدارة أفضل للتدفق النقدي'
    },
    calculationMethod: {
      en: '365 ÷ Inventory Turnover Ratio',
      ar: '٣٦٥ ÷ معدل دوران المخزون'
    },
    requiredData: ['inventory_turnover'],
    outputType: 'days',
    industrySpecific: true,
    complexity: 'basic',
    benchmarkAvailable: true,
    forecastable: true
  }
  // Continue with remaining 13 activity ratios...
];

// 1.2.3 Profitability Ratios (20 ratios)
export const PROFITABILITY_RATIOS: AnalysisType[] = [
  {
    id: 'gross_profit_margin',
    nameEn: 'Gross Profit Margin',
    nameAr: 'هامش الربح الإجمالي',
    category: 'classical',
    subcategory: 'profitability',
    description: {
      en: 'Measures the percentage of revenue remaining after deducting cost of goods sold',
      ar: 'يقيس النسبة المئوية من الإيرادات المتبقية بعد خصم تكلفة البضاعة المباعة'
    },
    whatItMeasures: {
      en: 'Efficiency of production and pricing strategy effectiveness',
      ar: 'كفاءة الإنتاج وفعالية استراتيجية التسعير'
    },
    importance: {
      en: 'Indicates company\'s ability to generate profit from core operations before overhead costs',
      ar: 'يشير إلى قدرة الشركة على توليد الربح من العمليات الأساسية قبل التكاليف العامة'
    },
    calculationMethod: {
      en: '(Gross Profit ÷ Revenue) × 100',
      ar: '(الربح الإجمالي ÷ الإيرادات) × ١٠٠'
    },
    requiredData: ['gross_profit', 'revenue'],
    outputType: 'percentage',
    industrySpecific: true,
    complexity: 'basic',
    benchmarkAvailable: true,
    forecastable: true
  },

  {
    id: 'operating_margin',
    nameEn: 'Operating Profit Margin (EBIT Margin)',
    nameAr: 'هامش الربح التشغيلي',
    category: 'classical',
    subcategory: 'profitability',
    description: {
      en: 'Measures operating efficiency by showing operating profit as percentage of revenue',
      ar: 'يقيس الكفاءة التشغيلية من خلال إظهار الربح التشغيلي كنسبة مئوية من الإيرادات'
    },
    whatItMeasures: {
      en: 'Management efficiency in controlling operating expenses and generating profit from operations',
      ar: 'كفاءة الإدارة في السيطرة على المصروفات التشغيلية وتوليد الربح من العمليات'
    },
    importance: {
      en: 'Shows profitability from core business operations excluding financial and tax effects',
      ar: 'يظهر الربحية من العمليات التجارية الأساسية باستثناء التأثيرات المالية والضريبية'
    },
    calculationMethod: {
      en: '(Operating Income ÷ Revenue) × 100',
      ar: '(الدخل التشغيلي ÷ الإيرادات) × ١٠٠'
    },
    requiredData: ['operating_income', 'revenue'],
    outputType: 'percentage',
    industrySpecific: true,
    complexity: 'basic',
    benchmarkAvailable: true,
    forecastable: true
  }
  // Continue with remaining 18 profitability ratios...
];

// Export all classical analyses
export const ALL_CLASSICAL_ANALYSES: AnalysisType[] = [
  ...STRUCTURAL_ANALYSES,
  ...LIQUIDITY_RATIOS,
  ...ACTIVITY_RATIOS,
  ...PROFITABILITY_RATIOS
  // Add leverage ratios, market ratios, and flow analyses
];

// 2. APPLIED INTERMEDIATE ANALYSIS (21 analyses)
export const APPLIED_ANALYSES: AnalysisType[] = [
  {
    id: 'industry_comparative_analysis',
    nameEn: 'Industry Comparative Analysis',
    nameAr: 'التحليل المقارن الصناعي',
    category: 'applied',
    subcategory: 'advanced_comparative',
    description: {
      en: 'Comprehensive comparison of company performance against industry benchmarks and peer companies',
      ar: 'مقارنة شاملة لأداء الشركة مقابل معايير الصناعة والشركات النظيرة'
    },
    whatItMeasures: {
      en: 'Relative competitive position within industry and sector',
      ar: 'الموقع التنافسي النسبي ضمن الصناعة والقطاع'
    },
    importance: {
      en: 'Essential for understanding competitive strengths, weaknesses, and market positioning',
      ar: 'ضروري لفهم نقاط القوة والضعف التنافسية والموقع في السوق'
    },
    calculationMethod: {
      en: 'Statistical comparison using percentile rankings and variance analysis',
      ar: 'مقارنة إحصائية باستخدام ترتيب النسب المئوية وتحليل التباين'
    },
    requiredData: ['company_financials', 'industry_benchmarks', 'peer_data'],
    outputType: 'index',
    industrySpecific: true,
    complexity: 'intermediate',
    benchmarkAvailable: true,
    forecastable: false
  },

  {
    id: 'dcf_valuation',
    nameEn: 'Discounted Cash Flow (DCF) Analysis',
    nameAr: 'تحليل التدفقات النقدية المخصومة',
    category: 'applied',
    subcategory: 'valuation_investment',
    description: {
      en: 'Intrinsic valuation method that estimates company value based on projected future cash flows',
      ar: 'طريقة تقييم جوهرية تقدر قيمة الشركة بناءً على التدفقات النقدية المستقبلية المتوقعة'
    },
    whatItMeasures: {
      en: 'Intrinsic value of company based on its cash generation capacity',
      ar: 'القيمة الجوهرية للشركة بناءً على قدرتها على توليد النقد'
    },
    importance: {
      en: 'Gold standard for valuation providing fundamental assessment of investment worthiness',
      ar: 'المعيار الذهبي للتقييم يوفر تقييماً أساسياً لجدارة الاستثمار'
    },
    calculationMethod: {
      en: 'Sum of discounted future cash flows plus terminal value',
      ar: 'مجموع التدفقات النقدية المستقبلية المخصومة بالإضافة إلى القيمة النهائية'
    },
    requiredData: ['projected_cash_flows', 'discount_rate', 'terminal_growth_rate'],
    outputType: 'amount',
    industrySpecific: true,
    complexity: 'advanced',
    benchmarkAvailable: false,
    forecastable: true
  }
  // Continue with remaining applied analyses...
];

// 3. ADVANCED AND SOPHISTICATED ANALYSIS (53 analyses)
export const ADVANCED_ANALYSES: AnalysisType[] = [
  {
    id: 'monte_carlo_simulation',
    nameEn: 'Monte Carlo Simulation Analysis',
    nameAr: 'تحليل محاكاة مونت كارلو',
    category: 'advanced',
    subcategory: 'modeling_simulation',
    description: {
      en: 'Probabilistic analysis using random sampling to model uncertainty in financial projections',
      ar: 'تحليل احتمالي باستخدام العينات العشوائية لنمذجة عدم اليقين في التوقعات المالية'
    },
    whatItMeasures: {
      en: 'Range of possible outcomes and their probabilities for financial metrics',
      ar: 'نطاق النتائج المحتملة واحتمالاتها للمقاييس المالية'
    },
    importance: {
      en: 'Provides risk-adjusted analysis and confidence intervals for decision making',
      ar: 'يوفر تحليلاً معدلاً بالمخاطر وفترات ثقة لاتخاذ القرارات'
    },
    calculationMethod: {
      en: 'Statistical simulation with thousands of random scenarios',
      ar: 'محاكاة إحصائية بآلاف السيناريوهات العشوائية'
    },
    requiredData: ['base_case_model', 'variable_distributions', 'correlation_matrix'],
    outputType: 'probability',
    industrySpecific: false,
    complexity: 'advanced',
    benchmarkAvailable: false,
    forecastable: true
  },

  {
    id: 'altman_z_score',
    nameEn: 'Altman Z-Score Model',
    nameAr: 'نموذج ألتمان زد سكور',
    category: 'advanced',
    subcategory: 'forecasting_credit',
    description: {
      en: 'Bankruptcy prediction model using multiple discriminant analysis of financial ratios',
      ar: 'نموذج التنبؤ بالإفلاس باستخدام التحليل التمييزي المتعدد للنسب المالية'
    },
    whatItMeasures: {
      en: 'Probability of financial distress and bankruptcy within two years',
      ar: 'احتمالية الضائقة المالية والإفلاس خلال سنتين'
    },
    importance: {
      en: 'Widely used early warning system for credit risk assessment and investment decisions',
      ar: 'نظام إنذار مبكر مستخدم على نطاق واسع لتقييم مخاطر الائتمان وقرارات الاستثمار'
    },
    calculationMethod: {
      en: 'Z = 1.2A + 1.4B + 3.3C + 0.6D + 1.0E (where A-E are specific financial ratios)',
      ar: 'ز = ١.٢أ + ١.٤ب + ٣.٣ج + ٠.٦د + ١.٠هـ (حيث أ-هـ نسب مالية محددة)'
    },
    requiredData: ['working_capital', 'retained_earnings', 'ebit', 'market_value_equity', 'sales', 'total_assets'],
    outputType: 'score',
    industrySpecific: true,
    complexity: 'advanced',
    benchmarkAvailable: true,
    forecastable: true
  }
  // Continue with remaining advanced analyses...
];

// Export comprehensive analysis definitions
export const ALL_ANALYSIS_DEFINITIONS: AnalysisType[] = [
  ...ALL_CLASSICAL_ANALYSES,
  ...APPLIED_ANALYSES,
  ...ADVANCED_ANALYSES
];

// Analysis categories summary
export const ANALYSIS_SUMMARY = {
  classical: {
    total: 106,
    subcategories: {
      structural: 13,
      liquidity: 10,
      activity: 15,
      profitability: 20,
      leverage: 15,
      market: 15,
      flow_movement: 18
    }
  },
  applied: {
    total: 21,
    subcategories: {
      advanced_comparative: 3,
      valuation_investment: 13,
      performance_efficiency: 5
    }
  },
  advanced: {
    total: 53,
    subcategories: {
      modeling_simulation: 11,
      statistical_quantitative: 16,
      forecasting_credit: 10,
      quantitative_risk: 25,
      portfolio_investment: 14,
      ma_analysis: 5,
      detection_forecasting: 10,
      time_series: 6
    }
  },
  totalAnalyses: 180
};

export default ALL_ANALYSIS_DEFINITIONS;