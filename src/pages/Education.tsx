import { useState } from 'react'
import { education } from '../content/education.ts'
import type { EducationEntry, ResultTable } from '../content/education.ts'
import './Education.css'

type SwitchProps = {
  label: string
  options: string[]
  selected: number
  onSelect: (index: number) => void
  large?: boolean
}

function Switch({ label, options, selected, onSelect, large }: SwitchProps) {
  return (
    <div className={large ? 'education-switch is-large' : 'education-switch'} role="group" aria-label={label}>
      {options.map((option, index) => (
        <button
          key={option}
          type="button"
          className="ink-underline"
          aria-pressed={index === selected}
          data-umami-event={`Education: ${option}`}
          onClick={() => onSelect(index)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

function Results({ table }: { table: ResultTable }) {
  // Tables without marks read as a simple index of codes and titles
  const isIndex = table.rows.every((row) => !row.mark && !row.note)

  if (isIndex) {
    return (
      <div className="result-table is-index">
        <h3 className="result-heading">{table.heading}</h3>
        <ul className="result-rows index-rows">
          {table.rows.map((row) => (
            <li key={row.name} className="index-row">
              <span className="index-code">
                {row.name}
                {row.subtitle ? <span className="result-leader" aria-hidden="true" /> : null}
              </span>
              <span className="index-title">{row.subtitle}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="result-table">
      <h3 className="result-heading">{table.heading}</h3>
      <ul className="result-rows">
        {table.rows.map((row) => (
          <li key={row.name} className={row.emphasis ? 'result-row is-emphasis' : 'result-row'}>
            <span>
              {row.name}
              {row.subtitle ? <span className="result-subtitle">{row.subtitle}</span> : null}
            </span>
            <span className="result-leader" aria-hidden="true" />
            <span className="result-mark">{row.mark}</span>
            <span
              className={[
                'result-note',
                row.distinction ? 'is-distinction' : '',
                row.note && row.note.length <= 2 ? 'is-grade' : '',
              ].join(' ')}
            >
              {row.note}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Entry({ entry }: { entry: EducationEntry }) {
  const [viewIndex, setViewIndex] = useState(0)
  const view = entry.views[viewIndex]

  return (
    <section className="education-entry">
      <div className="education-dates">{entry.dates}</div>
      <div className="education-detail">
        <h2 className="education-title">{entry.title}</h2>
        <p className="education-place">{entry.place}</p>
        {entry.notes.map((note) => (
          <p key={note} className="education-note">
            {note}
          </p>
        ))}
        {entry.views.length > 1 ? (
          <Switch
            label={`${entry.stage} results`}
            options={entry.views.map((option) => option.label)}
            selected={viewIndex}
            onSelect={setViewIndex}
          />
        ) : null}
        <div key={view.label} className="result-tables education-fade">
          {view.tables.map((table) => (
            <Results key={table.heading} table={table} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Education() {
  const [stageIndex, setStageIndex] = useState(0)
  const entry = education[stageIndex]

  return (
    <>
      <Switch
        label="Stage of study"
        options={education.map((option) => option.stage)}
        selected={stageIndex}
        onSelect={setStageIndex}
        large
      />
      <div key={entry.stage} className="education-fade">
        <Entry entry={entry} />
      </div>
    </>
  )
}

export default Education
