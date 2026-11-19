export type ModuleResult = {
  name: string
  subtitle?: string
  mark?: string
  note?: string
  distinction?: boolean
  emphasis?: boolean
}

export type ResultTable = {
  heading: string
  rows: ModuleResult[]
}

export type EducationView = {
  label: string
  tables: ResultTable[]
}

export type EducationEntry = {
  stage: string
  dates: string
  title: string
  place: string
  notes: string[]
  views: EducationView[]
}

const distinction = (name: string, mark: string, subtitle?: string): ModuleResult => ({
  name,
  mark,
  subtitle,
  note: 'distinction',
  distinction: true,
})

const inProgress = (name: string, subtitle?: string): ModuleResult => ({
  name,
  subtitle,
  note: 'in progress',
})

export const honoursAverage = '90.5%'

export const education: EducationEntry[] = [
  {
    stage: 'Postgraduate',
    dates: '2026, current',
    title: 'BScHons Computer Science',
    place: 'Stellenbosch University',
    notes: [
      'Honours thesis on migrating the Stellenbosch University yearbook from Microsoft Word to Typst, supervised by Steve Kroon.',
    ],
    views: [
      {
        label: 'Honours',
        tables: [
          {
            heading: 'Honours modules, 2026',
            rows: [
              distinction('Vulnerability Detection and Discovery 716', '96%'),
              distinction('Digital Image Processing 793', '95%'),
              distinction('Artificial Intelligence 791', '91%'),
              distinction('Software Verification and Analysis 796', '80%'),
              inProgress('Machine Learning 741'),
              inProgress('Computer Vision 792'),
              inProgress('Project in Computer Science 771', 'Honours thesis'),
              { name: 'Average to date', mark: honoursAverage, emphasis: true },
            ],
          },
        ],
      },
    ],
  },
  {
    stage: 'Undergraduate',
    dates: '2023 – 2025',
    title: 'BSc Computer Science',
    place: 'Stellenbosch University',
    notes: ['Focal area in General Computer Science. Degree awarded on 9 December 2025.'],
    views: [
      {
        label: 'First year',
        tables: [
          {
            heading: 'First year modules, 2023',
            rows: [
              { name: 'Economics 114', subtitle: 'Introductory Microeconomics' },
              { name: 'Economics 144', subtitle: 'Introductory Macroeconomics' },
              { name: 'Data Science 141', subtitle: 'Introduction to Data Science' },
              { name: 'Computer Science 114', subtitle: 'Introductory Computer Science' },
              { name: 'Computer Science 144', subtitle: 'Introductory Computer Science' },
              { name: 'Mathematics 114', subtitle: 'Calculus' },
              { name: 'Mathematics 144', subtitle: 'Calculus and Linear Algebra' },
              {
                name: 'Probability Theory and Statistics 114',
                subtitle: 'Introduction to Probability Theory and Statistics',
              },
              { name: 'Science in Context 178', subtitle: 'Academic Literacy' },
            ],
          },
        ],
      },
      {
        label: 'Second year',
        tables: [
          {
            heading: 'Second year modules, 2024',
            rows: [
              { name: 'Economics 214', subtitle: 'Intermediate Microeconomics and Macroeconomics' },
              { name: 'Economics 244', subtitle: 'International Trade and Finance' },
              { name: 'Computer Science 214', subtitle: 'Data Structures and Algorithms' },
              { name: 'Computer Science 244', subtitle: 'Computer Architecture' },
              { name: 'Music Technology 222', subtitle: 'Acoustics and Sound Synthesis' },
              { name: 'Music Technology 252', subtitle: 'Audio Signal Processing and Programming' },
              { name: 'Operations Research 214', subtitle: 'Network Optimisation' },
              { name: 'Operations Research 244', subtitle: 'Linear Programming' },
            ],
          },
        ],
      },
      {
        label: 'Third year',
        tables: [
          {
            heading: 'Third year modules, 2025',
            rows: [
              { name: 'Economics 318', subtitle: 'Macroeconomics, Econometrics and Game Theory' },
              { name: 'Computer Science 313', subtitle: 'Computer Networks' },
              { name: 'Computer Science 314', subtitle: 'Concurrency' },
              { name: 'Computer Science 343', subtitle: 'Databases and Web Centric Programming' },
              { name: 'Computer Science 344', subtitle: 'Program Design' },
              { name: 'Operations Research 314', subtitle: 'Combinatorial Optimisation' },
              {
                name: 'Operations Research 322',
                subtitle: 'Stochastic Methods of Operations Research',
              },
              { name: 'Operations Research 344', subtitle: 'Optimisation' },
              { name: 'Operations Research 352', subtitle: 'Decision Modelling' },
            ],
          },
        ],
      },
      {
        label: 'Distinctions',
        tables: [
          {
            heading: 'Distinctions, 2023 – 2025',
            rows: [
              distinction('Computer Science 343', '86%', 'Databases and Web Centric Programming'),
              distinction('Music Technology 222', '79%', 'Acoustics and Sound Synthesis'),
              distinction('Computer Science 313', '77%', 'Computer Networks'),
              distinction('Economics 244', '77%', 'International Trade and Finance'),
              distinction('Computer Science 344', '76%', 'Program Design'),
            ],
          },
        ],
      },
    ],
  },
  {
    stage: 'Matric',
    dates: '2018 – 2022',
    title: 'Cambridge IGCSE and AS/A-Level',
    place: 'Ashton International College, Ballito',
    notes: ['Awarded Academic Colours in 2020 and 2021, and graduated with Academic Honours.'],
    views: [
      {
        label: 'AS and A-Level',
        tables: [
          {
            heading: 'A-Level, 2022',
            rows: [
              { name: 'Business Studies', mark: '90%', note: 'A*' },
              { name: 'Accounting', mark: '88%', note: 'A' },
              { name: 'Computer Science', mark: '83%', note: 'A' },
            ],
          },
          {
            heading: 'AS-Level',
            rows: [
              { name: 'Mathematics', mark: '85%', note: 'A' },
              { name: 'English Language & Literature', mark: '77%', note: 'B' },
            ],
          },
        ],
      },
      {
        label: 'IGCSE',
        tables: [
          {
            heading: 'IGCSE, November 2020',
            rows: [
              { name: 'Computer Science', mark: '96%', note: 'A*' },
              { name: 'Accounting', mark: '93%', note: 'A*' },
              { name: 'First Language English', mark: '90%', note: 'A*' },
              { name: 'Business Studies', mark: '89%', note: 'A' },
              { name: 'Mathematics', mark: '76%', note: 'B' },
              { name: 'Afrikaans as a Second Language', mark: '75%', note: 'B' },
            ],
          },
        ],
      },
    ],
  },
]
