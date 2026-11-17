import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { scrollToAppointmentForm, scrollToSection, WHATSAPP_LINK } from '../lib/config'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.1,
      })
      gsap.from('.hero-image', {
        opacity: 0,
        scale: 1.04,
        duration: 1.3,
        ease: 'power2.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="top" ref={ref} className="relative overflow-hidden bg-cream px-3 pb-10 pt-28 sm:px-5 sm:pt-32 lg:pb-16">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="hero-reveal eyebrow mb-5">Your Space. Your Comfort. Your Lifestyle.</p>
          <h1 className="hero-reveal font-display text-4xl leading-[1.08] text-charcoal sm:text-5xl lg:text-[3.4rem]">
            Find Your Space.
            <br />
            Feel at Home.
          </h1>
          <p className="hero-reveal mt-5 font-display text-lg italic text-terracotta sm:text-xl">
            &ldquo;Where comfort is luxury.&rdquo;
          </p>
          <p className="hero-reveal mt-4 max-w-lg text-base leading-relaxed text-body sm:text-lg">
            Discover comfortable PG and co-living spaces designed for convenient everyday living.
            Explore our properties, discover room options, and schedule a visit with the KJR team.
          </p>

          <div className="hero-reveal mt-9 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToSection('properties')}
              className="inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Explore Properties
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={scrollToAppointmentForm}
              className="inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Schedule a Visit
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 px-6 py-3.5 text-sm font-semibold text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:border-terracotta hover:text-terracotta"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
          </div>
        </div>

        <div className="hero-image relative mx-auto aspect-[9/16] w-full max-w-xs overflow-hidden rounded-[28px] shadow-[0_30px_80px_rgba(43,42,40,0.18)] sm:max-w-sm lg:max-w-none lg:aspect-[4/5]">
          <video
            ref={videoRef}
            src="/gallery/videos/montage.mp4"
            poster="/gallery/hero-poster.jpg"
            autoPlay={!prefersReducedMotion}
            muted
            loop={!prefersReducedMotion}
            controls={prefersReducedMotion}
            playsInline
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
