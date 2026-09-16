import { cn } from '@/lib/utils'
import { useParams, useNavigate } from 'react-router-dom'
import { subjects, physicsChapters } from '@/data/mock-data'
import { motion } from 'motion/react'
import {
  ChevronRight,
  TrendingUp,
  BookOpen,
  ArrowLeft,
  BarChart3,
} from 'lucide-react'

export function SubjectOverviewPage() {
  const { subjectId } = useParams()
  const navigate = useNavigate()
  const subject = subjects.find((s) => s.id === subjectId)
  const chapters = subjectId === 'physics' ? physicsChapters : []

  if (!subject) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <BookOpen className="h-12 w-12 text-surface-500 mb-4" />
        <h2 className="text-lg font-medium text-surface-800">Subject not found</h2>
        <p className="mt-1 text-surface-600">This subject hasn't been set up yet.</p>
        <button
          onClick={() => navigate('/subjects')}
          className="mt-4 text-sm text-brand-400 hover:text-brand-300"
        >
          Back to subjects
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6"
      >
        <button
          onClick={() => navigate('/subjects')}
          className="flex items-center gap-1 text-sm text-surface-600 hover:text-surface-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Subjects
        </button>
      </motion.div>

      {/* Subject Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-xl"
            style={{ backgroundColor: subject.color + '15', color: subject.color }}
          >
            <BookOpen className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-surface-900">{subject.name}</h1>
            <p className="mt-0.5 text-surface-600">
              Class 10 — {subject.chaptersCount} chapters
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-300">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${subject.progress}%`,
                backgroundColor: subject.color,
              }}
            />
          </div>
          <span className="text-sm font-medium text-surface-700">{subject.progress}%</span>
        </div>
      </motion.div>

      {/* Chapters */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-surface-600">
          Chapters
        </h2>

        {chapters.length === 0 ? (
          <div className="rounded-lg border border-surface-200 bg-surface-50 p-8 text-center">
            <BarChart3 className="mx-auto h-10 w-10 text-surface-500 mb-3" />
            <p className="text-surface-700 font-medium">Content coming soon</p>
            <p className="mt-1 text-sm text-surface-600">
              Chapters for {subject.name} are being prepared.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {chapters.map((chapter, i) => (
              <motion.button
                key={chapter.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.04 }}
                onClick={() => navigate(`/subjects/${subjectId}/${chapter.id}`)}
                className={cn(
                  'group flex w-full items-center gap-4 rounded-lg border border-surface-200 bg-surface-50 p-4',
                  'transition-colors hover:border-surface-300 hover:bg-surface-100',
                  'text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500'
                )}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-200 text-surface-700 text-sm font-bold">
                  {String(chapter.number).padStart(2, '0')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-surface-900">{chapter.title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-surface-600">
                    <span>{chapter.conceptsCount || chapter.concepts || 0} concepts</span>
                    <span>{chapter.formulaeCount || chapter.formulae || 0} formulae</span>
                    <span>{(chapter.shortQuestionsCount || 0) + (chapter.longQuestionsCount || 0) || 15} questions</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {chapter.priority === 'high' && (
                    <span className="hidden sm:flex items-center gap-1 rounded-md bg-danger/10 px-2 py-1 text-xs font-medium text-danger">
                      <TrendingUp className="h-3 w-3" />
                      High
                    </span>
                  )}
                  <div className="hidden sm:flex items-center gap-2">
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-300">
                      <div
                        className="h-full rounded-full bg-brand-500 transition-all"
                        style={{ width: `${chapter.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-surface-600 w-7">{chapter.progress}%</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-surface-500 transition-transform group-hover:translate-x-0.5" />
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
