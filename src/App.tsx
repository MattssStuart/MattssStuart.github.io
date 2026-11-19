import BookTransition from './components/BookTransition.tsx'
import ConsentNotice from './components/ConsentNotice.tsx'
import PaperGrain from './components/PaperGrain.tsx'
import SiteRoutes from './SiteRoutes.tsx'

function App() {
  return (
    <>
      <PaperGrain />
      <BookTransition renderPage={(location) => <SiteRoutes location={location} />} />
      <ConsentNotice />
    </>
  )
}

export default App
