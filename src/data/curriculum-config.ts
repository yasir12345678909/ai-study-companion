// StudyPilot Pakistan-First Curriculum Configuration
// Derivation Hierarchy: Board -> Class -> Stream -> Subject Combination

export interface SubjectItem {
  id: string
  name: string
  code: string
  isCompulsory: boolean
}

export interface SubjectCombination {
  id: string
  name: string
  description: string
  subjects: SubjectItem[]
}

export interface StreamOption {
  id: string
  name: string
  code: string
  description: string
  combinations: SubjectCombination[]
}

export interface ClassLevel {
  level: number // 9, 10, 11, 12
  name: string
  code: string
  streams: StreamOption[]
}

export interface BoardConfig {
  id: string
  name: string
  shortName: string
  province: string
  classes: ClassLevel[]
}

// Common Compulsory Subjects for Pakistan Curricula
const compulsorySSC: SubjectItem[] = [
  { id: 'eng-ssc', name: 'English Compulsory', code: 'ENG-I', isCompulsory: true },
  { id: 'urdu-ssc', name: 'Urdu Compulsory', code: 'URDU-I', isCompulsory: true },
  { id: 'isl-ssc', name: 'Islamiat / Ethics', code: 'ISL-I', isCompulsory: true },
  { id: 'pst-ssc', name: 'Pakistan Studies', code: 'PST-I', isCompulsory: true },
]

const compulsoryHSSC: SubjectItem[] = [
  { id: 'eng-hssc', name: 'English Compulsory', code: 'ENG-II', isCompulsory: true },
  { id: 'urdu-hssc', name: 'Urdu Compulsory', code: 'URDU-II', isCompulsory: true },
  { id: 'isl-hssc', name: 'Islamic Education / Civics', code: 'ISL-II', isCompulsory: true },
  { id: 'pst-hssc', name: 'Pakistan Studies', code: 'PST-II', isCompulsory: true },
]

// Matriculation Streams (Classes 9 & 10)
const sscStreams: StreamOption[] = [
  {
    id: 'sci-bio',
    name: 'Science (Biology Group)',
    code: 'BIO',
    description: 'Pre-medical pathway covering biological sciences, physics, chemistry and math.',
    combinations: [
      {
        id: 'ssc-bio-std',
        name: 'Standard Science with Biology',
        description: 'Physics, Chemistry, Biology, and Mathematics',
        subjects: [
          ...compulsorySSC,
          { id: 'phy', name: 'Physics', code: 'PHY', isCompulsory: false },
          { id: 'chem', name: 'Chemistry', code: 'CHEM', isCompulsory: false },
          { id: 'bio', name: 'Biology', code: 'BIO', isCompulsory: false },
          { id: 'math', name: 'Mathematics', code: 'MATH', isCompulsory: false },
        ]
      }
    ]
  },
  {
    id: 'sci-cs',
    name: 'Science (Computer Science Group)',
    code: 'CS',
    description: 'Pre-engineering/computing pathway with computer science instead of biology.',
    combinations: [
      {
        id: 'ssc-cs-std',
        name: 'Standard Science with Computer Studies',
        description: 'Physics, Chemistry, Computer Science, and Mathematics',
        subjects: [
          ...compulsorySSC,
          { id: 'phy', name: 'Physics', code: 'PHY', isCompulsory: false },
          { id: 'chem', name: 'Chemistry', code: 'CHEM', isCompulsory: false },
          { id: 'cs', name: 'Computer Science', code: 'CS', isCompulsory: false },
          { id: 'math', name: 'Mathematics', code: 'MATH', isCompulsory: false },
        ]
      }
    ]
  },
  {
    id: 'arts-general',
    name: 'Humanities & General Group',
    code: 'ARTS',
    description: 'General matriculation with general mathematics and elective arts subjects.',
    combinations: [
      {
        id: 'ssc-arts-std',
        name: 'General Group with General Science',
        description: 'General Science, General Math, Education, and Civics',
        subjects: [
          ...compulsorySSC,
          { id: 'gen-sci', name: 'General Science', code: 'G-SCI', isCompulsory: false },
          { id: 'gen-math', name: 'General Mathematics', code: 'G-MATH', isCompulsory: false },
          { id: 'edu', name: 'Education', code: 'EDU', isCompulsory: false },
          { id: 'civ', name: 'Civics', code: 'CIV', isCompulsory: false },
        ]
      }
    ]
  }
]

