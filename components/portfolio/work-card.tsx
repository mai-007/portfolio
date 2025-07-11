'use client'

import Image from "next/image"
import Link from "next/link"
import { type Work } from "@/lib/api"

interface WorkCardProps {
  work: Work
  index: number
}

export const WorkCard = ({ work, index }: WorkCardProps) => (
  <Link
    href={`/work/${work.id}`}
    className="group block bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in-up"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center overflow-hidden">
      <Image
        src={work.eyecatch?.url || "/placeholder.svg"}
        alt={work.title}
        width={300}
        height={200}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-4">
      <h3 className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
        {work.title}
      </h3>
      <div className="flex flex-wrap gap-1 mt-2">
        {work.categories.map((category) => (
          <span key={category.id} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {category.name}
          </span>
        ))}
      </div>
    </div>
  </Link>
)