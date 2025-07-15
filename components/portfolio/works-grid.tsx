'use client'

import { type Work } from "@/lib/api"
import { WorkCard } from "./work-card"

interface WorksGridProps {
  works: Work[]
  onWorkSelect: (workId: string) => void
}

export const WorksGrid = ({ works, onWorkSelect }: WorksGridProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
    {works.length > 0 ? (
      works.map((work, index) => <WorkCard key={work.id} work={work} index={index} onWorkSelect={onWorkSelect} />)
    ) : (
      <div className="col-span-full text-center py-12">
        <p className="text-gray-500">作品データがありません</p>
      </div>
    )}
  </div>
)
