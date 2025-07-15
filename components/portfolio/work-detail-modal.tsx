'use client'

import { Work } from "@/lib/api"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { WorkDetail } from "./work-detail"

interface WorkDetailModalProps {
  work: Work | null
  onClose: () => void
}

export const WorkDetailModal = ({ work, onClose }: WorkDetailModalProps) => {
  if (!work) {
    return null
  }

  return (
    <Dialog open={!!work} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] h-[90vh] max-w-none sm:max-w-none flex flex-col p-14 round-3xl">
        <DialogHeader>
          <DialogTitle>{work.title}</DialogTitle>
        </DialogHeader>
        <WorkDetail work={work} />
      </DialogContent>
    </Dialog>
  )
}
