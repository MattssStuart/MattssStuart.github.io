import { Link } from 'react-router'

function NotFound() {
  return (
    <p className="chapter-subtitle">
      This page isn't in the book. <Link to="/">Back to the home page</Link>.
    </p>
  )
}

export default NotFound
