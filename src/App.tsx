import BookTransition from './components/BookTransition.tsx'
import PaperGrain from './components/PaperGrain.tsx'
import SiteRoutes from './SiteRoutes.tsx'

function App() {
  return (
    <>
      <PaperGrain />
      <BookTransition renderPage={(location) => <SiteRoutes location={location} />} />
    </>
  )
}

export default App
