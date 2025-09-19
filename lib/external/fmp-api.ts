// Financial Market Prep (FMP) API Integration for FinClick.AI
// Provides real-time financial data, stock prices, and market information

export interface FMPConfig {
  apiKey: string
  baseUrl: string
  rateLimit: number // requests per minute
}

export interface StockData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: number
  pe: number
  eps: number
  high52Week: number
  low52Week: number
}

export interface FinancialStatements {
  symbol: string
  period: string
  revenue: number
  grossProfit: number
  operatingIncome: number
  netIncome: number
  totalAssets: number
  totalDebt: number
  totalEquity: number
  cashAndCashEquivalents: number
  currentAssets: number
  currentLiabilities: number
}

export interface CompanyProfile {
  symbol: string
  companyName: string
  industry: string
  sector: string
  country: string
  marketCap: number
  description: string
  ceo: string
  website: string
  employees: number
}

export interface MarketIndices {
  name: string
  symbol: string
  price: number
  change: number
  changePercent: number
}

class FMPService {
  private static instance: FMPService
  private config: FMPConfig
  private requestCount = 0
  private lastResetTime = Date.now()

  constructor() {
    this.config = {
      apiKey: process.env.NEXT_PUBLIC_FMP_API_KEY || '',
      baseUrl: 'https://financialmodelingprep.com/api/v3',
      rateLimit: 250 // FMP allows 250 requests per minute for free tier
    }
  }

  static getInstance(): FMPService {
    if (!FMPService.instance) {
      FMPService.instance = new FMPService()
    }
    return FMPService.instance
  }

