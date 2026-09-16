// ── Core Domain Types ──

export type ClassLevel = 9 | 10 | 11 | 12

export type SubjectId = string

export interface Subject {
  id: SubjectId
  name: string
  nameUrdu?: string
  icon: string
  color: string
  chaptersCount?: number
  chapterCount?: number
  progress: number // 0-100
  recentActivity?: string
  examPriority?: 'high' | 'medium' | 'low'
  xp?: number
}

export interface Chapter {
  id: string
  subjectId: SubjectId
  number: number
  title?: string
  name?: string
  titleUrdu?: string
  priority?: 'high' | 'medium' | 'low'
  isHighPriority?: boolean
  progress: number
  conceptsCount?: number
  concepts?: number
  formulaeCount?: number
  formulae?: number
  definitionsCount?: number
  definitions?: number
  shortQuestionsCount?: number
  longQuestionsCount?: number
  questions?: number
  numericalsCount?: number
  pastPaperCount?: number
  pastPaperAppearances?: number
  quickRevisionMinutes?: number
}

export type QuestionType = 'definition' | 'short' | 'long' | 'numerical' | 'derivation' | 'conceptual'
export type AnswerMode = 'exam' | 'easy' | 'revision'

export interface Question {
  id: string
  chapterId?: string
  chapter?: string
  subjectId?: SubjectId
  subject?: string
  topic?: string
  text: string
  type: QuestionType
  marks: number
  priority: 'high' | 'medium' | 'low'
  paperAppearances?: number
  pastPaperAppearances?: number
  frequency?: number
  appearedTimes?: number
  classTestAppearances?: number
  variants?: number | string[]
  recentAppearance?: boolean
  answer?: {
    exam: AnswerSection[]
    easy: AnswerSection[] | string
    revision: string[]
    commonMistake?: string
  }
  answers?: {
    exam: AnswerSection[]
    easy: AnswerSection[] | string
    revision: string[]
    commonMistake?: string
  }
  commonMistake?: string
}

export interface AnswerSection {
  id?: string
  label?: string
  content: string
  type?: 'text' | 'formula' | 'unit' | 'step' | 'diagram' | 'highlight' | 'definition'
  marks?: number
}

// ── Materials ──

export type MaterialType = 'pdf' | 'notes' | 'image' | 'lecture' | 'pastpaper'
export type VerificationStatus = 'verified' | 'teacher_verified' | 'student_uploaded' | 'pending' | 'rejected' | 'archived'
export type SourceTier = 'official' | 'administration' | 'teacher' | 'student' | 'unverified'

export interface Material {
  id: string
  name?: string
  title?: string
  subjectId?: SubjectId
  chapterId?: string
  type: MaterialType
  status: VerificationStatus
  sourceTier?: SourceTier
  uploadedBy?: string
  authorId?: string
  uploadedAt?: Date | string
  createdAt?: Date | string
  dateAdded?: Date | string
  size?: string
  pageCount?: number
}

// ── Past Papers ──

export interface PastPaper {
  id: string
  board: string
  year: number
  title?: string
  type?: string
  subjectId: SubjectId
  questionCount?: number
}

export interface PastPaperQuestion {
  id: string
  questionId?: string
  number?: number
  part?: string
  paperId: string
  text?: string
  chapterId?: string
  topicCluster?: string
  type?: QuestionType
  marks: number
}

export interface TopicFrequency {
  id?: string
  topic: string
  name?: string
  chapterId?: string
  totalAppearances?: number
  appearances?: number
  boardCount?: number
  classTestCount?: number
  years?: number[]
  lastSeenYear?: number
  variants?: number
  variantsCount?: number
  typicalMarks?: string
  marksRange?: string
  recentAppearance?: boolean
  recent?: boolean
  priority: 'high' | 'medium' | 'low'
}

// ── Study Planning ──

export interface StudyPlan {
  id: string
  title?: string
  targetScore: number
  deadline: Date
  subjects: SubjectId[]
  dailyHours: number
  missions: StudyMission[]
  progress?: number
}

export interface StudyMission {
  id: string
  subjectId?: SubjectId
  subject?: SubjectId
  chapterId?: string
  title: string
  description?: string
  durationMinutes?: number
  duration?: number
  xpReward?: number
  type: 'learn' | 'practice' | 'revise' | 'test'
  completed: boolean
}

// ── Groups ──

