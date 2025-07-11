'use client'

import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ImageModalProps {
  imageUrl: string | null
  onOpenChange: (open: boolean) => void
}

export const ImageModal = ({ imageUrl, onOpenChange }: ImageModalProps) => (
  <Dialog open={!!imageUrl} onOpenChange={onOpenChange}>
    <DialogContent className="!w-[95vw] !max-w-none h-screen flex flex-col bg-black mx-auto">
      <DialogHeader>
        <DialogTitle className="text-white">Image Viewer</DialogTitle>
      </DialogHeader>
      {imageUrl && (
        <div className="flex-1 relative w-full h-full">
          <Image
            src={imageUrl}
            alt="Enlarged image"
            fill
            className="object-contain"
          />
        </div>
      )}
    </DialogContent>
  </Dialog>
)
