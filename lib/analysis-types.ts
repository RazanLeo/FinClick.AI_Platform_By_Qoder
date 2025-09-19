// Financial Analysis Types Configuration - Core Structure
// Complete specification of all 180 financial analysis types

export interface AnalysisType {
  id: string;
  nameEn: string;
  nameAr: string;
  category: 'classical' | 'applied' | 'advanced';
  subcategory: string;
  description: {
    en: string;
    ar: string;
  };
  whatItMeasures: {
    en: string;
    ar: string;
  };
  importance: {
    en: string;
    ar: string;
  };
  calculationMethod: {
    en: string;
    ar: string;
  };
  requiredData: string[];
  outputType: 'ratio' | 'percentage' | 'amount' | 'days' | 'times' | 'index' | 'score' | 'probability';
  industrySpecific: boolean;
  complexity: 'basic' | 'intermediate' | 'advanced';
}

export interface AnalysisCategory {
  id: string;
  nameEn: string;
  nameAr: string;
  subcategories: AnalysisSubcategory[];
  totalAnalyses: number;
}

export interface AnalysisSubcategory {
  id: string;
  nameEn: string;
  nameAr: string;
  analyses: AnalysisType[];
  count: number;
}

// Main Categories Structure
export const ANALYSIS_CATEGORIES: AnalysisCategory[] = [
  {
    id: 'classical',
    nameEn: 'Classical Foundational Analysis',
    nameAr: 'التحليل الأساسي الكلاسيكي',
    totalAnalyses: 106,
    subcategories: [
      {
        id: 'structural',
        nameEn: 'Structural Analysis of Financial Statements',
        nameAr: 'التحليل الهيكلي للقوائم المالية',
        count: 13,
        analyses: []
      },
      {
        id: 'ratios',
        nameEn: 'Financial Ratios Analysis',
        nameAr: 'تحليل النسب المالية',
        count: 75,
        analyses: []
      },
      {
        id: 'flow_movement',
        nameEn: 'Flow and Movement Analysis',
        nameAr: 'تحليلات التدفق والحركة',
        count: 18,
        analyses: []
      }
    ]
  },
  {
    id: 'applied',
    nameEn: 'Applied Intermediate Analysis',
    nameAr: 'التحليل التطبيقي المتوسط',
    totalAnalyses: 21,
    subcategories: [
      {
        id: 'advanced_comparative',
        nameEn: 'Advanced Comparative Analysis',
        nameAr: 'تحليلات المقارنة المتقدمة',
        count: 3,
        analyses: []
      },
      {
        id: 'valuation_investment',
        nameEn: 'Valuation and Investment Analysis',
        nameAr: 'تحليلات التقييم والاستثمار',
        count: 13,
        analyses: []
      },
      {
        id: 'performance_efficiency',
        nameEn: 'Performance and Efficiency Analysis',
        nameAr: 'تحليلات الأداء والكفاءة',
        count: 5,
        analyses: []
      }
    ]
  },
  {
    id: 'advanced',
    nameEn: 'Advanced and Sophisticated Analysis',
    nameAr: 'التحليل المتقدم والمتطور',
    totalAnalyses: 53,
    subcategories: [
      {
        id: 'modeling_simulation',
        nameEn: 'Modeling and Simulation',
        nameAr: 'النمذجة والمحاكاة',
        count: 11,
        analyses: []
      },
      {
        id: 'statistical_quantitative',
        nameEn: 'Statistical and Quantitative Analysis',
        nameAr: 'التحليل الإحصائي والكمي',
        count: 16,
        analyses: []
      },
      {
        id: 'forecasting_credit',
        nameEn: 'Forecasting and Credit Scoring Models',
        nameAr: 'نماذج التنبؤ والتصنيف الائتماني',
        count: 10,
        analyses: []
      },
      {
        id: 'quantitative_risk',
        nameEn: 'Quantitative Risk Analysis',
        nameAr: 'تحليلات المخاطر الكمية',
        count: 25,
        analyses: []
      },
      {
        id: 'portfolio_investment',
        nameEn: 'Portfolio and Investment Analysis',
        nameAr: 'تحليلات المحافظ والاستثمار',
        count: 14,
        analyses: []
      },
      {
        id: 'ma_analysis',
        nameEn: 'M&A Analysis',
        nameAr: 'تحليلات الاندماج والاستحواذ',
        count: 5,
        analyses: []
      },
      {
        id: 'detection_forecasting',
        nameEn: 'Detection and Quantitative Forecasting Techniques',
        nameAr: 'تقنيات الكشف والتنبؤ الكمي',
        count: 10,
        analyses: []
      },
      {
        id: 'time_series',
        nameEn: 'Time Series Statistical Analysis',
        nameAr: 'التحليلات الإحصائية الزمنية',
        count: 6,
        analyses: []
      }
    ]
  }
];

