import { useEffect, useState } from 'react'
import { CalendarCheck } from 'lucide-react'
import { scrollToAppointmentForm } from '../lib/config'

export function ScheduleVisitButton() {
  const [avoid, setAvoid] = useState(false)

  useEffect(() => {
    const target = document.getElementById('schedule-visit')
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => setAvoid(entry.isIntersecting),
      { rootMargin: '0px 0px -80px 0px', threshold: 0.05 },
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <button
      type="button"
      onClick={scrollToAppointmentForm}
      aria-label="Schedule a visit"
      aria-hidden={avoid}
      tabIndex={avoid ? -1 : 0}
      className={`fixed right-0 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-2 rounded-l-2xl border border-r-0 border-charcoal/10 bg-white px-2.5 py-4 text-charcoal shadow-lg transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-terracotta hover:text-white ${
        avoid ? 'pointer-events-none translate-x-20 opacity-0' : 'pointer-events-auto translate-x-0 opacity-100'
      }`}
    >
      <span className="[writing-mode:vertical-rl] text-xs font-semibold tracking-wide">Schedule a Visit</span>
      <CalendarCheck className="h-4 w-4" />
    </button>
  )
}
