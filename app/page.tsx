import { Header } from "@/components/header"
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
      
      {/* Floating Action Button for Quick Access */}
      <div className="fixed bottom-6 left-6 z-50">
        <button 
          onClick={() => {
            if (typeof window !== 'undefined') {
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
            }
          }}
          className="bg-[#B48500] hover:bg-[#8B6914] text-black p-4 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 animate-pulse"
          title="اكتشف المميزات"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
      
      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div className="h-1 bg-gradient-to-r from-[#B48500] to-[#8B6914] transition-all duration-300" style={{width: '0%'}} id="scroll-progress"></div>
      </div>
    </div>
  )
}
