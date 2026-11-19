import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useLocation, useOutlet } from 'react-router'
import type { Location } from 'react-router'
import { chapterFor } from '../content/site.ts'
import ChapterFooter from './ChapterFooter.tsx'
import ChapterOpener from './ChapterOpener.tsx'
import RunningHead from './RunningHead.tsx'
import './Chapter.css'

// Keep in step with the fade times in Chapter.css
const LEAVE_MS = 450
const MOVE_MS = 1100

type Shown = {
  location: Location
  outlet: ReactNode
  arrived: boolean
}

type Leaving = {
  path: string
  label: string
  outlet: ReactNode
}

export type FlipRef = (key: string) => (element: HTMLElement | null) => void

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function labelFor(pathname: string) {
  const chapter = chapterFor(pathname)
  return chapter ? `Chapter ${chapter.numeral.replace('.', '')}` : 'Missing page'
}

function measure(targets: Map<string, HTMLElement>) {
  const rects = new Map<string, DOMRect>()
  targets.forEach((element, key) => rects.set(key, element.getBoundingClientRect()))
  return rects
}

function ChapterLayout() {
  const location = useLocation()
  const outlet = useOutlet()
  const [shown, setShown] = useState<Shown>({ location, outlet, arrived: false })
  const [leaving, setLeaving] = useState<Leaving | null>(null)
  const flipTargets = useRef(new Map<string, HTMLElement>())
  const before = useRef<Map<string, DOMRect> | null>(null)

  // Swap chapters straight away and let the old one fade out on top
  if (location.key !== shown.location.key) {
    const samePage = location.pathname === shown.location.pathname
    if (samePage || prefersReducedMotion()) {
      setShown({ location, outlet, arrived: false })
      if (!samePage) setLeaving(null)
    } else {
      setLeaving({
        path: shown.location.pathname,
        label: labelFor(shown.location.pathname),
        outlet: shown.outlet,
      })
      setShown({ location, outlet, arrived: true })
    }
  }

  useEffect(() => {
    if (!leaving) return
    const timer = window.setTimeout(() => setLeaving(null), LEAVE_MS)
    return () => window.clearTimeout(timer)
  }, [leaving])

  // Note where the titles sit before the browser back and forward buttons change page
  useEffect(() => {
    const snapshot = () => {
      before.current = measure(flipTargets.current)
    }
    window.addEventListener('popstate', snapshot)
    return () => window.removeEventListener('popstate', snapshot)
  }, [])

  // Slide each title from where it was to where it now sits
  useLayoutEffect(() => {
    const previous = before.current
    before.current = null
    window.scrollTo(0, 0)
    if (!previous || prefersReducedMotion()) return

    flipTargets.current.forEach((element, key) => {
      const from = previous.get(key)
      const to = element.getBoundingClientRect()
      if (!from || !to.height) return

      const dx = from.left - to.left
      const dy = from.top - to.top
      const scale = from.height / to.height
      element.animate(
        [{ transform: `translate(${dx}px, ${dy}px) scale(${scale})` }, { transform: 'none' }],
        { duration: MOVE_MS, easing: 'cubic-bezier(0.33, 0, 0.2, 1)' },
      )
    })
  }, [shown.location.pathname])

  const flipRef: FlipRef = (key) => (element) => {
    if (element) flipTargets.current.set(key, element)
    else flipTargets.current.delete(key)
  }

  const path = shown.location.pathname
  const chapter = chapterFor(path)

  return (
    <div
      className="chapter"
      onClickCapture={() => {
        before.current = measure(flipTargets.current)
      }}
    >
      <RunningHead current={chapter?.to} flipRef={flipRef} />
      <main className="chapter-body">
        <ChapterOpener
          key={`opener:${path}`}
          label={labelFor(path)}
          leavingLabel={leaving?.label}
          title={chapter ? chapter.title : 'Page not found'}
          titleRef={chapter ? flipRef(`chapter:${chapter.to}`) : undefined}
          arriving={shown.arrived}
        />
        <div className="chapter-stack">
          {leaving ? (
            <div key={`leaving:${leaving.path}`} className="chapter-leave" aria-hidden="true" inert>
              {leaving.outlet}
            </div>
          ) : null}
          <div key={`content:${path}`} className={shown.arrived ? 'chapter-arrive' : undefined}>
            {outlet}
          </div>
        </div>
      </main>
      <ChapterFooter folio={chapter?.page} />
    </div>
  )
}

export default ChapterLayout
