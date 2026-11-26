import type { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer from 'nodemailer'

type VisitRequestBody = {
  name?: string
  phone?: string
  email?: string
  property?: string
  roomCategory?: string
  visitDate?: string
  visitTime?: string
  moveIn?: string
  requirements?: string
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const body = (req.body ?? {}) as VisitRequestBody
  const { name, phone, email, property, roomCategory, visitDate, visitTime, moveIn, requirements } = body

  if (!name || !phone || !property || !visitDate || !visitTime) {
    res.status(400).json({ error: 'Missing required fields' })
    return
  }

  const gmailUser = process.env.GMAIL_USER
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD
  const notificationEmail = process.env.NOTIFICATION_EMAIL

  if (!gmailUser || !gmailAppPassword || !notificationEmail) {
    res.status(500).json({ error: 'Email is not configured on the server' })
    return
  }

  const rows: [string, string | undefined][] = [
    ['Visitor Name', name],
    ['Mobile Number', phone],
    ['Email', email],
    ['Selected Property', property],
    ['Room Category', roomCategory],
    ['Preferred Visit Date', visitDate],
    ['Preferred Time Slot', visitTime],
    ['Expected Move-in Date', moveIn],
    ['Additional Requirements', requirements],
  ]

  const textLines = rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`)
  const htmlRows = rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#5c5750;font-weight:600;">${escapeHtml(k)}</td><td style="padding:6px 12px;color:#2b2a28;">${escapeHtml(String(v))}</td></tr>`,
    )
    .join('')

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: gmailUser, pass: gmailAppPassword },
  })

  try {
    await transporter.sendMail({
      from: `KJR Co-Living Website <${gmailUser}>`,
      to: notificationEmail,
      replyTo: email || undefined,
      subject: `New Property Visit Request — ${property}`,
      text: textLines.join('\n'),
      html: `<table style="border-collapse:collapse;font-family:sans-serif;">${htmlRows}</table>`,
    })
    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('submit-visit email error', err)
    res.status(502).json({ error: 'Failed to send email' })
  }
}
