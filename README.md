# 🚀 FinClick.AI - Revolutionary Intelligent Financial Analysis Platform

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/RazanLeo/FinClick.AI_Platform_By_Qoder.git)
[![GitHub License](https://img.shields.io/github/license/RazanLeo/FinClick.AI_Platform_By_Qoder)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)

## 🌟 Overview

**FinClick.AI** is a cutting-edge, AI-powered financial analysis platform designed specifically for the Saudi Arabian market. The platform leverages advanced artificial intelligence to provide comprehensive financial analysis with **180 different analysis types**, supporting both Arabic (RTL) and English (LTR) languages.

### ✨ Key Features

- 🤖 **180 AI-Powered Financial Analysis Types**
  - Classical Analysis (106 types)
  - Applied Analysis (21 types) 
  - Advanced Analysis (53 types)

- 🧠 **Multi-Agent AI System** using LangGraph
- 🌐 **Bilingual Support** (Arabic RTL / English LTR)
- 💳 **PayTabs Integration** (MADA, Visa, PayPal)
- 📊 **Professional Report Generation** (PDF, Word, Excel, PowerPoint)
- 📈 **Real-time Market Data** via Financial Market Prep API
- 🛡️ **Saudi Arabia Compliance** Built-in
- 👥 **Multi-User Support** (Admin, Users, Guests)

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Next.js 14 with TypeScript
- **AI Engine**: LangGraph multi-agent system
- **Database**: MongoDB + Supabase (dual architecture)
- **Authentication**: NextAuth.js with JWT
- **Payments**: PayTabs (Saudi certified)
- **Market Data**: Financial Market Prep API
- **Styling**: Tailwind CSS with custom Arabic RTL support

### AI Agents System
1. **IngestionAgent** - Document processing and data extraction
2. **StructuringAgent** - Financial data structuring
3. **BenchmarkAgent** - Industry comparison and benchmarking
4. **AnalysisAgent** - Core financial analysis execution
5. **NarrativeAgent** - AI-powered insights generation
6. **ReportingAgent** - Professional report creation
7. **ComplianceAgent** - Saudi regulatory compliance

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB database
- Supabase account (optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/RazanLeo/FinClick.AI_Platform_By_Qoder.git
cd FinClick.AI_Platform_By_Qoder
```

2. **Install dependencies**
```bash
npm install --legacy-peer-deps
```

3. **Environment Setup**
```bash
cp .env.example .env.local
```
Fill in your API keys and configuration (see [Environment Variables](#environment-variables))

4. **Run development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:3000
```

## 🔐 Default Accounts

### Admin Account
- **Email**: `Razan@FinClick.AI`
- **Password**: `RazanFinClickAI@056300`
- **Access**: Full system administration

### Guest Account  
- **Email**: `Guest@FinClick.AI`
- **Password**: `GuestFinClickAI@123321`
- **Access**: Free trial with all features

## 💰 Subscription Plans

### Monthly Subscription
- **Price**: 5,000 SAR/month
- **Features**: Unlimited analyses, all 180 analysis types, all report formats
- **Payment**: MADA, Visa, PayPal supported

### Annual Subscription  
- **Price**: 54,000 SAR/year (10% discount)
- **Features**: All monthly features + priority support + quarterly consultations
- **Savings**: 6,000 SAR annually

## 🌍 Environment Variables

### Required Variables
```env
# AI Services
OPENAI_API_KEY=your_openai_api_key
GROQ_API_KEY=your_groq_api_key
GOOGLE_AI_API_KEY=your_google_ai_api_key

# Database
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Payment (PayTabs)
NEXT_PUBLIC_PAYTABS_PROFILE_ID=your_paytabs_profile_id
PAYTABS_SERVER_KEY=your_paytabs_server_key

# Market Data
NEXT_PUBLIC_FMP_API_KEY=your_fmp_api_key
```

See `.env.example` for complete configuration.

## 📊 Deployment

### Deploy to Vercel

1. **One-Click Deploy**
   
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/RazanLeo/FinClick.AI_Platform_By_Qoder.git)

2. **Manual Deployment**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

3. **Environment Variables**
   - Copy variables from `.env.production`
   - Add them in Vercel Dashboard > Settings > Environment Variables

### Production Checklist
- ✅ Configure all API keys
- ✅ Set up MongoDB database
- ✅ Configure Supabase project
- ✅ Test PayTabs integration
- ✅ Verify market data feeds
- ✅ Enable analytics tracking

## 🔧 API Endpoints

### System Health
- `GET /api/system/health` - System status and health check

### Analysis
- `POST /api/analyze` - Execute financial analysis
- `GET /api/analysis/{id}` - Get analysis results

### Payment
- `POST /api/payment/subscribe` - Create subscription
- `POST /api/payment/callback` - Payment verification

### Reports
- `POST /api/reports/generate` - Generate professional reports

## 📱 Features Overview

### 🎯 Analysis Capabilities
- **Classical Analysis**: 106 fundamental financial ratios
- **Applied Analysis**: 21 intermediate analysis types  
- **Advanced Analysis**: 53 sophisticated modeling techniques
- **Real-time Processing**: Live progress tracking
- **AI Insights**: Automated interpretation and recommendations

### 📋 Report Generation
- **PDF Reports**: Professional executive summaries
- **Excel Workbooks**: Detailed data analysis
- **Word Documents**: Formatted analysis reports
- **PowerPoint**: Presentation-ready slides
- **SWOT Analysis**: AI-generated strategic insights

### 🏪 Market Integration
- **Saudi Stock Market (Tadawul)**: Real-time data
- **Industry Benchmarking**: Peer comparison
- **Global Markets**: International context
- **Economic Indicators**: Macro-economic analysis

## 🛡️ Security & Compliance

- **Saudi Arabia Regulatory Compliance**
- **Data Encryption**: End-to-end security
- **PCI DSS Compliance**: Secure payment processing
- **GDPR Ready**: Privacy protection
- **Role-Based Access Control**: Secure user management

## 🌐 Internationalization

- **Arabic (العربية)**: Primary language with RTL support
- **English**: Full English localization
- **Number Formatting**: Localized for Saudi market
- **Date/Time**: Hijri and Gregorian calendar support
- **Currency**: Saudi Riyal (SAR) with proper formatting

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Email**: support@finclick.ai
- **Documentation**: [docs.finclick.ai](https://docs.finclick.ai)
- **GitHub Issues**: [Create an issue](https://github.com/RazanLeo/FinClick.AI_Platform_By_Qoder/issues)

## 🏆 Acknowledgments

- Built with ❤️ for the Saudi Arabian financial market
- Powered by advanced AI technologies
- Designed for professional financial analysts
- Created by the FinClick.AI team

---

**FinClick.AI** - Revolutionizing Financial Analysis with Artificial Intelligence 🚀

*Made with 🤖 AI and ❤️ for Saudi Arabia*

**Build Status**: ✅ TypeScript errors fixed for successful deployment