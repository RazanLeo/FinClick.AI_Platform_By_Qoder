# إعداد متغيرات البيئة في Vercel

## 🔧 الطريقة الأولى: أثناء النشر

1. اذهبي إلى: https://vercel.com/new
2. ادخلي رابط المستودع: `https://github.com/RazanLeo/FinClick.AI_Platform_By_Qoder`
3. في قسم "Environment Variables" أضيفي:

```
NEXT_PUBLIC_APP_NAME=FinClick.AI
NODE_ENV=production
OPENAI_API_KEY=sk-your-key-here
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/finclick_ai
NEXT_PUBLIC_FMP_API_KEY=your-fmp-key
NEXTAUTH_SECRET=random-secret-string
JWT_SECRET=jwt-secret-string
ADMIN_EMAIL=Razan@FinClick.AI
ADMIN_PASSWORD=RazanFinClickAI@056300
GUEST_EMAIL=Guest@FinClick.AI
GUEST_PASSWORD=GuestFinClickAI@123321
NEXT_PUBLIC_ENABLE_GUEST_MODE=true
NEXT_PUBLIC_PAYMENT_ENABLED=false
```

## 🔧 الطريقة الثانية: بعد النشر

1. اذهبي إلى لوحة تحكم Vercel
2. اختاري مشروع FinClick.AI
3. اذهبي إلى تبويب "Settings"
4. اختاري "Environment Variables"
5. أضيفي كل متغير على حدة

## 🔑 كيفية الحصول على المفاتيح:

### OpenAI API Key:
1. اذهبي إلى: https://platform.openai.com/
2. سجلي حساب جديد
3. اذهبي إلى "API Keys"
4. انشئي مفتاح جديد

### MongoDB:
1. اذهبي إلى: https://cloud.mongodb.com/
2. انشئي cluster مجاني
3. احصلي على connection string

### Financial Modeling Prep:
1. اذهبي إلى: https://financialmodelingprep.com/
2. سجلي حساب مجاني
3. احصلي على API key (250 طلب/دقيقة مجاناً)

### Security Keys:
```bash
# يمكنك توليد مفاتيح عشوائية:
NEXTAUTH_SECRET=$(openssl rand -base64 32)
JWT_SECRET=$(openssl rand -base64 32)
```

## ⚠️ مهم:

1. **لا تكشفي المفاتيح السرية** لأي شخص
2. **استخدمي Production values** للنشر
3. **اتركي PAYMENT_ENABLED=false** للاختبار
4. **تأكدي من صحة MongoDB connection** قبل النشر

## 🎯 للاختبار السريع:

يمكنك البدء بهذه المتغيرات الأساسية فقط:
- NEXT_PUBLIC_APP_NAME
- NODE_ENV=production  
- NEXT_PUBLIC_ENABLE_GUEST_MODE=true
- ADMIN_EMAIL و ADMIN_PASSWORD
- GUEST_EMAIL و GUEST_PASSWORD

باقي المتغيرات يمكن إضافتها لاحقاً حسب الحاجة.