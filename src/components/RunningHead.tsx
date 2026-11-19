import { Link } from 'react-router'
import { chapters } from '../content/site.ts'
import type { FlipRef } from './ChapterLayout.tsx'

type RunningHeadProps = {
  current?: string
  flipRef: FlipRef
}

function RunningHead({ current, flipRef }: RunningHeadProps) {
  return (
    <nav className="running-head" aria-label="Contents">
      <Link ref={flipRef('home')} className="ink-underline flip" to="/">
        Home
      </Link>
      {chapters
        .filter((chapter) => chapter.to !== current)
        .map((chapter) => (
          <Link
            key={chapter.to}
            ref={flipRef(`chapter:${chapter.to}`)}
            className="ink-underline flip"
            to={chapter.to}
          >
            {chapter.numeral} {chapter.title}
          </Link>
        ))}
    </nav>
  )
}

export default RunningHead
