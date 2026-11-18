import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { TESTIMONIALS } from '../data/testimonials'
import { PROPERTIES } from '../data/properties'

gsap.registerPlugin(ScrollTrigger)

const TABS: { slug: 'kjr-elite' | 'kjr-signature'; label: string }[] = [
  { slug: 'kjr-elite', label: 'KJR Elite' },
  { slug: 'kjr-signature', label: 'KJR Signature' },
]

export function Testimonials() {
  const ref = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<'kjr-elite' | 'kjr-signature'>('kjr-elite')

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('[data-card]')
    const amount = card ? card.offsetWidth + 24 : track.clientWidth * 0.8
    track.scrollBy({ left: amount * direction, behavior: 'smooth' })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-reveal', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [activeTab])

  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0 })
  }, [activeTab])

  const activeProperty = PROPERTIES.find((p) => p.slug === activeTab)
  const reviews = TESTIMONIALS.filter((t) => t.propertySlug === activeTab)

  return (
    <section ref={ref} className="relative bg-stone px-3 py-20 sm:px-5 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="testimonial-reveal mx-auto mb-10 max-w-2xl text-center">
          <p className="eyebrow mb-4">Resident Reviews</p>
          <h2 className="font-display text-3xl leading-tight text-charcoal sm:text-5xl">
            What Our Residents Say
          </h2>
        </div>

        <div className="testimonial-reveal mb-10 flex items-center justify-center gap-3">
          {TABS.map((tab) => (
            <button
              key={tab.slug}
              type="button"
              onClick={() => setActiveTab(tab.slug)}
              className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                activeTab === tab.slug
                  ? 'border-terracotta bg-terracotta text-white'
                  : 'border-charcoal/15 text-charcoal hover:border-terracotta hover:text-terracotta'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeProperty?.googleRating && (
          <p className="testimonial-reveal mb-10 flex items-center justify-center gap-1.5 text-sm font-semibold text-charcoal">
            <Star className="h-4 w-4 fill-terracotta text-terracotta" />
            {activeProperty.googleRating.score} rating on Google · {activeProperty.googleRating.count}+ reviews
          </p>
        )}

        <div className="testimonial-reveal relative">
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          >
            {reviews.map((t) => (
              <div
                key={t.name}
                data-card
                className="flex w-[85%] flex-shrink-0 snap-start flex-col rounded-[22px] border border-charcoal/8 bg-white p-6 shadow-[0_15px_45px_rgba(43,42,40,0.05)] sm:w-[46%] lg:w-[31%]"
              >
                <Quote className="h-6 w-6 text-terracotta/40" />
                <p className="mt-3 flex-1 text-sm leading-relaxed text-body">{t.quote}</p>
                <div className="mt-5 flex items-center justify-between border-t border-charcoal/8 pt-4">
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{t.name}</p>
                    <p className="text-xs text-muted">{t.reviewCount}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-terracotta text-terracotta" />
                      ))}
                    </div>
                    <p className="mt-1 text-xs text-muted">{t.timeAgo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous reviews"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors duration-300 hover:border-terracotta hover:text-terracotta"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next reviews"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors duration-300 hover:border-terracotta hover:text-terracotta"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <p className="testimonial-reveal mt-10 text-center text-xs text-muted">
          Reviews sourced from each property's Google Business listing.
        </p>
      </div>
    </section>
  )
}
