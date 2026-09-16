import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Building2, 
  GraduationCap, 
  Layers, 
  BookCheck, 
  Hash, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  BookOpen
} from 'lucide-react'
import { 
  pakistanBoards, 
  getClassesForBoard, 
  getStreamsForClass, 
  getCombinationsForStream,
  type BoardConfig,
  type ClassLevel,
  type StreamOption,
  type SubjectCombination
} from '@/data/curriculum-config'
import { useAuthStore } from '@/stores/auth-store'
import { cn } from '@/lib/utils'

export function AcademicProfileFlow() {
  const navigate = useNavigate()
  const { updateAcademicProfile } = useAuthStore()

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1)
  
  // Selections
  const [selectedBoardId, setSelectedBoardId] = useState<string>('fbise')
  const [selectedClassLevel, setSelectedClassLevel] = useState<number>(10)
  const [selectedStreamId, setSelectedStreamId] = useState<string>('sci-cs')
  const [selectedCombinationId, setSelectedCombinationId] = useState<string>('ssc-cs-std')
  const [rollNumber, setRollNumber] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  // Derived options from configuration
  const currentBoard = pakistanBoards.find(b => b.id === selectedBoardId) || pakistanBoards[0]
  const availableClasses = getClassesForBoard(selectedBoardId)
  const availableStreams = getStreamsForClass(selectedBoardId, selectedClassLevel)
  const currentStream = availableStreams.find(s => s.id === selectedStreamId) || availableStreams[0]
  const availableCombinations = getCombinationsForStream(selectedBoardId, selectedClassLevel, selectedStreamId)
  const currentCombination = availableCombinations.find(c => c.id === selectedCombinationId) || availableCombinations[0]

  const handleBoardSelect = (boardId: string) => {
    setSelectedBoardId(boardId)
    // Update cascade
    const classes = getClassesForBoard(boardId)
    const firstClass = classes[0]?.level || 10
    setSelectedClassLevel(firstClass)
    const streams = getStreamsForClass(boardId, firstClass)
    const firstStream = streams[0]?.id || 'sci-bio'
    setSelectedStreamId(firstStream)
    const combs = getCombinationsForStream(boardId, firstClass, firstStream)
    setSelectedCombinationId(combs[0]?.id || '')
    setStep(2)
  }

  const handleClassSelect = (level: number) => {
    setSelectedClassLevel(level)
    const streams = getStreamsForClass(selectedBoardId, level)
    const firstStream = streams[0]?.id || ''
    setSelectedStreamId(firstStream)
    const combs = getCombinationsForStream(selectedBoardId, level, firstStream)
    setSelectedCombinationId(combs[0]?.id || '')
    setStep(3)
  }

  const handleStreamSelect = (streamId: string) => {
    setSelectedStreamId(streamId)
    const combs = getCombinationsForStream(selectedBoardId, selectedClassLevel, streamId)
    setSelectedCombinationId(combs[0]?.id || '')
    setStep(4)
  }

  const handleCombinationSelect = (combId: string) => {
    setSelectedCombinationId(combId)
    setStep(5)
  }

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault()
    if (!rollNumber.trim()) {
      setError('Official board or school roll number is required.')
      return
    }

    if (!currentCombination) {
      setError('Please select a valid subject combination.')
      return
    }

    // Save complete academic profile
    updateAcademicProfile({
      boardId: currentBoard.id,
      boardName: currentBoard.shortName,
      classLevel: selectedClassLevel,
      streamId: currentStream.id,
      streamName: currentStream.name,
      combinationId: currentCombination.id,
      combinationName: currentCombination.name,
      subjects: currentCombination.subjects.map(s => s.name),
      rollNumber: rollNumber.trim(),
      completedAt: new Date().toISOString()
    })

    // Navigate to student home
    navigate('/home', { replace: true })
  }

  return (
    <div className="min-h-screen bg-surface-950 text-surface-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl w-full mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Pakistan Academic Setup (Spec v2 §10)
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-surface-0">
            Set Up Your Academic Profile
          </h1>
          <p className="text-surface-400 text-sm max-w-md mx-auto">
            StudyPilot configures your course materials, past papers, and AI explanations according to your exact syllabus.
          </p>
        </div>

        {/* Multi-Step Indicator */}
        <div className="flex items-center justify-between px-2">
          {[
            { num: 1, label: 'Board' },
            { num: 2, label: 'Class' },
            { num: 3, label: 'Stream' },
            { num: 4, label: 'Subjects' },
            { num: 5, label: 'Roll #' }
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center gap-1">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                step === s.num ? "bg-brand-500 text-white shadow-lg ring-4 ring-brand-500/20" :
                step > s.num ? "bg-success text-surface-950" : "bg-surface-900 border border-surface-800 text-surface-400"
              )}>
                {step > s.num ? '✓' : s.num}
              </div>
              <span className="text-[11px] font-medium text-surface-400">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Step Container */}
        <div className="bg-surface-900 border border-surface-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          
          {/* STEP 1: BOARD SELECTION */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-surface-100 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-brand-400" />
                  Select Your Examination Board
                </h3>
                <p className="text-xs text-surface-400 mt-0.5">
                  Pakistan curricula only for v1 (Federal & Provincial Boards).
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {pakistanBoards.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => handleBoardSelect(b.id)}
                    className={cn(
                      "p-4 rounded-xl border text-left transition-all flex items-center justify-between group",
                      selectedBoardId === b.id 
                        ? "bg-brand-500/10 border-brand-500 text-surface-0 shadow-sm" 
                        : "bg-surface-950/60 border-surface-800 hover:border-surface-700 hover:bg-surface-850"
                    )}
                  >
                    <div>
                      <p className="font-bold text-sm text-surface-100 group-hover:text-brand-300 transition-colors">
                        {b.shortName}
                      </p>
                      <p className="text-xs text-surface-400 mt-0.5">{b.name}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-surface-500 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: CLASS SELECTION */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-surface-100 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-brand-400" />
                    Select Your Class Level
                  </h3>
                  <p className="text-xs text-surface-400 mt-0.5">{currentBoard.shortName}</p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-surface-400 hover:text-surface-200 flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {availableClasses.map((cls) => (
                  <button
                    key={cls.code}
                    onClick={() => handleClassSelect(cls.level)}
                    className={cn(
                      "p-4 rounded-xl border text-left transition-all flex flex-col justify-between group",
                      selectedClassLevel === cls.level 
                        ? "bg-brand-500/10 border-brand-500 text-surface-0" 
                        : "bg-surface-950/60 border-surface-800 hover:border-surface-700 hover:bg-surface-850"
                    )}
                  >
                    <span className="font-bold text-base text-surface-100 group-hover:text-brand-300">
                      {cls.name}
                    </span>
                    <span className="text-xs text-surface-400 mt-2 font-mono">
                      {cls.streams.length} specialized streams available
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: STREAM / PROGRAM SELECTION */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-surface-100 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-brand-400" />
                    Select Your Academic Stream
                  </h3>
                  <p className="text-xs text-surface-400 mt-0.5">
                    Class {selectedClassLevel} • {currentBoard.shortName}
                  </p>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-surface-400 hover:text-surface-200 flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>

              <div className="space-y-2.5 pt-2">
                {availableStreams.map((stream) => (
                  <button
                    key={stream.id}
                    onClick={() => handleStreamSelect(stream.id)}
                    className={cn(
                      "w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between group",
                      selectedStreamId === stream.id 
                        ? "bg-brand-500/10 border-brand-500 text-surface-0 shadow-sm" 
                        : "bg-surface-950/60 border-surface-800 hover:border-surface-700 hover:bg-surface-850"
                    )}
                  >
                    <div>
                      <span className="font-bold text-sm text-surface-100 group-hover:text-brand-300">
                        {stream.name}
                      </span>
                      <p className="text-xs text-surface-400 mt-0.5">{stream.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-surface-500 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: DYNAMIC SUBJECT COMBINATION SELECTION */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-surface-100 flex items-center gap-2">
                    <BookCheck className="w-5 h-5 text-brand-400" />
                    Select Subject Combination
                  </h3>
                  <p className="text-xs text-surface-400 mt-0.5">
                    Stream: {currentStream.name} (Derived from curriculum config)
                  </p>
                </div>
                <button
                  onClick={() => setStep(3)}
                  className="text-xs text-surface-400 hover:text-surface-200 flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>

              <div className="space-y-3 pt-2">
                {availableCombinations.map((comb) => (
                  <button
                    key={comb.id}
                    onClick={() => handleCombinationSelect(comb.id)}
                    className={cn(
                      "w-full p-4 rounded-xl border text-left transition-all space-y-2 group",
                      selectedCombinationId === comb.id 
                        ? "bg-brand-500/10 border-brand-500 text-surface-0 shadow-sm" 
                        : "bg-surface-950/60 border-surface-800 hover:border-surface-700 hover:bg-surface-850"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-surface-100 group-hover:text-brand-300">
                        {comb.name}
                      </span>
                      <ArrowRight className="w-4 h-4 text-surface-500 group-hover:text-brand-400" />
                    </div>
                    <p className="text-xs text-surface-400">{comb.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {comb.subjects.map((sub) => (
                        <span key={sub.id} className={cn(
                          "px-2 py-0.5 rounded text-[11px] font-medium",
                          sub.isCompulsory ? "bg-surface-800 text-surface-400" : "bg-brand-500/20 text-brand-300 font-semibold"
                        )}>
                          {sub.name}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: ROLL NUMBER & CONFIRMATION */}
          {step === 5 && (
            <form onSubmit={handleFinish} className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-surface-100 flex items-center gap-2">
                    <Hash className="w-5 h-5 text-brand-400" />
                    Enter Official Roll Number
                  </h3>
                  <p className="text-xs text-surface-400 mt-0.5">
                    Spec v2 §10: Roll number is mandatory for academic accountability and class roster matching.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="text-xs text-surface-400 hover:text-surface-200 flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>

              {/* Summary Pill */}
              <div className="p-3.5 rounded-xl bg-surface-950 border border-surface-800 space-y-1 text-xs">
                <p className="text-surface-300 font-semibold">Configured Course Curriculum:</p>
                <p className="text-surface-400">
                  {currentBoard.shortName} • Class {selectedClassLevel} • {currentStream.name} • {currentCombination.name}
                </p>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-danger/10 border border-danger/30 text-danger text-xs font-semibold">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-semibold text-surface-300 uppercase tracking-wider">
                  Board / School Roll Number
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={rollNumber}
                  onChange={(e) => {
                    setRollNumber(e.target.value)
                    setError(null)
                  }}
                  placeholder="e.g. 1042 or FBISE-99234"
                  className="w-full px-4 py-3 rounded-xl bg-surface-950 border border-surface-700 text-surface-100 placeholder:text-surface-500 font-mono text-base focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-brand-500/20"
              >
                <span>Finish Setup & Enter Study Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  )
}
