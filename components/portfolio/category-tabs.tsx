'use client'

import { type Category } from "@/lib/api"

interface CategoryTabsProps {
  categories: Category[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export const CategoryTabs = ({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) => (
  <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 animate-fade-in">
    <button
      onClick={() => onCategoryChange("ALL")}
      className={`px-4 py-2 text-base font-medium transition-colors ${
        activeCategory === "ALL"
          ? "text-gray-900 border-b-2 border-gray-900"
          : "text-gray-500 hover:text-gray-700"
      }`}
      key="all-category"
    >
      [ALL]
    </button>
    {categories.map((category) => (
      <button
        key={category.id}
        onClick={() => onCategoryChange(category.slug)}
        className={`px-4 py-2 text-base font-medium transition-colors ${
          activeCategory === category.slug
            ? "text-gray-900 border-b-2 border-gray-900"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        {category.name}
      </button>
    ))}
  </div>
)
