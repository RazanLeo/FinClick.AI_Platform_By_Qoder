# 🚀 طرق النشر السهلة لـ FinClick.AI

## ⚡ الطريقة الأولى: Vercel من المتصفح

1. **اذهبي إلى**: https://vercel.com/new
2. **اضغطي "Add GitHub Account"**
3. **ابحثي عن**: `FinClick.AI_Platform_By_Qoder`
4. **اضغطي "Import"**
5. **في إعدادات Build:**
   - Build Command: `npm run build`
   - Install Command: `npm install --legacy-peer-deps`
6. **اضغطي "Deploy"**

## 🌐 الطريقة الثانية: Netlify

1. **اذهبي إلى**: https://app.netlify.com/start
2. **اختاري "Import from Git"**
3. **GitHub > FinClick.AI_Platform_By_Qoder**
4. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
5. **Deploy site**

## 📦 الطريقة الثالثة: رفع الملف المضغوط

استخدمي الملف المضغوط الموجود في:
`/Users/razantaofek/Desktop/last V0/finclick-ai (4)/FinClick.AI_Platform_Complete_20250919_153000.zip`

1. **فكي الضغط**
2. **ارفعيه على أي منصة استضافة**
3. **نصبي التبعيات**: `npm install --legacy-peer-deps`
4. **ابني المشروع**: `npm run build`

## 🔑 متغيرات البيئة الأساسية:

```
NEXT_PUBLIC_APP_NAME=FinClick.AI
NODE_ENV=production
ADMIN_EMAIL=Razan@FinClick.AI
ADMIN_PASSWORD=RazanFinClickAI@056300
GUEST_EMAIL=Guest@FinClick.AI
GUEST_PASSWORD=GuestFinClickAI@123321
NEXT_PUBLIC_PAYMENT_ENABLED=false
NEXT_PUBLIC_ENABLE_GUEST_MODE=true
NEXT_PUBLIC_COUNTRY_CODE=SA
NEXT_PUBLIC_CURRENCY=SAR
NEXT_PUBLIC_LANGUAGE_DEFAULT=ar
```

## ✅ بعد النشر:

المنصة ستكون متاحة على رابط مثل:
- Vercel: `https://finclick-ai-platform.vercel.app`
- Netlify: `https://finclick-ai-platform.netlify.app`

**حسابات الدخول:**
- المدير: `Razan@FinClick.AI` / `RazanFinClickAI@056300`
- الضيف: `Guest@FinClick.AI` / `GuestFinClickAI@123321`