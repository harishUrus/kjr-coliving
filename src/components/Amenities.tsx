import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import {
  BatteryCharging,
  Camera,
  Droplet,
  Car,
  ShieldCheck,
  Sofa,
  Sparkles,
  Users,
  UtensilsCrossed,
  WashingMachine,
  Wifi,
  type LucideIcon,
} from 'lucide-react'
import { AMENITIES } from '../lib/content'

gsap.registerPlugin(ScrollTrigger)

const ICONS: Record<string, LucideIcon> = {
  Wifi,
  Sparkles,
  Droplet,
  WashingMachine,
  Camera,
  BatteryCharging,
  Users,
  UtensilsCrossed,
  Car,
  ShieldCheck,
  Sofa,
}

export function Amenities() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.amenity-reveal', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="amenities" ref={ref} className="relative bg-stone px-3 py-20 sm:px-5 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="amenity-reveal mx-auto mb-14 max-w-2xl text-center">
          <p className="eyebrow mb-4">Amenities and Facilities</p>
          <h2 className="font-display text-3xl leading-tight text-charcoal sm:text-5xl">
            Everything You Need, All in One Place.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {AMENITIES.map(({ icon, label }) => {
            const Icon = ICONS[icon]
            return (
              <div
                key={label}
                className="amenity-reveal flex flex-col items-center gap-3 rounded-2xl bg-white px-4 py-6 text-center shadow-[0_8px_24px_rgba(43,42,40,0.05)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-terracotta/12 text-terracotta">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="text-sm font-semibold text-charcoal">{label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
