// TypeScript Types for FinClick.AI Financial Analysis Platform

export interface FinancialStatements {
  balanceSheet: BalanceSheet;
  incomeStatement: IncomeStatement;
  cashFlow: CashFlowStatement;
  historicalData?: FinancialStatements[];
  metadata: {
    year: number;
    quarter?: number;
    currency: string;
    reportingStandard: 'IFRS' | 'GAAP' | 'LOCAL';
    auditStatus: 'audited' | 'reviewed' | 'unaudited';
  };
}

export interface BalanceSheet {
  // Current Assets
  cash: number;
  cashEquivalents: number;
  shortTermInvestments: number;
  accountsReceivable: number;
  inventory: number;
  prepaidExpenses: number;
  otherCurrentAssets: number;
  currentAssets: number;
  
  // Non-Current Assets
  propertyPlantEquipment: number;
  intangibleAssets: number;
  goodwill: number;
  longTermInvestments: number;
  deferredTaxAssets: number;
  otherNonCurrentAssets: number;
  totalAssets: number;
  
  // Current Liabilities
  accountsPayable: number;
  shortTermDebt: number;
  accruedLiabilities: number;
  currentPortionLongTermDebt: number;
  otherCurrentLiabilities: number;
  currentLiabilities: number;
  
  // Non-Current Liabilities
  longTermDebt: number;
  deferredTaxLiabilities: number;
  pensionObligations: number;
  otherNonCurrentLiabilities: number;
  totalLiabilities: number;
  totalDebt: number;
  
  // Equity
  shareCapital: number;
  retainedEarnings: number;
  accumulatedOtherComprehensiveIncome: number;
  treasuryStock: number;
  nonControllingInterests: number;
  totalEquity: number;
}

export interface IncomeStatement {
  // Revenue
  revenue: number;
  costOfGoodsSold: number;
  grossProfit: number;
  
  // Operating Expenses
  sellingGeneralAdministrative: number;
  researchDevelopment: number;
  depreciationAmortization: number;
  otherOperatingExpenses: number;
  totalOperatingExpenses: number;
  
  // Operating Income
  operatingIncome: number;
  ebit: number;
  ebitda: number;
  
  // Non-Operating Items
  interestExpense: number;
  interestIncome: number;
  otherIncomeExpense: number;
  
  // Pre-Tax Income
  incomeBeforeTax: number;
  incomeTaxExpense: number;
  
  // Net Income
  netIncome: number;
  netIncomeAttributableToParent: number;
  
  // Per Share Data
  basicEPS: number;
  dilutedEPS: number;
  weightedAverageShares: number;
  
  // Additional Metrics
  nopat: number; // Net Operating Profit After Tax
  taxRate: number;
}

export interface CashFlowStatement {
  // Operating Activities
  netIncome: number;
  depreciationAmortization: number;
  stockBasedCompensation: number;
  changeInWorkingCapital: number;
  changeInAccountsReceivable: number;
  changeInInventory: number;
  changeInAccountsPayable: number;
  otherOperatingActivities: number;
  operatingCashFlow: number;
  
  // Investing Activities
  capex: number;
  acquisitions: number;
  disposals: number;
  investmentPurchases: number;
  investmentSales: number;
  otherInvestingActivities: number;
  investingCashFlow: number;
  
  // Financing Activities
  debtIssuance: number;
  debtRepayment: number;
  equityIssuance: number;
  dividendsPaid: number;
  shareRepurchases: number;
  otherFinancingActivities: number;
  financingCashFlow: number;
  
  // Net Change
  netChangeInCash: number;
  beginningCash: number;
  endingCash: number;
  
  // Free Cash Flow
  freeCashFlow: number;
  freeCashFlowToEquity: number;
  
  // Additional Items
  principalPayments: number;
}

export interface MarketData {
  stockPrice: number;
  marketCap: number;
  enterpriseValue: number;
  sharesOutstanding: number;
  beta: number;
  dividendYield: number;
  dividendPerShare: number;
  bookValuePerShare: number;
  priceToBook: number;
  priceToEarnings: number;
  priceToSales: number;
  evToEbitda: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  averageVolume: number;
  currency: string;
}

