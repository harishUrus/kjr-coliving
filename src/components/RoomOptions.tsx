import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { User, Users, UsersRound } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Illustrative sharing categories only — exact availability per property is
// confirmed directly by the KJR team during enquiry, per the spec's rule
// against showing unverified occupancy/pricing.
const CATEGORIES = [
  { icon: User, label: 'Single Sharing', body: 'A private room for residents who prefer their own space.' },
  { icon: Users, label: 'Two Sharing', body: 'A shared room for two residents, balancing comfort and cost.' },
  { icon: UsersRound, label: 'Three Sharing', body: 'A shared room for three residents at a more economical rate.' },
]

export function RoomOptions() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.room-reveal', {
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
    <section ref={ref} className="relative bg-white px-3 py-20 sm:px-5 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="room-reveal mx-auto mb-14 max-w-2xl text-center">
          <p className="eyebrow mb-4">Room Options</p>
          <h2 className="font-display text-3xl leading-tight text-charcoal sm:text-5xl">
            Sharing Options to Fit Your Needs.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-body sm:text-lg">
            Illustrative sharing categories available across KJR Co-Living properties. Our team
            will confirm which categories are available at each property during your enquiry.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {CATEGORIES.map(({ icon: Icon, label, body }) => (
            <div
              key={label}
              className="room-reveal rounded-2xl border border-charcoal/8 bg-stone p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-terracotta/12 text-terracotta">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-4 font-display text-lg text-charcoal">{label}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-body">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
