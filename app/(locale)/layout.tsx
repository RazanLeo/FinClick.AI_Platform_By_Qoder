import type React from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";

import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import DirectionController from "@/components/direction-controller"; 

// Root-level layout for internationalized routes

function LocaleLayout({ 
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // Using `useMessages` is required for Server Components
  const messages = useMessages();

  // Validate that the incoming `locale` parameter is valid
  // You can skip this if you configured middleware to redirect invalid locales
  const locales = ['en', 'ar'];
  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="geo.region" content="SA" />
        <meta name="geo.country" content="Saudi Arabia" />
        <meta name="language" content={locale} />
        <meta name="content-language" content={locale} />
        
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --finclick-black: #000000;
              --finclick-gold: #B48500;
            }
            body {
              background-color: var(--finclick-black);
              color: var(--finclick-gold);
              overflow-x: hidden;
            }
          `
        }} />
      </head>
      <body className="font-sans antialiased bg-black text-[#B48500] min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <AuthProvider>
              <DirectionController />
              <div className="relative min-h-screen">
                <div className="fixed inset-0 z-0 opacity-5">
                   <div className="absolute inset-0 bg-gradient-to-br from-[#B48500]/10 via-transparent to-[#B48500]/5" />
                </div>
                <div className="relative z-10">
                  <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                    {children}
                  </Suspense>
                </div>
              </div>
              <Toaster 
                position={locale === 'ar' ? 'bottom-right' : 'bottom-left'}
                theme="dark"
              />
              <Analytics />
            </AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default LocaleLayout;
