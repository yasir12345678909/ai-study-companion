import { cn, getGreeting } from '@/lib/utils'
import { useAppStore } from '@/stores/app-store'
import { subjects, todaysMissions, achievements } from '@/data/mock-data'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  Sparkles,
  FileQuestion,
  RotateCcw,
  Upload,
  Target,
  ChevronRight,
  BookOpen,
  Play,
  Trophy,
  Flame,
  Clock,
  Atom,
  Calculator,
  Calendar,
  GitBranch,
  PenTool,
  Languages,
} from 'lucide-react'

const subjectIcons: Record<string, React.ReactNode> = {
  physics: <Atom className="h-5 w-5" />,
  mathematics: <Calculator className="h-5 w-5" />,
}

export function HomePage() {
  const { user } = useAppStore()
  const navigate = useNavigate()
  const greeting = getGreeting()

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-semibold text-surface-900">
          {greeting}, {user.name.split(' ')[0]}
        </h1>
        <p className="mt-1 text-surface-600">
          Let's continue where you left off.
        </p>
      </motion.div>

      {/* Continue Studying */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-8"
      >
        <button
          onClick={() => navigate('/subjects/physics/ch4')}
          className={cn(
            'group w-full rounded-2xl border border-surface-200 bg-surface-0 p-5',
            'transition-all duration-200 hover:border-brand-500/40 hover:shadow-md hover:scale-[1.015] active:scale-[0.985]',
            'text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500'
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-surface-500">
                  Continue studying
                </p>
                <p className="mt-0.5 text-lg font-bold text-surface-900">
                  Physics — Turning Effect of Forces
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="h-1.5 w-32 overflow-hidden rounded-full bg-surface-200">
                    <div
                      className="h-full rounded-full bg-brand-500 transition-all"
                      style={{ width: '64%' }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-surface-600">64%</span>
                </div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-surface-400 transition-transform group-hover:translate-x-1" />
          </div>
        </button>
      </motion.section>

      {/* Today's Mission */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-surface-500">
          Today's mission
        </h2>
        <div className="space-y-2.5">
          {todaysMissions.map((mission, i) => (
            <button
              key={mission.id}
              onClick={() =>
                navigate(
                  mission.type === 'revise'
                    ? '/revision'
                    : `/subjects/${mission.subjectId}/${mission.chapterId}`
                )
              }
              className={cn(
                'group flex w-full items-center gap-4 rounded-xl border border-surface-200 bg-surface-0 p-4',
                'transition-all duration-200 hover:border-brand-500/30 hover:shadow-sm hover:scale-[1.01] active:scale-[0.99]',
                'text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
                mission.completed && 'opacity-50'
              )}
            >
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-xl shrink-0',
                  mission.type === 'learn' && 'bg-brand-500/10 text-brand-600',
                  mission.type === 'practice' && 'bg-warning/15 text-warning',
                  mission.type === 'revise' && 'bg-success/15 text-success',
                  mission.type === 'test' && 'bg-danger/15 text-danger'
                )}
              >
                {mission.type === 'learn' && <BookOpen className="h-5 w-5" />}
                {mission.type === 'practice' && <FileQuestion className="h-5 w-5" />}
                {mission.type === 'revise' && <RotateCcw className="h-5 w-5" />}
                {mission.type === 'test' && <Flame className="h-5 w-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-surface-900 truncate">{mission.title}</p>
                <p className="text-xs text-surface-500 mt-0.5 truncate">{mission.description}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-surface-400 shrink-0">
                <Clock className="h-3.5 w-3.5" />
                {mission.durationMinutes} min
              </div>
              <ChevronRight className="h-4 w-4 text-surface-400 transition-transform group-hover:translate-x-0.5 shrink-0" />
            </button>
          ))}
        </div>
      </motion.section>

      {/* Quick Actions */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-surface-500">
          Quick actions
        </h2>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {[
            { icon: Sparkles, label: 'Ask tutor', path: '/tutor', color: 'text-brand-600 bg-brand-500/10' },
            { icon: FileQuestion, label: 'Exams & tests', path: '/exams', color: 'text-amber-500 bg-amber-500/10' },
            { icon: RotateCcw, label: 'Quick revision', path: '/revision', color: 'text-emerald-600 bg-emerald-500/10' },
            { icon: Calendar, label: 'Study planner', path: '/planner', color: 'text-blue-600 bg-blue-500/10' },
            { icon: GitBranch, label: 'Flowcharts', path: '/flowchart', color: 'text-purple-600 bg-purple-500/10' },
            { icon: PenTool, label: 'Notebook notes', path: '/handwritten', color: 'text-orange-500 bg-orange-500/10' },
            { icon: Languages, label: 'Writing practice', path: '/writing', color: 'text-teal-600 bg-teal-500/10' },
            { icon: Upload, label: 'Upload notes', path: '/materials/upload', color: 'text-sky-600 bg-sky-500/10' },
          ].map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className={cn(
                'flex flex-col items-center gap-2 rounded-2xl border border-surface-200 bg-surface-0 p-4',
                'transition-all duration-200 hover:border-brand-500/30 hover:shadow-sm hover:scale-[1.03] active:scale-[0.97]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500'
              )}
            >
              <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl', action.color)}>
                <action.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold text-surface-800 text-center">{action.label}</span>
            </button>
          ))}
        </div>
      </motion.section>

      {/* Study Goal */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mb-8"
      >
        <button
          onClick={() => navigate('/planner')}
          className={cn(
            'group w-full rounded-2xl border border-surface-200 bg-surface-0 p-5',
            'transition-all duration-200 hover:border-brand-500/30 hover:shadow-md hover:scale-[1.015] active:scale-[0.985]',
            'text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500'
          )}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10 text-warning">
              <Target className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-surface-500">
                Exam goal
              </p>
              <p className="mt-0.5 text-lg font-bold text-surface-900">
                Target: 85%
              </p>
              <p className="text-xs text-surface-500 mt-0.5">12 days remaining</p>
            </div>
            <div className="text-right">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-warning">
                <span className="text-base font-bold text-warning">85</span>
              </div>
            </div>
          </div>
        </button>
      </motion.section>

      {/* Subject Progress */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-surface-500">
            Subject progress
          </h2>
          <button
            onClick={() => navigate('/subjects')}
            className="text-xs font-semibold text-brand-600 hover:text-brand-500"
          >
            View all
          </button>
        </div>
        <div className="space-y-2">
          {subjects.slice(0, 4).map((subject) => (
            <button
              key={subject.id}
              onClick={() => navigate(`/subjects/${subject.id}`)}
              className={cn(
                'group flex w-full items-center gap-3 rounded-xl border border-surface-200 bg-surface-0 px-4 py-3',
                'transition-all duration-200 hover:border-brand-500/30 hover:shadow-xs hover:scale-[1.01] active:scale-[0.99]',
                'text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500'
              )}
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ backgroundColor: subject.color + '20', color: subject.color }}
              >
                {subjectIcons[subject.id] || <BookOpen className="h-4 w-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-surface-900 truncate">{subject.name}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-20 overflow-hidden rounded-full bg-surface-200">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${subject.progress}%`,
                      backgroundColor: subject.color,
                    }}
                  />
                </div>
                <span className="text-xs font-bold text-surface-600 w-8 text-right">{subject.progress}%</span>
              </div>
              <ChevronRight className="h-4 w-4 text-surface-400" />
            </button>
          ))}
        </div>
      </motion.section>

      {/* XP indicator */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="mt-8 flex items-center justify-center gap-2 text-sm text-surface-500"
      >
        <Trophy className="h-4 w-4 text-warning" />
        <span>{user.xp} XP — Level {user.level}</span>
      </motion.div>
    </div>
  )
}
