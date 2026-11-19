import { useEffect, useState } from 'react'
import { loadClarity, readConsent, saveConsent } from '../analytics.ts'
import type { Consent } from '../analytics.ts'
import './ConsentNotice.css'

function ConsentNotice() {
  const [consent, setConsent] = useState(readConsent)

  useEffect(() => {
    if (consent === 'granted') loadClarity()
  }, [consent])

  if (consent) return null

  const choose = (choice: Consent) => {
    saveConsent(choice)
    setConsent(choice)
  }

  return (
    <aside className="consent" aria-label="Cookie notice">
      <p className="consent-text">
        <span className="consent-mark">*</span>
        This site uses cookies to understand how visitors use it and to improve it.
      </p>
      <div className="consent-actions">
        <button type="button" className="ink-underline" onClick={() => choose('granted')}>
          Accept
        </button>
        <button type="button" className="ink-underline" onClick={() => choose('denied')}>
          Decline
        </button>
      </div>
    </aside>
  )
}

export default ConsentNotice
