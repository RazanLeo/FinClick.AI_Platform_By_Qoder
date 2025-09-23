import type React from "react"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AuthProvider } from "@/components/auth/auth-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { DirectionController } from "@/components/direction-controller"
import "../globals.css"
import { LanguageProvider } from "@/components/language-provider"

export default function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const { locale } = params
  
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="geo.region" content="SA" />
        <meta name="geo.country" content="Saudi Arabia" />
        <meta name="language" content={locale} />
        <meta name="content-language" content={locale} />
        
        {/* Critical CSS for FinClick.AI branding */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --finclick-black: #000000;
              --finclick-gold: #B48500;
              --finclick-gradient: linear-gradient(135deg, #B48500 0%, #FFD700 100%);
            }
            
            body {
              background-color: var(--finclick-black);
              color: var(--finclick-gold);
              overflow-x: hidden;
            }
            
            * {
              box-sizing: border-box;
            }
            
            .loading-screen {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: var(--finclick-black);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 9999;
              transition: opacity 0.5s ease-out;
            }
            
            .loading-spinner {
              width: 50px;
              height: 50px;
              border: 3px solid var(--finclick-gold);
              border-top: 3px solid transparent;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            .page-loaded .loading-screen {
              opacity: 0;
              pointer-events: none;
            }
            
            /* Smooth animations */
            .animate-glow {
              animation: glow 2s ease-in-out infinite alternate;
            }
            
            @keyframes glow {
              from { text-shadow: 0 0 5px var(--finclick-gold), 0 0 10px var(--finclick-gold); }
              to { text-shadow: 0 0 10px var(--finclick-gold), 0 0 20px var(--finclick-gold); }
            }
            
            /* RTL specific styles */
            html[dir="rtl"] .rtl-flip {
              transform: scaleX(-1);
            }
          `
        }} />
      </head>
      <body className="font-sans antialiased bg-black text-[#B48500] min-h-screen">
        <DirectionController />
        {/* Loading Screen - Removed for debugging */}
        {/* <div className="loading-screen">
          <div className="loading-spinner"></div>
        </div> */}
        
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <LanguageProvider locale={locale}>
              <div className="relative min-h-screen">
                {/* Background Pattern */}
                <div className="fixed inset-0 z-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B48500]/10 via-transparent to-[#B48500]/5" />
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="neural-network" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <circle cx="50" cy="50" r="1" fill="#B48500" opacity="0.3">
                          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="20" cy="20" r="0.5" fill="#B48500" opacity="0.2">
                          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="80" cy="30" r="0.5" fill="#B48500" opacity="0.2">
                          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="5s" repeatCount="indefinite" />
                        </circle>
                        <line x1="20" y1="20" x2="50" y2="50" stroke="#B48500" strokeWidth="0.5" opacity="0.1" />
                        <line x1="50" y1="50" x2="80" y2="30" stroke="#B48500" strokeWidth="0.5" opacity="0.1" />
                      </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#neural-network)" />
                  </svg>
                </div>
                
                {/* Main Content */}
                <div className="relative z-10">
                  <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="loading-spinner"></div></div>}>
                    {children}
                  </Suspense>
                </div>
              </div>
              
              <Toaster 
                position="bottom-left"
                theme="dark"
                className="toaster"
                toastOptions={{
                  style: {
                    background: '#000000',
                    border: '1px solid #B48500',
                    color: '#B48500',
                  },
                }}
              />
              
              <Analytics />
            </LanguageProvider>
          </AuthProvider>
        </ThemeProvider>
        
        {/* Page Load Script - Removed for debugging */}
        {/* <script dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('load', function() {
              setTimeout(function() {
                document.body.classList.add('page-loaded');
              }, 500);
            });
          `
        }} /> */}
      </body>
    </html>
  )
}