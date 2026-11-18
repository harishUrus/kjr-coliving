import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { CircleCheck, MapPin, Sofa, Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const HIGHLIGHTS = [
  'Live comfortably, but keep your own private space.',
  'Fully furnished, move-in-ready rooms across every property.',
  'Talk directly to the KJR team — no brokers, no middlemen.',
]

const GLANCE = [
  { icon: Sofa, label: '3 Properties', sub: 'Elite · Signature · Platinum' },
  { icon: MapPin, label: 'Chennai', sub: 'Co-living, built for the city' },
  { icon: Users, label: 'Flexible Sharing', sub: 'Options for every budget' },
]

export function About() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
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

  return (
    <section id="about" ref={ref} className="relative bg-white px-3 py-20 sm:px-5 lg:py-28">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="about-reveal order-2 grid grid-cols-2 gap-4 lg:order-1">
          <div className="aspect-[3/4] overflow-hidden rounded-3xl">
            <img src="/gallery/room-2.jpg" alt="Shared room at KJR Co-Living" className="h-full w-full object-cover" />
          </div>
          <div className="mt-8 aspect-[3/4] overflow-hidden rounded-3xl">
            <img src="/gallery/room-4.jpg" alt="Window view at KJR Co-Living" className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="about-reveal eyebrow mb-4">About KJR Co-Living</p>
          <h2 className="about-reveal font-display text-3xl leading-tight text-charcoal sm:text-4xl">
            A Better Way to Experience Everyday Living.
          </h2>
          <p className="about-reveal mt-6 text-base leading-relaxed text-body sm:text-lg">
            KJR Co-Living offers PG accommodation options designed to make everyday living more
            convenient and comfortable. We help individuals explore suitable accommodation,
            understand available room options, and connect with our team to arrange a property
            visit.
          </p>
          <p className="about-reveal mt-4 text-base leading-relaxed text-body sm:text-lg">
            Whether you are looking for a room with sharing options or want to explore the
            facilities available at our properties, our team helps you understand the available
            choices and find an accommodation option that suits your requirements.
          </p>

          <ul className="about-reveal mt-7 flex flex-col gap-3">
            {HIGHLIGHTS.map((text) => (
              <li key={text} className="flex items-start gap-2.5 text-sm text-body sm:text-base">
                <CircleCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-terracotta" />
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <div className="about-reveal mt-8 grid grid-cols-1 gap-4 border-t border-charcoal/10 pt-7 sm:grid-cols-3">
            {GLANCE.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-terracotta/12 text-terracotta">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="font-display text-base text-charcoal">{label}</p>
                  <p className="text-xs text-muted">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
