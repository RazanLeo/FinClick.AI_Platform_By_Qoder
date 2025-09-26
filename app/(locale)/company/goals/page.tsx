'use client'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useTranslations } from "next-intl"

interface Goal {
  title: string;
  content: string;
}

export default function GoalsPage() {
  const t = useTranslations("goals")
  const goals: Goal[] = t.raw("items")

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-[#B48500] mb-8 text-center">{t("title")}</h1>
            <div className="space-y-6">
              {goals.map((goal: Goal, index: number) => (
                <div key={index} className="bg-black border border-[#B48500] rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-[#B48500] mb-3">
                    {index + 1}. {goal.title}
                  </h3>
                  <p className="text-[#8B6914] leading-relaxed">{goal.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
