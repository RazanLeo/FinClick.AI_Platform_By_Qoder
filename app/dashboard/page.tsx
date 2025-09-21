"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { UserDashboard } from "@/components/dashboard/user-dashboard"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"
import { Header } from "@/components/header"
import { StockTicker } from "@/components/stock-ticker"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#B48500] text-xl">جاري التحميل...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <StockTicker />
      
      {/* زر العودة للصفحة الرئيسية */}
      <div className="container mx-auto px-4 py-4">
        <Button
          onClick={() => router.push('/')}
          className="bg-[#B48500] text-black hover:bg-[#8B6914] mb-6"
        >
          <Home className="w-4 h-4 ml-2" />
          العودة للصفحة الرئيسية
        </Button>
      </div>
      
      {user.type === "admin" ? <AdminDashboard /> : <UserDashboard />}
    </div>
  )
}
