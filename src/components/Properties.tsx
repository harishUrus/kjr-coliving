import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ArrowRight, Images, MapPin, MessageCircle, Star } from 'lucide-react'
import { PROPERTIES } from '../data/properties'
import { GALLERY } from '../data/gallery'
import { getPhotoTour } from '../data/photoTour'
import { scrollToAppointmentForm, WHATSAPP_NUMBER } from '../lib/config'
import { PropertyGalleryModal } from './PropertyGalleryModal'
import { PhotoTourModal } from './PhotoTourModal'

gsap.registerPlugin(ScrollTrigger)

export function Properties() {
  const ref = useRef<HTMLElement>(null)
  const [openGallery, setOpenGallery] = useState<string | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.property-reveal', {
        opacity: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const activeMedia = openGallery ? GALLERY.filter((m) => m.propertySlug === openGallery) : []
  const activeTour = openGallery
    ? getPhotoTour(openGallery as 'kjr-elite' | 'kjr-signature' | 'kjr-platinum')
    : null
  const activeProperty = PROPERTIES.find((p) => p.slug === openGallery)

  return (
    <section id="properties" ref={ref} className="relative bg-cream px-3 py-20 sm:px-5 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="property-reveal mx-auto mb-14 max-w-2xl text-center">
          <p className="eyebrow mb-4">Our Properties</p>
          <h2 className="font-display text-3xl leading-tight text-charcoal sm:text-5xl">
            Explore Our Living Spaces
          </h2>
          <p className="mt-4 text-base leading-relaxed text-body sm:text-lg">
            Find an accommodation option that fits your lifestyle. Explore our properties and
            discover the spaces available at KJR Co-Living.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          {PROPERTIES.map((property) => (
            <div
              key={property.slug}
              className="property-reveal flex flex-col overflow-hidden rounded-[28px] border border-charcoal/8 bg-white shadow-[0_20px_60px_rgba(43,42,40,0.06)] transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {property.heroVideo ? (
                  <video
                    src={property.heroVideo}
                    poster={property.heroImage}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={property.heroImage}
                    alt={property.name}
                    loading="lazy"
                    className={`h-full w-full object-cover ${property.comingSoon ? 'grayscale-[35%]' : ''}`}
                  />
                )}
                {property.comingSoon && (
                  <span className="absolute left-4 top-4 rounded-full bg-charcoal px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow">
                    Coming Soon
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl text-charcoal">{property.name}</h3>
                <p className="mt-1 text-sm font-medium text-terracotta">{property.tagline}</p>

                {(property.location || property.googleRating) && (
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                    {property.googleRating && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-charcoal">
                        <Star className="h-3.5 w-3.5 fill-terracotta text-terracotta" />
                        {property.googleRating.score} ({property.googleRating.count} Google reviews)
                      </span>
                    )}
                    {property.location && property.mapLink && (
                      <a
                        href={property.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-muted underline-offset-2 hover:text-terracotta hover:underline"
                      >
                        <MapPin className="h-3.5 w-3.5 text-terracotta" />
                        {property.location}
                      </a>
                    )}
                  </div>
                )}

                <p className="mt-3 flex-1 text-sm leading-relaxed text-body">
                  {property.description}
                  {property.comingSoon && ' Opening soon — reach out to be notified first.'}
                </p>

                <div className="mt-6 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => setOpenGallery(property.slug)}
                    className="flex items-center justify-center gap-2 rounded-full border border-charcoal/15 px-5 py-2.5 text-sm font-semibold text-charcoal transition-colors duration-300 hover:border-terracotta hover:text-terracotta"
                  >
                    <Images className="h-4 w-4" />
                    {getPhotoTour(property.slug) ? 'Photo Tour' : 'View Gallery'}
                  </button>
                  {property.comingSoon ? (
                    <span className="flex items-center justify-center gap-2 rounded-full border border-charcoal/10 bg-stone px-5 py-2.5 text-sm font-semibold text-muted">
                      Visits Open Soon
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={scrollToAppointmentForm}
                      className="flex items-center justify-center gap-2 rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      Schedule a Visit
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      `Hi KJR Co-Living, I'd like to know more about ${property.name}.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-[#1f8d4e] transition-colors duration-300 hover:text-[#176b3b]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Enquiry
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {openGallery && activeTour && activeProperty && (
        <PhotoTourModal tour={activeTour} propertyName={activeProperty.name} onClose={() => setOpenGallery(null)} />
      )}
      {openGallery && !activeTour && (
        <PropertyGalleryModal media={activeMedia} startIndex={0} onClose={() => setOpenGallery(null)} />
      )}
    </section>
  )
}