export interface IndustryBenchmark {
  sector: string;
  industry: string;
  region: string;
  metric: string;
  average: number;
  median: number;
  percentile25: number;
  percentile75: number;
  count: number;
  lastUpdated: Date;
}

export interface AnalysisOptions {
  language: 'ar' | 'en';
  companyName: string;
  sector: string;
  activity: string;
  legalEntity: string;
  yearsOfAnalysis: number;
  comparisonLevel: GeographicLevel;
  analysisType: AnalysisScope;
  includeForecasting: boolean;
  includeRiskAssessment: boolean;
  includeBenchmarking: boolean;
  reportFormat: ReportFormat[];
}

export type GeographicLevel = 
  | 'saudi_local' 
  | 'gcc' 
  | 'arab' 
  | 'asia' 
  | 'africa' 
  | 'europe' 
  | 'north_america' 
  | 'south_america' 
  | 'australia' 
  | 'global';

export type AnalysisScope = 
  | 'classical' 
  | 'applied' 
  | 'advanced' 
  | 'comprehensive'
  | 'custom';

export type ReportFormat = 
  | 'pdf' 
  | 'word' 
  | 'excel' 
  | 'powerpoint' 
  | 'online';

export interface AnalysisResult {
  id: string;
  analysisType: AnalysisType;
  calculation: CalculationResult;
  interpretation: InterpretationResult;
  benchmark: BenchmarkResult;
  riskAssessment: RiskAssessmentResult;
  forecast: ForecastResult;
  swotAnalysis: SWOTResult;
  recommendations: RecommendationResult;
  timestamp: Date;
  language: string;
  error?: string;
}

export interface CalculationResult {
  value: number | object;
  unit: string;
  precision: number;
  formula: string;
  intermediateSteps?: Record<string, number>;
  dataQuality: 'high' | 'medium' | 'low';
}

export interface InterpretationResult {
  summary: string;
  detailedAnalysis: string;
  significance: 'high' | 'medium' | 'low';
  positiveAspects: string[];
  concerningAspects: string[];
  industryContext: string;
  confidence: number;
}

export interface BenchmarkResult {
  companyValue: number;
  industryAverage: number;
  industryMedian: number;
  percentileRank: number;
  comparisonResult: 'above' | 'below' | 'inline';
  peerComparison: PeerComparison[];
  geographicBenchmarks: Record<GeographicLevel, number>;
}

export interface PeerComparison {
  companyName: string;
  value: number;
  marketCap: number;
  sector: string;
}

export interface RiskAssessmentResult {
  overallRisk: 'low' | 'medium' | 'high' | 'critical';
  riskScore: number; // 0-100
  riskFactors: RiskFactor[];
  mitigationStrategies: string[];
  earlyWarningIndicators: string[];
  stressTestResults?: StressTestResult[];
}

export interface RiskFactor {
  category: 'financial' | 'operational' | 'market' | 'regulatory' | 'strategic';
  description: string;
  impact: 'low' | 'medium' | 'high';
  probability: 'low' | 'medium' | 'high';
  severity: number; // 1-10
}

export interface StressTestResult {
  scenario: string;
  impact: number;
  probability: number;
  description: string;
}

export interface ForecastResult {
  nextPeriod: ForecastPeriod;
  trend: TrendAnalysis;
  scenarios: ScenarioAnalysis;
  confidence: number;
  methodology: string;
  assumptions: string[];
}

export interface ForecastPeriod {
  period: string;
  value: number;
  range: {
    low: number;
    high: number;
  };
  growthRate: number;
}

export interface TrendAnalysis {
  direction: 'improving' | 'stable' | 'declining';
  strength: 'weak' | 'moderate' | 'strong';
  volatility: 'low' | 'medium' | 'high';
  cyclicality: boolean;
  seasonality: boolean;
}

export interface ScenarioAnalysis {
  optimistic: {
    value: number;
    probability: number;
    drivers: string[];
  };
  realistic: {
    value: number;
    probability: number;
    drivers: string[];
  };
  pessimistic: {
    value: number;
    probability: number;
    drivers: string[];
  };
}

