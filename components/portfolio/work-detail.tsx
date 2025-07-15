'use client'

import React, { useEffect, useRef } from "react"
import Image from "next/image"
import { type Work } from "@/lib/api"
import { Badge } from "@/components/ui/badge"

interface WorkDetailProps {
  work: Work
}

export const WorkDetail = ({ work }: WorkDetailProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("WorkDetail: content HTML before rendering:", work.content);
    if (contentRef.current) {
      const images = contentRef.current.querySelectorAll("img");
      images.forEach((img) => {
        // Prevent double wrapping if effect runs multiple times
        if (!img.parentElement?.classList.contains("content-image-wrapper")) {
          const wrapper = document.createElement("div");
          wrapper.className = "content-image-wrapper bg-gray-900 p-4 rounded-lg mb-4 flex justify-center items-center";

          // Insert the wrapper before the image, then move the image inside the wrapper
          img.parentNode?.insertBefore(wrapper, img);
          wrapper.appendChild(img);
        }
      });
    }
  }, [work.content]); // Re-run effect if content changes

  return (
    <div className="flex-1 overflow-y-auto">
      {work.eyecatch && (
        <div className="w-full aspect-[16/9] relative mb-4">
          <Image
            src={work.eyecatch.url}
            alt={work.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-6">
        {work.publishDate && (
          <p className="text-gray-500 text-sm mb-2">
            Published on: {new Date(work.publishDate).toLocaleDateString()}
          </p>
        )}

        {work.date && (
          <p className="text-gray-500 text-sm mb-2">
            制作日: {new Date(work.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        )}

        {work.roles && (
          <div className="mb-2">
            <p className="text-gray-500 text-sm mb-1">役割:</p>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(work.roles) ? (
                work.roles.map((role, index) => (
                  <Badge key={index} variant="secondary">{role}</Badge>
                ))
              ) : (
                <Badge variant="secondary">{work.roles}</Badge>
              )}
            </div>
          </div>
        )}

        {/* Content section */}
        {work.content ? (
          <div ref={contentRef} className="prose prose-lg max-w-none mb-4" dangerouslySetInnerHTML={{ __html: work.content }} />
        ) : (
          <p className="text-gray-500 mb-4">コンテンツがありません。</p>
        )}

        <div className="space-y-2 mt-4">
          {work.github && (
            <a href={work.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline block">View on GitHub</a>
          )}
          {work.githubUrl && (
            <a href={work.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline block">GitHub URL</a>
          )}
          {work.figma && (
            <a href={work.figma} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline block">View on Figma</a>
          )}
          {work.figmaURL && (
            <a href={work.figmaURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline block">Figma URL</a>
          )}
          {work.url && (
            <a href={work.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline block">Visit Website</a>
          )}
        </div>

        {work.spimage && work.spimage.length > 0 && (
          <div className="mt-8 p-4 bg-gray-900 rounded-lg">
            <h4 className="text-white text-lg font-semibold mb-4">スマートフォン表示</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {work.spimage.map((image, index) => (
                <div key={index} className="relative aspect-[9/16] md:aspect-[3/4] lg:aspect-[9/16]">
                  <Image
                    src={image.url}
                    alt={`Smartphone view ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        </div>
    </div>
  )
}
