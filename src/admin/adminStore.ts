import { useCallback, useEffect, useState } from 'react'
import { deleteGalleryItem, fetchGalleryItems, uploadGalleryItem, type AdminApiItem } from '../lib/adminApi'

export type PropertySlug = 'kjr-elite' | 'kjr-signature' | 'kjr-platinum'

const PROPERTIES: PropertySlug[] = ['kjr-elite', 'kjr-signature', 'kjr-platinum']

/**
 * Backed by Vercel Blob storage via /api/gallery. Uploads and deletes made
 * here persist for real and are fetched by the public site's Properties
 * section, so they are visible to every visitor — not just this browser tab.
 * Swap this for the AWS S3 + RDS/Cognito equivalent when that's ready; the
 * admin UI and public-site merge logic can stay the same shape.
 */
export function useAdminGallery(token: string) {
  const [byProperty, setByProperty] = useState<Record<PropertySlug, AdminApiItem[]>>({
    'kjr-elite': [],
    'kjr-signature': [],
    'kjr-platinum': [],
  })
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    const entries = await Promise.all(
      PROPERTIES.map(async (slug) => [slug, await fetchGalleryItems(slug).catch(() => [])] as const),
    )
    setByProperty(Object.fromEntries(entries) as Record<PropertySlug, AdminApiItem[]>)
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  async function addFiles(propertySlug: PropertySlug, category: string, files: FileList | File[]) {
    for (const file of Array.from(files)) {
      const item = await uploadGalleryItem(token, propertySlug, category, file)
      setByProperty((prev) => ({ ...prev, [propertySlug]: [...prev[propertySlug], item] }))
    }
  }

  async function removeItem(propertySlug: PropertySlug, item: AdminApiItem) {
    await deleteGalleryItem(token, item.url)
    setByProperty((prev) => ({
      ...prev,
      [propertySlug]: prev[propertySlug].filter((i) => i.id !== item.id),
    }))
  }

  return { byProperty, loading, addFiles, removeItem, refresh }
}
