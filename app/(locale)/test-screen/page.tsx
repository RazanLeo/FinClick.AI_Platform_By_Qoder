"use client"

import { useLanguage } from "@/components/language-provider"
import { useState, useEffect } from "react"

export default function TestScreen() {
  const { language, setLanguage, t } = useLanguage()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-black text-[#B48500] p-8" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Language Test Screen</h1>
        
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Current Language Status</h2>
          <p className="mb-2">Current Language: <span className="font-mono bg-gray-800 px-2 py-1 rounded">{language}</span></p>
          <p className="mb-2">Direction: <span className="font-mono bg-gray-800 px-2 py-1 rounded">{language === "ar" ? "RTL" : "LTR"}</span></p>
          <p className="mb-4">Document Direction: <span className="font-mono bg-gray-800 px-2 py-1 rounded">{typeof document !== 'undefined' ? document.documentElement.dir : 'unknown'}</span></p>
          
          <button
            onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
            className="bg-[#B48500] hover:bg-[#8B6914] text-black px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Switch to {language === "ar" ? "English" : "Arabic"}
          </button>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Translation Test</h2>
          <p className="mb-2">Navigation Home: <span className="font-mono bg-gray-800 px-2 py-1 rounded">{t("nav.home")}</span></p>
          <p className="mb-2">Hero Title: <span className="font-mono bg-gray-800 px-2 py-1 rounded">{t("hero.title")}</span></p>
          <p className="mb-2">Features Title: <span className="font-mono bg-gray-800 px-2 py-1 rounded">{t("features.title")}</span></p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Text Direction Test</h2>
          <p className="mb-4">This paragraph should be aligned {language === "ar" ? "right" : "left"} and the text direction should be {language === "ar" ? "RTL" : "LTR"}.</p>
          
          <div className="flex gap-4 mb-4">
            <div className="bg-gray-800 p-4 rounded flex-1">
              <p>Box 1: Regular text alignment</p>
            </div>
            <div className="bg-gray-800 p-4 rounded flex-1">
              <p>Box 2: Regular text alignment</p>
            </div>
          </div>
          
          <p>This is a longer paragraph to test text flow and direction. The text should flow properly based on the current language direction settings. In Arabic, it should flow from right to left, and in English, it should flow from left to right.</p>
        </div>
      </div>
    </div>
  )
}