import type { Subject, Chapter, Question, Material, StudyPlan, Group, TutorMessage, TopicFrequency, PastPaper, PastPaperQuestion, VerificationStatus } from '@/types'

export interface IStudyService {
  getSubjects(): Promise<Subject[]>
  getChapters(subjectId: string): Promise<Chapter[]>
  getQuestions(chapterId: string): Promise<Question[]>
  getQuestion(questionId: string): Promise<Question | null>
}

export interface IMaterialService {
  getMaterials(): Promise<Material[]>
  getMaterial(id: string): Promise<Material | null>
  uploadMaterial(file: File, metadata: Partial<Material>): AsyncGenerator<UploadProgress>
  updateVerification(id: string, status: VerificationStatus): Promise<Material>
}

export interface UploadProgress {
  stage: 'uploading' | 'reading' | 'extracting' | 'organizing' | 'building' | 'ready'
  progress: number // 0-100
  message: string
}

export interface ITutorService {
  sendMessage(content: string, context?: { subject?: string; chapter?: string }): AsyncGenerator<string>
  getSuggestedActions(context?: { subject?: string; chapter?: string }): Promise<string[]>
}

export interface IExamService {
  getTopicFrequencies(subjectId: string): Promise<TopicFrequency[]>
  getPastPapers(subjectId: string): Promise<PastPaper[]>
  getPastPaperQuestions(paperId: string): Promise<PastPaperQuestion[]>
}

export interface IPlannerService {
  generatePlan(config: { targetScore: number; deadline: Date; subjects: string[]; dailyHours: number }): Promise<StudyPlan>
}

export interface IGroupService {
  getGroups(): Promise<Group[]>
  getGroup(id: string): Promise<Group | null>
}
