'use client'

import Image from "next/image"
import { type PdfSection } from "@/lib/api"

interface PdfSectionsProps {
  pdfSections: PdfSection[]
  onPdfOpen: (url: string) => void
}

export const PdfSections = ({ pdfSections, onPdfOpen }: PdfSectionsProps) => (
  <div className="space-y-6 animate-fade-in">
    {pdfSections.length > 0 ? (
      pdfSections.map((section, index) => (
        <div key={section.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
          <h3 className="text-lg font-bold text-gray-900 mb-3">{section.title}</h3>
          <button
            onClick={() => onPdfOpen(section.pdfFile.url)}
            className="w-full bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group"
          >
            <div className="aspect-[5/2] bg-gray-200 flex items-center justify-center overflow-hidden">
              <Image
                src={section.banner.url || "/placeholder.svg"}
                alt={`${section.title} banner`}
                width={300}
                height={120}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </button>
        </div>
      ))
    ) : (
      <div className="text-center py-8">
        <p className="text-gray-500">PDFセクションがありません</p>
      </div>
    )}
  </div>
)
