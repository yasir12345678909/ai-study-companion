import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Target, Clock, BookOpen, ChevronRight, CheckCircle, RefreshCcw, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { todaysMissions, subjects } from '@/data/mock-data';

type PlannerState = 'planning' | 'generating' | 'generated';

export function StudyPlannerPage() {
  const [state, setState] = useState<PlannerState>('planning');
  const [targetScore, setTargetScore] = useState(85);
  const [hours, setHours] = useState(2);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['1']);

  const handleGenerate = () => {
    setState('generating');
    setTimeout(() => {
      setState('generated');
    }, 1500);
  };

  const toggleSubject = (id: string) => {
    setSelectedSubjects(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex-1 p-6 lg:p-10 bg-surface-950 text-surface-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-surface-0">Study Planner</h1>
          <p className="text-surface-400 mt-1 text-lg">AI-powered mission generation for your goals.</p>
        </div>

        <AnimatePresence mode="wait">
          {state === 'planning' && (
            <motion.div
              key="planning"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8 bg-surface-900 border border-surface-800 rounded-xl p-6 lg:p-8"
            >
              {/* Target Score */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-lg font-medium text-surface-0">
                  <Target className="w-5 h-5 text-brand-500" />
                  Target Score (%)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={targetScore}
                    onChange={(e) => setTargetScore(Number(e.target.value))}
                    className="flex-1 h-2 bg-surface-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
                  />
                  <span className="text-2xl font-bold text-brand-400 w-16 text-right">{targetScore}%</span>
                </div>
              </div>

              {/* Deadline */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-lg font-medium text-surface-0">
                  <Calendar className="w-5 h-5 text-brand-500" />
                  Exam Date
                </label>
                <input
                  type="date"
                  className="w-full bg-surface-800 border border-surface-700 text-surface-0 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              {/* Subjects */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-lg font-medium text-surface-0">
                  <BookOpen className="w-5 h-5 text-brand-500" />
                  Focus Subjects
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {subjects.map(subject => (
                    <button
                      key={subject.id}
                      onClick={() => toggleSubject(subject.id)}
                      className={cn(
                        "p-3 rounded-lg border text-left transition-colors flex items-center justify-between",
                        selectedSubjects.includes(subject.id)
                          ? "bg-brand-500/10 border-brand-500 text-brand-100"
                          : "bg-surface-800 border-surface-700 text-surface-300 hover:bg-surface-700"
                      )}
                    >
                      <span className="truncate">{subject.name}</span>
                      {selectedSubjects.includes(subject.id) && <CheckCircle className="w-4 h-4 text-brand-500" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Study Hours */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-lg font-medium text-surface-0">
                  <Clock className="w-5 h-5 text-brand-500" />
                  Daily Study Hours
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="6"
                    step="0.5"
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="flex-1 h-2 bg-surface-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
                  />
                  <span className="text-xl font-bold text-brand-400 w-16 text-right">{hours} hrs</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleGenerate}
                  disabled={selectedSubjects.length === 0}
                  className="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-lg font-medium py-4 rounded-xl transition-colors shadow-lg shadow-brand-500/20"
                >
                  Generate Study Plan
                </button>
              </div>
            </motion.div>
          )}

          {state === 'generating' && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 space-y-6"
            >
              <Loader2 className="w-16 h-16 text-brand-500 animate-spin" />
              <div className="text-xl font-medium text-surface-200">Analyzing your goals...</div>
              <div className="text-surface-400">Building optimal study missions</div>
            </motion.div>
          )}

          {state === 'generated' && (
            <motion.div
              key="generated"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              {/* Summary */}
              <div className="bg-surface-900 border border-surface-800 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-surface-0">Your AI Study Plan is Ready</h2>
                  <p className="text-surface-400 mt-1">Targeting {targetScore}% • {hours} hrs/day</p>
                </div>
                <button
                  onClick={() => setState('planning')}
                  className="flex items-center gap-2 px-4 py-2 bg-surface-800 hover:bg-surface-700 text-surface-200 rounded-lg transition-colors"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Regenerate
                </button>
              </div>

              {/* Today's Missions */}
              <div>
                <h3 className="text-lg font-medium text-surface-100 mb-4">Today's Missions</h3>
                <div className="space-y-3">
                  {todaysMissions.map((mission, i) => {
                    const subject = subjects.find(s => s.id === mission.subjectId);
                    const Icon = subject ? (subject.icon as any) : BookOpen;
                    return (
                      <motion.div
                        key={mission.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-surface-900 border border-surface-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn("p-3 rounded-lg", subject?.color || 'bg-surface-800')}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-surface-0">{mission.title}</h4>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-surface-800 text-surface-300 border border-surface-700">
                                {mission.type}
                              </span>
                            </div>
                            <p className="text-sm text-surface-400 mt-1">{subject?.name} • {mission.durationMinutes || mission.duration || 25} mins</p>
                          </div>
                        </div>
                        <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-medium transition-colors">
                          Start Studying
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
