import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router'
import type { Location } from 'react-router'
import { isHome, normalizePath, pageOrder } from '../content/site.ts'
import './BookTransition.css'

// Keep in step with the transition time in BookTransition.css
const TURN_MS = 1300

type Turn = {
  from: Location
  to: Location
  forward: boolean
  scrollY: number
}

type BookTransitionProps = {
  renderPage: (location: Location) => ReactNode
}

function pageIndex(pathname: string) {
  const index = pageOrder.indexOf(normalizePath(pathname))
  return index === -1 ? pageOrder.length : index
}

function BookTransition({ renderPage }: BookTransitionProps) {
  const location = useLocation()
  const [seen, setSeen] = useState(location)
  const [shown, setShown] = useState(location)
  const [turn, setTurn] = useState<Turn | null>(null)
  const [turning, setTurning] = useState(false)

  // Turn the page only when moving to or from the home page
  if (location.key !== seen.key) {
    setSeen(location)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const involvesHome = isHome(location.pathname) || isHome(shown.pathname)

    if (location.pathname === shown.pathname || reduceMotion || !involvesHome) {
      setShown(location)
      setTurn(null)
    } else {
      setTurning(false)
      setTurn({
        from: shown,
        to: location,
        forward: pageIndex(location.pathname) > pageIndex(shown.pathname),
        scrollY: window.scrollY,
      })
    }
  }

  // Start at the top after leaving or arriving at the home page
  const lastPath = useRef(shown.pathname)
  useEffect(() => {
    const previous = lastPath.current
    lastPath.current = shown.pathname
    if (previous !== shown.pathname && (isHome(previous) || isHome(shown.pathname))) {
      window.scrollTo(0, 0)
    }
  }, [shown.pathname])

  // Let the first frame paint flat, then turn the page and settle on the new one
  useEffect(() => {
    if (!turn) return

    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => setTurning(true))
    })
    const timer = window.setTimeout(() => {
      setShown(turn.to)
      setTurn(null)
      setTurning(false)
    }, TURN_MS + 50)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
    }
  }, [turn])

  if (!turn) return <>{renderPage(shown)}</>

  const page = (pageLocation: Location, offset: number) => (
    <div className="book-page" style={{ transform: `translateY(${-offset}px)` }}>
      {renderPage(pageLocation)}
    </div>
  )

  const classes = ['book', turn.forward ? 'book-forward' : 'book-back']
  if (turning) classes.push('is-turning')

  return (
    <div className={classes.join(' ')}>
      <div className="book-layer book-under">
        {page(turn.to, 0)}
        <div className="book-shade" />
      </div>
      <div className="book-layer book-stay">
        {page(turn.from, turn.scrollY)}
        <div className="book-shade" />
      </div>
      <div className="book-layer book-leaf book-leaf-back" aria-hidden="true">
        {page(turn.to, 0)}
        <div className="book-shade" />
      </div>
      <div className="book-layer book-leaf book-leaf-front" aria-hidden="true">
        {page(turn.from, turn.scrollY)}
        <div className="book-shade" />
      </div>
    </div>
  )
}

export default BookTransition
