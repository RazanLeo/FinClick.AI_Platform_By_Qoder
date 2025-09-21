// Internationalization Configuration for FinClick.AI
// Complete bilingual support for Arabic (RTL) and English (LTR)

import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['ar', 'en'] as const;
export type Locale = (typeof locales)[number];

export const pathnames = {
  '/': '/',
  '/dashboard': '/dashboard',
  '/analysis': '/analysis',
  '/reports': '/reports',
  '/admin': '/admin',
  '/auth': '/auth',
  '/login': '/login'
} as const;

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });

// Translation messages
export const messages = {
  ar: {
    // Navigation and Header
    nav: {
      home: 'الصفحة الرئيسية',
      dashboard: 'لوحة التحكم',
      company: 'الشركة',
      analysisTypes: 'أنواع التحليل',
      features: 'مميزات المنصة',
      pricing: 'الاشتراكات والأسعار',
      steps: 'خطوات استخدام المنصة',
      contact: 'التواصل والدعم',
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب'
    },
    
    // Hero Section
    hero: {
      title: 'FinClick.AI',
      subtitle: 'منصة التحليل المالي الذكية الثورية',
      description: 'نظام ثوري قائم على الذكاء الاصطناعي يقدم جميع أنواع التحليل المالي الكمي المعروفة في العالم - ١٨٠ نوع تحليل مالي'
    },
    
    // Features Section
    features: {
      title: 'لماذا FinClick.AI؟',
      revolutionary: {
        title: 'ثورة ونقلة نوعية في عالم التحليل المالي',
        description: 'نظام يقلب الدنيا رأساً على عقب ويقلب كل الموازين. ثورة يعجز أمامها جميع متخصصين وخبراء التحليل المالي العالميين.'
      },
      users: {
        title: 'يخدم كل مستفيدي التحليل المالي',
        description: 'يخدم كل أغراض التحليل المالي (أفراد، مؤسسات شركات، منظمات)'
      },
      ai: {
        title: 'يقوم على الذكاء الاصطناعي',
        description: 'نظام ذكي متطور يستخدم أحدث تقنيات الذكاء الاصطناعي والتعلم الآلي'
      },
      comprehensive: {
        title: 'جميع أنواع التحليل المالي الكمي',
        description: 'يقدم جميع أنواع التحليل المالي الكمي المعروفة في العالم - ١٨٠+ تحليل مالي'
      },
      cloud: {
        title: 'بيئة سحابية',
        description: 'تستطيع فتحه من أي مكان وفي أي وقت ومن أي متصفح وعلى أي جهاز'
      },
      interface: {
        title: 'واجهة واضحة واحترافية',
        description: 'طريقة عرض للتحليلات تناسب الجميع حتى لو لم تكن لديك معرفة أو خلفية مالية'
      },
      speed: {
        title: 'السرعة',
        description: 'احصل على التحليل في ثوان معدودة بضغطة زر'
      },
      simplicity: {
        title: 'السهولة',
        description: '٣ خطوات: أرفق قوائمك - حدد خيارات التحليل - اضغط زر التحليل'
      },
      accuracy: {
        title: 'الدقة والكفاءة المتناهية',
        description: 'دقة بنسبة ٩٩٪'
      },
      security: {
        title: 'أمان عالي',
        description: 'حماية متقدمة للبيانات والخصوصية'
      },
      analyst: {
        title: 'محلل مالي خارق',
        description: 'يساعد كل شخص يتخذ القرارات المالية اللحظية'
      },
      reports: {
        title: 'تقارير تفصيلة وعروض تقديمية',
        description: 'جاهزة للعرض والمناقشة والتسليم'
      },
      benchmarks: {
        title: 'مقارنات معيارية',
        description: 'مقارنات متوسط الصناعة على جميع المستويات الجغرافية'
      },
      quality: {
        title: 'جودة عالمية',
        description: 'معايير عالمية في التحليل والتقارير'
      }
    },
    
    // Beneficiaries Section
    beneficiaries: {
      title: 'المستفيدون والأغراض',
      description: 'هذه المنصة تمكن كل مستفيدي التحليل المالي أياً كانوا أفراد أو جهات أو منظمات من إجراء جميع أنواع التحليل المالي الكمية المعروفة في العالم',
      owners: 'تساعد صاحب الشركة على فهم أداء شركته المالي بسهولة وسرعة',
      analysts: 'تساعد المدير المالي أو المحلل المالي في إنجاز عمله بثوان معدودة',
      investors: 'تساعد أي مستثمر على اتخاذ قرار فوري لشراء أسهم شركة معينة',
      banks: 'تساعد موظفي البنوك على تقييم أداء الشركات لاتخاذ قرارات التمويل والإقراض',
      valuers: 'تساعد على تقييم جدوى المشاريع الجديدة أو تقييم الشركات',
      general: 'تساعد جميع المهتمين بالتحليل المالي أيا كان فرد أو منظمة أو جهة'
    },
    
    // Steps Section
    steps: {
      title: 'خطوات النظام',
      step1: {
        title: 'أرفق قوائمك',
        description: 'أرفق القوائم المالية أو موازين المراجعة بأي صيغة كانت'
      },
      step2: {
        title: 'حدد خيارات التحليل',
        description: 'اختر اللغة والقطاع والنشاط ونوع التحليل المطلوب'
      },
      step3: {
        title: 'اضغط زر التحليل',
        description: 'احصل على تحليل شامل ومفصل في ثوان معدودة'
      }
    },
    
    // Analysis Types
    analysisTypes: {
      title: 'أنواع التحليل',
      classical: {
        title: 'التحليل الأساسي الكلاسيكي',
        count: '١٠٦ تحليل',
        structural: 'التحليل الهيكلي للقوائم المالية (١٣ نوع)',
        ratios: 'تحليل النسب المالية (٧٥ نسبة)',
        flow: 'تحليلات التدفق والحركة (١٨ نوع)'
      },
      applied: {
        title: 'التحليل التطبيقي المتوسط',
        count: '٢١ تحليل',
        comparative: 'تحليلات المقارنة المتقدمة (٣ أنواع)',
        valuation: 'تحليلات التقييم والاستثمار (١٣ نوع)',
        performance: 'تحليلات الأداء والكفاءة (٥ أنواع)'
      },
      advanced: {
        title: 'التحليل المتقدم والمتطور',
        count: '٥٣ تحليل',
        modeling: 'النمذجة والمحاكاة (١١ نموذج)',
        statistical: 'التحليل الإحصائي والكمي (١٦ تحليل)',
        forecasting: 'نماذج التنبؤ والتصنيف الائتماني (١٠ نماذج)',
        risk: 'تحليلات المخاطر الكمية (٢٥ تحليل)'
      }
    },
    
    // Free Tools
    freeTools: {
      title: 'الأدوات المجانية',
      economicCalendar: 'التقويم الاقتصادي',
      liveNews: 'الأخبار الحية',
      calculators: {
        title: 'الحاسبات المالية الأوتوماتيكية',
        fairValue: 'حاسبة السعر العادل للسهم',
        roi: 'حاسبة العائد على الاستثمار',
        pe: 'حاسبة نسبة السعر للأرباح'
      },
      marketSentiment: 'مؤشر مزاج السوق التفاعلي',
      aiBot: 'بوت جي بي تي مالي'
    },
    
    // Testimonials
    testimonials: {
      title: 'ماذا يقول عملاؤنا',
      client1: 'نظام شامل ومتكامل ساعدني على أن أفهم أداء شركتي بسرعة ودقة وسهولة. إنه نظام رائع يقدم كل أنواع التحليل المالي.',
      client2: 'أنا كمدير ومحلل مالي لم أعد بحاجة لتضييع وقتي في الحسابات الطويلة وصار كل عملي أسهل واجتماعاتي أكثر احترافية.',
      client3: 'أنا كمستثمر صرت أستطيع اتخاذ قرارات استثمارية لحظية وتحديد أسهم الشركات التي أود أن أستثمر فيها بثقة.',
      client4: 'بحكم عملي كموظف مسؤول عن عمليات التمويل والإقراض لقد أفادني النظام لتقييم الشركات بشكل سريع ودقيق.'
    },
    
    // Pricing
    pricing: {
      title: 'الأسعار والاشتراكات',
      monthly: {
        title: 'الخطة الشهرية',
        price: '٥٠٠٠ ريال سعودي',
        period: 'شهرياً'
      },
      annual: {
        title: 'الخطة السنوية',
        price: '٥٤٠٠٠ ريال سعودي',
        originalPrice: '٦٠٠٠٠ ريال سعودي',
        discount: 'خصم ١٠٪',
        savings: 'وفر ٦٠٠٠ ريال سعودي'
      },
      paymentMethods: 'طرق الدفع: مدى، فيزا، ماستر كارد، باي بال، آبل باي'
    },
    
    // Footer
    footer: {
      description: 'منصة التحليل المالي الذكية والثورية',
      contactSupport: 'التواصل والدعم',
      office: 'المكتب: جدة، المملكة العربية السعودية',
      email: 'البريد الإلكتروني: finclick.ai@gmail.com',
      phone: 'الهاتف/واتساب/تلغرام: 00966544827213',
      legalPolicies: 'السياسات القانونية',
      privacyPolicy: 'سياسة الخصوصية',
      termsOfUse: 'شروط الاستخدام',
      security: 'الأمان',
      compliance: 'الامتثال',
      intellectualProperty: 'حقوق الملكية الفكرية والعلامة التجارية',
      paymentPolicy: 'الدفع والاشتراك والاسترجاع',
      system: 'النظام',
      features: 'المميزات',
      analysisTypes: 'أنواع التحليل',
      pricing: 'الاشتراكات والأسعار',
      userManual: 'كتيب المستخدم',
      faq: 'الأسئلة الشائعة',
      company: 'الشركة',
      vision: 'الرؤية، الرسالة، الأهداف والخدمات',
      events: 'الفعاليات',
      blog: 'المدونة والأخبار',
      media: 'الإعلام',
      careers: 'الوظائف',
      rightsReserved: 'جميع الحقوق محفوظة',
      madeInSaudi: 'صُنع ❤️ في المملكة العربية السعودية'
    },
    
    // Dashboard
    dashboard: {
      title: 'لوحة التحكم',
      uploadFiles: 'إرفاق المستندات',
      analysisOptions: 'خيارات التحليل',
      startAnalysis: 'بدء التحليل',
      language: 'اللغة',
      companyName: 'اسم الشركة',
      sector: 'القطاع',
      activity: 'النشاط',
      legalEntity: 'الكيان القانوني',
      yearsOfAnalysis: 'عدد سنوات التحليل',
      comparisonLevel: 'مستوى المقارنة',
      analysisType: 'نوع التحليل'
    },
    
    // Common
    common: {
      loading: 'جارٍ التحميل...',
      error: 'خطأ',
      success: 'نجح',
      cancel: 'إلغاء',
      confirm: 'تأكيد',
      save: 'حفظ',
      edit: 'تعديل',
      delete: 'حذف',
      submit: 'إرسال',
      back: 'رجوع',
      next: 'التالي',
      previous: 'السابق',
      close: 'إغلاق',
      open: 'فتح',
      download: 'تحميل',
      upload: 'رفع',
      search: 'بحث',
      filter: 'تصفية',
      sort: 'ترتيب',
      view: 'عرض',
      print: 'طباعة',
      share: 'مشاركة',
      copy: 'نسخ',
      paste: 'لصق',
      cut: 'قص',
      undo: 'تراجع',
      redo: 'إعادة',
      select: 'اختيار',
      selectAll: 'اختيار الكل',
      clear: 'مسح',
      reset: 'إعادة تعيين',
      refresh: 'تحديث',
      more: 'المزيد',
      less: 'أقل',
      expand: 'توسيع',
      collapse: 'طي',
      maximize: 'تكبير',
      minimize: 'تصغير'
    }
  },
  
  en: {
    // Navigation and Header
    nav: {
      home: 'Home',
      dashboard: 'Dashboard',
      company: 'Company',
      analysisTypes: 'Analysis Types',
      features: 'Platform Features',
      pricing: 'Subscriptions & Pricing',
      steps: 'Platform Steps',
      contact: 'Contact & Support',
      login: 'Login',
      register: 'Create Account'
    },
    
    // Hero Section
    hero: {
      title: 'FinClick.AI',
      subtitle: 'Revolutionary Intelligent Financial Analysis Platform',
      description: 'Revolutionary AI-powered system providing all known quantitative financial analysis types worldwide - 180 financial analysis types'
    },
    
    // Features Section
    features: {
      title: 'Why FinClick.AI?',
      revolutionary: {
        title: 'Revolution and Paradigm Shift in Financial Analysis',
        description: 'A system that turns the world upside down and changes all the rules. A revolution that amazes all global financial analysis specialists and experts.'
      },
      users: {
        title: 'Serves All Financial Analysis Beneficiaries',
        description: 'Serves all financial analysis purposes (individuals, institutions, companies, organizations)'
      },
      ai: {
        title: 'AI-Powered',
        description: 'Advanced intelligent system using the latest artificial intelligence and machine learning technologies'
      },
      comprehensive: {
        title: 'All Quantitative Financial Analysis Types',
        description: 'Provides all known quantitative financial analysis types worldwide - 180+ financial analyses'
      },
      cloud: {
        title: 'Cloud Environment',
        description: 'Access from anywhere, anytime, from any browser, on any device'
      },
      interface: {
        title: 'Clear and Professional Interface',
        description: 'Analysis presentation suitable for everyone, even without financial knowledge or background'
      },
      speed: {
        title: 'Speed',
        description: 'Get analysis in seconds with one click'
      },
      simplicity: {
        title: 'Simplicity',
        description: '3 steps: Upload statements - Select analysis options - Click analyze'
      },
      accuracy: {
        title: 'Ultimate Precision and Efficiency',
        description: '99% accuracy'
      },
      security: {
        title: 'High Security',
        description: 'Advanced data protection and privacy'
      },
      analyst: {
        title: 'Super Financial Analyst',
        description: 'Helps anyone make instant financial decisions'
      },
      reports: {
        title: 'Detailed Reports and Presentations',
        description: 'Ready for presentation, discussion, and delivery'
      },
      benchmarks: {
        title: 'Benchmark Comparisons',
        description: 'Industry average comparisons at all geographic levels'
      },
      quality: {
        title: 'Global Quality',
        description: 'International standards in analysis and reporting'
      }
    },
    
    // Beneficiaries Section
    beneficiaries: {
      title: 'Beneficiaries and Purposes',
      description: 'This platform enables all financial analysis beneficiaries, whether individuals, entities, or organizations, to perform all known quantitative financial analysis types worldwide',
      owners: 'Helps company owners understand their company\'s financial performance easily and quickly',
      analysts: 'Helps financial managers or analysts complete their work in seconds',
      investors: 'Helps any investor make instant decisions to buy shares of a specific company',
      banks: 'Helps bank employees evaluate company performance for financing and lending decisions',
      valuers: 'Helps evaluate feasibility of new projects or company valuations',
      general: 'Helps all those interested in financial analysis, whether individual, organization, or entity'
    },
    
    // Steps Section
    steps: {
      title: 'System Steps',
      step1: {
        title: 'Upload Your Statements',
        description: 'Upload financial statements or trial balances in any format'
      },
      step2: {
        title: 'Select Analysis Options',
        description: 'Choose language, sector, activity, and required analysis type'
      },
      step3: {
        title: 'Click Analyze',
        description: 'Get comprehensive and detailed analysis in seconds'
      }
    },
    
    // Analysis Types
    analysisTypes: {
      title: 'Analysis Types',
      classical: {
        title: 'Classical Foundational Analysis',
        count: '106 analyses',
        structural: 'Structural Analysis of Financial Statements (13 types)',
        ratios: 'Financial Ratios Analysis (75 ratios)',
        flow: 'Flow and Movement Analysis (18 types)'
      },
      applied: {
        title: 'Applied Intermediate Analysis',
        count: '21 analyses',
        comparative: 'Advanced Comparative Analysis (3 types)',
        valuation: 'Valuation and Investment Analysis (13 types)',
        performance: 'Performance and Efficiency Analysis (5 types)'
      },
      advanced: {
        title: 'Advanced and Sophisticated Analysis',
        count: '53 analyses',
        modeling: 'Modeling and Simulation (11 models)',
        statistical: 'Statistical and Quantitative Analysis (16 analyses)',
        forecasting: 'Forecasting and Credit Scoring Models (10 models)',
        risk: 'Quantitative Risk Analysis (25 analyses)'
      }
    },
    
    // Free Tools
    freeTools: {
      title: 'Free Tools',
      economicCalendar: 'Economic Calendar',
      liveNews: 'Live News',
      calculators: {
        title: 'Automatic Financial Calculators',
        fairValue: 'Fair Stock Price Calculator',
        roi: 'Return on Investment Calculator',
        pe: 'Price-to-Earnings Calculator'
      },
      marketSentiment: 'Interactive Market Sentiment Indicator',
      aiBot: 'Financial GPT Bot'
    },
    
    // Testimonials
    testimonials: {
      title: 'What Our Clients Say',
      client1: 'Comprehensive and integrated system that helped me understand my company\'s performance quickly, accurately, and easily. It\'s an amazing system that provides all types of financial analysis.',
      client2: 'As a financial manager and analyst, I no longer need to waste time on lengthy calculations, and all my work has become easier and my meetings more professional.',
      client3: 'As an investor, I can now make instant investment decisions and identify company stocks I want to invest in with confidence.',
      client4: 'In my role as an employee responsible for financing and lending operations, the system has helped me evaluate companies quickly and accurately.'
    },
    
    // Pricing
    pricing: {
      title: 'Pricing & Subscriptions',
      monthly: {
        title: 'Monthly Plan',
        price: '5,000 SAR',
        period: 'monthly'
      },
      annual: {
        title: 'Annual Plan',
        price: '54,000 SAR',
        originalPrice: '60,000 SAR',
        period: 'annual'
      }
    }
  }
}