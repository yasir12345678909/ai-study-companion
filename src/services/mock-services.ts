import type { IStudyService, IMaterialService, ITutorService, IExamService, IPlannerService, IGroupService, UploadProgress } from './interfaces'
import { subjects, physicsChapters, momentumQuestions, materials, topicFrequencies, pastPapers, pastPaperQuestions, todaysMissions, groups } from '@/data/mock-data'
import { delay } from '@/lib/utils'
import type { StudyPlan, Material, VerificationStatus } from '@/types'

class MockStudyService implements IStudyService {
  async getSubjects() {
    await delay(300)
    return subjects
  }

  async getChapters(subjectId: string) {
    await delay(300)
    if (subjectId === 'physics') {
      return physicsChapters
    }
    return []
  }

  async getQuestions(chapterId: string) {
    await delay(300)
    if (chapterId === 'physics-ch3') {
      return momentumQuestions
    }
    return []
  }

  async getQuestion(questionId: string) {
    await delay(300)
    return momentumQuestions.find(q => q.id === questionId) || null
  }
}

class MockMaterialService implements IMaterialService {
  async getMaterials() {
    await delay(300)
    return materials
  }

  async getMaterial(id: string) {
    await delay(300)
    return materials.find(m => m.id === id) || null
  }

  async *uploadMaterial(file: File, metadata: Partial<Material>): AsyncGenerator<UploadProgress> {
    const stages: Array<{ stage: UploadProgress['stage']; progress: number; message: string }> = [
      { stage: 'uploading', progress: 30, message: 'Uploading file...' },
      { stage: 'reading', progress: 45, message: 'Reading pages...' },
      { stage: 'extracting', progress: 65, message: 'Extracting concepts...' },
      { stage: 'organizing', progress: 80, message: 'Organizing content...' },
      { stage: 'building', progress: 95, message: 'Building questions...' },
      { stage: 'ready', progress: 100, message: 'Ready to study!' },
    ]

    for (const stage of stages) {
      await delay(800 + Math.random() * 400) // 800-1200ms
      yield stage
    }
  }

  async updateVerification(id: string, status: VerificationStatus) {
    await delay(500)
    const material = materials.find(m => m.id === id)
    if (!material) throw new Error('Material not found')
    // Clone and update the status for mock purposes
    return { ...material, verificationStatus: status }
  }
}

class MockTutorService implements ITutorService {
  async *sendMessage(content: string, context?: { subject?: string; chapter?: string }): AsyncGenerator<string> {
    let responseText = "I'm here to help you with your studies. Could you provide more details?"
    
    const lowerContent = content.toLowerCase()
    if (lowerContent.includes('momentum')) {
      responseText = "Momentum is a fundamental concept in physics. It is defined as the product of the mass and velocity of an object. Think of it as 'mass in motion'."
    } else if (lowerContent.includes('explain') || lowerContent.includes('simple')) {
      responseText = "Sure, I can explain that simply. Let's break it down into smaller, easy-to-understand parts. What specifically would you like me to start with?"
    }

    const words = responseText.split(' ')
    let currentText = ''

    // Yield in small chunks
    for (let i = 0; i < words.length; i += 3) {
      const chunk = words.slice(i, i + 3).join(' ') + ' '
      currentText += chunk
      await delay(10 + Math.random() * 20) // 10-30ms
      yield currentText
    }
  }

  async getSuggestedActions(context?: { subject?: string; chapter?: string }) {
    await delay(300)
    if (context?.subject === 'physics') {
      return ['Review Momentum Formula', 'Practice Problems', 'Explain Conservation of Momentum']
    }
    return ['Start a quiz', 'Review recent notes', 'Ask a question']
  }
}

class MockExamService implements IExamService {
  async getTopicFrequencies(subjectId: string) {
    await delay(500)
    return topicFrequencies
  }

  async getPastPapers(subjectId: string) {
    await delay(300)
    return pastPapers
  }

  async getPastPaperQuestions(paperId: string) {
    await delay(300)
    return pastPaperQuestions.filter(q => q.paperId === paperId)
  }
}

class MockPlannerService implements IPlannerService {
  async generatePlan(config: { targetScore: number; deadline: Date; subjects: string[]; dailyHours: number }): Promise<StudyPlan> {
    await delay(1500)
    return {
      id: 'plan-1',
      title: 'Personalized Study Plan',
      targetScore: config.targetScore,
      deadline: config.deadline,
      subjects: config.subjects,
      dailyHours: config.dailyHours,
      missions: todaysMissions
    }
  }
}

class MockGroupService implements IGroupService {
  async getGroups() {
    await delay(300)
    return groups
  }

  async getGroup(id: string) {
    await delay(300)
    return groups.find(g => g.id === id) || null
  }
}

export const studyService: IStudyService = new MockStudyService()
export const materialService: IMaterialService = new MockMaterialService()
export const tutorService: ITutorService = new MockTutorService()
export const examService: IExamService = new MockExamService()
export const plannerService: IPlannerService = new MockPlannerService()
export const groupService: IGroupService = new MockGroupService()
