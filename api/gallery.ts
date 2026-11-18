import type { VercelRequest, VercelResponse } from '@vercel/node'
import { del, list, put } from '@vercel/blob'
import { verifyToken } from './_lib/auth'

const PROPERTIES = ['kjr-elite', 'kjr-signature', 'kjr-platinum'] as const
type Property = (typeof PROPERTIES)[number]

function isProperty(value: unknown): value is Property {
  return typeof value === 'string' && (PROPERTIES as readonly string[]).includes(value)
}

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const property = req.query.property
    if (!isProperty(property)) {
      res.status(400).json({ error: 'Invalid or missing property' })
      return
    }

    const { blobs } = await list({ prefix: `admin-gallery/${property}/` })
    const items = blobs.map((b) => {
      const parts = b.pathname.split('/')
      const category = parts[2] ?? 'general'
      const type = /\.(mp4|mov|webm)$/i.test(b.pathname) ? 'video' : 'image'
      return { id: b.pathname, url: b.url, category, type, propertySlug: property }
    })
    res.status(200).json({ items })
    return
  }

  if (req.method === 'POST') {
    if (!verifyToken(req.headers.authorization)) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const { property, category, filename, contentType, data } = (req.body ?? {}) as {
      property?: string
      category?: string
      filename?: string
      contentType?: string
      data?: string
    }

    if (!isProperty(property) || !category || !filename || !data) {
      res.status(400).json({ error: 'Missing required fields' })
      return
    }

    const buffer = Buffer.from(data, 'base64')
    if (buffer.length > MAX_UPLOAD_BYTES) {
      res.status(413).json({ error: 'File too large — max 8MB per upload' })
      return
    }

    const safeCategory = category.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase()
    const safeName = filename.replace(/[^a-zA-Z0-9.\-_]/g, '_')
    const pathname = `admin-gallery/${property}/${safeCategory}/${Date.now()}-${safeName}`

    const blob = await put(pathname, buffer, {
      access: 'public',
      contentType: contentType || undefined,
      addRandomSuffix: false,
    })

    res.status(200).json({
      item: {
        id: blob.pathname,
        url: blob.url,
        category: safeCategory,
        type: contentType?.startsWith('video') ? 'video' : 'image',
        propertySlug: property,
      },
    })
    return
  }

  if (req.method === 'DELETE') {
    if (!verifyToken(req.headers.authorization)) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const { url } = (req.body ?? {}) as { url?: string }
    if (!url) {
      res.status(400).json({ error: 'Missing url' })
      return
    }

    await del(url)
    res.status(200).json({ ok: true })
    return
  }

  res.status(405).json({ error: 'Method not allowed' })
}
