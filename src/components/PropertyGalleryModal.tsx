import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { GalleryMedia } from '../data/gallery'

type Props = {
  media: GalleryMedia[]
  startIndex: number
  onClose: () => void
}

export function PropertyGalleryModal({ media, startIndex, onClose }: Props) {
  const [index, setIndex] = useState(startIndex)
  const current = media[index]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % media.length)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + media.length) % media.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [media.length, onClose])

  if (!current) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/92 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close gallery"
        onClick={onClose}
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        type="button"
        aria-label="Previous"
        onClick={(e) => {
          e.stopPropagation()
          setIndex((i) => (i - 1 + media.length) % media.length)
        }}
        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={(e) => {
          e.stopPropagation()
          setIndex((i) => (i + 1) % media.length)
        }}
        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {current.type === 'video' ? (
        <video
          key={current.src}
          src={current.src}
          controls
          muted
          playsInline
          className="max-h-[82vh] max-w-full rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <img
          key={current.src}
          src={current.src}
          alt="KJR Co-Living property"
          className="max-h-[82vh] max-w-full rounded-lg object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      )}

      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-medium text-white/70">
        {index + 1} / {media.length}
      </p>
    </div>
  )
}
