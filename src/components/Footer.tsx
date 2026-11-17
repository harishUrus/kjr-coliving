import { MessageCircle } from 'lucide-react'
import { NAV_LINKS, CONTACT } from '../lib/content'
import { PHONE_LINK, PHONE_NUMBER, WHATSAPP_LINK } from '../lib/config'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="relative border-t border-charcoal/10 bg-white px-3 py-16 sm:px-5">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 sm:flex-row sm:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            PG accommodation and co-living spaces in {CONTACT.location}.
          </p>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">Quick Links</p>
          <ul className="flex flex-col gap-2.5 text-sm text-body">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-terracotta">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">Contact</p>
          <ul className="flex flex-col gap-2.5 text-sm text-body">
            <li>
              <a href={PHONE_LINK} className="hover:text-terracotta">
                {PHONE_NUMBER}
              </a>
            </li>
            <li>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-terracotta">
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp
              </a>
            </li>
            <li>{CONTACT.location}</li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">Legal</p>
          <ul className="flex flex-col gap-2.5 text-sm text-body">
            <li>
              <a href="/privacy.html" className="hover:text-terracotta">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms.html" className="hover:text-terracotta">
                Terms and Conditions
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1440px] flex-col gap-2 border-t border-charcoal/10 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} KJR Co-Living. All rights reserved.</p>
        <a href="/admin" className="text-muted/70 hover:text-terracotta">
          Admin Login
        </a>
      </div>
    </footer>
  )
}
