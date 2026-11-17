import { ArrowRight, MessageCircle } from 'lucide-react'
import { scrollToAppointmentForm, scrollToSection, WHATSAPP_LINK } from '../lib/config'

export function FinalCta() {
  return (
    <section className="relative overflow-hidden px-3 py-24 sm:px-5 lg:py-32">
      <div className="absolute inset-0">
        <img src="/gallery/room-3.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-charcoal/75" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl leading-tight text-white sm:text-5xl">
          Your Next Stay Starts Here.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
          Explore KJR Co-Living properties, discover accommodation options, and connect with our
          team to schedule a visit.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollToSection('properties')}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
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
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  )
}
