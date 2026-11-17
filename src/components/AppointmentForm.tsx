import { useState } from 'react'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { PROPERTIES } from '../data/properties'
import { NOTIFICATION_EMAIL } from '../lib/config'

const TIME_SLOTS = ['10:00 AM – 12:00 PM', '12:00 PM – 2:00 PM', '2:00 PM – 4:00 PM', '4:00 PM – 6:00 PM']
const ROOM_CATEGORIES = ['Single Sharing', 'Two Sharing', 'Three Sharing']

export function AppointmentForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>

    // Interim "mail directly" submission while the AWS Lambda + SES
    // appointment backend is not yet provisioned — opens the visitor's mail
    // client with the request pre-filled to NOTIFICATION_EMAIL. Swap this
    // for a fetch() to the real appointment API once it exists; the form UX
    // does not need to change.
    const lines = [
      `Visitor Name: ${data.name}`,
      `Mobile Number: ${data.phone}`,
      data.email ? `Email: ${data.email}` : null,
      `Selected Property: ${data.property}`,
      data.roomCategory ? `Room Category: ${data.roomCategory}` : null,
      `Preferred Visit Date: ${data.visitDate}`,
      `Preferred Time Slot: ${data.visitTime}`,
      data.moveIn ? `Expected Move-in Date: ${data.moveIn}` : null,
      data.requirements ? `Additional Requirements: ${data.requirements}` : null,
    ].filter(Boolean)

    const subject = encodeURIComponent('New Property Visit Request | KJR Co-Living')
    const body = encodeURIComponent(lines.join('\n'))
    window.location.href = `mailto:${NOTIFICATION_EMAIL}?subject=${subject}&body=${body}`

    setSubmitted(true)
  }

  return (
    <section id="schedule-visit" className="relative bg-charcoal px-3 py-20 sm:px-5 lg:py-28">
      <div className="mx-auto grid max-w-[1440px] items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow mb-4">Schedule a Visit</p>
          <h2 className="font-display text-3xl leading-tight text-white sm:text-5xl">
            Let&rsquo;s Find the Right Space for You.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
            Interested in exploring one of our properties? Schedule a visit and our team will get
            in touch with you.
          </p>
        </div>

        <div className="rounded-[28px] bg-cream p-6 shadow-[0_30px_80px_rgba(0,0,0,0.3)] sm:p-8">
          {submitted ? (
            <div className="py-10 text-center">
              <ShieldCheck className="mx-auto h-10 w-10 text-terracotta" />
              <h3 className="mt-4 font-display text-2xl text-charcoal">
                Your Visit Request Has Been Submitted!
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body">
                Thank you for your interest in KJR Co-Living. Our team will contact you to confirm
                your preferred property visit.
              </p>
              <p className="mt-2 text-xs text-muted">
                Your request does not automatically reserve a room.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Field label="Full Name">
                <input required type="text" name="name" autoComplete="name" placeholder="Your name" className="estimate-input" />
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Mobile Number">
                  <input
                    required
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="estimate-input"
                  />
                </Field>
                <Field label="Email (optional)">
                  <input type="email" name="email" autoComplete="email" placeholder="you@example.com" className="estimate-input" />
                </Field>
              </div>

              <Field label="Selected Property">
                <select required name="property" defaultValue="" className="estimate-input">
                  <option value="" disabled>
                    Choose a property
                  </option>
                  {PROPERTIES.map((p) => (
                    <option key={p.slug} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Preferred Visit Date">
                  <input required type="date" name="visitDate" className="estimate-input" />
                </Field>
                <Field label="Preferred Time Slot">
                  <select required name="visitTime" defaultValue="" className="estimate-input">
                    <option value="" disabled>
                      Select a slot
                    </option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Room Category (optional)">
                  <select name="roomCategory" defaultValue="" className="estimate-input">
                    <option value="">No preference</option>
                    {ROOM_CATEGORIES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Expected Move-in Date (optional)">
                  <input type="date" name="moveIn" className="estimate-input" />
                </Field>
              </div>

              <Field label="Additional Requirements (optional)">
                <textarea name="requirements" rows={3} placeholder="Anything else we should know?" className="estimate-input resize-none" />
              </Field>

              <button
                type="submit"
                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-terracotta px-6 py-4 text-sm font-semibold tracking-wide text-white transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-lg"
              >
                Submit Visit Request
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted">
                <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0" />
                Submitting this form does not reserve a room.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">{label}</span>
      {children}
    </label>
  )
}
