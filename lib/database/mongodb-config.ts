// MongoDB Configuration for FinClick.AI
// Handles user data, analysis results, and system logs

import { MongoClient, Db, Collection } from 'mongodb'

interface User {
  _id?: string
  name: string
  email: string
  type: 'user' | 'admin' | 'guest'
  companyName?: string
  subscriptionType?: string
  subscriptionStatus?: 'active' | 'expired' | 'trial'
  createdAt: Date
  updatedAt: Date
  lastLogin?: Date
  analysisUsage: {
    currentMonth: number
    totalAnalyses: number
  }
  reportsGenerated: number
}

interface AnalysisRecord {
  _id?: string
  userId: string
  companyName: string
  analysisType: 'classical' | 'applied' | 'advanced' | 'comprehensive'
  status: 'processing' | 'completed' | 'failed'
  results?: any
  createdAt: Date
  completedAt?: Date
  filesUploaded: string[]
  processingTime?: number
  errorMessage?: string
}

interface SystemLog {
  _id?: string
  level: 'info' | 'warning' | 'error'
  message: string
  userId?: string
  action: string
  ipAddress?: string
  userAgent?: string
  timestamp: Date
  metadata?: any
}

class MongoDBService {
  private static instance: MongoDBService
  private client: MongoClient | null = null
  private db: Db | null = null
  private isConnected = false

  static getInstance(): MongoDBService {
    if (!MongoDBService.instance) {
      MongoDBService.instance = new MongoDBService()
    }
    return MongoDBService.instance
  }

  async connect(): Promise<void> {
    if (this.isConnected && this.client) {
      return
    }

    try {
      const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017'
      const dbName = process.env.MONGODB_DB_NAME || 'finclick_ai'

      this.client = new MongoClient(mongoUrl)
      await this.client.connect()
      this.db = this.client.db(dbName)
      this.isConnected = true

      console.log('Connected to MongoDB successfully')
      
      // Create indexes for better performance
      await this.createIndexes()
    } catch (error) {
      console.error('MongoDB connection failed:', error)
      throw error
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close()
      this.client = null
      this.db = null
      this.isConnected = false
    }
  }

  private async createIndexes(): Promise<void> {
    if (!this.db) return

    try {
      // Users collection indexes
      await this.db.collection('users').createIndex({ email: 1 }, { unique: true })
      await this.db.collection('users').createIndex({ type: 1 })
      await this.db.collection('users').createIndex({ subscriptionStatus: 1 })

      // Analysis records indexes
      await this.db.collection('analyses').createIndex({ userId: 1 })
      await this.db.collection('analyses').createIndex({ status: 1 })
      await this.db.collection('analyses').createIndex({ createdAt: -1 })
      await this.db.collection('analyses').createIndex({ companyName: 1 })

      // System logs indexes
      await this.db.collection('logs').createIndex({ timestamp: -1 })
      await this.db.collection('logs').createIndex({ level: 1 })
      await this.db.collection('logs').createIndex({ userId: 1 })

      console.log('MongoDB indexes created successfully')
    } catch (error) {
      console.error('Failed to create MongoDB indexes:', error)
    }
  }

  // User operations
  async createUser(userData: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    if (!this.db) throw new Error('Database not connected')

    const user: User = {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
      analysisUsage: {
        currentMonth: 0,
        totalAnalyses: 0
      },
      reportsGenerated: 0
    }

    const result = await this.db.collection('users').insertOne(user)
    return result.insertedId.toString()
  }

  async getUserByEmail(email: string): Promise<User | null> {
    if (!this.db) throw new Error('Database not connected')
    return await this.db.collection('users').findOne({ email }) as User | null
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<boolean> {
    if (!this.db) throw new Error('Database not connected')
    
    const result = await this.db.collection('users').updateOne(
      { _id: userId },
      { 
        $set: { 
          ...updates, 
          updatedAt: new Date() 
        } 
      }
    )
    
    return result.modifiedCount > 0
  }

  async incrementAnalysisUsage(userId: string): Promise<void> {
    if (!this.db) throw new Error('Database not connected')
    
    await this.db.collection('users').updateOne(
      { _id: userId },
      { 
        $inc: { 
          'analysisUsage.currentMonth': 1,
          'analysisUsage.totalAnalyses': 1
        },
        $set: { updatedAt: new Date() }
      }
    )
  }

  // Analysis operations
  async createAnalysisRecord(analysisData: Omit<AnalysisRecord, '_id' | 'createdAt'>): Promise<string> {
    if (!this.db) throw new Error('Database not connected')

    const record: AnalysisRecord = {
      ...analysisData,
      createdAt: new Date()
    }

    const result = await this.db.collection('analyses').insertOne(record)
    return result.insertedId.toString()
  }

  async updateAnalysisRecord(recordId: string, updates: Partial<AnalysisRecord>): Promise<boolean> {
    if (!this.db) throw new Error('Database not connected')
    
    const result = await this.db.collection('analyses').updateOne(
      { _id: recordId },
      { $set: updates }
    )
    
    return result.modifiedCount > 0
  }

  async getUserAnalyses(userId: string, limit: number = 50): Promise<AnalysisRecord[]> {
    if (!this.db) throw new Error('Database not connected')
    
    return await this.db.collection('analyses')
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray() as AnalysisRecord[]
  }

  // System logging
  async logSystemEvent(logData: Omit<SystemLog, '_id' | 'timestamp'>): Promise<void> {
    if (!this.db) throw new Error('Database not connected')

    const log: SystemLog = {
      ...logData,
      timestamp: new Date()
    }

    await this.db.collection('logs').insertOne(log)
  }

  // Analytics and reporting
  async getSystemStats(): Promise<any> {
    if (!this.db) throw new Error('Database not connected')

    const stats = await Promise.all([
      this.db.collection('users').countDocuments(),
      this.db.collection('users').countDocuments({ type: 'user' }),
      this.db.collection('users').countDocuments({ type: 'guest' }),
      this.db.collection('analyses').countDocuments(),
      this.db.collection('analyses').countDocuments({ status: 'completed' }),
      this.db.collection('analyses').countDocuments({ status: 'processing' })
    ])

    return {
      totalUsers: stats[0],
      activeUsers: stats[1],
      guestUsers: stats[2],
      totalAnalyses: stats[3],
      completedAnalyses: stats[4],
      processingAnalyses: stats[5]
    }
  }

  async getMonthlyUsage(): Promise<any[]> {
    if (!this.db) throw new Error('Database not connected')

    const pipeline = [
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': -1, '_id.month': -1 }
      },
      {
        $limit: 12
      }
    ]

    return await this.db.collection('analyses').aggregate(pipeline).toArray()
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      if (!this.db) return false
      await this.db.admin().ping()
      return true
    } catch (error) {
      console.error('MongoDB health check failed:', error)
      return false
    }
  }
}

// Export singleton instance
export const mongoService = MongoDBService.getInstance()

// Initialize connection helper
export const initializeMongoDB = async (): Promise<void> => {
  try {
    await mongoService.connect()
  } catch (error) {
    console.error('Failed to initialize MongoDB:', error)
    throw error
  }
}

export type { User, AnalysisRecord, SystemLog }