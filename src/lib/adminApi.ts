export type AdminApiItem = {
  id: string
  url: string
  category: string
  type: 'image' | 'video'
  propertySlug: 'kjr-elite' | 'kjr-signature' | 'kjr-platinum'
}

export async function adminLogin(username: string, password: string): Promise<string> {
  const res = await fetch('/api/admin-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) throw new Error('Invalid username or password')
  const data = (await res.json()) as { token: string }
  return data.token
}

export async function fetchGalleryItems(propertySlug: string): Promise<AdminApiItem[]> {
  const res = await fetch(`/api/gallery?property=${encodeURIComponent(propertySlug)}`)
  if (!res.ok) throw new Error('Failed to load gallery')
  const data = (await res.json()) as { items: AdminApiItem[] }
  return data.items
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '')
    reader.onerror = () => reject(new Error('Could not read file'))
    reader.readAsDataURL(file)
  })
}

export async function uploadGalleryItem(
  token: string,
  propertySlug: string,
  category: string,
  file: File,
): Promise<AdminApiItem> {
  const data = await fileToBase64(file)
  const res = await fetch('/api/gallery', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ property: propertySlug, category, filename: file.name, contentType: file.type, data }),
  })
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string }
    throw new Error(err.error ?? 'Upload failed')
  }
  const result = (await res.json()) as { item: AdminApiItem }
  return result.item
}

export async function deleteGalleryItem(token: string, url: string): Promise<void> {
  const res = await fetch('/api/gallery', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ url }),
  })
  if (!res.ok) throw new Error('Delete failed')
}
