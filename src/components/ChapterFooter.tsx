import { footnotes } from '../content/site.ts'

function ChapterFooter({ folio }: { folio?: number }) {
  return (
    <footer className="chapter-footer">
      <div className="footnotes-rule" aria-hidden="true" />
      <div className="chapter-footer-row">
        <ol className="chapter-footnotes">
          {footnotes.map((footnote, index) => (
            <li key={footnote.id}>
              <span className="footnote-number">{index + 1}</span>
              <a
                className="ink-underline"
                href={footnote.href}
                data-umami-event={footnote.event}
                target="_blank"
                rel="noopener noreferrer"
              >
                {footnote.label}
              </a>
              {footnote.note}
            </li>
          ))}
        </ol>
        {folio ? <span className="folio">{folio}</span> : null}
      </div>
    </footer>
  )
}

export default ChapterFooter
