import { useState } from 'react'
import type { FormEvent } from 'react'
import { trackEvent } from '../analytics.ts'
import { contactFormKey } from '../content/site.ts'
import './Contact.css'

type Status = 'idle' | 'sending' | 'sent' | 'error'

function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const subject = String(data.get('subject') ?? '').trim()

    setStatus('sending')
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: contactFormKey,
          from_name: 'Portfolio contact form',
          subject: subject ? `Portfolio: ${subject}` : 'Portfolio: new message',
          name: data.get('name'),
          email: data.get('email'),
          topic: subject,
          message: data.get('message'),
          botcheck: data.get('botcheck') === 'on',
        }),
      })
      const result = (await response.json()) as { success?: boolean }
      if (!result.success) throw new Error('Form service rejected the message')
      form.reset()
      setStatus('sent')
      trackEvent('Contact form sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="contact">
      {status === 'sent' ? (
        <div className="contact-sent" role="status">
          <h2 className="contact-heading">Thank you</h2>
          <p>Your message is on its way. I'll be in touch soon.</p>
          <button type="button" className="contact-again ink-underline" onClick={() => setStatus('idle')}>
            Send another message
          </button>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-row">
            <div className="contact-field">
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="name" type="text" autoComplete="name" required />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required />
            </div>
          </div>
          <div className="contact-field">
            <label htmlFor="contact-subject">Subject</label>
            <input id="contact-subject" name="subject" type="text" />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="message" rows={7} required />
          </div>
          {/* Hidden from people, catches spam bots */}
          <input
            className="contact-trap"
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <div className="contact-actions">
            <button type="submit" className="contact-submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            {status === 'error' ? (
              <p className="contact-error" role="alert">
                Something went wrong sending your message. Please try again in a moment.
              </p>
            ) : null}
          </div>
        </form>
      )}
    </div>
  )
}

export default Contact
