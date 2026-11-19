import { Route, Routes } from 'react-router'
import type { Location } from 'react-router'
import ChapterLayout from './components/ChapterLayout.tsx'
import Contact from './pages/Contact.tsx'
import Education from './pages/Education.tsx'
import Home from './pages/Home.tsx'
import NotFound from './pages/NotFound.tsx'
import Projects from './pages/Projects.tsx'

function SiteRoutes({ location }: { location: Location }) {
  return (
    <Routes location={location}>
      <Route index element={<Home />} />
      <Route element={<ChapterLayout />}>
        <Route path="education" element={<Education />} />
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default SiteRoutes
