'use client'

import { useEffect } from 'react'
import { useLocale } from 'next-intl'

const DirectionController = () => {
  const locale = useLocale()

  useEffect(() => {
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
  }, [locale])

  return null
}

export default DirectionController
