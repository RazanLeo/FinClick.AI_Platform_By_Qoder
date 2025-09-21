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

    forecastable: true
  },

  {
    id: 'comparative_analysis',
    nameEn: 'Comparative Analysis',
    nameAr: 'التحليل المقارن الأساسي',
    category: 'classical',
    subcategory: 'structural',
    description: {
      en: 'Comparison of financial performance against industry peers and benchmarks',
      ar: 'مقارنة الأداء المالي ضد الشركات المنافسة ومعايير الصناعة'
    },
    whatItMeasures: {
      en: 'Relative competitive position and performance gaps',
      ar: 'الموقع التنافسي النسبي وفجوات الأداء'
    },
    importance: {
      en: 'Identifies strengths, weaknesses, and improvement opportunities',
      ar: 'يحدد نقاط القوة والضعف وفرص التحسين'
    },
    calculationMethod: {
      en: 'Ratio and variance analysis against peer group averages',
      ar: 'تحليل النسب والتباين مقابل متوسطات مجموعة الشركات المنافسة'
    },
    requiredData: ['company_financials', 'peer_data', 'industry_benchmarks'],
    outputType: 'index',
    industrySpecific: true,
    complexity: 'intermediate',

    forecastable: false
  },

  {
    id: 'value_added_analysis',
    nameEn: 'Value Added Analysis',
    nameAr: 'تحليل القيمة المضافة',
    category: 'classical',
    subcategory: 'structural',
    description: {
      en: 'Analysis of economic value created by business operations',
      ar: 'تحليل القيمة الاقتصادية المضافة من خلال العمليات التجارية'
    },
    whatItMeasures: {
      en: 'Economic contribution and value creation effectiveness',
      ar: 'المساهمة الاقتصادية وفعالية خلق القيمة'
    },
    importance: {
      en: 'Measures true economic performance beyond accounting profits',
      ar: 'يقيس الأداء الاقتصادي الحقيقي ما بعد الأرباح المحاسبية'
    },
    calculationMethod: {
      en: 'Revenue - Cost of purchased inputs + Other value additions',
      ar: 'الإيرادات - تكلفة المدخلات المشتراة + القيمة المضافة الأخرى'
    },
    requiredData: ['revenue', 'cost_of_purchased_inputs', 'other_value_additions'],
    outputType: 'amount',
    industrySpecific: false,
    complexity: 'intermediate',

    forecastable: true
  },

  {
    id: 'common_size_analysis',
    nameEn: 'Common Size Analysis',
    nameAr: 'تحليل الأساس المشترك',
    category: 'classical',
    subcategory: 'structural',
    description: {
      en: 'Expressing all financial statement items as percentages of a common base',
      ar: 'التعبير عن جميع بنود القوائم المالية كنسب مئوية من أساس مشترك'
    },
    whatItMeasures: {
      en: 'Proportional relationships and structural changes over time',
      ar: 'العلاقات النسبية والتغيرات الهيكلية عبر الزمن'
    },
    importance: {
      en: 'Facilitates meaningful comparisons across companies and time periods',
      ar: 'يسهل المقارنات المعنوية بين الشركات والفترات الزمنية'
    },
    calculationMethod: {
      en: 'Each item / Total assets (Balance Sheet) or Revenue (Income Statement) × 100',
      ar: 'كل بند ÷ إجمالي الأصول (الميزانية) أو الإيرادات (قائمة الدخل) × ١٠٠'
    },
    requiredData: ['financial_statements'],
    outputType: 'percentage',
    industrySpecific: false,
    complexity: 'basic',

    forecastable: false
  },

  {
    id: 'time_series_analysis',
    nameEn: 'Time Series Analysis',
    nameAr: 'تحليل السلاسل الزمنية البسيط',
    category: 'classical',
    subcategory: 'structural',
    description: {
      en: 'Examination of data points collected over regular time intervals',
      ar: 'فحص نقاط البيانات المجمعة على فترات زمنية منتظمة'
    },
    whatItMeasures: {
      en: 'Patterns, trends, and cyclical movements in financial data',
      ar: 'الأنماط والاتجاهات والتحركات الدورية في البيانات المالية'
    },
    importance: {
      en: 'Identifies recurring patterns and seasonal variations',
      ar: 'يحدد الأنماط المتكررة والاختلافات الموسمية'
    },
    calculationMethod: {
      en: 'Statistical analysis of sequential data points over time',
      ar: 'التحليل الإحصائي لنقاط البيانات المتسلسلة عبر الزمن'
    },
    requiredData: ['historical_financial_data'],
    outputType: 'index',
    industrySpecific: false,
    complexity: 'intermediate',

    forecastable: true
  },

  {
    id: 'relative_change_analysis',
    nameEn: 'Relative Change Analysis',
    nameAr: 'تحليل التغيرات النسبية',
    category: 'classical',
    subcategory: 'structural',
    description: {
      en: 'Measurement of percentage changes in financial metrics over time',
      ar: 'قياس التغيرات النسبية في المقاييس المالية عبر الزمن'
    },
    whatItMeasures: {
      en: 'Magnitude and direction of financial performance changes',
      ar: 'مقدار واتجاه تغيرات الأداء المالي'
    },
    importance: {
      en: 'Highlights significant changes requiring management attention',
      ar: 'يسلط الضوء على التغيرات المهمة التي تتطلب انتباه الإدارة'
    },
    calculationMethod: {
      en: '(Current Period - Previous Period) / Previous Period × 100',
      ar: '(الفترة الحالية - الفترة السابقة) ÷ الفترة السابقة × ١٠٠'
    },
    requiredData: ['current_period_data', 'previous_period_data'],
    outputType: 'percentage',
    industrySpecific: false,
    complexity: 'basic',
    benchmarkAvailable: false,
    forecastable: true
  },

  {
    id: 'growth_rate_analysis',
    nameEn: 'Growth Rate Analysis',
    nameAr: 'تحليل معدلات النمو',
    category: 'classical',
    subcategory: 'structural',
    description: {
      en: 'Calculation of compound annual growth rates for key financial metrics',
      ar: 'حساب معدلات النمو السنوية المركبة للمقاييس المالية الرئيسية'
    },
    whatItMeasures: {
      en: 'Sustainable growth patterns and expansion velocity',
      ar: 'أنماط النمو المستدام وسرعة التوسع'
    },
    importance: {
      en: 'Assesses company\'s growth trajectory and future potential',
      ar: 'يقيم مسار نمو الشركة وإمكاناتها المستقبلية'
    },
    calculationMethod: {
      en: '(Ending Value / Beginning Value)^(1/n) - 1',
      ar: '(القيمة النهائية ÷ القيمة الابتدائية)^(١/ن) - ١'
    },
    requiredData: ['beginning_value', 'ending_value', 'time_periods'],
    outputType: 'percentage',
    industrySpecific: false,
    complexity: 'intermediate',

    forecastable: true
  },

  {
    id: 'variance_analysis',
    nameEn: 'Variance Analysis',
    nameAr: 'تحليل الانحرافات الأساسي',
    category: 'classical',
    subcategory: 'structural',
    description: {
      en: 'Comparison of actual financial results against budgeted or expected values',
      ar: 'مقارنة النتائج المالية الفعلية مقابل القيم الميزانية أو المتوقعة'
    },
    whatItMeasures: {
      en: 'Performance deviations and operational efficiency',
      ar: 'انحرافات الأداء وكفاءة العمليات'
    },
    importance: {
      en: 'Identifies areas requiring corrective action and performance improvement',
      ar: 'يحدد المجالات التي تتطلب إجراءات تصحيحية وتحسين الأداء'
    },
    calculationMethod: {
      en: 'Actual Results - Budgeted/Expected Results',
      ar: 'النتائج الفعلية - النتائج الميزانية/المتوقعة'
    },
    requiredData: ['actual_results', 'budgeted_results'],
    outputType: 'amount',
    industrySpecific: false,
    complexity: 'intermediate',
    benchmarkAvailable: false,
    forecastable: false
  },

  {
    id: 'simple_variance_analysis',
    nameEn: 'Simple Variance Analysis',
    nameAr: 'تحليل التباين البسيط',
    category: 'classical',
    subcategory: 'structural',
    description: {
      en: 'Basic comparison of financial performance against standards or benchmarks',
      ar: 'مقارنة أساسية للأداء المالي مقابل المعايير أو المقارنات'
    },
    whatItMeasures: {
      en: 'Basic performance deviations from established standards',
      ar: 'الانحرافات الأساسية في الأداء عن المعايير المحددة'
    },
    importance: {
      en: 'Provides initial insights into performance gaps and control effectiveness',
      ar: 'يوفر رؤى أولية حول فجوات الأداء وفعالية السيطرة'
    },
    calculationMethod: {
      en: 'Actual Performance - Standard/Benchmark Performance',
      ar: 'الأداء الفعلي - الأداء القياسي/المقارن'
    },
    requiredData: ['actual_performance', 'standard_performance'],
    outputType: 'amount',
    industrySpecific: false,
    complexity: 'basic',

    forecastable: false
  },

  {
    id: 'benchmark_analysis',
    nameEn: 'Benchmark Analysis',
    nameAr: 'تحليل الأرقام القياسية',
    category: 'classical',
    subcategory: 'structural',
    description: {
      en: 'Evaluation of performance against industry standards and best practices',
      ar: 'تقييم الأداء مقابل المعايير الصناعية وأفضل الممارسات'
    },
    whatItMeasures: {
      en: 'Relative performance position and competitive advantage',
      ar: 'الموقع النسبي للأداء والميزة التنافسية'
    },
    importance: {
      en: 'Establishes performance targets and identifies improvement opportunities',
      ar: 'يحدد أهداف الأداء ويحدد فرص التحسين'
    },
    calculationMethod: {
      en: 'Company Performance / Industry Benchmark × 100',
      ar: 'أداء الشركة ÷ معيار الصناعة × ١٠٠'
    },
    requiredData: ['company_performance', 'industry_benchmark'],
    outputType: 'percentage',
    industrySpecific: true,
    complexity: 'intermediate',

    forecastable: false
  }
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

    forecastable: true
  },

  {
    id: 'operating_cash_flow_ratio',
    nameEn: 'Operating Cash Flow Ratio',
    nameAr: 'نسبة التدفق النقدي التشغيلي',
    category: 'classical',
    subcategory: 'liquidity',
    description: {
      en: 'Measures ability to pay current liabilities from operating cash flows',
      ar: 'يقيس القدرة على سداد الخصوم الجارية من التدفقات النقدية التشغيلية'
    },
    whatItMeasures: {
      en: 'Cash generation capacity to meet short-term obligations',
      ar: 'قدرة توليد النقد لتلبية الالتزامات قصيرة الأجل'
    },
    importance: {
      en: 'Indicates operational cash sufficiency for current debt servicing',
      ar: 'يشير إلى كفاية النقد التشغيلي لخدمة الدين الحالي'
    },
    calculationMethod: {
      en: 'Operating Cash Flow ÷ Current Liabilities',
      ar: 'التدفق النقدي التشغيلي ÷ الخصوم المتداولة'
    },
    requiredData: ['operating_cash_flow', 'current_liabilities'],
    outputType: 'ratio',
    industrySpecific: true,
    complexity: 'intermediate',

    forecastable: true
  },

  {
    id: 'working_capital_ratio',
    nameEn: 'Working Capital Ratio',
    nameAr: 'نسبة رأس المال العامل',
    category: 'classical',
    subcategory: 'liquidity',
    description: {
      en: 'Measures efficiency in utilizing working capital to support operations',
      ar: 'يقيس كفاءة استخدام رأس المال العامل لدعم العمليات'
    },
    whatItMeasures: {
      en: 'Working capital adequacy and operational efficiency',
      ar: 'كفاية رأس المال العامل وكفاءة العمليات'
    },
    importance: {
      en: 'Assesses operational liquidity and short-term financial flexibility',
      ar: 'يقيم السيولة التشغيلية والمرونة المالية قصيرة الأجل'
    },
    calculationMethod: {
      en: 'Working Capital ÷ Total Assets',
      ar: 'رأس المال العامل ÷ إجمالي الأصول'
    },
    requiredData: ['working_capital', 'total_assets'],
    outputType: 'ratio',
    industrySpecific: true,
    complexity: 'intermediate',

    forecastable: true
  },

  {
    id: 'defensive_interval_ratio',
    nameEn: 'Defensive Interval Ratio',
    nameAr: 'نسبة الفترة الدفاعية',
    category: 'classical',
    subcategory: 'liquidity',
    description: {
      en: 'Measures number of days company can operate using only liquid assets',
      ar: 'يقيس عدد الأيام التي يمكن أن تعمل فيها الشركة باستخدام الأصول السيولة فقط'
    },
    whatItMeasures: {
      en: 'Operational sustainability using only liquid assets',
      ar: 'استدامة العمليات باستخدام الأصول السيولة فقط'
    },
    importance: {
      en: 'Indicates crisis resilience and emergency operational capacity',
      ar: 'يشير إلى مرونة الأزمة والقدرة التشغيلية الطارئة'
    },
    calculationMethod: {
      en: 'Liquid Assets ÷ Daily Operating Expenses',
      ar: 'الأصول السيولة ÷ المصروفات التشغيلية اليومية'
    },
    requiredData: ['liquid_assets', 'daily_operating_expenses'],
    outputType: 'days',
    industrySpecific: true,
    complexity: 'advanced',

    forecastable: true
  },

  {
    id: 'cash_coverage_ratio',
    nameEn: 'Cash Coverage Ratio',
    nameAr: 'نسبة التغطية النقدية',
    category: 'classical',
    subcategory: 'liquidity',
    description: {
      en: 'Measures ability to cover interest expenses with operating cash flows',
      ar: 'يقيس القدرة على تغطية مصروفات الفائدة مع التدفقات النقدية التشغيلية'
    },
    whatItMeasures: {
      en: 'Cash flow adequacy for interest payments',
      ar: 'كفاية التدفق النقدي لسداد الفوائد'
    },
    importance: {
      en: 'Assesses debt servicing capability without relying on external financing',
      ar: 'يقيم قدرة خدمة الدين دون الاعتماد على التمويل الخارجي'
    },
    calculationMethod: {
      en: '(Operating Cash Flow + Interest Expense) ÷ Interest Expense',
      ar: '(التدفق النقدي التشغيلي + مصروفات الفائدة) ÷ مصروفات الفائدة'
    },
    requiredData: ['operating_cash_flow', 'interest_expense'],
    outputType: 'ratio',
    industrySpecific: true,
    complexity: 'intermediate',

    forecastable: true
  },

  {
    id: 'absolute_liquidity_ratio',
    nameEn: 'Absolute Liquidity Ratio',
    nameAr: 'نسبة السيولة المطلقة',
    category: 'classical',
    subcategory: 'liquidity',
    description: {
      en: 'Measures liquidity using only the most liquid assets (cash and bank balances)',
      ar: 'يقيس السيولة باستخدام الأصول الأكثر سيولة فقط (النقد ورصيد البنك)'
    },
    whatItMeasures: {
      en: 'Immediate liquidity position without relying on asset conversion',
      ar: 'موقف السيولة الفوري دون الاعتماد على تحويل الأصول'
    },
    importance: {
      en: 'Most conservative measure of immediate payment capability',
      ar: 'أكثر مقياس تحفظاً لقدرة الدفع الفورية'
    },
    calculationMethod: {
      en: '(Cash + Bank Balances) ÷ Current Liabilities',
      ar: '(النقد + رصيد البنك) ÷ الخصوم المتداولة'
    },
    requiredData: ['cash', 'bank_balances', 'current_liabilities'],
    outputType: 'ratio',
    industrySpecific: true,
    complexity: 'basic',

    forecastable: true
  },

  {
    id: 'free_cash_flow_ratio',
    nameEn: 'Free Cash Flow Ratio',
    nameAr: 'نسبة التدفق النقدي الحر',
    category: 'classical',
    subcategory: 'liquidity',
    description: {
      en: 'Measures ability to generate free cash flow relative to current liabilities',
      ar: 'يقيس القدرة على توليد التدفق النقدي الحر مقارنة بالخصوم الجارية'
    },
    whatItMeasures: {
      en: 'Free cash generation capacity for debt servicing and growth',
      ar: 'قدرة توليد النقد الحر لخدمة الدين والنمو'
    },
    importance: {
      en: 'Indicates financial flexibility for expansion and investment opportunities',
      ar: 'يشير إلى المرونة المالية لفرص التوسع والاستثمار'
    },
    calculationMethod: {
      en: 'Free Cash Flow ÷ Current Liabilities',
      ar: 'التدفق النقدي الحر ÷ الخصوم المتداولة'
    },
    requiredData: ['free_cash_flow', 'current_liabilities'],
    outputType: 'ratio',
    industrySpecific: true,
    complexity: 'intermediate',

    forecastable: true
  },

  {
    id: 'basic_liquidity_index',
    nameEn: 'Basic Liquidity Index',
    nameAr: 'مؤشر السيولة الأساسي',
    category: 'classical',
    subcategory: 'liquidity',
    description: {
      en: 'Composite measure combining multiple liquidity ratios for overall assessment',
      ar: 'مقياس مركب يجمع عدة نسب سيولة لتقييم شامل'
    },
    whatItMeasures: {
      en: 'Overall liquidity position using weighted combination of key ratios',
      ar: 'موقف السيولة الإجمالي باستخدام مزيج مرجح من النسب الرئيسية'
    },
    importance: {
      en: 'Provides holistic view of liquidity health across multiple dimensions',
      ar: 'يوفر رؤية شاملة لصحة السيولة عبر أبعاد متعددة'
    },
    calculationMethod: {
      en: 'Weighted average of Current Ratio, Quick Ratio, and Cash Ratio',
      ar: 'المتوسط المرجح للنسبة الجارية والنسبة السريعة ونسبة النقد'
    },
    requiredData: ['current_assets', 'inventory', 'cash', 'current_liabilities'],
    outputType: 'index',
    industrySpecific: true,
    complexity: 'advanced',

    forecastable: true
  }
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
      en: '365 / Inventory Turnover Ratio',
      ar: '365 ÷ معدل دوران المخزون'
    },
    requiredData: ['cost_of_goods_sold', 'inventory'],
    outputType: 'days',
    industrySpecific: false,
    complexity: 'basic'
  }
]