const CLARITY_PROJECT = 'zg72bqtm6r'
const LIVE_HOST = 'mattssstuart.github.io'
const CONSENT_KEY = 'analytics-consent'

export type Consent = 'granted' | 'denied'

type ClarityQueue = ((...args: unknown[]) => void) & { q?: unknown[][] }

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string | number>) => void }
    clarity?: ClarityQueue
  }
}

export function readConsent(): Consent | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

export function saveConsent(consent: Consent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, consent)
  } catch {
    // Storage can be blocked, the choice then only lasts for this visit
  }
}

// Clarity only runs on the live site and only after the visitor agrees
export function loadClarity() {
  if (window.location.hostname !== LIVE_HOST || window.clarity) return

  const clarity: ClarityQueue = (...args: unknown[]) => {
    clarity.q = clarity.q ?? []
    clarity.q.push(args)
  }
  window.clarity = clarity

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT}`
  document.head.appendChild(script)
}

export function trackEvent(event: string) {
  window.umami?.track(event)
}
