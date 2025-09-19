// Supabase Configuration for FinClick.AI
// Handles real-time data, file storage, and authentication backup

import { createClient, SupabaseClient } from '@supabase/supabase-js'

export interface SupabaseConfig {
  url: string
  anonKey: string
  serviceKey?: string
}

interface FileUploadOptions {
  bucket: string
  path: string
  file: File | Buffer
  contentType?: string
  cacheControl?: string
}

interface RealtimeSubscription {
  channel: string
  event: string
  callback: (payload: any) => void
}

class SupabaseService {
  private static instance: SupabaseService
  private client: SupabaseClient | null = null
  private serviceClient: SupabaseClient | null = null
  private subscriptions: Map<string, any> = new Map()

  static getInstance(): SupabaseService {
    if (!SupabaseService.instance) {
      SupabaseService.instance = new SupabaseService()
    }
    return SupabaseService.instance
  }

  initialize(config: SupabaseConfig): void {
    if (!config.url || !config.anonKey) {
      throw new Error('Supabase URL and anonymous key are required')
    }

    // Public client for general operations
    this.client = createClient(config.url, config.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      },
      realtime: {
        params: {
          eventsPerSecond: 10
        }
      }
    })

    // Service client for admin operations (if service key provided)
    if (config.serviceKey) {
      this.serviceClient = createClient(config.url, config.serviceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      })
    }

    console.log('Supabase initialized successfully')
  }

  getClient(): SupabaseClient {
    if (!this.client) {
      throw new Error('Supabase client not initialized')
    }
    return this.client
  }

  getServiceClient(): SupabaseClient {
    if (!this.serviceClient) {
      throw new Error('Supabase service client not initialized')
    }
    return this.serviceClient
  }

  // File Storage Operations
  async uploadFile(options: FileUploadOptions): Promise<{ path: string; url: string }> {
    if (!this.client) throw new Error('Supabase not initialized')

    const { data, error } = await this.client.storage
      .from(options.bucket)
      .upload(options.path, options.file, {
        contentType: options.contentType,
        cacheControl: options.cacheControl || '3600',
        upsert: true
      })

    if (error) {
      throw new Error(`File upload failed: ${error.message}`)
    }

    // Get public URL
    const { data: { publicUrl } } = this.client.storage
      .from(options.bucket)
      .getPublicUrl(data.path)

    return {
      path: data.path,
      url: publicUrl
    }
  }

  async deleteFile(bucket: string, path: string): Promise<void> {
    if (!this.client) throw new Error('Supabase not initialized')

    const { error } = await this.client.storage
      .from(bucket)
      .remove([path])

    if (error) {
      throw new Error(`File deletion failed: ${error.message}`)
    }
  }

  async listFiles(bucket: string, path?: string): Promise<any[]> {
    if (!this.client) throw new Error('Supabase not initialized')

    const { data, error } = await this.client.storage
      .from(bucket)
      .list(path || '', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      })

    if (error) {
      throw new Error(`File listing failed: ${error.message}`)
    }

    return data || []
  }

  async getFileUrl(bucket: string, path: string, expiresIn: number = 3600): Promise<string> {
    if (!this.client) throw new Error('Supabase not initialized')

    const { data, error } = await this.client.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn)

    if (error) {
      throw new Error(`URL generation failed: ${error.message}`)
    }

    return data.signedUrl
  }

  // Real-time Subscriptions
  subscribeToRealtime(subscription: RealtimeSubscription): string {
    if (!this.client) throw new Error('Supabase not initialized')

    const channel = this.client
      .channel(subscription.channel)
      .on('postgres_changes', {
        event: subscription.event as any,
        schema: 'public'
      }, subscription.callback)
      .subscribe()

    const subscriptionId = `${subscription.channel}_${subscription.event}_${Date.now()}`
    this.subscriptions.set(subscriptionId, channel)

    return subscriptionId
  }

  unsubscribeFromRealtime(subscriptionId: string): void {
    const channel = this.subscriptions.get(subscriptionId)
    if (channel) {
      channel.unsubscribe()
      this.subscriptions.delete(subscriptionId)
    }
  }

  // Database Operations (for analysis results backup)
  async insertAnalysisResult(data: any): Promise<string> {
    if (!this.client) throw new Error('Supabase not initialized')

    const { data: result, error } = await this.client
      .from('analysis_results')
      .insert({
        ...data,
        created_at: new Date().toISOString()
      })
      .select('id')
      .single()

    if (error) {
      throw new Error(`Analysis result insertion failed: ${error.message}`)
    }

    return result.id
  }

  async getAnalysisResults(userId: string, limit: number = 50): Promise<any[]> {
    if (!this.client) throw new Error('Supabase not initialized')

    const { data, error } = await this.client
      .from('analysis_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      throw new Error(`Analysis results retrieval failed: ${error.message}`)
    }

    return data || []
  }

  async updateAnalysisResult(id: string, updates: any): Promise<void> {
    if (!this.client) throw new Error('Supabase not initialized')

    const { error } = await this.client
      .from('analysis_results')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (error) {
      throw new Error(`Analysis result update failed: ${error.message}`)
    }
  }

  // User Session Management (backup to MongoDB)
  async createUserSession(userId: string, sessionData: any): Promise<void> {
    if (!this.client) throw new Error('Supabase not initialized')

    const { error } = await this.client
      .from('user_sessions')
      .insert({
        user_id: userId,
        session_data: sessionData,
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      })

    if (error) {
      throw new Error(`Session creation failed: ${error.message}`)
    }
  }

  async getUserSession(userId: string): Promise<any | null> {
    if (!this.client) throw new Error('Supabase not initialized')

    const { data, error } = await this.client
      .from('user_sessions')
      .select('*')
      .eq('user_id', userId)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') { // Not found error
      throw new Error(`Session retrieval failed: ${error.message}`)
    }

    return data
  }

  // Analytics and Monitoring
  async logUserActivity(activity: {
    userId: string
    action: string
    metadata?: any
  }): Promise<void> {
    if (!this.client) throw new Error('Supabase not initialized')

    const { error } = await this.client
      .from('user_activities')
      .insert({
        user_id: activity.userId,
        action: activity.action,
        metadata: activity.metadata || {},
        timestamp: new Date().toISOString()
      })

    if (error) {
      console.warn('Failed to log user activity:', error.message)
      // Don't throw error for activity logging failures
    }
  }

  async getSystemMetrics(): Promise<any> {
    if (!this.serviceClient) throw new Error('Supabase service client not initialized')

    try {
      const [analysisCount, userCount, activityCount] = await Promise.all([
        this.serviceClient.from('analysis_results').select('id', { count: 'exact', head: true }),
        this.serviceClient.from('user_sessions').select('user_id', { count: 'exact', head: true }),
        this.serviceClient.from('user_activities').select('id', { count: 'exact', head: true })
      ])

      return {
        totalAnalyses: analysisCount.count || 0,
        activeUsers: userCount.count || 0,
        totalActivities: activityCount.count || 0,
        timestamp: new Date().toISOString()
      }
    } catch (error: any) {
      console.error('Failed to get system metrics:', error.message)
      return {
        totalAnalyses: 0,
        activeUsers: 0,
        totalActivities: 0,
        timestamp: new Date().toISOString(),
        error: error.message
      }
    }
  }

  // Health Check
  async healthCheck(): Promise<boolean> {
    try {
      if (!this.client) return false
      
      const { error } = await this.client
        .from('health_check')
        .select('id')
        .limit(1)

      // If table doesn't exist, that's ok for health check
      return !error || error.code === 'PGRST106'
    } catch (error) {
      console.error('Supabase health check failed:', error)
      return false
    }
  }

  // Cleanup
  async cleanup(): Promise<void> {
    // Unsubscribe from all real-time subscriptions
    for (const [id, channel] of this.subscriptions) {
      channel.unsubscribe()
    }
    this.subscriptions.clear()

    console.log('Supabase cleanup completed')
  }
}

// Export singleton instance
export const supabaseService = SupabaseService.getInstance()

// Initialize Supabase helper
export const initializeSupabase = (): void => {
  const config: SupabaseConfig = {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY
  }

  if (!config.url || !config.anonKey) {
    console.warn('Supabase configuration incomplete - some features may be disabled')
    return
  }

  try {
    supabaseService.initialize(config)
  } catch (error) {
    console.error('Failed to initialize Supabase:', error)
  }
}

export default supabaseService