  // Rate limiting
  private async checkRateLimit(): Promise<void> {
    const now = Date.now()
    const timeWindow = 60 * 1000 // 1 minute

    if (now - this.lastResetTime > timeWindow) {
      this.requestCount = 0
      this.lastResetTime = now
    }

    if (this.requestCount >= this.config.rateLimit) {
      const waitTime = timeWindow - (now - this.lastResetTime)
      console.warn(`FMP rate limit reached. Waiting ${waitTime}ms`)
      await new Promise(resolve => setTimeout(resolve, waitTime))
      this.requestCount = 0
      this.lastResetTime = Date.now()
    }

    this.requestCount++
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    await this.checkRateLimit()

    if (!this.config.apiKey) {
      throw new Error('FMP API key not configured')
    }

    const url = `${this.config.baseUrl}${endpoint}?apikey=${this.config.apiKey}`

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`FMP API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      
      if (data.error || data['Error Message']) {
        throw new Error(data.error || data['Error Message'])
      }

      return data
    } catch (error) {
      console.error(`FMP API request failed for ${endpoint}:`, error)
      throw error
    }
  }

  // Stock Data
  async getStockQuote(symbol: string): Promise<StockData> {
    const data = await this.makeRequest<any[]>(`/quote/${symbol}`)
    
    if (!data || data.length === 0) {
      throw new Error(`No data found for symbol: ${symbol}`)
    }

    const quote = data[0]
    return {
      symbol: quote.symbol,
      name: quote.name,
      price: quote.price,
      change: quote.change,
      changePercent: quote.changesPercentage,
      volume: quote.volume,
      marketCap: quote.marketCap,
      pe: quote.pe,
      eps: quote.eps,
      high52Week: quote.yearHigh,
      low52Week: quote.yearLow
    }
  }

  async getMultipleStockQuotes(symbols: string[]): Promise<StockData[]> {
    const symbolString = symbols.join(',')
    const data = await this.makeRequest<any[]>(`/quote/${symbolString}`)
    
    return data.map(quote => ({
      symbol: quote.symbol,
      name: quote.name,
      price: quote.price,
      change: quote.change,
      changePercent: quote.changesPercentage,
      volume: quote.volume,
      marketCap: quote.marketCap,
      pe: quote.pe,
      eps: quote.eps,
      high52Week: quote.yearHigh,
      low52Week: quote.yearLow
    }))
  }

  // Saudi Stock Market (Tadawul) Data
  async getSaudiStocks(): Promise<StockData[]> {
    // Get major Saudi stocks
    const saudiSymbols = [
      '2222.SR', // Saudi Aramco
      '1120.SR', // Al Rajhi Bank
      '2010.SR', // SABIC
      '7010.SR', // STC
      '4030.SR', // Riyad Bank
      '1140.SR', // Alinma Bank
      '2380.SR', // Petrochemical Industries
      '4280.SR', // Kingdom Holding
      '1030.SR', // National Bank of Saudi Arabia
      '6002.SR'  // Herfy Food Services
    ]

    try {
      return await this.getMultipleStockQuotes(saudiSymbols)
    } catch (error) {
      console.error('Failed to fetch Saudi stocks:', error)
      // Return mock data if API fails
      return this.getMockSaudiStocks()
    }
  }

  // Company Financial Statements
  async getIncomeStatement(symbol: string, period: 'annual' | 'quarterly' = 'annual'): Promise<FinancialStatements[]> {
    const data = await this.makeRequest<any[]>(`/income-statement/${symbol}?period=${period}&limit=5`)
    
    return data.map(statement => ({
      symbol: statement.symbol,
      period: statement.calendarYear || statement.period,
      revenue: statement.revenue,
      grossProfit: statement.grossProfit,
      operatingIncome: statement.operatingIncome,
      netIncome: statement.netIncome,
      totalAssets: 0, // Not in income statement
      totalDebt: 0, // Not in income statement
      totalEquity: 0, // Not in income statement
      cashAndCashEquivalents: 0, // Not in income statement
      currentAssets: 0, // Not in income statement
      currentLiabilities: 0 // Not in income statement
    }))
  }

  async getBalanceSheet(symbol: string, period: 'annual' | 'quarterly' = 'annual'): Promise<FinancialStatements[]> {
    const data = await this.makeRequest<any[]>(`/balance-sheet-statement/${symbol}?period=${period}&limit=5`)
    
    return data.map(statement => ({
      symbol: statement.symbol,
      period: statement.calendarYear || statement.period,
      revenue: 0, // Not in balance sheet
      grossProfit: 0, // Not in balance sheet
      operatingIncome: 0, // Not in balance sheet
      netIncome: 0, // Not in balance sheet
      totalAssets: statement.totalAssets,
      totalDebt: statement.totalDebt,
      totalEquity: statement.totalEquity,
      cashAndCashEquivalents: statement.cashAndCashEquivalents,
      currentAssets: statement.totalCurrentAssets,
      currentLiabilities: statement.totalCurrentLiabilities
    }))
  }

  // Company Profile
  async getCompanyProfile(symbol: string): Promise<CompanyProfile> {
    const data = await this.makeRequest<any[]>(`/profile/${symbol}`)
    
    if (!data || data.length === 0) {
      throw new Error(`No profile found for symbol: ${symbol}`)
    }

    const profile = data[0]
    return {
      symbol: profile.symbol,
      companyName: profile.companyName,
      industry: profile.industry,
      sector: profile.sector,
      country: profile.country,
      marketCap: profile.mktCap,
      description: profile.description,
      ceo: profile.ceo,
      website: profile.website,
      employees: profile.fullTimeEmployees
    }
  }

  // Market Indices
  async getMarketIndices(): Promise<MarketIndices[]> {
    const indices = ['^GSPC', '^DJI', '^IXIC'] // S&P 500, Dow Jones, NASDAQ
    
    try {
      const data = await this.getMultipleStockQuotes(indices)
      return data.map(index => ({
        name: this.getIndexName(index.symbol),
        symbol: index.symbol,
        price: index.price,
        change: index.change,
        changePercent: index.changePercent
      }))
    } catch (error) {
      console.error('Failed to fetch market indices:', error)
      return this.getMockMarketIndices()
    }
  }

  // Industry Analysis
  async getIndustryPeers(symbol: string): Promise<string[]> {
    try {
      const profile = await this.getCompanyProfile(symbol)
      const data = await this.makeRequest<any[]>(`/stock-screener?industry=${encodeURIComponent(profile.industry)}&limit=10`)
      
      return data.map(company => company.symbol).filter(s => s !== symbol)
    } catch (error) {
      console.error('Failed to fetch industry peers:', error)
      return []
    }
  }

  // Utility methods
  private getIndexName(symbol: string): string {
    const indexNames: { [key: string]: string } = {
      '^GSPC': 'S&P 500',
      '^DJI': 'Dow Jones',
      '^IXIC': 'NASDAQ',
      '^RUT': 'Russell 2000',
      '^VIX': 'VIX'
    }
    return indexNames[symbol] || symbol
  }

  // Mock data for fallback
  private getMockSaudiStocks(): StockData[] {
    return [
      {
        symbol: '2222.SR',
        name: 'Saudi Aramco',
        price: 32.45,
        change: 0.75,
        changePercent: 2.36,
        volume: 12500000,
        marketCap: 1950000000000,
        pe: 15.2,
        eps: 2.13,
        high52Week: 38.50,
        low52Week: 28.00
      },
      {
        symbol: '1120.SR',
        name: 'Al Rajhi Bank',
        price: 78.90,
        change: 1.20,
        changePercent: 1.54,
        volume: 3200000,
        marketCap: 118000000000,
        pe: 12.5,
        eps: 6.31,
        high52Week: 85.00,
        low52Week: 65.50
      }
    ]
  }

  private getMockMarketIndices(): MarketIndices[] {
    return [
      {
        name: 'S&P 500',
        symbol: '^GSPC',
        price: 4185.47,
        change: 25.32,
        changePercent: 0.61
      },
      {
        name: 'Dow Jones',
        symbol: '^DJI',
        price: 33875.40,
        change: 156.82,
        changePercent: 0.47
      }
    ]
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      if (!this.config.apiKey) return false
      
      // Test with a simple API call
      await this.makeRequest<any>('/quote/AAPL')
      return true
    } catch (error) {
      console.error('FMP health check failed:', error)
      return false
    }
  }

  // Get API usage info
  getApiUsage(): { requests: number; limit: number; resetTime: Date } {
    return {
      requests: this.requestCount,
      limit: this.config.rateLimit,
      resetTime: new Date(this.lastResetTime + 60000)
    }
  }
}

// Export singleton instance
export const fmpService = FMPService.getInstance()

export default fmpService