import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import {
  BedDouble,
  CalendarCheck,
  ClipboardCheck,
  LayoutGrid,
  MessageCircle,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'
import { WHY_CHOOSE } from '../lib/content'

gsap.registerPlugin(ScrollTrigger)

const ICONS: Record<string, LucideIcon> = {
  LayoutGrid,
  BedDouble,
  CalendarCheck,
  UsersRound,
  MessageCircle,
  ClipboardCheck,
}

export function WhyChoose() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.why-reveal', {
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
        <div className="why-reveal mx-auto mb-14 max-w-2xl text-center">
          <p className="eyebrow mb-4">Why Choose KJR Co-Living</p>
          <h2 className="font-display text-3xl leading-tight text-charcoal sm:text-5xl">
            More Than a Place to Stay. A Space to Feel Comfortable.
          </h2>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE.map(({ icon, title, body }) => {
            const Icon = ICONS[icon]
            return (
              <div key={title} className="why-reveal flex items-start gap-4">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-terracotta/12 text-terracotta">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-lg text-charcoal">{title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-body">{body}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
