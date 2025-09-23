"use client"

import { useEffect } from "react"

// Adding a default export as well to ensure compatibility
export function DirectionController() {
  useEffect(() => {
    // Function to apply RTL/LTR styling based on localStorage or default
    const applyDirection = () => {
      // Get saved language preference or default to Arabic
      const savedLang = typeof window !== 'undefined' ? localStorage.getItem("preferred-language") : null
      const currentLang = savedLang || "ar"
      
      // Set document attributes
      document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = currentLang
      
      // Also update body attributes
      document.body.dir = currentLang === "ar" ? "rtl" : "ltr"
      document.body.lang = currentLang
      
      // Add/remove RTL classes
      if (currentLang === "ar") {
        document.documentElement.classList.add("rtl")
        document.documentElement.classList.remove("ltr")
        document.body.classList.add("rtl")
        document.body.classList.remove("ltr")
        
        // Ensure all elements have proper RTL styling
        const style = document.createElement("style")
        style.id = "rtl-styles"
        style.innerHTML = `
          html.rtl, body.rtl {
            direction: rtl !important;
            text-align: right !important;
          }
          html.rtl * {
            direction: rtl !important;
            text-align: right !important;
          }
          
          /* Specific RTL adjustments for common Tailwind classes */
          html[dir="rtl"] .flex-row {
            flex-direction: row-reverse !important;
          }
          
          html[dir="rtl"] .text-left {
            text-align: right !important;
          }
          
          html[dir="rtl"] .text-right {
            text-align: left !important;
          }
          
          html[dir="rtl"] .ml-auto {
            margin-left: 0 !important;
            margin-right: auto !important;
          }
          
          html[dir="rtl"] .mr-auto {
            margin-right: 0 !important;
            margin-left: auto !important;
          }
          
          html[dir="rtl"] .float-right {
            float: left !important;
          }
          
          html[dir="rtl"] .float-left {
            float: right !important;
          }
          
          html[dir="rtl"] .space-x-4 > * + * {
            margin-left: 0 !important;
            margin-right: 1rem !important;
          }
          
          html[dir="rtl"] .pr-4 {
            padding-right: 0 !important;
            padding-left: 1rem !important;
          }
          
          html[dir="rtl"] .pl-4 {
            padding-left: 0 !important;
            padding-right: 1rem !important;
          }
          
          html[dir="rtl"] .mr-2 {
            margin-right: 0 !important;
            margin-left: 0.5rem !important;
          }
          
          html[dir="rtl"] .ml-2 {
            margin-left: 0 !important;
            margin-right: 0.5rem !important;
          }
          
          html[dir="rtl"] .left-0 {
            left: auto !important;
            right: 0 !important;
          }
          
          html[dir="rtl"] .right-0 {
            right: auto !important;
            left: 0 !important;
          }
          
          html[dir="rtl"] .left-4 {
            left: auto !important;
            right: 1rem !important;
          }
          
          html[dir="rtl"] .right-4 {
            right: auto !important;
            left: 1rem !important;
          }
        `
        
        // Remove existing RTL styles if any
        const existingStyle = document.getElementById("rtl-styles")
        if (existingStyle) {
          existingStyle.remove()
        }
        
        document.head.appendChild(style)
      } else {
        // For English (LTR)
        document.documentElement.classList.add("ltr")
        document.documentElement.classList.remove("rtl")
        document.body.classList.add("ltr")
        document.body.classList.remove("rtl")
        
        // Remove RTL styles
        const rtlStyle = document.getElementById("rtl-styles")
        if (rtlStyle) {
          rtlStyle.remove()
        }
      }
    }

    // Apply direction immediately
    applyDirection()
    
    // Also apply on DOM content loaded to ensure all elements are styled
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", applyDirection)
    }
    
    // Listen for storage changes (when language is changed in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "preferred-language") {
        applyDirection()
      }
    }
    
    window.addEventListener("storage", handleStorageChange)
    
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  return null
}

// Adding default export
export default DirectionController
