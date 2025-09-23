"use client"

import { useLanguage } from "@/components/language-provider"

export function TestImport() {
  const { language } = useLanguage()
  return <div>Current language: {language}</div>
}