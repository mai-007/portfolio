'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PdfModalProps {
  pdfUrl: string | null
  onOpenChange: (open: boolean) => void
}

export const PdfModal = ({ pdfUrl, onOpenChange }: PdfModalProps) => (
  <Dialog open={!!pdfUrl} onOpenChange={onOpenChange}>
    <DialogContent className="w-[90vw] h-[90vh] max-w-none sm:max-w-none p-0" showCloseButton={false}>
      {pdfUrl && (
        <div className="flex-1 w-full h-full">
          <iframe src={pdfUrl} className="w-full h-full border-0 rounded-lg" title="PDF Viewer" />
        </div>
      )}
    </DialogContent>
  </Dialog>
)