// Intermediate Streams (Classes 11 & 12 / HSSC / FSc)
const hsscStreams: StreamOption[] = [
  {
    id: 'fsc-pre-med',
    name: 'F.Sc. Pre-Medical',
    code: 'PRE-MED',
    description: 'Specialized for medicine, biotechnology, and health sciences.',
    combinations: [
      {
        id: 'hssc-pre-med-std',
        name: 'Standard Pre-Medical Trio',
        description: 'Physics, Chemistry, and Biology',
        subjects: [
          ...compulsoryHSSC,
          { id: 'phy', name: 'Physics', code: 'PHY', isCompulsory: false },
          { id: 'chem', name: 'Chemistry', code: 'CHEM', isCompulsory: false },
          { id: 'bio', name: 'Biology', code: 'BIO', isCompulsory: false },
        ]
      }
    ]
  },
  {
    id: 'fsc-pre-eng',
    name: 'F.Sc. Pre-Engineering',
    code: 'PRE-ENG',
    description: 'Specialized for engineering, mathematics, architecture, and physical sciences.',
    combinations: [
      {
        id: 'hssc-pre-eng-std',
        name: 'Standard Pre-Engineering Trio',
        description: 'Physics, Chemistry, and Mathematics',
        subjects: [
          ...compulsoryHSSC,
          { id: 'phy', name: 'Physics', code: 'PHY', isCompulsory: false },
          { id: 'chem', name: 'Chemistry', code: 'CHEM', isCompulsory: false },
          { id: 'math', name: 'Mathematics', code: 'MATH', isCompulsory: false },
        ]
      }
    ]
  },
  {
    id: 'ics',
    name: 'I.C.S. (Computer Science)',
    code: 'ICS',
    description: 'Intermediate in Computer Science with multiple board-recognized elective combinations.',
    combinations: [
      {
        id: 'ics-physics',
        name: 'ICS (Physics Group)',
        description: 'Mathematics, Computer Science, and Physics (ideal for Software Engineering/Tech)',
        subjects: [
          ...compulsoryHSSC,
          { id: 'math', name: 'Mathematics', code: 'MATH', isCompulsory: false },
          { id: 'cs', name: 'Computer Science', code: 'CS', isCompulsory: false },
          { id: 'phy', name: 'Physics', code: 'PHY', isCompulsory: false },
        ]
      },
      {
        id: 'ics-stats',
        name: 'ICS (Statistics Group)',
        description: 'Mathematics, Computer Science, and Statistics (ideal for Data Science/Analytics)',
        subjects: [
          ...compulsoryHSSC,
          { id: 'math', name: 'Mathematics', code: 'MATH', isCompulsory: false },
          { id: 'cs', name: 'Computer Science', code: 'CS', isCompulsory: false },
          { id: 'stat', name: 'Statistics', code: 'STAT', isCompulsory: false },
        ]
      },
      {
        id: 'ics-econ',
        name: 'ICS (Economics Group)',
        description: 'Mathematics, Computer Science, and Economics (ideal for FinTech/Business Computing)',
        subjects: [
          ...compulsoryHSSC,
          { id: 'math', name: 'Mathematics', code: 'MATH', isCompulsory: false },
          { id: 'cs', name: 'Computer Science', code: 'CS', isCompulsory: false },
          { id: 'econ', name: 'Economics', code: 'ECON', isCompulsory: false },
        ]
      }
    ]
  },
  {
    id: 'icom',
    name: 'I.Com. (Commerce)',
    code: 'ICOM',
    description: 'Specialized for accounting, business administration, and banking.',
    combinations: [
      {
        id: 'icom-std',
        name: 'Standard Commerce Group',
        description: 'Principles of Accounting, Principles of Economics, and Commercial Geography',
        subjects: [
          ...compulsoryHSSC,
          { id: 'acc', name: 'Principles of Accounting', code: 'ACC', isCompulsory: false },
          { id: 'econ', name: 'Principles of Economics', code: 'ECON', isCompulsory: false },
          { id: 'comm-geo', name: 'Commercial Geography', code: 'C-GEO', isCompulsory: false },
        ]
      }
    ]
  },
  {
    id: 'fa-humanities',
    name: 'F.A. (Humanities & Arts)',
    code: 'FA',
    description: 'Humanities subjects including Civics, History, Islamic Studies and Sociology.',
    combinations: [
      {
        id: 'fa-general',
        name: 'Civics, Islamic Studies & Education',
        description: 'Civics, Advanced Islamic Studies, and Education',
        subjects: [
          ...compulsoryHSSC,
          { id: 'civ', name: 'Civics', code: 'CIV', isCompulsory: false },
          { id: 'isl-adv', name: 'Islamic Studies (Elective)', code: 'ISL-E', isCompulsory: false },
          { id: 'edu', name: 'Education', code: 'EDU', isCompulsory: false },
        ]
      }
    ]
  }
]

