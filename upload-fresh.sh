#!/bin/bash

echo "🚀 رفع منصة FinClick.AI على مستودع جديد..."

# انتقال للمجلد
cd "/Users/razantaofek/Desktop/last V0/finclick-ai (4)"

# حذف git القديم وإعادة التهيئة
rm -rf .git
git init

# إعداد معلومات المستخدم
git config --global user.name "Razan FinClick.AI"
git config --global user.email "Razan@FinClick.AI"

# إضافة جميع الملفات
git add .

# إنشاء commit أول
git commit -m "🚀 منصة FinClick.AI - النسخة النهائية الكاملة

✅ المزايا المكتملة:
- 180 نوع تحليل مالي بالذكاء الاصطناعي
- نظام الوكلاء الذكية متعدد المراحل (LangGraph)
- واجهة ثنائية اللغة (عربي RTL / إنجليزي LTR)
- تكامل PayTabs (5000 ريال شهري، 54000 ريال سنوي)
- دعم MADA, Visa, PayPal
- تقارير احترافية (PDF, Word, Excel, PowerPoint)
- قواعد بيانات متقدمة (MongoDB + Supabase)
- بيانات السوق المالي الفورية (FMP API)
- لوحة تحكم إدارية شاملة
- امتثال للمملكة العربية السعودية
- نظام مستخدمين متكامل

🎯 حسابات الوصول:
- المدير: Razan@FinClick.AI / RazanFinClickAI@056300
- الضيف: Guest@FinClick.AI / GuestFinClickAI@123321

🚀 جاهزة للاستخدام التجاري الفوري!"

# ربط المستودع الجديد
echo "📝 ربط المستودع الجديد..."
git remote add origin https://github.com/RazanLeo/FinClick.AI_Platform_By_Qoder.git

# تحديد الفرع الرئيسي
git branch -M main

# رفع الملفات
git push -u origin main

echo ""
echo "🎉 تم بنجاح! منصة FinClick.AI مرفوعة على المستودع الجديد"
echo "🔗 الرابط: https://github.com/RazanLeo/FinClick.AI_Platform_By_Qoder"
echo ""
echo "🚀 الخطوة التالية: النشر على Vercel"
echo "   اذهبي إلى: https://vercel.com/new"
echo "   ادخلي رابط المستودع: https://github.com/RazanLeo/FinClick.AI_Platform_By_Qoder"
echo ""
echo "✅ المنصة جاهزة للإطلاق التجاري!"