"use client"

import { useEffect, useState } from "react"

interface StockIndex {
  name: string
  nameAr: string
  symbol: string
  price: number
  change: number
  changePercent: number
  currency: string
  market: string
  marketAr: string
}

export function StockTicker() {
  const [indices, setIndices] = useState<StockIndex[]>([
    // Saudi Market Indices - على رأس القائمة
    { 
      name: "TASI (Tadawul All Share)", 
      nameAr: "تاسي (جميع الأسهم)", 
      symbol: "TASI", 
      price: 12450.5, 
      change: 125.3, 
      changePercent: 1.02, 
      currency: "SAR", 
      market: "Saudi Arabia", 
      marketAr: "السعودية"
    },
    { 
      name: "Nomu Parallel Market", 
      nameAr: "نمو الموازي", 
      symbol: "NOMU", 
      price: 4567.8, 
      change: 23.4, 
      changePercent: 0.52, 
      currency: "SAR", 
      market: "Saudi Arabia", 
      marketAr: "السعودية"
    },
    { 
      name: "MSCI Tadawul 30", 
      nameAr: "مؤشر تداول 30", 
      symbol: "MT30", 
      price: 3456.7, 
      change: 45.2, 
      changePercent: 1.33, 
      currency: "SAR", 
      market: "Saudi Arabia", 
      marketAr: "السعودية"
    },
    // US Stock Indices
    { 
      name: "S&P 500", 
      nameAr: "ستاندرد آند بورز 500", 
      symbol: "SPX", 
      price: 4567.89, 
      change: 23.45, 
      changePercent: 0.52, 
      currency: "USD", 
      market: "United States", 
      marketAr: "الولايات المتحدة"
    },
    { 
      name: "NASDAQ Composite", 
      nameAr: "ناسداك المركب", 
      symbol: "IXIC", 
      price: 15234.78, 
      change: -45.2, 
      changePercent: -0.3, 
      currency: "USD", 
      market: "United States", 
      marketAr: "الولايات المتحدة"
    },
    { 
      name: "Dow Jones Industrial", 
      nameAr: "داو جونز الصناعي", 
      symbol: "DJI", 
      price: 34567.12, 
      change: 156.78, 
      changePercent: 0.46, 
      currency: "USD", 
      market: "United States", 
      marketAr: "الولايات المتحدة"
    },
    { 
      name: "Russell 2000", 
      nameAr: "راسل 2000", 
      symbol: "RUT", 
      price: 2045.67, 
      change: 12.34, 
      changePercent: 0.61, 
      currency: "USD", 
      market: "United States", 
      marketAr: "الولايات المتحدة"
    },
    // European Stock Indices
    { 
      name: "FTSE 100", 
      nameAr: "فوتسي 100", 
      symbol: "FTSE", 
      price: 7890.45, 
      change: -12.34, 
      changePercent: -0.16, 
      currency: "GBP", 
      market: "United Kingdom", 
      marketAr: "المملكة المتحدة"
    },
    { 
      name: "DAX 40", 
      nameAr: "داكس 40", 
      symbol: "DAX", 
      price: 16234.67, 
      change: 89.23, 
      changePercent: 0.55, 
      currency: "EUR", 
      market: "Germany", 
      marketAr: "ألمانيا"
    },
    { 
      name: "CAC 40", 
      nameAr: "كاك 40", 
      symbol: "FCHI", 
      price: 7456.89, 
      change: 34.56, 
      changePercent: 0.47, 
      currency: "EUR", 
      market: "France", 
      marketAr: "فرنسا"
    },
    { 
      name: "EURO STOXX 50", 
      nameAr: "يورو ستوكس 50", 
      symbol: "SX5E", 
      price: 4789.23, 
      change: 23.45, 
      changePercent: 0.49, 
      currency: "EUR", 
      market: "Europe", 
      marketAr: "أوروبا"
    },
    { 
      name: "IBEX 35", 
      nameAr: "إيبكس 35", 
      symbol: "IBEX", 
      price: 9876.54, 
      change: -23.45, 
      changePercent: -0.24, 
      currency: "EUR", 
      market: "Spain", 
      marketAr: "إسبانيا"
    },
    { 
      name: "FTSE MIB", 
      nameAr: "فوتسي إم آي بي", 
      symbol: "FTSEMIB", 
      price: 29456.78, 
      change: 156.23, 
      changePercent: 0.53, 
      currency: "EUR", 
      market: "Italy", 
      marketAr: "إيطاليا"
    },
    // Asian Stock Indices
    { 
      name: "Nikkei 225", 
      nameAr: "نيكي 225", 
      symbol: "N225", 
      price: 33456.78, 
      change: 234.56, 
      changePercent: 0.71, 
      currency: "JPY", 
      market: "Japan", 
      marketAr: "اليابان"
    },
    { 
      name: "Hang Seng", 
      nameAr: "هانغ سنغ", 
      symbol: "HSI", 
      price: 18567.34, 
      change: -123.45, 
      changePercent: -0.66, 
      currency: "HKD", 
      market: "Hong Kong", 
      marketAr: "هونغ كونغ"
    },
    { 
      name: "Shanghai Composite", 
      nameAr: "شانغهاي المركب", 
      symbol: "SHCOMP", 
      price: 3234.56, 
      change: 45.67, 
      changePercent: 1.43, 
      currency: "CNY", 
      market: "China", 
      marketAr: "الصين"
    },
    { 
      name: "KOSPI", 
      nameAr: "كوسبي", 
      symbol: "KOSPI", 
      price: 2567.89, 
      change: 23.45, 
      changePercent: 0.92, 
      currency: "KRW", 
      market: "South Korea", 
      marketAr: "كوريا الجنوبية"
    },
    { 
      name: "BSE Sensex", 
      nameAr: "بومباي سينسكس", 
      symbol: "SENSEX", 
      price: 65432.10, 
      change: 234.56, 
      changePercent: 0.36, 
      currency: "INR", 
      market: "India", 
      marketAr: "الهند"
    },
    { 
      name: "ASX 200", 
      nameAr: "أستراليا 200", 
      symbol: "XJO", 
      price: 7234.56, 
      change: 45.67, 
      changePercent: 0.64, 
      currency: "AUD", 
      market: "Australia", 
      marketAr: "أستراليا"
    },
    // GCC Stock Indices
    { 
      name: "DFM General Index", 
      nameAr: "مؤشر دبي المالي العام", 
      symbol: "DFMGI", 
      price: 4123.45, 
      change: 23.78, 
      changePercent: 0.58, 
      currency: "AED", 
      market: "UAE", 
      marketAr: "الإمارات"
    },
    { 
      name: "ADX General Index", 
      nameAr: "مؤشر أبوظبي العام", 
      symbol: "ADX", 
      price: 9876.54, 
      change: 67.89, 
      changePercent: 0.69, 
      currency: "AED", 
      market: "UAE", 
      marketAr: "الإمارات"
    },
    { 
      name: "QE All Share Index", 
      nameAr: "مؤشر قطر لجميع الأسهم", 
      symbol: "QSE", 
      price: 3567.89, 
      change: 12.34, 
      changePercent: 0.35, 
      currency: "QAR", 
      market: "Qatar", 
      marketAr: "قطر"
    },
    { 
      name: "Kuwait All Share Index", 
      nameAr: "مؤشر الكويت لجميع الأسهم", 
      symbol: "KWSE", 
      price: 7890.12, 
      change: -34.56, 
      changePercent: -0.44, 
      currency: "KWD", 
      market: "Kuwait", 
      marketAr: "الكويت"
    },
    { 
      name: "MSX 30 Index", 
      nameAr: "مؤشر مسقط 30", 
      symbol: "MSX30", 
      price: 4567.23, 
      change: 23.45, 
      changePercent: 0.52, 
      currency: "OMR", 
      market: "Oman", 
      marketAr: "عمان"
    },
    { 
      name: "Bahrain All Share Index", 
      nameAr: "مؤشر البحرين لجميع الأسهم", 
      symbol: "BHSEASI", 
      price: 1987.65, 
      change: 12.34, 
      changePercent: 0.63, 
      currency: "BHD", 
      market: "Bahrain", 
      marketAr: "البحرين"
    },
    // Emerging Markets
    { 
      name: "EGX 30", 
      nameAr: "مؤشر مصر 30", 
      symbol: "EGX30", 
      price: 18456.78, 
      change: 234.56, 
      changePercent: 1.29, 
      currency: "EGP", 
      market: "Egypt", 
      marketAr: "مصر"
    },
    { 
      name: "BOVESPA", 
      nameAr: "بوفيسبا", 
      symbol: "IBOV", 
      price: 126789.45, 
      change: 456.78, 
      changePercent: 0.36, 
      currency: "BRL", 
      market: "Brazil", 
      marketAr: "البرازيل"
    }
  ])

  const [isMarketOpen, setIsMarketOpen] = useState(true)

  // Simulate real-time market data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIndices((prev: StockIndex[]) =>
        prev.map((index: StockIndex) => {
          // More realistic price movements for stock indices
          const volatility = 0.003 // Stock indices have lower volatility than individual stocks
          const changePercent = (Math.random() - 0.5) * volatility
          const newPrice = index.price * (1 + changePercent)
          const priceChange = newPrice - index.price
          
          return {
            ...index,
            price: newPrice,
            change: priceChange,
            changePercent: (priceChange / index.price) * 100
          }
        })
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Update market status
  useEffect(() => {
    const updateMarketStatus = () => {
      const now = new Date()
      const hour = now.getHours()
      const isWeekend = now.getDay() === 0 || now.getDay() === 6
      setIsMarketOpen(!isWeekend && hour >= 9 && hour < 16)
    }

    updateMarketStatus()
    const statusInterval = setInterval(updateMarketStatus, 60000)
    return () => clearInterval(statusInterval)
  }, [])

  return (
    <div className="bg-black border-t border-b border-[#B48500] py-3 overflow-hidden relative">
      {/* Market Status */}
      <div className="text-center mb-2">
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${
          isMarketOpen 
            ? 'bg-green-900 text-green-300 border border-green-500' 
            : 'bg-red-900 text-red-300 border border-red-500'
        }`}>
          {isMarketOpen ? "السوق مفتوح • Market Open" : "السوق مغلق • Market Closed"}
        </span>
      </div>
      
      {/* Scrolling Ticker */}
      <div className="animate-marquee flex gap-6 whitespace-nowrap">
        {indices.concat(indices).map((index: StockIndex, i: number) => (
          <div key={i} className="flex items-center gap-3 text-sm bg-gray-900 px-4 py-2 rounded-lg border border-gray-700 hover:border-[#B48500] transition-colors min-w-max">
            {/* Index Info */}
            <div className="flex flex-col">
              <span className="font-bold text-[#B48500] text-xs">
                {index.nameAr} • {index.name}
              </span>
              <span className="text-gray-400 text-xs">
                {index.symbol} • {index.currency}
              </span>
            </div>
            
            {/* Price & Change */}
            <div className="flex flex-col text-right">
              <span className="text-[#B48500] font-bold">
                {index.price.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
              
              <span className={`text-xs font-medium ${
                index.change >= 0 ? "text-green-400" : "text-red-400"
              }`}>
                {index.change >= 0 ? "+" : ""}
                {index.change.toFixed(2)} 
                ({index.changePercent >= 0 ? "+" : ""}{index.changePercent.toFixed(2)}%)
              </span>
            </div>
            
            {/* Market */}
            <div className="text-xs text-gray-500 hidden lg:block">
              {index.marketAr}
            </div>
          </div>
        ))}
      </div>
      
      {/* Last Update */}
      <div className="text-center mt-2">
        <span className="text-xs text-gray-500">
          آخر تحديث: {new Date().toLocaleTimeString('ar-SA')} • Last Update: {new Date().toLocaleTimeString('en-US')}
        </span>
      </div>
    </div>
  )
}