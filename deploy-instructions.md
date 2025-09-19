# خطوات النشر البديلة لـ FinClick.AI

## الطريقة الأولى: Vercel CLI

1. ثبتي Vercel CLI:
```bash
npm i -g vercel
```

2. انتقلي للمجلد:
```bash
cd "/Users/razantaofek/Desktop/last V0/finclick-ai (4)"
```

3. نشر مباشر:
```bash
vercel --prod
```

## الطريقة الثانية: رفع يدوي

1. اذهبي إلى: https://vercel.com/new
2. اختاري "Import Git Repository"
3. اكتبي: RazanLeo/FinClick.AI_Platform_By_Qoder
4. اضغطي Continue

## الطريقة الثالثة: GitHub Pages

1. اذهبي لـ GitHub: https://github.com/RazanLeo/FinClick.AI_Platform_By_Qoder
2. Settings > Pages
3. Source: Deploy from a branch
4. Branch: main
5. Folder: / (root)
6. Save

## متغيرات البيئة المطلوبة:

```
NEXT_PUBLIC_APP_NAME=FinClick.AI
NODE_ENV=production
ADMIN_EMAIL=Razan@FinClick.AI
ADMIN_PASSWORD=RazanFinClickAI@056300
GUEST_EMAIL=Guest@FinClick.AI
GUEST_PASSWORD=GuestFinClickAI@123321
NEXT_PUBLIC_PAYMENT_ENABLED=false
NEXT_PUBLIC_ENABLE_GUEST_MODE=true
```