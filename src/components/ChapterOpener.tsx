type ChapterOpenerProps = {
  label: string
  leavingLabel?: string
  title: string
  titleRef?: (element: HTMLElement | null) => void
  arriving: boolean
}

function ChapterOpener({ label, leavingLabel, title, titleRef, arriving }: ChapterOpenerProps) {
  return (
    <header className="chapter-opener">
      <div className="chapter-stack">
        {leavingLabel ? (
          <div className="chapter-label chapter-leave" aria-hidden="true">
            {leavingLabel}
          </div>
        ) : null}
        <div className={arriving ? 'chapter-label chapter-arrive' : 'chapter-label'}>{label}</div>
      </div>
      <h1 ref={titleRef} className="chapter-title flip">
        {title}
      </h1>
    </header>
  )
}

export default ChapterOpener