// Ratio Subcategories for Classical Analysis
export const RATIO_SUBCATEGORIES = [
  {
    id: 'liquidity',
    nameEn: 'Liquidity Ratios',
    nameAr: 'نسب السيولة',
    count: 10
  },
  {
    id: 'activity',
    nameEn: 'Activity/Efficiency Ratios',
    nameAr: 'نسب النشاط والكفاءة',
    count: 15
  },
  {
    id: 'profitability',
    nameEn: 'Profitability Ratios',
    nameAr: 'نسب الربحية',
    count: 20
  },
  {
    id: 'leverage',
    nameEn: 'Leverage/Debt Ratios',
    nameAr: 'نسب المديونية والرفع المالي',
    count: 15
  },
  {
    id: 'market',
    nameEn: 'Market Ratios',
    nameAr: 'نسب السوق والأسهم',
    count: 15
  }
];

// Industry Classifications
export const INDUSTRY_SECTORS = [
  { id: 'energy', nameEn: 'Energy and Natural Resources', nameAr: 'الطاقة والموارد الطبيعية' },
  { id: 'materials', nameEn: 'Basic Materials and Chemicals', nameAr: 'المواد الأساسية والكيماويات' },
  { id: 'mining', nameEn: 'Mining and Metals', nameAr: 'التعدين والمعادن' },
  { id: 'manufacturing', nameEn: 'Manufacturing Industries', nameAr: 'الصناعات التحويلية' },
  { id: 'food_beverage', nameEn: 'Food and Beverages', nameAr: 'الأغذية والمشروبات' },
  { id: 'agriculture', nameEn: 'Agriculture and Livestock', nameAr: 'الزراعة والثروة الحيوانية' },
  { id: 'fishing', nameEn: 'Fishing and Marine Resources', nameAr: 'الصيد والموارد البحرية' },
  { id: 'financial', nameEn: 'Financial and Banking', nameAr: 'القطاع المالي والمصرفي' },
  { id: 'real_estate', nameEn: 'Real Estate and Construction', nameAr: 'العقارات والإنشاءات' },
  { id: 'retail', nameEn: 'Trade and Retail', nameAr: 'التجارة والتجزئة' },
  { id: 'transportation', nameEn: 'Transportation and Logistics', nameAr: 'النقل واللوجستيات' },
  { id: 'telecommunications', nameEn: 'Telecommunications and IT', nameAr: 'الاتصالات وتكنولوجيا المعلومات' },
  { id: 'ai_tech', nameEn: 'AI and Machine Learning', nameAr: 'الذكاء الاصطناعي والتعلم الآلي' },
  { id: 'healthcare', nameEn: 'Healthcare', nameAr: 'الرعاية الصحية' },
  { id: 'education', nameEn: 'Education and Training', nameAr: 'التعليم والتدريب' },
  { id: 'tourism', nameEn: 'Tourism and Hospitality', nameAr: 'السياحة والضيافة' },
  { id: 'media', nameEn: 'Media and Entertainment', nameAr: 'الإعلام والترفيه' },
  { id: 'professional', nameEn: 'Professional and Consulting Services', nameAr: 'الخدمات المهنية والاستشارية' },
  { id: 'personal', nameEn: 'Personal and Community Services', nameAr: 'الخدمات الشخصية والمجتمعية' },
  { id: 'defense', nameEn: 'Defense and Security', nameAr: 'الدفاع والأمن' },
  { id: 'space', nameEn: 'Space and Satellites', nameAr: 'الفضاء والأقمار الصناعية' },
  { id: 'environment', nameEn: 'Environment and Sustainability', nameAr: 'البيئة والاستدامة' },
  { id: 'robotics', nameEn: 'Robotics and Automation', nameAr: 'الروبوتات والأتمتة' },
  { id: 'government', nameEn: 'Government and Public Sector', nameAr: 'القطاع الحكومي والعام' },
  { id: 'nonprofit', nameEn: 'Non-Profit and Charitable', nameAr: 'القطاع غير الربحي والخيري' },
  { id: 'creative', nameEn: 'Creative Economy', nameAr: 'الاقتصاد الإبداعي' },
  { id: 'emerging', nameEn: 'Emerging and Future Sectors', nameAr: 'القطاعات الناشئة والمستقبلية' }
];

