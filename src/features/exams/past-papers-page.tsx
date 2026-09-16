import React, { useState } from 'react'
import { topicFrequencies } from '@/data/mock-data'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { TrendingUp, Scroll, BarChart3, Calendar, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'

type YearFilter = 'All' | '5 Year' | '3 Year' | '2 Year' | '1 Year'

export function PastPapersPage() {
  const [activeFilter, setActiveFilter] = useState<YearFilter>('All')
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null)

  const filters: YearFilter[] = ['All', '5 Year', '3 Year', '2 Year', '1 Year']

  const toggleTopic = (id: string) => {
    setExpandedTopic(expandedTopic === id ? null : id)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'text-danger bg-danger/10 border-danger/20'
      case 'medium': return 'text-warning bg-warning/10 border-warning/20'
      case 'low': return 'text-info bg-info/10 border-info/20'
      default: return 'text-surface-300 bg-surface-800 border-surface-700'
    }
  }

  return (
    <div className="min-h-screen bg-surface-950 text-surface-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-surface-50 mb-2 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-brand-500" />
            Exam Intelligence
          </h1>
          <p className="text-surface-400">
            Historical priority and pattern analysis across board papers and institutional tests.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-brand-500",
                activeFilter === filter 
                  ? "bg-brand-500 text-white shadow-sm" 
                  : "bg-surface-900 text-surface-300 hover:bg-surface-800 border border-surface-800"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Topic Frequency List */}
        <div className="bg-surface-900 border border-surface-800 rounded-xl overflow-hidden shadow-sm">
          <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-surface-800 bg-surface-900/50 text-xs font-semibold text-surface-400 uppercase tracking-wider">
            <div className="col-span-4">Topic</div>
            <div className="col-span-2 text-center">Historical Priority</div>
            <div className="col-span-2 text-center">Board App.</div>
            <div className="col-span-2 text-center">Class Tests</div>
            <div className="col-span-2 text-right">Typical Marks</div>
          </div>
          
          <div className="divide-y divide-surface-800">
            {topicFrequencies?.map((topic, index) => {
              const topicId = topic.id || `topic-${index}`
              const topicName = topic.name || topic.topic
              const boardAppearances = topic.boardCount ?? topic.totalAppearances ?? topic.appearances ?? 4
              const classTestCount = topic.classTestCount ?? 7
              const variants = topic.variantsCount ?? topic.variants ?? 3
              const isRecent = topic.recent ?? topic.recentAppearance ?? true
              const marks = topic.marksRange || topic.typicalMarks || '2–5'

              return (
                <div key={topicId} className="flex flex-col group">
                  <button 
                    onClick={() => toggleTopic(topicId)}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center hover:bg-surface-800/50 transition-colors focus:outline-none focus:bg-surface-800/50 text-left"
                  >
                    {/* Topic Name */}
                    <div className="col-span-1 md:col-span-4 flex items-start gap-3">
                      {isRecent ? (
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-success flex-shrink-0" title="Recent appearance" />
                      ) : (
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-transparent flex-shrink-0" />
                      )}
                      <div>
                        <div className="font-semibold text-surface-100 group-hover:text-brand-300 transition-colors">
                          {topicName}
                        </div>
                        <div className="text-xs text-surface-400 mt-1 flex items-center gap-2">
                          <span>{variants} variants</span>
                          {isRecent && <span className="text-success font-medium">• Recent</span>}
                        </div>
                      </div>
                    </div>

                    {/* Mobile-only stats row */}
                    <div className="md:hidden flex flex-wrap gap-2 mt-2">
                      <span className={cn("px-2 py-0.5 rounded text-[10px] font-semibold border uppercase tracking-wide", getPriorityColor(topic.priority))}>
                        {topic.priority}
                      </span>
                      <span className="text-xs text-surface-300 bg-surface-800 px-2 py-0.5 rounded">
                        Board: {boardAppearances}
                      </span>
                      <span className="text-xs text-surface-300 bg-surface-800 px-2 py-0.5 rounded">
                        Class: {classTestCount}
                      </span>
                      <span className="text-xs text-surface-300 bg-surface-800 px-2 py-0.5 rounded">
                        Marks: {marks}
                      </span>
                    </div>

                    {/* Desktop Stats */}
                    <div className="hidden md:flex col-span-2 justify-center">
                      <span className={cn("px-2.5 py-1 rounded-md text-xs font-semibold border uppercase tracking-wider", getPriorityColor(topic.priority))}>
                        {topic.priority}
                      </span>
                    </div>
                    
                    <div className="hidden md:flex col-span-2 justify-center items-center gap-1.5 text-surface-200">
                      <Scroll className="w-4 h-4 text-surface-500" />
                      <span className="font-medium">{boardAppearances}</span>
                    </div>
                    
                    <div className="hidden md:flex col-span-2 justify-center items-center gap-1.5 text-surface-200">
                      <TrendingUp className="w-4 h-4 text-surface-500" />
                      <span className="font-medium">{classTestCount}</span>
                    </div>
                    
                    <div className="hidden md:flex col-span-2 justify-end items-center gap-2">
                      <span className="text-sm font-medium text-surface-200 bg-surface-800 px-2.5 py-1 rounded-md border border-surface-700">
                        {marks}
                      </span>
                      {expandedTopic === topicId ? (
                        <ChevronUp className="w-5 h-5 text-surface-500 ml-2" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-surface-500 ml-2" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Details */}
                  {expandedTopic === topicId && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="overflow-hidden border-t border-surface-800 bg-surface-900/80"
                    >
                      <div className="p-4 pl-9 md:pl-12">
                        <h4 className="text-sm font-semibold text-surface-300 mb-3 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Years of Appearance
                        </h4>
                        {topic.years && topic.years.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {topic.years.map((year: number, i: number) => (
                              <span key={i} className="px-3 py-1 bg-surface-800 text-surface-200 text-sm rounded-md border border-surface-700">
                                {year}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-surface-500">No specific year data available.</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              )
            })}
            
            {(!topicFrequencies || topicFrequencies.length === 0) && (
              <div className="p-8 text-center text-surface-400">
                No historical data found for the selected filter.
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-3 p-4 bg-info/5 border border-info/20 rounded-xl text-info/90">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed">
            <strong>Disclaimer:</strong> Historical frequency analysis helps prioritize study by identifying patterns in past exams. 
            It highlights historical priority but <span className="font-semibold underline underline-offset-2">does not guarantee</span> future exam content. 
            Students should cover the entire syllabus.
          </p>
        </div>

      </div>
    </div>
  )
}
