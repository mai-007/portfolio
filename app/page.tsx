'use client'

import { useState } from "react"
import { usePortfolioData } from "@/lib/hooks/use-portfolio-data"
import { PortfolioPageSkeleton } from "@/components/portfolio-skeleton"
import { ApiError } from "@/components/portfolio/api-error"
import { CategoryTabs } from "@/components/portfolio/category-tabs"
import { WorksGrid } from "@/components/portfolio/works-grid"
import { ProfileSection } from "@/components/portfolio/profile-section"
import { SkillsSection } from "@/components/portfolio/skills-section"
import { PdfSections } from "@/components/portfolio/pdf-sections"
import { PdfModal } from "@/components/portfolio/pdf-modal"
import { DateFilterSelect } from "@/components/portfolio/date-filter-select"

export default function PortfolioPage() {
  const {
    works,
    categories,
    skills,
    profileData,
    pdfSections,
    loading,
    apiStatus,
    uniqueDates,
  } = usePortfolioData()

  const [activeCategory, setActiveCategory] = useState("ALL")
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState("ALL")

  const filteredWorks = works.filter((work) => {
    const matchesCategory = activeCategory === "ALL"
      ? true
      : work.categories.some((cat) => cat.slug === activeCategory.toLowerCase());
    
    const matchesDate = selectedDate === "ALL"
      ? true
      : work.date && new Date(work.date).getFullYear().toString() === selectedDate;

    return matchesCategory && matchesDate;
  });

  if (loading) {
    return <PortfolioPageSkeleton />
  }

  return (
    <div className="min-h-screen bg-white py-8 px-32">
      <main className="max-w-full mx-auto">
        {!apiStatus.available && <ApiError message={apiStatus.message} />}

        <section className="flex justify-between">
          <section className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 animate-fade-in">
              Portfolio
            </h1>
            <div className="mb-4">
              <DateFilterSelect
                dates={uniqueDates}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
              />
            </div>
            <CategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            <WorksGrid works={filteredWorks} />
          </section>

          <aside className="w-80 space-y-8">
            <ProfileSection profileData={profileData} />
            <PdfSections pdfSections={pdfSections} onPdfOpen={setSelectedPdf} />
            <SkillsSection skills={skills} />
          </aside>
        </section>
      </main>

      <PdfModal pdfUrl={selectedPdf} onOpenChange={() => setSelectedPdf(null)} />
    </div>
  )
}
