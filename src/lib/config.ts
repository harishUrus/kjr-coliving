// WhatsApp business number (digits only, country code, no + or spaces).
export const WHATSAPP_NUMBER = '919500081331'

export const WHATSAPP_MESSAGE =
  "Hi KJR Co-Living, I'm interested in exploring your PG accommodation options. Could you please share more details?"

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

export const PHONE_NUMBER = '+91 95000 81331'
export const PHONE_LINK = 'tel:+919500081331'

// Appointment/visit-request notifications go here until the real AWS
// Lambda + SES backend is provisioned. Swap this for the verified business
// address before go-live.
export const NOTIFICATION_EMAIL = 'info@kjrcoliving.com'

export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  const w = window as unknown as { __lenis?: { scrollTo: (target: Element, opts?: object) => void } }
  if (w.__lenis) {
    w.__lenis.scrollTo(el, { offset: -24, duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function scrollToAppointmentForm() {
  scrollToSection('schedule-visit')
  window.setTimeout(() => {
    const el = document.getElementById('schedule-visit')
    el?.classList.add('estimate-form-focus')
    window.setTimeout(() => el?.classList.remove('estimate-form-focus'), 1600)
  }, 700)
}