// Legal Entity Types
export const LEGAL_ENTITIES = [
  { id: 'joint_stock_simplified', nameEn: 'Simplified Joint Stock Company', nameAr: 'شركة مساهمة مبسطة' },
  { id: 'partnership', nameEn: 'Partnership Company', nameAr: 'شركات الأشخاص' },
  { id: 'general_partnership', nameEn: 'General Partnership', nameAr: 'شركة التضامن' },
  { id: 'limited_partnership', nameEn: 'Limited Partnership', nameAr: 'شركة التوصية البسيطة' },
  { id: 'joint_venture', nameEn: 'Joint Venture', nameAr: 'شركة المحاصة' },
  { id: 'capital_company', nameEn: 'Capital Company', nameAr: 'شركات الأموال' },
  { id: 'public_joint_stock', nameEn: 'Public Joint Stock Company', nameAr: 'شركة المساهمة العامة' },
  { id: 'private_joint_stock', nameEn: 'Private Joint Stock Company', nameAr: 'شركة المساهمة الخاصة' },
  { id: 'llc', nameEn: 'Limited Liability Company', nameAr: 'الشركة ذات المسؤولية المحدودة' },
  { id: 'single_person_llc', nameEn: 'Single Person LLC', nameAr: 'شركة الشخص الواحد' },
  { id: 'limited_partnership_shares', nameEn: 'Limited Partnership by Shares', nameAr: 'شركة التوصية بالأسهم' },
  { id: 'sole_proprietorship', nameEn: 'Sole Proprietorship', nameAr: 'المؤسسة الفردية' },
  { id: 'holding_company', nameEn: 'Holding Company', nameAr: 'الشركة القابضة' },
  { id: 'subsidiary', nameEn: 'Subsidiary Company', nameAr: 'الشركة التابعة' },
  { id: 'venture_capital', nameEn: 'Venture Capital Company', nameAr: 'شركة رأس المال الاستثماري' },
  { id: 'spv', nameEn: 'Special Purpose Vehicle', nameAr: 'المنشأة ذات الغرض الخاص' },
  { id: 'charity', nameEn: 'Charitable Association/NPO', nameAr: 'الجمعية الخيرية / المنظمة غير الربحية' },
  { id: 'cooperative', nameEn: 'Cooperative Association', nameAr: 'الجمعية التعاونية' },
  { id: 'foundation', nameEn: 'Foundation', nameAr: 'المؤسسة' },
  { id: 'waqf', nameEn: 'Waqf/Endowment Fund', nameAr: 'الصندوق الوقفي' },
  { id: 'public_institution', nameEn: 'Public Institution', nameAr: 'المؤسسة العامة' },
  { id: 'soe', nameEn: 'State-Owned Enterprise', nameAr: 'شركة مملوكة للدولة' },
  { id: 'independent_authority', nameEn: 'Independent Authority', nameAr: 'الهيئة المستقلة' },
  { id: 'multinational', nameEn: 'Multinational Corporation', nameAr: 'الشركة متعددة الجنسيات' },
  { id: 'professional_company', nameEn: 'Professional Company', nameAr: 'الشركة المهنية' }
];

// Geographic Comparison Levels
export const COMPARISON_LEVELS = [
  { id: 'saudi_local', nameEn: 'Saudi Arabia Local', nameAr: 'المستوى المحلي السعودي' },
  { id: 'gcc', nameEn: 'GCC Countries', nameAr: 'دول مجلس التعاون الخليجي' },
  { id: 'arab', nameEn: 'Arab Countries', nameAr: 'الدول العربية' },
  { id: 'asia', nameEn: 'Asian Countries', nameAr: 'دول آسيا' },
  { id: 'africa', nameEn: 'African Countries', nameAr: 'دول أفريقيا' },
  { id: 'europe', nameEn: 'European Countries', nameAr: 'دول أوروبا' },
  { id: 'north_america', nameEn: 'North American Countries', nameAr: 'دول أمريكا الشمالية' },
  { id: 'south_america', nameEn: 'South American Countries', nameAr: 'دول أمريكا الجنوبية' },
  { id: 'australia', nameEn: 'Australian Countries', nameAr: 'دول أستراليا' },
  { id: 'global', nameEn: 'Global', nameAr: 'عالمي' }
];

export default {
  ANALYSIS_CATEGORIES,
  RATIO_SUBCATEGORIES,
  INDUSTRY_SECTORS,
  LEGAL_ENTITIES,
  COMPARISON_LEVELS
};