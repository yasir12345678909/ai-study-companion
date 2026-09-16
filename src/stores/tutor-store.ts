import { create } from 'zustand'
import type { TutorMessage, TutorAction } from '@/types'
import { sampleConversation } from '@/data/mock-data'

interface TutorState {
  messages: TutorMessage[]
  isGenerating: boolean
  generatingStatus: string
  generationStatus: string
  contextSubject: string | null
  contextChapter: string | null
  context: { subject: string | null; chapter: string | null }
  sendMessage: (content: string) => void
  clearMessages: () => void
  setContext: (subject: string | null, chapter: string | null) => void
  stopGeneration: () => void
  regenerateResponse: (messageId?: string) => void
}

export const useTutorStore = create<TutorState>((set, get) => {
  let generationTimeout1: ReturnType<typeof setTimeout> | null = null
  let generationTimeout2: ReturnType<typeof setTimeout> | null = null
  let generationTimeout3: ReturnType<typeof setTimeout> | null = null

  const triggerAssistantResponse = (promptContent: string) => {
    set({
      isGenerating: true,
      generatingStatus: 'Thinking...',
      generationStatus: 'Thinking...'
    })

    generationTimeout1 = setTimeout(() => {
      set({ 
        generatingStatus: 'Analyzing material...',
        generationStatus: 'Analyzing material...'
      })
    }, 1000)

    generationTimeout2 = setTimeout(() => {
      set({ 
        generatingStatus: 'Writing answer...',
        generationStatus: 'Writing answer...'
      })
    }, 2000)

    generationTimeout3 = setTimeout(() => {
      const isMomentum = promptContent.toLowerCase().includes('momentum') || promptContent.toLowerCase().includes('force')
      const responseMessage: TutorMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: isMomentum 
          ? `Momentum is defined as the quantity of motion an object possesses. Mathematically, it is the product of mass and velocity: **p = mv**. In SI units, momentum is measured in **kg·m/s** or **N·s**.\n\nKey exam point: Momentum is a vector quantity having the exact same direction as the velocity vector.`
          : `Great question! Here is an exam-safe explanation for "${promptContent}". In the Class 10 Federal Board curriculum, this concept regularly appears in short conceptual questions. Let's break it down into core principles:`,
        timestamp: new Date(),
        suggestedActions: [
          { label: 'Explain simpler', action: 'explain_simpler' },
          { label: 'Give an example', action: 'give_example' },
          { label: 'Show exam answer', action: 'exam_answer' }
        ],
        responseBlocks: [
          {
            type: 'definition',
            label: 'Core Concept',
            content: 'Momentum is a fundamental physical quantity conserved in all isolated systems.'
          },
          {
            type: 'formula',
            label: 'Mathematical Formulation',
            content: 'p = m × v'
          },
          {
            type: 'tip',
            label: 'Exam Tip',
            content: 'Always specify both the magnitude and direction, as losing marks on vector properties is a common mistake.'
          }
        ],
        sources: [
          { title: 'Class 10 Physics Textbook', page: 64, type: 'textbook' },
          { title: 'Mr. Asif Notes', page: 8, type: 'teacher' }
        ]
      }
      set((state) => ({
        messages: [...state.messages, responseMessage],
        isGenerating: false,
        generatingStatus: '',
        generationStatus: ''
      }))
    }, 3200)
  }

  return {
    messages: sampleConversation,
    isGenerating: false,
    generatingStatus: '',
    generationStatus: '',
    contextSubject: 'Physics',
    contextChapter: 'Turning Effect of Forces',
    context: { subject: 'Physics', chapter: 'Turning Effect of Forces' },
    sendMessage: (content: string) => {
      const userMessage: TutorMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content,
        timestamp: new Date()
      }

      set((state) => ({
        messages: [...state.messages, userMessage],
      }))

      triggerAssistantResponse(content)
    },
    regenerateResponse: () => {
      const { messages } = get()
      const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')
      if (lastUserMsg) {
        triggerAssistantResponse(lastUserMsg.content)
      }
    },
    clearMessages: () => set({ messages: [] }),
    setContext: (subject: string | null, chapter: string | null) => set({ 
      contextSubject: subject, 
      contextChapter: chapter,
      context: { subject, chapter }
    }),
    stopGeneration: () => {
      if (generationTimeout1) clearTimeout(generationTimeout1)
      if (generationTimeout2) clearTimeout(generationTimeout2)
      if (generationTimeout3) clearTimeout(generationTimeout3)
      set({ isGenerating: false, generatingStatus: '', generationStatus: '' })
    }
  }
})
