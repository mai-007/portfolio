'use client'

import Image from "next/image"

interface PdfSectionsProps {
  onPdfOpen: (url: string) => void
}

const designPdfUrl = "https://dpsk.sakura.ne.jp/DesignFlow_maiKoto.pdf"
const productDesignPdfUrl = "https://dpsk.sakura.ne.jp/productDesign.pdf"

export const PdfSections = ({ onPdfOpen }: PdfSectionsProps) => (
  <div className="space-y-6 animate-fade-in">
    <div className="animate-fade-in-up">
      <h3 className="text-lg font-bold text-gray-900 mb-3">デザイン</h3>
      <button
        onClick={() => onPdfOpen(designPdfUrl)}
        className="w-full bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group"
      >
        <div className="aspect-[5/2] bg-gray-200 flex items-center justify-center overflow-hidden">
          <Image
            src="/DesignFlow.png"
            alt="デザイン PDF banner"
            width={300}
            height={120}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </button>
    </div>
    <div className="animate-fade-in-up" style={{ animationDelay: `200ms` }}>
      <h3 className="text-lg font-bold text-gray-900 mb-3">プロダクトデザイン</h3>
      <button
        onClick={() => onPdfOpen(productDesignPdfUrl)}
        className="w-full bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group"
      >
        <div className="aspect-[5/2] bg-gray-200 flex items-center justify-center overflow-hidden">
          <Image
            src="/productDesign.png"
            alt="プロダクトデザイン PDF banner"
            width={300}
            height={120}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </button>
    </div>
  </div>
)