// Standard 4 Classes for Pakistan Secondary & Higher Secondary Education
function createStandardClasses(): ClassLevel[] {
  return [
    { level: 9, name: 'Class 9 (SSC-I / Matric Part 1)', code: 'CLASS-9', streams: sscStreams },
    { level: 10, name: 'Class 10 (SSC-II / Matric Part 2)', code: 'CLASS-10', streams: sscStreams },
    { level: 11, name: 'Class 11 (HSSC-I / F.Sc. Part 1)', code: 'CLASS-11', streams: hsscStreams },
    { level: 12, name: 'Class 12 (HSSC-II / F.Sc. Part 2)', code: 'CLASS-12', streams: hsscStreams },
  ]
}

// Pakistan Boards Configuration (Pakistan-First Scope)
export const pakistanBoards: BoardConfig[] = [
  {
    id: 'fbise',
    name: 'Federal Board of Intermediate and Secondary Education (Islamabad)',
    shortName: 'Federal Board (FBISE)',
    province: 'Federal Capital / Islamabad',
    classes: createStandardClasses(),
  },
  {
    id: 'bise-lahore',
    name: 'Board of Intermediate and Secondary Education, Lahore',
    shortName: 'Punjab Board (BISE Lahore)',
    province: 'Punjab',
    classes: createStandardClasses(),
  },
  {
    id: 'bise-rawalpindi',
    name: 'Board of Intermediate and Secondary Education, Rawalpindi',
    shortName: 'Punjab Board (BISE Rawalpindi)',
    province: 'Punjab',
    classes: createStandardClasses(),
  },
  {
    id: 'biek-karachi',
    name: 'Board of Intermediate Education, Karachi',
    shortName: 'Sindh Board (BIEK / BSEK)',
    province: 'Sindh',
    classes: createStandardClasses(),
  },
  {
    id: 'bise-peshawar',
    name: 'Board of Intermediate and Secondary Education, Peshawar',
    shortName: 'KPK Board (BISE Peshawar)',
    province: 'Khyber Pakhtunkhwa',
    classes: createStandardClasses(),
  },
]

// Query Helpers
export function getBoards(): BoardConfig[] {
  return pakistanBoards
}

export function getBoardById(boardId: string): BoardConfig | undefined {
  return pakistanBoards.find(b => b.id === boardId)
}

export function getClassesForBoard(boardId: string): ClassLevel[] {
  const board = getBoardById(boardId)
  return board ? board.classes : []
}

export function getClassByLevel(boardId: string, classLevel: number): ClassLevel | undefined {
  const classes = getClassesForBoard(boardId)
  return classes.find(c => c.level === classLevel)
}

export function getStreamsForClass(boardId: string, classLevel: number): StreamOption[] {
  const cls = getClassByLevel(boardId, classLevel)
  return cls ? cls.streams : []
}

export function getCombinationsForStream(boardId: string, classLevel: number, streamId: string): SubjectCombination[] {
  const streams = getStreamsForClass(boardId, classLevel)
  const stream = streams.find(s => s.id === streamId)
  return stream ? stream.combinations : []
}
