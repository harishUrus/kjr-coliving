import { useMemo, useState } from 'react'
import { GALLERY, type GalleryMedia } from '../data/gallery'

export type AdminMediaItem = GalleryMedia & { id: string }

let idCounter = 0
function nextId() {
  idCounter += 1
  return `seed-${idCounter}`
}

const SEED: AdminMediaItem[] = GALLERY.map((m) => ({ ...m, id: nextId() }))

/**
 * In-memory only (resets on page refresh) — there is no backend yet to
 * persist uploads/deletes across visitors or sessions. This exists so the
 * Owner can exercise the full upload/delete workflow and UI today; swap the
 * add/remove functions here for real S3 presigned-upload + API calls once
 * AWS is connected. The public site's gallery is NOT wired to this store,
 * since changes here cannot be made visible to other visitors without a
 * real backend.
 */
export function useAdminGallery() {
  const [items, setItems] = useState<AdminMediaItem[]>(SEED)

  const byProperty = useMemo(() => {
    const map: Record<string, AdminMediaItem[]> = { 'kjr-elite': [], 'kjr-signature': [], 'kjr-platinum': [] }
    for (const item of items) map[item.propertySlug]?.push(item)
    return map
  }, [items])

  function addFiles(propertySlug: AdminMediaItem['propertySlug'], files: FileList | File[]) {
    const newItems: AdminMediaItem[] = Array.from(files).map((file) => ({
      id: nextId(),
      src: URL.createObjectURL(file),
      type: file.type.startsWith('video') ? 'video' : 'image',
      propertySlug,
    }))
    setItems((prev) => [...prev, ...newItems])
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  return { byProperty, addFiles, removeItem }
}
