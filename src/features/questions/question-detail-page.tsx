import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { momentumQuestions } from '@/data/mock-data'
import type { AnswerMode, AnswerSection } from '@/types'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { 
  ArrowLeft, 
  TrendingUp, 
  BookmarkPlus, 
  CheckCircle, 
  Sparkles, 
  AlertTriangle, 
  Scroll, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react'

export function QuestionDetailPage() {
  const { questionId } = useParams<{ questionId: string }>()
  const navigate = useNavigate()
  
  // Find the question, or default to first for preview
  const question = momentumQuestions?.find(q => q.id === questionId) || momentumQuestions?.[0]
  
  const [activeMode, setActiveMode] = useState<AnswerMode>('exam')
  const [showMistake, setShowMistake] = useState(false)
  const [showVariants, setShowVariants] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isLearned, setIsLearned] = useState(false)

  if (!question) {
    return <div className="p-8 text-surface-500">Question not found.</div>
  }

  const renderAnswerSection = (section: AnswerSection, index: number) => {
    switch (section.type) {
      case 'formula':
        return (
          <div key={index} className="my-4 pl-4 border-l-4 border-brand-500 bg-surface-200/50 p-3 rounded-r-md">
            {section.label && <div className="text-xs font-semibold text-surface-400 mb-1 uppercase tracking-wider">{section.label}</div>}
            <code className="font-mono text-lg text-brand-300">{section.content}</code>
          </div>
        )
      case 'unit':
        return (
          <div key={index} className="my-4">
            {section.label && <span className="text-sm font-semibold text-surface-400 mr-2">{section.label}:</span>}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-surface-300 text-surface-100">
              {section.content}
            </span>
          </div>
        )
      case 'highlight':
        return (
          <div key={index} className="my-4 p-3 bg-brand-500/10 rounded-md text-brand-100">
            {section.label && <div className="text-sm font-semibold text-brand-400 mb-1">{section.label}</div>}
            <p>{section.content}</p>
          </div>
        )
      case 'step':
        return (
          <div key={index} className="my-3 pl-4 border-l-2 border-surface-600 relative">
            <span className="absolute -left-2.5 top-0 flex items-center justify-center w-5 h-5 rounded-full bg-surface-700 text-xs font-medium text-surface-200 border border-surface-600">
              {index + 1}
            </span>
            {section.label && <div className="text-sm font-semibold text-surface-300 mb-1">{section.label}</div>}
            <p className="text-surface-100">{section.content}</p>
          </div>
        )
      case 'definition':
      case 'text':
      default:
        return (
          <div key={index} className="my-4">
            {section.label && <h4 className="text-md font-semibold text-surface-200 mb-1">{section.label}</h4>}
            <p className="text-surface-100 leading-relaxed">{section.content}</p>
          </div>
        )
    }
  }

  const examSections = question.answer?.exam || []
  const easySections = question.answer?.easy || []
  const revisionBullets = question.answer?.revision || []

  return (
    <div className="min-h-screen bg-surface-950 text-surface-50 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Navigation & Breadcrumb */}
        <div className="flex items-center gap-4 text-sm text-surface-400">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-surface-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2">
            <span className="capitalize">{question.subjectId || 'Physics'}</span>
            <span>&gt;</span>
            <span>Chapter 4</span>
            <span>&gt;</span>
            <span className="text-surface-200 truncate max-w-[200px]">Question Detail</span>
          </nav>
        </div>

        {/* Question Header */}
        <div className="bg-surface-900 border border-surface-800 rounded-xl p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-brand-500/10 text-brand-400 border border-brand-500/20">
              {question.type}
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-surface-800 text-surface-300">
              {question.marks || 3} Marks
            </span>
            {question.priority === 'high' && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-danger/10 text-danger border border-danger/20">
                <TrendingUp className="w-3 h-3" />
                High Priority
              </span>
            )}
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-warning/10 text-warning border border-warning/20">
              <Scroll className="w-3 h-3" />
              Appeared {question.paperAppearances || 4} times
            </span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-semibold text-surface-50 leading-tight">
            {question.text}
          </h1>
        </div>

        {/* Answer Modes Toggle */}
        <div className="flex flex-wrap gap-2 p-1 bg-surface-900 rounded-lg w-fit">
          <button
            onClick={() => setActiveMode('exam')}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500",
              activeMode === 'exam' ? "bg-surface-700 text-surface-50 shadow-sm" : "text-surface-400 hover:text-surface-200 hover:bg-surface-800"
            )}
          >
            Exam Answer
          </button>
          <button
            onClick={() => setActiveMode('easy')}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 flex items-center gap-2",
              activeMode === 'easy' ? "bg-surface-700 text-surface-50 shadow-sm" : "text-surface-400 hover:text-surface-200 hover:bg-surface-800"
            )}
          >
            Easy Explanation
            <span className="px-1.5 py-0.5 rounded-sm bg-brand-500 text-white text-[10px] uppercase">Simplified</span>
          </button>
          <button
            onClick={() => setActiveMode('revision')}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500",
              activeMode === 'revision' ? "bg-surface-700 text-surface-50 shadow-sm" : "text-surface-400 hover:text-surface-200 hover:bg-surface-800"
            )}
          >
            Quick Revision
          </button>
        </div>

        {/* Answer Content */}
        <motion.div 
          key={activeMode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-surface-900 border border-surface-800 rounded-xl p-6 shadow-sm min-h-[200px]"
        >
          {activeMode === 'exam' && (
            <div className="space-y-6">
              {examSections.map((section, idx) => renderAnswerSection(section, idx))}
            </div>
          )}

          {activeMode === 'easy' && (
            <div className="space-y-6">
              <div className="bg-brand-500/10 border border-brand-500/20 rounded-lg p-3 text-xs text-brand-300">
                Academic simplification preserves facts and formulas while phrasing concepts in plain language.
              </div>
              {Array.isArray(easySections) ? (
                easySections.map((section: any, idx: number) => renderAnswerSection(section, idx))
              ) : (
                <p className="text-surface-100 leading-relaxed">{easySections}</p>
              )}
            </div>
          )}

          {activeMode === 'revision' && (
            <ul className="space-y-3 list-disc list-inside text-surface-100">
              {revisionBullets.map((bullet, idx) => (
                <li key={idx} className="leading-relaxed">{bullet}</li>
              ))}
            </ul>
          )}
        </motion.div>

        {/* Common Mistake */}
        {question.commonMistake && (
          <div className="border border-warning/20 rounded-xl overflow-hidden bg-surface-900">
            <button 
              onClick={() => setShowMistake(!showMistake)}
              className="w-full flex items-center justify-between p-4 bg-warning/5 hover:bg-warning/10 transition-colors focus:outline-none focus:ring-2 focus:ring-warning"
              aria-expanded={showMistake}
            >
              <div className="flex items-center gap-2 text-warning">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-semibold">Common Mistake to Avoid</span>
              </div>
              {showMistake ? <ChevronUp className="w-5 h-5 text-warning" /> : <ChevronDown className="w-5 h-5 text-warning" />}
            </button>
            
            {showMistake && (
              <div className="p-4 bg-warning/5 border-t border-warning/10 text-surface-200">
                <p>{question.commonMistake}</p>
              </div>
            )}
          </div>
        )}

        {/* Past Paper Variants */}
        <div className="border border-surface-800 rounded-xl overflow-hidden bg-surface-900">
          <button 
            onClick={() => setShowVariants(!showVariants)}
            className="w-full flex items-center justify-between p-4 hover:bg-surface-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
            aria-expanded={showVariants}
          >
            <div className="flex items-center gap-2 text-surface-200">
              <Scroll className="w-5 h-5 text-surface-400" />
              <span className="font-semibold">Past Paper Variants ({question.variants || 4} historical variants)</span>
            </div>
            {showVariants ? <ChevronUp className="w-5 h-5 text-surface-400" /> : <ChevronDown className="w-5 h-5 text-surface-400" />}
          </button>
          
          {showVariants && (
            <div className="p-4 border-t border-surface-800 bg-surface-800/50">
              <ul className="space-y-3">
                <li className="flex gap-3 text-surface-200 text-sm">
                  <span className="text-surface-500 mt-0.5">•</span>
                  <span>"State Newton's second law of motion in terms of momentum." (Federal Board 2023)</span>
                </li>
                <li className="flex gap-3 text-surface-200 text-sm">
                  <span className="text-surface-500 mt-0.5">•</span>
                  <span>"What is momentum? Give its formula and write down the SI unit." (Federal Board 2024)</span>
                </li>
                <li className="flex gap-3 text-surface-200 text-sm">
                  <span className="text-surface-500 mt-0.5">•</span>
                  <span>"Show that the rate of change of momentum equals applied force." (Federal Board 2022)</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-surface-800">
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className={cn(
              "flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500",
              isSaved ? "bg-brand-600 text-white" : "bg-surface-800 hover:bg-surface-700 text-surface-100"
            )}
          >
            <BookmarkPlus className="w-4 h-4" />
            {isSaved ? 'Saved in Notes' : 'Save for Later'}
          </button>

          <button 
            onClick={() => setIsLearned(!isLearned)}
            className={cn(
              "flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-success",
              isLearned ? "bg-success text-white" : "bg-success/10 hover:bg-success/20 text-success"
            )}
          >
            <CheckCircle className="w-4 h-4" />
            {isLearned ? 'Marked as Learned ✓' : 'Mark as Learned'}
          </button>

          <button 
            onClick={() => navigate('/tutor')}
            className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <Sparkles className="w-4 h-4" />
            Ask AI Tutor
          </button>
        </div>

      </div>
    </div>
  )
}
