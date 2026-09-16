import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useParams, useNavigate } from 'react-router-dom'
import { physicsChapters, momentumQuestions } from '@/data/mock-data'
import { motion } from 'motion/react'
import {
  ArrowLeft,
  BookOpen,
  Lightbulb,
  Calculator,
  FileText,
  HelpCircle,
  FileQuestion,
  Hash,
  Scroll,
  RotateCcw,
  GitBranch,
  TrendingUp,
  Clock,
  Sparkles,
  ChevronRight,
  PenTool,
} from 'lucide-react'

const sectionItems = [
  { id: 'concepts', label: 'Concepts', icon: Lightbulb, key: 'conceptsCount' as const },
  { id: 'formulae', label: 'Formulae', icon: Calculator, key: 'formulaeCount' as const },
  { id: 'definitions', label: 'Definitions', icon: FileText, key: 'definitionsCount' as const },
  { id: 'short', label: 'Short questions', icon: HelpCircle, key: 'shortQuestionsCount' as const },
  { id: 'long', label: 'Long questions', icon: FileQuestion, key: 'longQuestionsCount' as const },
  { id: 'numericals', label: 'Numericals', icon: Hash, key: 'numericalsCount' as const },
  { id: 'pastpapers', label: 'Past papers', icon: Scroll, key: 'pastPaperCount' as const },
]

export function ChapterOverviewPage() {
  const { subjectId, chapterId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  const chapter = physicsChapters.find((c) => c.id === chapterId)

  if (!chapter) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <BookOpen className="h-12 w-12 text-surface-500 mb-4" />
        <h2 className="text-lg font-medium text-surface-800">Chapter not found</h2>
        <button
          onClick={() => navigate(`/subjects/${subjectId}`)}
          className="mt-4 text-sm text-brand-400 hover:text-brand-300"
        >
          Back to subject
        </button>
      </div>
    )
  }

  const questions = chapterId === 'ch4' ? momentumQuestions : []

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4">
        <div className="flex items-center gap-2 text-sm text-surface-600">
          <button onClick={() => navigate('/subjects')} className="hover:text-surface-800">
            Subjects
          </button>
          <span>/</span>
          <button onClick={() => navigate(`/subjects/${subjectId}`)} className="hover:text-surface-800 capitalize">
            {subjectId}
          </button>
          <span>/</span>
          <span className="text-surface-800">Chapter {chapter.number}</span>
        </div>
      </motion.div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-surface-600 capitalize">{subjectId} — Chapter {chapter.number}</p>
            <h1 className="mt-1 text-2xl font-semibold text-surface-900">{chapter.title}</h1>
          </div>
          {chapter.priority === 'high' && (
            <span className="flex items-center gap-1 rounded-lg bg-danger/10 px-3 py-1.5 text-sm font-medium text-danger whitespace-nowrap">
              <TrendingUp className="h-4 w-4" />
              High priority
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-4 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-300">
            <motion.div
              className="h-full rounded-full bg-brand-500"
              initial={{ width: 0 }}
              animate={{ width: `${chapter.progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <span className="text-sm font-medium text-surface-700">{chapter.progress}%</span>
        </div>
      </motion.div>

      {/* Quick Actions Row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 flex flex-wrap gap-2"
      >
        <button
          onClick={() => navigate('/tutor')}
          className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
        >
          <Sparkles className="h-4 w-4" />
          Ask AI tutor
        </button>
        <button
          onClick={() => navigate('/revision')}
          className="flex items-center gap-2 rounded-lg border border-surface-300 bg-surface-100 px-4 py-2.5 text-sm font-medium text-surface-800 transition-colors hover:bg-surface-200"
        >
          <RotateCcw className="h-4 w-4" />
          Quick revision
          <span className="text-surface-600">({chapter.quickRevisionMinutes} min)</span>
        </button>
        <button
          onClick={() => navigate(`/subjects/${subjectId}/${chapterId}/flowchart`)}
          className="flex items-center gap-2 rounded-lg border border-surface-300 bg-surface-100 px-4 py-2.5 text-sm font-medium text-surface-800 transition-colors hover:bg-surface-200"
        >
          <GitBranch className="h-4 w-4" />
          Flowchart
        </button>
        <button
          onClick={() => navigate('/handwritten')}
          className="flex items-center gap-2 rounded-lg border border-surface-300 bg-surface-100 px-4 py-2.5 text-sm font-medium text-surface-800 transition-colors hover:bg-surface-200"
        >
          <PenTool className="h-4 w-4" />
          Notebook notes
        </button>
      </motion.div>

      {/* Section Cards */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-surface-600">
          Study this chapter
        </h2>
        <div className="space-y-2">
          {sectionItems.map((section, i) => {
            const count = chapter[section.key]
            return (
              <motion.button
                key={section.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.04 }}
                onClick={() => {
                  if (section.id === 'concepts') {
                    navigate(`/subjects/${subjectId}/${chapterId}/concepts`)
                  } else if (section.id === 'short' || section.id === 'long' || section.id === 'numericals') {
                    navigate(`/subjects/${subjectId}/${chapterId}/questions`)
                  } else if (section.id === 'pastpapers') {
                    navigate('/exams')
                  }
                }}
                className={cn(
                  'group flex w-full items-center gap-4 rounded-lg border border-surface-200 bg-surface-50 px-4 py-3',
                  'transition-colors hover:border-surface-300 hover:bg-surface-100',
                  'text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500'
                )}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-200 text-surface-700">
                  <section.icon className="h-5 w-5" />
                </div>
                <span className="flex-1 font-medium text-surface-800">{section.label}</span>
                <span className="rounded-md bg-surface-200 px-2.5 py-0.5 text-sm font-medium text-surface-700">
                  {count}
                </span>
                <ChevronRight className="h-4 w-4 text-surface-500 transition-transform group-hover:translate-x-0.5" />
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Questions Preview */}
      {questions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium uppercase tracking-wider text-surface-600">
              Important questions
            </h2>
            <button
              onClick={() => navigate(`/subjects/${subjectId}/${chapterId}/questions`)}
              className="text-sm text-brand-400 hover:text-brand-300"
            >
              View all
            </button>
          </div>
          <div className="space-y-2">
            {questions
              .filter((q) => q.priority === 'high')
              .slice(0, 3)
              .map((q) => (
                <button
                  key={q.id}
                  onClick={() => navigate(`/questions/${q.id}`)}
                  className={cn(
                    'group flex w-full items-start gap-3 rounded-lg border border-surface-200 bg-surface-50 p-4',
                    'transition-colors hover:border-surface-300 hover:bg-surface-100',
                    'text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500'
                  )}
                >
                  <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded bg-danger/10 text-danger">
                    <TrendingUp className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-surface-800 line-clamp-2">{q.text}</p>
                    <div className="mt-1.5 flex items-center gap-3 text-xs text-surface-600">
                      <span className="capitalize">{q.type.replace('_', ' ')}</span>
                      <span>{q.marks} marks</span>
                      <span>Appeared {q.paperAppearances} times</span>
                    </div>
                  </div>
                  <ChevronRight className="mt-1 h-4 w-4 text-surface-500" />
                </button>
              ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
