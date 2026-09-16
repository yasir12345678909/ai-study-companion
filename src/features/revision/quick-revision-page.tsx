import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import { physicsChapters, momentumQuestions } from '@/data/mock-data'
import { motion } from 'motion/react'
import {
  ArrowLeft,
  RotateCcw,
  ChevronRight,
  BookOpen,
  CheckCircle,
  Clock,
} from 'lucide-react'

interface RevisionCard {
  id: string
  front: string
  back: string[]
  seen: boolean
}

export function QuickRevisionPage() {
  const navigate = useNavigate()
  const [selectedChapterId, setSelectedChapterId] = useState('c4')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [completed, setCompleted] = useState<Set<string>>(new Set())

  const chapter = physicsChapters.find((c) => c.id === selectedChapterId) || physicsChapters[0]

  // Build revision cards from mock questions
  const cards: RevisionCard[] = momentumQuestions.slice(0, 6).map((q) => ({
    id: q.id,
    front: q.text,
    back: q.answer?.revision || q.answers?.revision || [
      'Core physical concept for board exams.',
      'Always state SI units in numerical answers.',
      'Key scoring item in FBISE / BISE papers.'
    ],
    seen: false,
  }))

  const currentCard = cards[currentIndex]
  const progress = ((completed.size / cards.length) * 100).toFixed(0)

  const handleFlip = () => setFlipped(!flipped)

  const handleNext = useCallback(() => {
    setCompleted((prev) => new Set(prev).add(currentCard.id))
    setFlipped(false)
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }, [currentIndex, currentCard, cards.length])

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setFlipped(false)
      setCurrentIndex(currentIndex - 1)
    }
  }

  const isComplete = completed.size === cards.length

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-1 text-sm text-surface-600 hover:text-surface-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-surface-900">Quick Revision</h1>
            <p className="mt-1 text-sm text-surface-600">
              Physics — {chapter.name || chapter.title || 'Turning Effect of Forces'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedChapterId}
              onChange={(e) => {
                setSelectedChapterId(e.target.value)
                setCurrentIndex(0)
                setFlipped(false)
                setCompleted(new Set())
              }}
              className="rounded-lg border border-surface-200 bg-surface-100 px-3 py-1.5 text-xs font-semibold text-surface-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {physicsChapters.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  Ch {ch.number}: {ch.name}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-surface-500 bg-surface-100 border border-surface-200 px-2.5 py-1.5 rounded-lg">
              <Clock className="h-3.5 w-3.5 text-brand-500" />
              ~{chapter.quickRevisionMinutes || 5} min
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2 text-sm text-surface-600">
          <span>{currentIndex + 1} of {cards.length}</span>
          <span>{progress}% complete</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-surface-300">
          <motion.div
            className="h-full rounded-full bg-brand-500"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Card */}
      {isComplete ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl border border-surface-200 bg-surface-50 p-8 text-center"
        >
          <CheckCircle className="mx-auto h-16 w-16 text-success mb-4" />
          <h2 className="text-xl font-semibold text-surface-900">Revision complete!</h2>
          <p className="mt-2 text-surface-600">
            You've reviewed all {cards.length} key concepts.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => {
                setCurrentIndex(0)
                setFlipped(false)
                setCompleted(new Set())
              }}
              className="flex items-center gap-2 rounded-lg border border-surface-300 bg-surface-100 px-4 py-2.5 text-sm font-medium text-surface-800 hover:bg-surface-200"
            >
              <RotateCcw className="h-4 w-4" />
              Start over
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
            >
              Continue studying
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key={currentCard.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={handleFlip}
            className={cn(
              'w-full min-h-[280px] rounded-xl border border-surface-200 bg-surface-50 p-8',
              'transition-all hover:border-surface-300',
              'text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
              'cursor-pointer'
            )}
          >
            {!flipped ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[220px]">
                <p className="text-xs font-medium uppercase tracking-wider text-surface-500 mb-4">
                  Question
                </p>
                <p className="text-lg text-center text-surface-900 leading-relaxed">
                  {currentCard.front}
                </p>
                <p className="mt-6 text-sm text-surface-500">Tap to reveal answer</p>
              </div>
            ) : (
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-success mb-4">
                  Answer
                </p>
                <ul className="space-y-2">
                  {currentCard.back.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-surface-800">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </button>

          {/* Navigation */}
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="rounded-lg border border-surface-300 px-4 py-2 text-sm text-surface-700 hover:bg-surface-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="rounded-lg bg-brand-600 px-6 py-2 text-sm font-medium text-white hover:bg-brand-700"
            >
              {currentIndex === cards.length - 1 ? 'Complete' : 'Next'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
