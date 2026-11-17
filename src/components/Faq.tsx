import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQS } from '../lib/content'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="relative bg-white px-3 py-20 sm:px-5 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="eyebrow mb-4">Frequently Asked Questions</p>
          <h2 className="font-display text-3xl leading-tight text-charcoal sm:text-4xl">
            Questions You Might Have.
          </h2>
        </div>

        <div className="flex flex-col divide-y divide-charcoal/10 border-y border-charcoal/10">
          {FAQS.map((item, i) => (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-display text-base text-charcoal sm:text-lg">{item.q}</span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-terracotta transition-transform duration-300 ${
                    open === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  open === i ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <p className="overflow-hidden text-sm leading-relaxed text-body">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
