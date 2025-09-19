#!/bin/bash

echo "🚀 بدء رفع منصة FinClick.AI على GitHub..."

# التحقق من وجود git
if ! command -v git &> /dev/null; then
    echo "❌ Git غير مثبت. يرجى تثبيت Git أولاً"
    exit 1
fi

# إعداد Git (إذا لم يكن معداً من قبل)
echo "⚙️ إعداد Git..."
git config --global user.name "Razan FinClick.AI"
git config --global user.email "Razan@FinClick.AI"

# تهيئة المستودع
echo "📁 تهيئة المستودع..."
git init

# إضافة المستودع البعيد
echo "🔗 ربط المستودع البعيد..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/RazanLeo/FinClick.AI_Platform_By_Qoder.git

# إضافة جميع الملفات
echo "📂 إضافة جميع الملفات..."
git add .

# إنشاء commit شامل
echo "💾 حفظ التغييرات..."
git commit -m "🚀 منصة FinClick.AI كاملة - جاهزة للإطلاق التجاري

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

🚀 جاهزة للاستخدام التجاري الفوري والاختبار المجاني!"

# رفع الملفات
echo "⬆️ رفع الملفات على GitHub..."
git branch -M main
git push -u origin main --force

echo ""
echo "🎉 تم بنجاح! منصة FinClick.AI مرفوعة على GitHub"
echo "🔗 الرابط: https://github.com/RazanLeo/FinClick.AI_Platform_By_Qoder"
echo ""
echo "🚀 الخطوة التالية: نشر على Vercel"
echo "   اذهبي إلى: https://vercel.com/new/clone?repository-url=https://github.com/RazanLeo/FinClick.AI_Platform_By_Qoder.git"
echo ""
echo "✅ المنصة جاهزة للإطلاق التجاري!"