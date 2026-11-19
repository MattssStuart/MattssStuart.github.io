export type ChapterLink = {
  numeral: string
  title: string
  to: string
  page: number
}

export type Footnote = {
  id: string
  href: string
  label: string
  note: string
}

export const chapters: ChapterLink[] = [
  { numeral: 'I.', title: 'Education', to: '/education', page: 1 },
  { numeral: 'II.', title: 'Projects', to: '/projects', page: 2 },
  { numeral: 'III.', title: 'Contact', to: '/contact', page: 3 },
]

// Order of pages in the book, used to decide which way a page turns
export const pageOrder = ['/', ...chapters.map((chapter) => chapter.to)]

export function normalizePath(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
}

export function isHome(pathname: string) {
  return normalizePath(pathname) === '/'
}

export function chapterFor(pathname: string) {
  return chapters.find((chapter) => chapter.to === normalizePath(pathname))
}

export const footnotes: Footnote[] = [
  {
    id: 'fn1',
    href: `${import.meta.env.BASE_URL}cv.pdf`,
    label: 'Curriculum vitae',
    note: ', available as a PDF.',
  },
  {
    id: 'fn2',
    href: 'https://github.com/MattssStuart',
    label: 'github.com/MattssStuart',
    note: '',
  },
  {
    id: 'fn3',
    href: 'https://www.linkedin.com/in/matthew-stuart-4b3b29424',
    label: 'linkedin.com/in/matthew-stuart-4b3b29424',
    note: '',
  },
]
