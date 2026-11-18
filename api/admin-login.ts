import type { VercelRequest, VercelResponse } from '@vercel/node'
import { makeToken } from './_lib/auth'

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { username, password } = (req.body ?? {}) as { username?: string; password?: string }
  const expectedUser = process.env.ADMIN_USERNAME
  const expectedPass = process.env.ADMIN_PASSWORD

  if (!expectedUser || !expectedPass || username !== expectedUser || password !== expectedPass) {
    res.status(401).json({ error: 'Invalid username or password' })
    return
  }

  res.status(200).json({ token: makeToken(expectedUser) })
}
