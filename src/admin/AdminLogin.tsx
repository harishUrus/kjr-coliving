import { useState } from 'react'
import { Lock } from 'lucide-react'

// Interim single-owner gate while Cognito is not yet connected. Set
// VITE_ADMIN_USERNAME / VITE_ADMIN_PASSWORD in a local .env file (never
// commit it) — this is NOT secure authentication (the check runs in the
// browser), so treat this dashboard as low-sensitivity until it is backed
// by real Cognito auth.
const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME as string | undefined
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined

export function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (ADMIN_USERNAME && ADMIN_PASSWORD && username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem('kjr_admin_authed', '1')
      onSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-[24px] bg-cream p-8 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/12 text-terracotta">
            <Lock className="h-5 w-5" />
          </span>
          <h1 className="mt-4 font-display text-xl text-charcoal">Owner Sign In</h1>
          <p className="mt-1 text-sm text-muted">KJR Co-Living gallery dashboard</p>
        </div>

        <label className="mt-7 flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">Username</span>
          <input
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
              setError(false)
            }}
            autoFocus
            className="estimate-input"
          />
        </label>

        <label className="mt-4 flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError(false)
            }}
            className="estimate-input"
          />
        </label>

        {error && <p className="mt-3 text-sm text-red-600">Incorrect username or password.</p>}
        {(!ADMIN_USERNAME || !ADMIN_PASSWORD) && (
          <p className="mt-3 text-xs text-red-600">
            VITE_ADMIN_USERNAME / VITE_ADMIN_PASSWORD are not configured for this build.
          </p>
        )}

        <button
          type="submit"
          className="mt-6 w-full rounded-2xl bg-terracotta px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}
