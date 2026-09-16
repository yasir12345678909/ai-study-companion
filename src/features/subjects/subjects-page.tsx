import { cn } from '@/lib/utils'
import { subjects } from '@/data/mock-data'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  BookOpen,
  ChevronRight,
  Atom,
  Calculator,
  FlaskConical,
  Microscope,
  Monitor,
  Languages,
  TrendingUp,
} from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  atom: Atom,
  calculator: Calculator,
  'flask-conical': FlaskConical,
  microscope: Microscope,
  'book-open': BookOpen,
  languages: Languages,
  monitor: Monitor,
}

export function SubjectsPage() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-semibold text-surface-900">Subjects</h1>
        <p className="mt-1 text-surface-600">Class 10 — Federal Board</p>
      </motion.div>

      <div className="space-y-2">
        {subjects.map((subject, i) => {
          const Icon = iconMap[subject.icon] || BookOpen
          return (
            <motion.button
              key={subject.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/subjects/${subject.id}`)}
              className={cn(
                'group flex w-full items-center gap-4 rounded-lg border border-surface-200 bg-surface-50 p-4',
                'transition-colors hover:border-surface-300 hover:bg-surface-100',
                'text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500'
              )}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-lg"
                style={{ backgroundColor: subject.color + '15', color: subject.color }}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-medium text-surface-900">{subject.name}</p>
                <div className="mt-1 flex items-center gap-4 text-sm text-surface-600">
                  <span>{subject.chaptersCount} chapters</span>
                  {subject.recentActivity && (
                    <span className="truncate">{subject.recentActivity}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                {subject.examPriority === 'high' && (
                  <span className="flex items-center gap-1 rounded-md bg-danger/10 px-2 py-1 text-xs font-medium text-danger">
                    <TrendingUp className="h-3 w-3" />
                    High priority
                  </span>
                )}
                <div className="hidden sm:flex items-center gap-2">
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-surface-300">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${subject.progress}%`,
                        backgroundColor: subject.color,
                      }}
                    />
                  </div>
                  <span className="text-sm text-surface-600 w-8">{subject.progress}%</span>
                </div>
                <ChevronRight className="h-5 w-5 text-surface-500 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
