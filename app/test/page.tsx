"use client"

import { useState, useEffect } from "react"

export default function TestPage() {
  const [language, setLanguage] = useState("ar")
  const [direction, setDirection] = useState("rtl")

  useEffect(() => {
    // Check current language from localStorage or default to Arabic
    const savedLang = typeof window !== 'undefined' ? localStorage.getItem("preferred-language") : null
    const currentLang = savedLang || "ar"
    
    setLanguage(currentLang)
    setDirection(currentLang === "ar" ? "rtl" : "ltr")
    
    // Apply direction to document
    if (typeof document !== 'undefined') {
      document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = currentLang
    }
  }, [])

  const toggleLanguage = () => {
    const newLang = language === "ar" ? "en" : "ar"
    setLanguage(newLang)
    setDirection(newLang === "ar" ? "rtl" : "ltr")
    
    // Save preference
    if (typeof window !== 'undefined') {
      localStorage.setItem("preferred-language", newLang)
      document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = newLang
    }
    
    // Reload to apply changes
    window.location.reload()
  }

  return (
    <div 
      className="min-h-screen bg-black text-[#B48500] p-8"
      dir={direction}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">FinClick.AI Language Test</h1>
        
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Language Status</h2>
          <p className="mb-2">Current Language: <span className="font-mono bg-gray-800 px-2 py-1 rounded">{language === "ar" ? "Arabic (العربية)" : "English"}</span></p>
          <p className="mb-2">Text Direction: <span className="font-mono bg-gray-800 px-2 py-1 rounded">{direction.toUpperCase()}</span></p>
          <p className="mb-4">Document Direction: <span className="font-mono bg-gray-800 px-2 py-1 rounded">{typeof document !== 'undefined' ? document.documentElement.dir : 'unknown'}</span></p>
          
          <button
            onClick={toggleLanguage}
            className="bg-[#B48500] hover:bg-[#8B6914] text-black px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Switch to {language === "ar" ? "English" : "Arabic (العربية)"}
          </button>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Text Direction Test</h2>
          <div className="mb-4">
            <p className="mb-2">This paragraph should be aligned {language === "ar" ? "right" : "left"} and the text direction should be {direction.toUpperCase()}.</p>
            <p className="mb-2">هذه الفقرة يجب أن تكون محاذاة {language === "en" ? "لليمين" : "to the right"} واتجاه النص يجب أن يكون {direction.toUpperCase()}.</p>
          </div>
          
          <div className="flex gap-4 mb-4" dir={direction}>
            <div className="bg-gray-800 p-4 rounded flex-1">
              <p>Box 1: Regular text alignment</p>
              <p>مربع 1: محاذاة النص العادية</p>
            </div>
            <div className="bg-gray-800 p-4 rounded flex-1">
              <p>Box 2: Regular text alignment</p>
              <p>مربع 2: محاذاة النص العادية</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="bg-[#B48500] hover:bg-[#8B6914] text-black px-4 py-2 rounded-lg font-semibold transition-colors">
              {language === "ar" ? "زر الاختبار" : "Test Button"}
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-[#B48500] px-4 py-2 rounded-lg font-semibold transition-colors">
              {language === "ar" ? "زر إضافي" : "Additional Button"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}