export interface SWOTResult {
  strengths: SWOTItem[];
  weaknesses: SWOTItem[];
  opportunities: SWOTItem[];
  threats: SWOTItem[];
  strategicInsights: string[];
  actionPriorities: string[];
}

export interface SWOTItem {
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionRequired: boolean;
  timeframe: 'immediate' | 'short_term' | 'medium_term' | 'long_term';
}

export interface RecommendationResult {
  executiveSummary: string;
  immediate: Recommendation[];
  shortTerm: Recommendation[];
  mediumTerm: Recommendation[];
  longTerm: Recommendation[];
  strategic: Recommendation[];
  stakeholderSpecific: StakeholderRecommendations;
  implementationPlan: ImplementationStep[];
}

export interface Recommendation {
  title: string;
  description: string;
  rationale: string;
  expectedImpact: string;
  implementationComplexity: 'low' | 'medium' | 'high';
  estimatedCost: 'low' | 'medium' | 'high';
  priority: 'low' | 'medium' | 'high' | 'critical';
  successMetrics: string[];
  risks: string[];
}

export interface StakeholderRecommendations {
  management: Recommendation[];
  investors: Recommendation[];
  lenders: Recommendation[];
  valuers: Recommendation[];
  regulators: Recommendation[];
  employees: Recommendation[];
}

export interface ImplementationStep {
  step: number;
  description: string;
  timeframe: string;
  responsible: string;
  prerequisites: string[];
  deliverables: string[];
  successCriteria: string[];
}

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
  benchmarkAvailable: boolean;
  forecastable: boolean;
}

// User Management Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'guest';
  subscription: Subscription;
  preferences: UserPreferences;
  createdAt: Date;
  lastLogin: Date;
  isActive: boolean;
}

export interface Subscription {
  id: string;
  plan: 'monthly' | 'annual';
  status: 'active' | 'inactive' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
  price: number;
  currency: string;
  paymentMethod: string;
  autoRenew: boolean;
}

export interface UserPreferences {
  language: 'ar' | 'en';
  defaultCurrency: string;
  defaultReportFormat: ReportFormat;
  notificationSettings: NotificationSettings;
  analysisDefaults: Partial<AnalysisOptions>;
}

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  analysisComplete: boolean;
  subscriptionExpiry: boolean;
  systemUpdates: boolean;
}

// File Upload Types
export interface UploadedFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  extractedData?: ExtractedFinancialData;
  processingStatus: 'pending' | 'processing' | 'completed' | 'failed';
  uploadedAt: Date;
  userId: string;
}

export interface ExtractedFinancialData {
  statements: FinancialStatements;
  confidence: number;
  extractionMethod: 'ocr' | 'pdf_parse' | 'excel_parse' | 'manual';
  validationErrors: ValidationError[];
  extractedAt: Date;
}

export interface ValidationError {
  field: string;
  message: string;
  severity: 'warning' | 'error';
  suggestedFix?: string;
}

// Report Generation Types
export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  sections: ReportSection[];
  language: 'ar' | 'en' | 'both';
  format: ReportFormat;
  isDefault: boolean;
}

export interface ReportSection {
  id: string;
  title: string;
  type: 'summary' | 'analysis' | 'charts' | 'tables' | 'recommendations';
  order: number;
  required: boolean;
  content: any;
}

export interface GeneratedReport {
  id: string;
  title: string;
  format: ReportFormat;
  content: string | Buffer;
  metadata: ReportMetadata;
  generatedAt: Date;
  size: number;
  downloadUrl: string;
}

export interface ReportMetadata {
  companyName: string;
  analysisType: string;
  period: string;
  language: string;
  pageCount: number;
  sections: string[];
  author: string;
  template: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  timestamp: Date;
  requestId: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  requestId: string;
}

// Chart and Visualization Types
export interface ChartData {
  type: 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'radar';
  title: string;
  data: ChartDataPoint[];
  options: ChartOptions;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  metadata?: any;
}

export interface ChartOptions {
  responsive: boolean;
  showLegend: boolean;
  showTooltips: boolean;
  colors: string[];
  animation: boolean;
  customOptions?: any;
}

export default {};