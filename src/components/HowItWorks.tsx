import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { HOW_IT_WORKS } from '../lib/content'
import { scrollToAppointmentForm } from '../lib/config'

gsap.registerPlugin(ScrollTrigger)

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.how-reveal', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative bg-stone px-3 py-20 sm:px-5 lg:py-28">
      <div className="mx-auto max-w-5xl text-center">
        <p className="how-reveal eyebrow mb-4">How It Works</p>
        <h2 className="how-reveal font-display text-3xl leading-tight text-charcoal sm:text-5xl">
          From Your First Enquiry to Your Visit.
        </h2>

        <div className="mt-14 grid gap-8 text-left sm:grid-cols-3">
          {HOW_IT_WORKS.map((step) => (
            <div key={step.number} className="how-reveal">
              <p className="font-display text-4xl text-terracotta">{step.number}</p>
              <p className="mt-3 font-display text-xl text-charcoal">{step.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-body">{step.body}</p>
            </div>
          ))}
        </div>

        <p className="how-reveal mt-10 text-sm text-muted">
          Submitting a visit request does not reserve a room.
        </p>

        <button
          type="button"
          onClick={scrollToAppointmentForm}
          className="how-reveal mt-6 inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        >
          Start Your Enquiry
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  )
}
