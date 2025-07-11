'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PdfModalProps {
  pdfUrl: string | null
  onOpenChange: (open: boolean) => void
}

export const PdfModal = ({ pdfUrl, onOpenChange }: PdfModalProps) => (
  <Dialog open={!!pdfUrl} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-4xl w-full h-[80vh]">
      <DialogHeader>
        <DialogTitle>PDF Viewer</DialogTitle>
      </DialogHeader>
      {pdfUrl && (
        <div className="flex-1 w-full h-full">
          <iframe src={pdfUrl} className="w-full h-full border-0 rounded-lg" title="PDF Viewer" />
        </div>
      )}
    </DialogContent>
  </Dialog>
)
