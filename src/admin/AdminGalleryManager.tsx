import { useRef, useState } from 'react'
import { ArrowLeft, Play, Trash2, UploadCloud } from 'lucide-react'
import { PROPERTIES } from '../data/properties'
import type { AdminMediaItem } from './adminStore'

type Props = {
  propertySlug: 'kjr-elite' | 'kjr-signature' | 'kjr-platinum'
  items: AdminMediaItem[]
  onAddFiles: (files: FileList | File[]) => void
  onRemove: (id: string) => void
  onBack: () => void
}

export function AdminGalleryManager({ propertySlug, items, onAddFiles, onRemove, onBack }: Props) {
  const property = PROPERTIES.find((p) => p.slug === propertySlug)!
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const [pendingDelete, setPendingDelete] = useState<string | null>(null)

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <button type="button" onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-terracotta">
        <ArrowLeft className="h-4 w-4" />
        All Properties
      </button>

      <h1 className="mt-4 font-display text-2xl text-charcoal">{property.name} — Gallery</h1>
      <p className="mt-1 text-sm text-muted">{items.length} items</p>

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          if (e.dataTransfer.files.length) onAddFiles(e.dataTransfer.files)
        }}
        className={`mt-6 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
          dragOver ? 'border-terracotta bg-terracotta/5' : 'border-charcoal/15'
        }`}
      >
        <UploadCloud className="h-7 w-7 text-terracotta" />
        <p className="text-sm text-body">Drag and drop photos or videos here, or</p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-full bg-terracotta px-5 py-2 text-sm font-semibold text-white"
        >
          Choose Files
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) onAddFiles(e.target.files)
            e.target.value = ''
          }}
        />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="group relative aspect-square overflow-hidden rounded-xl border border-charcoal/10 bg-stone">
            {item.type === 'video' ? (
              <>
                <video src={item.src} muted className="h-full w-full object-cover" />
                <span className="absolute inset-0 flex items-center justify-center bg-charcoal/15">
                  <Play className="h-5 w-5 text-white" fill="currentColor" />
                </span>
              </>
            ) : (
              <img src={item.src} alt="" className="h-full w-full object-cover" />
            )}

            <button
              type="button"
              onClick={() => setPendingDelete(item.id)}
              aria-label="Delete"
              className="absolute right-1.5 top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-600 opacity-0 shadow transition-opacity group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="col-span-full text-sm text-muted">No photos or videos yet.</p>}
      </div>

      {pendingDelete && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/60 p-5" onClick={() => setPendingDelete(null)}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center" onClick={(e) => e.stopPropagation()}>
            <p className="font-display text-lg text-charcoal">Delete this item?</p>
            <p className="mt-1 text-sm text-muted">This cannot be undone.</p>
            <div className="mt-5 flex justify-center gap-3">
              <button type="button" onClick={() => setPendingDelete(null)} className="rounded-full border border-charcoal/15 px-5 py-2 text-sm font-semibold text-charcoal">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onRemove(pendingDelete)
                  setPendingDelete(null)
                }}
                className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
