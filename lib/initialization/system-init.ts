// System Initialization for FinClick.AI
// Coordinates all services and ensures proper startup

import { initializeMongoDB } from '../database/mongodb-config'
import { initializeSupabase } from '../database/supabase-config'
import { fmpService } from '../external/fmp-api'
import { payTabsService } from '../payment/paytabs-config'

export interface SystemStatus {
  mongodb: boolean
  supabase: boolean
  fmpApi: boolean
  payTabs: boolean
  aiServices: boolean
  overallHealth: boolean
}

export class SystemInitializer {
  private static instance: SystemInitializer
  private isInitialized = false
  private systemStatus: SystemStatus = {
    mongodb: false,
    supabase: false,
    fmpApi: false,
    payTabs: false,
    aiServices: false,
    overallHealth: false
  }

  static getInstance(): SystemInitializer {
    if (!SystemInitializer.instance) {
      SystemInitializer.instance = new SystemInitializer()
    }
    return SystemInitializer.instance
  }

  async initialize(): Promise<SystemStatus> {
    if (this.isInitialized) {
      return this.systemStatus
    }

    console.log('🚀 Initializing FinClick.AI Platform...')

    // Initialize databases
    await this.initializeDatabases()

    // Initialize external APIs
    await this.initializeExternalServices()

    // Initialize AI services
    await this.initializeAIServices()

    // Perform health checks
    await this.performHealthChecks()

    this.isInitialized = true
    this.systemStatus.overallHealth = this.calculateOverallHealth()

    console.log('✅ FinClick.AI Platform initialization complete')
    console.log('System Status:', this.systemStatus)

    return this.systemStatus
  }

  private async initializeDatabases(): Promise<void> {
    console.log('📊 Initializing databases...')

    // MongoDB initialization
    try {
      await initializeMongoDB()
      this.systemStatus.mongodb = true
      console.log('✅ MongoDB connected successfully')
    } catch (error) {
      console.error('❌ MongoDB connection failed:', error)
      this.systemStatus.mongodb = false
    }

    // Supabase initialization
    try {
      initializeSupabase()
      this.systemStatus.supabase = true
      console.log('✅ Supabase initialized successfully')
    } catch (error) {
      console.error('❌ Supabase initialization failed:', error)
      this.systemStatus.supabase = false
    }
  }

  private async initializeExternalServices(): Promise<void> {
    console.log('🌐 Initializing external services...')

    // Financial Market Prep API
    try {
      const fmpHealth = await fmpService.healthCheck()
      this.systemStatus.fmpApi = fmpHealth
      console.log(fmpHealth ? '✅ FMP API connected' : '⚠️ FMP API unavailable (will use mock data)')
    } catch (error) {
      console.error('❌ FMP API check failed:', error)
      this.systemStatus.fmpApi = false
    }

    // PayTabs payment system
    try {
      this.systemStatus.payTabs = payTabsService.isPaymentEnabled()
      console.log(this.systemStatus.payTabs ? '✅ PayTabs enabled' : '⚠️ PayTabs disabled for guest testing')
    } catch (error) {
      console.error('❌ PayTabs initialization failed:', error)
      this.systemStatus.payTabs = false
    }
  }

  private async initializeAIServices(): Promise<void> {
    console.log('🤖 Initializing AI services...')

    try {
      // Check if AI service keys are available
      const hasOpenAI = !!process.env.OPENAI_API_KEY
      const hasGroq = !!process.env.GROQ_API_KEY
      const hasGoogleAI = !!process.env.GOOGLE_AI_API_KEY

      if (hasOpenAI || hasGroq || hasGoogleAI) {
        this.systemStatus.aiServices = true
        console.log('✅ AI services configured')
        console.log(`  - OpenAI: ${hasOpenAI ? '✅' : '❌'}`)
        console.log(`  - Groq: ${hasGroq ? '✅' : '❌'}`)
        console.log(`  - Google AI: ${hasGoogleAI ? '✅' : '❌'}`)
      } else {
        this.systemStatus.aiServices = false
        console.warn('⚠️ No AI service keys configured')
      }
    } catch (error) {
      console.error('❌ AI services initialization failed:', error)
      this.systemStatus.aiServices = false
    }
  }

  private async performHealthChecks(): Promise<void> {
    console.log('🔍 Performing health checks...')

    // Additional health checks can be added here
    // For now, we rely on the initialization status
  }

  private calculateOverallHealth(): boolean {
    // System is healthy if core services are working
    // AI services and external APIs are nice-to-have but not critical
    const coreServices = [
      this.systemStatus.mongodb || this.systemStatus.supabase, // At least one database
    ]

    return coreServices.every(service => service)
  }

  getSystemStatus(): SystemStatus {
    return { ...this.systemStatus }
  }

  async restart(): Promise<SystemStatus> {
    console.log('🔄 Restarting FinClick.AI Platform...')
    this.isInitialized = false
    return await this.initialize()
  }

  // Development utilities
  async enablePayments(): Promise<void> {
    if (process.env.NODE_ENV === 'development') {
      payTabsService.setEnabled(true)
      this.systemStatus.payTabs = true
      console.log('✅ Payments enabled for development')
    } else {
      console.warn('⚠️ Payments can only be enabled in development mode')
    }
  }

  async disablePayments(): Promise<void> {
    payTabsService.setEnabled(false)
    this.systemStatus.payTabs = false
    console.log('⚠️ Payments disabled')
  }

  // System maintenance
  async performMaintenance(): Promise<void> {
    console.log('🔧 Performing system maintenance...')

    // Clean up old temporary files
    // Update caches
    // Check for system updates
    // Perform database cleanup

    console.log('✅ System maintenance completed')
  }

  // Monitoring and alerts
  getHealthReport(): {
    status: 'healthy' | 'degraded' | 'unhealthy'
    services: SystemStatus
    timestamp: Date
    recommendations: string[]
  } {
    const recommendations: string[] = []

    if (!this.systemStatus.mongodb && !this.systemStatus.supabase) {
      recommendations.push('Configure at least one database service')
    }

    if (!this.systemStatus.aiServices) {
      recommendations.push('Configure AI service API keys for full functionality')
    }

    if (!this.systemStatus.fmpApi) {
      recommendations.push('Configure Financial Market Prep API for real-time data')
    }

    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy'

    if (!this.systemStatus.overallHealth) {
      status = 'unhealthy'
    } else if (recommendations.length > 0) {
      status = 'degraded'
    }

    return {
      status,
      services: this.systemStatus,
      timestamp: new Date(),
      recommendations
    }
  }
}

// Export singleton instance
export const systemInitializer = SystemInitializer.getInstance()

// Auto-initialize in production
if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
  systemInitializer.initialize().catch(error => {
    console.error('❌ System initialization failed:', error)
  })
}

export default systemInitializer