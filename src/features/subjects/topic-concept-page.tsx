import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { physicsChapters, momentumQuestions } from '@/data/mock-data'
import { 
  ArrowLeft, 
  BookOpen, 
  Sparkles, 
  HelpCircle, 
  Lightbulb, 
  ChevronRight, 
  BookmarkCheck,
  RotateCcw,
  GitBranch
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function TopicConceptPage() {
  const { subjectId = 'physics', chapterId = 'ch4' } = useParams()
  const navigate = useNavigate()

  const chapter = physicsChapters.find((c) => c.id === chapterId) || physicsChapters[3]
  const [selectedTopic, setSelectedTopic] = useState('momentum')

  const topics = [
    {
      id: 'momentum',
      title: 'Linear Momentum & Inertia',
      summary: 'Quantity of motion defined as mass times velocity. Fundamental conserved vector.',
      formula: 'p = m · v',
      siUnit: 'kg·m/s (or N·s)',
      keyQuestionsCount: 4,
      priority: 'high'
    },
    {
      id: 'newton-second',
      title: 'Newton\'s Second Law in Momentum Terms',
      summary: 'The rate of change of momentum is directly proportional to applied force and occurs along its line of action.',
      formula: 'F = Δp / Δt = m · a',
      siUnit: 'Newton (N)',
      keyQuestionsCount: 3,
      priority: 'high'
    },
    {
      id: 'conservation',
      title: 'Law of Conservation of Momentum',
      summary: 'In an isolated system devoid of unbalanced external forces, total initial momentum matches total final momentum.',
      formula: 'm₁u₁ + m₂u₂ = m₁v₁ + m₂v₂',
      siUnit: 'kg·m/s',
      keyQuestionsCount: 5,
      priority: 'high'
    },
    {
      id: 'impulse',
      title: 'Impulse of a Force',
      summary: 'Product of a substantial force and the fleeting time interval over which it acts.',
      formula: 'J = F · Δt = Δp',
      siUnit: 'N·s',
      keyQuestionsCount: 2,
      priority: 'medium'
    }
  ]

  const activeTopicData = topics.find(t => t.id === selectedTopic) || topics[0]

  return (
    <div className="min-h-screen bg-surface-950 text-surface-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Navigation */}
        <div className="flex items-center gap-3 text-sm text-surface-400">
          <button
            onClick={() => navigate(`/subjects/${subjectId}/${chapterId}`)}
            className="p-2 rounded-full hover:bg-surface-800 text-surface-400 hover:text-surface-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="capitalize">{subjectId}</span>
          <span>&gt;</span>
          <span>{chapter.title || chapter.name}</span>
          <span>&gt;</span>
          <span className="text-surface-200 font-medium">Core Concepts</span>
        </div>

        {/* Header */}
        <div className="bg-surface-900 border border-surface-800 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-brand-500/10 text-brand-400 uppercase tracking-wider">
              Concept Mastery
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-surface-50 mt-1">
              {chapter.title || chapter.name} Concepts
            </h1>
            <p className="text-surface-400 text-sm mt-1">
              Select a concept to review definitions, governing equations, and direct board exam questions.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/subjects/${subjectId}/${chapterId}/flowchart`)}
              className="flex items-center gap-2 px-3.5 py-2 bg-surface-800 hover:bg-surface-700 text-surface-200 rounded-lg text-sm font-medium transition-colors border border-surface-700"
            >
              <GitBranch className="w-4 h-4 text-brand-400" />
              Flowchart
            </button>
            <button
              onClick={() => navigate('/tutor')}
              className="flex items-center gap-2 px-3.5 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Ask AI
            </button>
          </div>
        </div>

        {/* Split Concept View */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Concept Selector List */}
          <div className="md:col-span-4 space-y-2">
            <h2 className="text-xs uppercase font-bold tracking-wider text-surface-400 px-1">
              Chapter Concepts ({topics.length})
            </h2>
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTopic(t.id)}
                className={cn(
                  "w-full text-left p-4 rounded-xl transition-all border",
                  selectedTopic === t.id
                    ? "bg-surface-800 border-brand-500/60 shadow-sm"
                    : "bg-surface-900 border-surface-800 hover:bg-surface-850 hover:border-surface-700"
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded",
                    t.priority === 'high' ? "bg-danger/10 text-danger" : "bg-warning/10 text-warning"
                  )}>
                    {t.priority} Priority
                  </span>
                  <span className="text-xs text-surface-400">
                    {t.keyQuestionsCount} Qs
                  </span>
                </div>
                <h3 className="font-semibold text-surface-100 text-sm">{t.title}</h3>
                <p className="text-xs text-surface-400 mt-1 line-clamp-1">{t.formula}</p>
              </button>
            ))}
          </div>

          {/* Active Concept Details */}
          <div className="md:col-span-8 bg-surface-900 border border-surface-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-surface-800 pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-400">Concept Deep Dive</span>
              <h2 className="text-2xl font-bold text-surface-50 mt-1">{activeTopicData.title}</h2>
              <p className="text-surface-300 mt-2 text-base leading-relaxed">{activeTopicData.summary}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface-950 border border-surface-800">
                <span className="text-xs uppercase font-semibold text-surface-400">Mathematical Formula</span>
                <p className="font-mono text-xl text-brand-300 mt-1">{activeTopicData.formula}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-950 border border-surface-800">
                <span className="text-xs uppercase font-semibold text-surface-400">SI Measurement Unit</span>
                <p className="font-mono text-xl text-emerald-400 mt-1">{activeTopicData.siUnit}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm uppercase font-bold tracking-wider text-surface-400 mb-3">
                High-Frequency Board Questions on this Concept
              </h3>
              <div className="divide-y divide-surface-800 rounded-xl border border-surface-800 overflow-hidden">
                {momentumQuestions.slice(0, activeTopicData.keyQuestionsCount).map((q) => (
                  <div key={q.id} className="p-4 bg-surface-950/40 hover:bg-surface-850 flex items-center justify-between gap-4 transition-colors">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-surface-800 text-surface-300">
                          {q.type}
                        </span>
                        <span className="text-xs text-surface-400">{q.marks} Marks</span>
                      </div>
                      <p className="text-sm font-medium text-surface-200">{q.text}</p>
                    </div>
                    <button
                      onClick={() => navigate(`/questions/${q.id}`)}
                      className="px-3 py-1.5 bg-surface-800 hover:bg-brand-600 text-surface-200 hover:text-white rounded-lg text-xs font-semibold transition-colors shrink-0"
                    >
                      Study Answer
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
