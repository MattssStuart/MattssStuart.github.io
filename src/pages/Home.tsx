import { Link } from 'react-router'
import { chapters, footnotes } from '../content/site.ts'
import './Home.css'

function FootnoteRef({ n }: { n: number }) {
  return (
    <a className="footnote-ref" href={`#fn${n}`} aria-label={`Footnote ${n}`}>
      {n}
    </a>
  )
}

function Home() {
  return (
    <div className="home">
      <section className="home-cover" aria-label="Cover">
        <h1 className="home-name">Matthew Stuart</h1>
        <p className="home-tagline">
          BScHons in Computer Science · Stellenbosch University
        </p>
        <p className="home-intro">
          <span className="drop-cap">W</span>elcome. [A FEW SENTENCES ABOUT WHO
          YOU ARE, WHAT YOU STUDY AND WHAT YOU LIKE TO BUILD.] My full record is
          in my curriculum vitae
          <FootnoteRef n={1} />, my code lives on GitHub
          <FootnoteRef n={2} /> and I am always happy to connect on LinkedIn
          <FootnoteRef n={3} />.
        </p>
      </section>

      <section className="home-contents" aria-label="Contents">
        <nav className="contents" aria-label="Contents">
          <h2 className="contents-heading">Contents</h2>
          {chapters.map((entry) => (
            <Link key={entry.to} className="contents-row" to={entry.to}>
              <span className="contents-numeral">{entry.numeral}</span>
              <span className="contents-title ink-underline">{entry.title}</span>
              <span className="contents-leader" aria-hidden="true" />
              <span className="contents-page">{entry.page}</span>
            </Link>
          ))}
        </nav>

        <footer className="footnotes">
          <div className="footnotes-rule" aria-hidden="true" />
          <ol>
            {footnotes.map((footnote, index) => (
              <li key={footnote.id} id={footnote.id}>
                <span className="footnote-number">{index + 1}</span>
                <a
                  className="ink-underline"
                  href={footnote.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {footnote.label}
                </a>
                {footnote.note}
              </li>
            ))}
          </ol>
        </footer>
      </section>
    </div>
  )
}

export default Home