export interface Group {
  id: string
  name: string
  classLevel?: ClassLevel
  class?: number | string
  section?: string
  membersCount?: number
  memberCount?: number
  teacherName?: string
  materialsCount?: number
  description?: string
  isPrivate?: boolean
  recentActivity?: string
}

// ── AI Tutor ──

export type TutorActionType = 'explain' | 'simplify' | 'teach' | 'practice' | 'test' | 'revise' | 'exam_answer' | 'flowchart' | 'important_questions' | 'explain_simpler' | 'give_example'

export type TutorAction = TutorActionType | { id?: string; label: string; action: string }

export interface TutorMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date | string
  sources?: SourceReference[]
  suggestedActions?: TutorAction[]
  responseBlocks?: ResponseBlock[]
}

export interface ResponseBlock {
  type: 'text' | 'formula' | 'definition' | 'example' | 'tip' | 'warning' | 'source' | 'concept'
  content: string
  label?: string
  title?: string
  description?: string
}

export interface SourceReference {
  id?: string
  title: string
  page?: number
  type: 'textbook' | 'notes' | 'paper' | 'teacher' | 'book'
}

// ── User / Session ──

export type UserRole = 'student' | 'teacher' | 'management' | 'admin'
export type TeacherVerificationStatus = 'pending' | 'verified' | 'rejected'
export type TeacherClassRole = 'representative' | 'teacher'

export interface AcademicProfile {
  boardId: string
  boardName: string
  classLevel: number // 9, 10, 11, 12
  streamId: string
  streamName: string
  combinationId: string
  combinationName: string
  subjects: string[]
  rollNumber: string
  completedAt?: string
}

export interface AssignedClassInfo {
  classId: string
  className: string
  section: string
  role: TeacherClassRole
}

export interface TeacherProfile {
  id: string
  name: string
  email: string
  phone?: string
  institution: string
  verificationStatus: TeacherVerificationStatus
  rejectionReason?: string
  qualifications: string
  subjects: string[]
  assignedClasses: AssignedClassInfo[]
  submittedAt: string
  verifiedAt?: string
}

export interface StudentJoinRequest {
  id: string
  studentId: string
  studentName: string
  rollNumber: string
  classId: string
  className: string
  section: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  reviewedAt?: string
  reviewedBy?: string
  rejectionReason?: string
}

export interface User {
  id: string
  name: string
  email?: string
  phone?: string
  role: UserRole
  classLevel?: ClassLevel
  class?: number | string
  section?: string
  rollNumber?: string
  avatar?: string
  avatarUrl?: string
  xp: number
  level: number
  onboardingCompleted: boolean
  onboardingStep: number
  academicProfile?: AcademicProfile
  teacherProfile?: TeacherProfile
}

// ── XP / Gamification ──

export interface XPEvent {
  id: string
  amount: number
  reason: string
  timestamp: Date
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earned: boolean
  earnedAt?: Date
  dateEarned?: Date | string
  xp?: number
  progress?: number
  maxProgress?: number
}

// ── Onboarding ──

export interface OnboardingStep {
  id: string
  title: string
  description: string
  targetRoute?: string
  targetElement?: string
  action?: string
  completed: boolean
  isCompleted?: boolean
}

// ── Flowchart ──

export interface FlowchartNode {
  id: string
  label: string
  title?: string
  type: 'concept' | 'formula' | 'definition' | 'example' | 'question' | 'application' | 'variable' | 'detail'
  content?: string
  formula?: string
  position?: { x: number; y: number }
  expanded?: boolean
}

export interface FlowchartEdge {
  id: string
  source: string
  target: string
  label?: string
}

// ── Notifications ──

export interface Notification {
  id: string
  userId?: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'achievement' | 'system' | 'reminder'
  read: boolean
  timestamp?: Date | string
  createdAt?: Date | string
}

// ── English/Urdu Academic Structures ──

export interface WritingFormat {
  id: string
  type?: 'letter' | 'application' | 'story' | 'translation' | 'tashreeh' | 'khulasa' | string
  title?: string
  name?: string
  titleUrdu?: string
  nameUrdu?: string
  description?: string
  language?: string
  sections: WritingSection[]
}

export interface WritingSection {
  label?: string
  name?: string
  labelUrdu?: string
  content?: string
  description?: string
  isOptional?: boolean
  required?: boolean
}

// ── Handwritten Mode ──

export type WritingStyle = 'neat' | 'casual' | 'compact' | 'custom'
