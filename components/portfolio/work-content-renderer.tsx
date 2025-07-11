'use client'

import { useState, useEffect, useRef } from "react"

interface WorkContentRendererProps {
  htmlContent: string
  spimageUrl?: string | null
}

export const WorkContentRenderer = ({ htmlContent, spimageUrl }: WorkContentRendererProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      const images = contentRef.current.querySelectorAll('img')
      images.forEach((img) => {
        img.style.cursor = 'pointer' // Add a pointer cursor
        img.onclick = (e) => {
          e.preventDefault() // Prevent default link behavior if image is wrapped in <a>
          setSelectedImage(img.src)
        }
      })
    }

    // Cleanup function to remove event listeners when component unmounts or content changes
    return () => {
      if (contentRef.current) {
        const images = contentRef.current.querySelectorAll('img')
        images.forEach((img) => {
          img.onclick = null // Remove the click handler
        })
      }
    }
  }, [htmlContent, selectedImage]) // Re-run if content or selectedImage changes

  const handleSpimageClick = () => {
    if (spimageUrl) {
      setSelectedImage(spimageUrl)
    }
  }

  return (
    <div className="prose prose-lg max-w-none mb-8">
      <div ref={contentRef} dangerouslySetInnerHTML={{ __html: htmlContent }} />
      {spimageUrl && (
        <div className="mt-8 w-full relative aspect-[9/16] md:aspect-[3/4] lg:aspect-[9/16] cursor-pointer" onClick={handleSpimageClick}>
          <img
            src={spimageUrl}
            alt="Smartphone view"
            className="object-contain w-full h-full"
          />
        </div>
      )}
      {/* ImageModalは後で再作成します */}
      {/* <ImageModal imageUrl={selectedImage} onOpenChange={() => setSelectedImage(null)} /> */}
    </div>
  )
}