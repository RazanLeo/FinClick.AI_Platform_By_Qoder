"use client"

import { Header } from "@/components/header"
import { StockTicker } from "@/components/stock-ticker"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { BeneficiariesSection } from "@/components/beneficiaries-section"
import { StepsSection } from "@/components/steps-section"
import { AnalysisTypesSection } from "@/components/analysis-types-section"
import { FreeToolsSection } from "@/components/free-tools-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PricingSection } from "@/components/pricing-section"
import { Footer } from "@/components/footer"
import { CompanyModal } from "@/components/company-modal"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      {/* Enhanced Header with sticky navigation */}
      <Header />
      
      {/* Live Stock Ticker with enhanced animations */}
      <StockTicker />
      
      {/* Hero Section with call-to-action */}
      <HeroSection />
      
      {/* Features Section with enhanced animations */}
      <section id="features" className="scroll-mt-20">
        <FeaturesSection />
      </section>
      
      {/* Beneficiaries Section */}
      <section className="scroll-mt-20">
        <BeneficiariesSection />
      </section>
      
      {/* Steps Section with interactive elements */}
      <section id="steps" className="scroll-mt-20">
        <StepsSection />
      </section>
      
      {/* Analysis Types Section with enhanced display */}
      <section id="analysis-types" className="scroll-mt-20">
        <AnalysisTypesSection />
      </section>
      
      {/* Free Tools Section */}
      <section data-section="free-tools" className="scroll-mt-20">
        <FreeToolsSection />
      </section>
      
      {/* Testimonials Section */}
      <section data-section="testimonials" className="scroll-mt-20">
        <TestimonialsSection />
      </section>
      
      {/* Pricing Section with enhanced design */}
      <section data-section="pricing" className="scroll-mt-20">
        <PricingSection />
      </section>
      
      {/* Enhanced Footer */}
      <Footer />
      
      {/* Company Modal */}
      <CompanyModal />
      
      {/* Smart Scroll Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => {
            if (typeof window !== 'undefined') {
              const scrollTop = window.pageYOffset || document.documentElement.scrollTop
              const scrollHeight = document.documentElement.scrollHeight
              const clientHeight = document.documentElement.clientHeight
              
              // If user is near the bottom (within 100px), scroll to top
              if (scrollTop + clientHeight >= scrollHeight - 100) {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              } else {
                // Otherwise scroll to bottom
                window.scrollTo({ top: scrollHeight, behavior: 'smooth' })
              }
            }
          }}
          className="bg-[#B48500] hover:bg-[#8B6914] text-black p-4 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 group relative"
          title="تنقل في الصفحة"
        >
          <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l5-5 5 5" className="group-hover:animate-bounce" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8l5 5 5-5" className="opacity-50" />
          </svg>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black border border-[#B48500] text-[#B48500] text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            انقر للتنقل في الصفحة
          </div>
        </button>
      </div>
      
      {/* Enhanced Progress Indicator with Scroll Position */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-1 bg-gradient-to-r from-[#B48500] to-[#8B6914] transition-all duration-300" 
          id="scroll-progress"
          style={{width: '0%'}}
        ></div>
      </div>
      
      {/* Scroll Position Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            const progressBar = document.getElementById('scroll-progress');
            if (progressBar) {
              progressBar.style.width = Math.min(scrollPercentage, 100) + '%';
            }
          });
        `
      }} />
    </div>
  )
}