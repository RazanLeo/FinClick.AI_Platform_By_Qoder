# 🔧 **VERCEL ENVIRONMENT VARIABLES SETUP GUIDE**

**Platform:** FinClick.AI Financial Analysis Platform  
**Deployment:** Vercel  
**Status:** ESSENTIAL CONFIGURATION REQUIRED

---

## 🎯 **ESSENTIAL VARIABLES (13 Required)**

### **1. Core Application Settings:**
```
NODE_ENV=production
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-key-here
SKIP_ENV_VALIDATION=1
```

### **2. AI Providers (Multi-Provider Integration):**
```
OPENAI_API_KEY=sk-your-openai-api-key
GOOGLE_GEMINI_API_KEY=your-gemini-api-key
ANTHROPIC_API_KEY=your-claude-api-key
DEEPSEEK_API_KEY=your-deepseek-api-key
GROQ_API_KEY=gsk_your-groq-api-key
```

### **3. Financial Data Providers:**
```
ALPHA_VANTAGE_API_KEY=your-alpha-vantage-key
FMP_API_KEY=your-fmp-api-key
```

### **4. Database & Storage:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/finclick
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
```

---

## 🚀 **SETUP INSTRUCTIONS:**

### **Step 1: Access Vercel Dashboard**
1. Go to https://vercel.com/dashboard
2. Select your FinClick.AI project
3. Navigate to "Settings" → "Environment Variables"

### **Step 2: Add Variables**
1. Click "Add New"
2. Enter variable name and value
3. Select "Production" environment
4. Click "Save"

### **Step 3: Redeploy**
1. Go to "Deployments" tab
2. Click "Redeploy" on latest deployment
3. Verify successful build

---

## ⚠️ **IMPORTANT NOTES:**

### **API Keys Security:**
- Never commit API keys to Git repository
- Use Vercel's environment variables only
- Rotate keys regularly for security

### **Required for Full Functionality:**
- **AI Analysis:** Requires AI provider keys
- **Financial Data:** Requires Alpha Vantage & FMP keys
- **Authentication:** Requires NextAuth configuration
- **Database:** Requires MongoDB connection

### **Optional Variables:**
```
PAYMENT_PAYTABS_SERVER_KEY=your-paytabs-key
PAYMENT_PAYTABS_CLIENT_KEY=your-paytabs-client-key
TESTSPRITE_API_KEY=your-testsprite-key
```

---

## 🎊 **DEPLOYMENT SUCCESS CHECKLIST:**

✅ **All 13 essential variables configured**  
✅ **Production environment selected**  
✅ **No sensitive data in repository**  
✅ **Redeploy after variable setup**  

---

*Setup Guide: Essential for FinClick.AI Platform*  
*Date: September 20, 2025*  
*Status: CONFIGURATION REQUIRED*