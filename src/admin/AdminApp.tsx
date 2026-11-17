import { useState } from 'react'
import { Images, LogOut, Video } from 'lucide-react'
import { PROPERTIES } from '../data/properties'
import { Logo } from '../components/Logo'
import { AdminLogin } from './AdminLogin'
import { AdminGalleryManager } from './AdminGalleryManager'
import { useAdminGallery } from './adminStore'

export function AdminApp() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('kjr_admin_authed') === '1')
  const [activeProperty, setActiveProperty] = useState<
    'kjr-elite' | 'kjr-signature' | 'kjr-platinum' | null
  >(null)
  const { byProperty, addFiles, removeItem } = useAdminGallery()

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="flex items-center justify-between border-b border-charcoal/10 bg-white px-5 py-4">
        <Logo />
        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem('kjr_admin_authed')
            setAuthed(false)
          }}
          className="flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-terracotta"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-6">
        <div className="rounded-xl border border-terracotta/30 bg-terracotta/8 px-4 py-3 text-xs text-charcoal">
          <strong>Preview mode:</strong> uploads and deletes here are local to this browser tab and
          reset on refresh — this is not yet connected to real storage (AWS S3 + RDS). The public
          website is not affected by changes made here.
        </div>
      </div>

      {activeProperty ? (
        <AdminGalleryManager
          propertySlug={activeProperty}
          items={byProperty[activeProperty]}
          onAddFiles={(files) => addFiles(activeProperty, files)}
          onRemove={removeItem}
          onBack={() => setActiveProperty(null)}
        />
      ) : (
        <div className="mx-auto max-w-5xl px-5 pb-16">
          <h1 className="font-display text-2xl text-charcoal">Manage Property Galleries</h1>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {PROPERTIES.map((property) => {
              const items = byProperty[property.slug]
              const photoCount = items.filter((i) => i.type === 'image').length
              const videoCount = items.filter((i) => i.type === 'video').length
              return (
                <div key={property.slug} className="overflow-hidden rounded-2xl border border-charcoal/10 bg-white">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={property.heroImage} alt={property.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-5">
                    <p className="font-display text-lg text-charcoal">{property.name}</p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <Images className="h-3.5 w-3.5" />
                        {photoCount} photos
                      </span>
                      <span className="flex items-center gap-1">
                        <Video className="h-3.5 w-3.5" />
                        {videoCount} videos
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveProperty(property.slug)}
                      className="mt-4 w-full rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-white"
                    >
                      Manage Gallery
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
