import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { OnboardingStep } from '@/types'
import { onboardingSteps as defaultSteps } from '@/data/mock-data'

interface OnboardingState {
  active: boolean
  isActive: boolean
  currentStepIndex: number
  currentStepId: string
  steps: OnboardingStep[]
  highlightElement: string | null
  startOnboarding: () => void
  completeStep: (stepId: string) => void
  nextStep: () => void
  skipOnboarding: () => void
  resetOnboarding: () => void
  setHighlight: (elementId: string | null) => void
  getCurrentStep: () => OnboardingStep | undefined
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      active: false,
      isActive: false,
      currentStepIndex: 0,
      currentStepId: defaultSteps[0]?.id || '',
      steps: defaultSteps,
      highlightElement: null,
      getCurrentStep: () => {
        const { steps, currentStepIndex } = get()
        return steps[currentStepIndex]
      },
      startOnboarding: () => {
        const { steps } = get()
        set({ 
          active: true, 
          isActive: true, 
          currentStepIndex: 0, 
          currentStepId: steps[0]?.id || '' 
        })
      },
      completeStep: (stepId: string) => {
        const { steps } = get()
        const updated = steps.map((s) => 
          s.id === stepId ? { ...s, completed: true, isCompleted: true } : s
        )
        set({ steps: updated })
        get().nextStep()
      },
      nextStep: () => {
        const { currentStepIndex, steps } = get()
        if (currentStepIndex < steps.length - 1) {
          const nextIndex = currentStepIndex + 1
          set({ 
            currentStepIndex: nextIndex, 
            currentStepId: steps[nextIndex]?.id || '' 
          })
        } else {
          set({ active: false, isActive: false })
        }
      },
      skipOnboarding: () => set({ active: false, isActive: false }),
      resetOnboarding: () => {
        set({ 
          active: false, 
          isActive: false, 
          currentStepIndex: 0, 
          currentStepId: defaultSteps[0]?.id || '',
          steps: defaultSteps, 
          highlightElement: null 
        })
      },
      setHighlight: (elementId: string | null) => set({ highlightElement: elementId })
    }),
    {
      name: 'onboarding-state',
    }
  )
)
