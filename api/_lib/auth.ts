import crypto from 'node:crypto'

export function makeToken(username: string) {
  const secret = process.env.ADMIN_SESSION_SECRET ?? ''
  return crypto.createHmac('sha256', secret).update(username).digest('hex')
}

export function verifyToken(authHeader: string | string[] | undefined): boolean {
  const header = Array.isArray(authHeader) ? authHeader[0] : authHeader
  if (!header?.startsWith('Bearer ')) return false
  const token = header.slice('Bearer '.length)

  const username = process.env.ADMIN_USERNAME ?? ''
  const secret = process.env.ADMIN_SESSION_SECRET ?? ''
  if (!username || !secret) return false

  const expected = makeToken(username)
  const tokenBuf = Buffer.from(token)
  const expectedBuf = Buffer.from(expected)
  if (tokenBuf.length !== expectedBuf.length) return false
  return crypto.timingSafeEqual(tokenBuf, expectedBuf)
}
