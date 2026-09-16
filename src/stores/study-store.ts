import { create } from 'zustand'
import type { SubjectId, AnswerMode } from '@/types'

interface StudyState {
  activeSubject: SubjectId | null
  activeChapter: string | null
  activeQuestion: string | null
  answerMode: AnswerMode
  revisionActive: boolean
  studySessionStart: Date | null
  setActiveSubject: (id: SubjectId | null) => void
  setActiveChapter: (id: string | null) => void
  setActiveQuestion: (id: string | null) => void
  setAnswerMode: (mode: AnswerMode) => void
  startStudySession: () => void
  endStudySession: () => void
  toggleRevision: () => void
}

export const useStudyStore = create<StudyState>((set) => ({
  activeSubject: null,
  activeChapter: null,
  activeQuestion: null,
  answerMode: 'exam',
  revisionActive: false,
  studySessionStart: null,
  setActiveSubject: (id: SubjectId | null) => set({ activeSubject: id }),
  setActiveChapter: (id: string | null) => set({ activeChapter: id }),
  setActiveQuestion: (id: string | null) => set({ activeQuestion: id }),
  setAnswerMode: (mode: AnswerMode) => set({ answerMode: mode }),
  startStudySession: () => set({ studySessionStart: new Date() }),
  endStudySession: () => set({ studySessionStart: null }),
  toggleRevision: () => set((state) => ({ revisionActive: !state.revisionActive })),
}))
