import { useRef } from 'react'
import { ArrowRight, X } from 'lucide-react'
import type { PhotoTour } from '../data/photoTour'
import { scrollToAppointmentForm } from '../lib/config'

type Props = {
  tour: PhotoTour
  propertyName: string
  onClose: () => void
}

export function PhotoTourModal({ tour, propertyName, onClose }: Props) {
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const scrollToCategory = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-cream">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-charcoal/10 bg-cream/95 px-5 py-4 backdrop-blur-sm">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photo tour"
          className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-charcoal/5"
        >
          <X className="h-5 w-5" />
        </button>
        <p className="font-display text-base text-charcoal">{propertyName} — Photo Tour</p>
        <div className="w-10" />
      </div>

      <div className="mx-auto max-w-4xl px-5 py-8">
        <h2 className="font-display text-2xl text-charcoal sm:text-3xl">Photo tour</h2>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {tour.categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => scrollToCategory(cat.id)}
              className="group text-left"
            >
              <div className="aspect-square overflow-hidden rounded-xl border border-charcoal/10">
                <img
                  src={cat.thumbnail}
                  alt={cat.label}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="mt-2 text-sm font-semibold text-charcoal">{cat.label}</p>
            </button>
          ))}
        </div>

        {tour.categories.map((cat) => (
          <div
            key={cat.id}
            ref={(el) => {
              sectionRefs.current[cat.id] = el
            }}
            className="mt-14 scroll-mt-20"
          >
            <h3 className="font-display text-xl text-charcoal sm:text-2xl">{cat.label}</h3>
            <div className="relative mt-5 flex flex-col gap-4">
              {cat.items.map((item) => (
                <div key={item.src} className="overflow-hidden rounded-2xl">
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      poster={item.poster}
                      controls
                      muted
                      playsInline
                      className="w-full object-cover"
                    />
                  ) : (
                    <img src={item.src} alt={cat.label} className="w-full object-cover" />
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={scrollToAppointmentForm}
                className="sticky bottom-6 left-1/2 flex w-fit -translate-x-1/2 items-center gap-2 self-center rounded-full bg-terracotta px-6 py-3.5 text-sm font-semibold text-white shadow-[0_15px_40px_rgba(200,112,63,0.4)] transition-all duration-300 hover:-translate-y-0.5"
              >
                Schedule a Visit
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
