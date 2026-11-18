import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Quote, Star } from 'lucide-react'
import { TESTIMONIALS } from '../data/testimonials'
import { PROPERTIES } from '../data/properties'

gsap.registerPlugin(ScrollTrigger)

const signature = PROPERTIES.find((p) => p.slug === 'kjr-signature')

export function Testimonials() {
  const ref = useRef<HTMLElement>(null)

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
  }, [])

  return (
    <section ref={ref} className="relative bg-stone px-3 py-20 sm:px-5 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="testimonial-reveal mx-auto mb-14 max-w-2xl text-center">
          <p className="eyebrow mb-4">Resident Reviews</p>
          <h2 className="font-display text-3xl leading-tight text-charcoal sm:text-5xl">
            What Our Residents Say
          </h2>
          {signature?.googleRating && (
            <p className="mt-4 flex items-center justify-center gap-1.5 text-sm font-semibold text-charcoal">
              <Star className="h-4 w-4 fill-terracotta text-terracotta" />
              {signature.googleRating.score} rating on Google · {signature.googleRating.count}+ reviews
            </p>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="testimonial-reveal flex flex-col rounded-[22px] border border-charcoal/8 bg-white p-6 shadow-[0_15px_45px_rgba(43,42,40,0.05)]"
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

        <p className="testimonial-reveal mt-10 text-center text-xs text-muted">
          Reviews sourced from the KJR Signature PG for Men Google Business listing.
        </p>
      </div>
    </section>
  )
}
