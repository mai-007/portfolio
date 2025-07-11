'use client'

import Image from "next/image"
import { type Skill } from "@/lib/api"

interface SkillsSectionProps {
  skills: Skill[]
}

export const SkillsSection = ({ skills }: SkillsSectionProps) => (
  <div className="animate-fade-in">
    <h3 className="text-lg font-bold text-gray-900 mb-4">スキルセット</h3>
    {skills.length > 0 ? (
      <div className="grid grid-cols-3 gap-4 mb-8">
        {skills.map((skill, index) => (
          <div
            key={skill.id}
            className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center p-2 hover:bg-gray-200 transition-colors animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Image
              src={skill.logo.url || "/placeholder.svg"}
              alt={skill.name}
              width={60}
              height={60}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-8">
        <p className="text-gray-500">スキルデータがありません</p>
      </div>
    )}
  </div>
)
