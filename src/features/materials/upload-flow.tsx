import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { useSimulatedProgress } from '@/hooks/use-simulation'
import { 
  UploadCloud, 
  FileText, 
  Image as ImageIcon, 
  StickyNote, 
  X, 
  CheckCircle2, 
  ChevronLeft,
  Loader2,
  BookOpen
} from 'lucide-react'

type UploadState = 'select' | 'uploading' | 'processing' | 'ready'

const PROCESSING_STAGES = [
  'Reading pages...',
  'Extracting concepts...',
  'Finding formulas...',
  'Organizing content...',
  'Building questions...'
]

export function UploadFlow() {
  const navigate = useNavigate()
  const [state, setState] = useState<UploadState>('select')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [subject, setSubject] = useState('')
  const [chapter, setChapter] = useState('')
  
  const [uploadProgress, setUploadProgress] = useState(0)
  const [processingStageIndex, setProcessingStageIndex] = useState(-1)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleStartUpload = () => {
    if (!selectedFile || !subject || !chapter) return
    setState('uploading')
  }

  // Simulate upload
  useEffect(() => {
    if (state === 'uploading') {
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => setState('processing'), 500)
            return 100
          }
          return prev + Math.floor(Math.random() * 15) + 5
        })
      }, 300)
      return () => clearInterval(interval)
    }
  }, [state])

  // Simulate processing stages
  useEffect(() => {
    if (state === 'processing') {
      let currentStage = 0
      setProcessingStageIndex(0)
      
      const interval = setInterval(() => {
        currentStage++
        if (currentStage >= PROCESSING_STAGES.length) {
          clearInterval(interval)
          setTimeout(() => setState('ready'), 1000)
        } else {
          setProcessingStageIndex(currentStage)
        }
      }, 1500)
      
      return () => clearInterval(interval)
    }
  }, [state])

  const renderSelectState = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mx-auto max-w-2xl w-full"
    >
      <div className="mb-8">
        <button 
          onClick={() => navigate('/materials')}
          className="flex items-center gap-2 text-surface-500 hover:text-surface-900 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Materials
        </button>
        <h1 className="mt-6 text-3xl font-bold text-surface-900">Upload Material</h1>
        <p className="mt-2 text-surface-600">Add new content to your study library for AI analysis.</p>
      </div>

      <div className="space-y-6">
        <div 
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={cn(
            "relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 transition-colors",
            selectedFile 
              ? "border-brand-500 bg-brand-50" 
              : "border-surface-300 bg-surface-50 hover:bg-surface-100"
          )}
        >
          {selectedFile ? (
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-600 mb-4">
                <FileText className="h-8 w-8" />
              </div>
              <p className="font-medium text-surface-900">{selectedFile.name}</p>
              <p className="text-sm text-surface-500 mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              <button 
                onClick={() => setSelectedFile(null)}
                className="mt-4 text-sm font-medium text-danger hover:text-danger-600"
              >
                Remove file
              </button>
            </div>
          ) : (
            <>
              <UploadCloud className="h-12 w-12 text-surface-400 mb-4" />
              <p className="text-lg font-medium text-surface-900">Drag and drop or click to upload</p>
              <p className="text-sm text-surface-500 mt-2">Support for PDF, Image, and Text files up to 50MB</p>
              
              <div className="flex gap-4 mt-6">
                <div className="flex items-center gap-1.5 rounded-full bg-surface-200 px-3 py-1 text-xs font-medium text-surface-700">
                  <FileText className="h-3 w-3" /> PDF
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-surface-200 px-3 py-1 text-xs font-medium text-surface-700">
                  <ImageIcon className="h-3 w-3" /> Image
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-surface-200 px-3 py-1 text-xs font-medium text-surface-700">
                  <StickyNote className="h-3 w-3" /> Notes
                </div>
              </div>
            </>
          )}
          <input 
            type="file" 
            className="absolute inset-0 cursor-pointer opacity-0" 
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png,.txt"
          />
        </div>

        {selectedFile && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4 rounded-xl border border-surface-200 bg-surface-0 p-6"
          >
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">Subject</label>
              <select 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-lg border border-surface-300 bg-surface-0 px-3 py-2 text-surface-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                <option value="">Select subject...</option>
                <option value="physics">Physics (Class 10)</option>
                <option value="math">Mathematics (Class 10)</option>
                <option value="english">English (Class 10)</option>
                <option value="urdu">Urdu (Class 10)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">Chapter / Topic</label>
              <select 
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                disabled={!subject}
                className="w-full rounded-lg border border-surface-300 bg-surface-0 px-3 py-2 text-surface-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:opacity-50"
              >
                <option value="">Select chapter...</option>
                <option value="ch1">Chapter 1</option>
                <option value="ch2">Chapter 2</option>
                <option value="ch3">Chapter 3</option>
              </select>
            </div>
            <button
              onClick={handleStartUpload}
              disabled={!subject || !chapter}
              className="w-full mt-4 rounded-lg bg-brand-500 py-3 font-medium text-white transition-colors hover:bg-brand-600 disabled:bg-surface-300 disabled:text-surface-500"
            >
              Upload and Analyze
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )

  const renderUploadingState = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center max-w-md w-full mx-auto"
    >
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-brand-50 mb-8">
        <UploadCloud className="h-10 w-10 text-brand-500" />
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-surface-200"
          />
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray="301.59"
            strokeDashoffset={301.59 - (uploadProgress / 100) * 301.59}
            className="text-brand-500 transition-all duration-300 ease-out"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-surface-900 mb-2">Uploading file...</h2>
      <p className="text-surface-500 mb-8">{selectedFile?.name}</p>
      
      <div className="w-full bg-surface-200 rounded-full h-2 mb-2">
        <div 
          className="bg-brand-500 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${uploadProgress}%` }}
        />
      </div>
      <div className="flex justify-between w-full text-sm font-medium text-surface-600">
        <span>{uploadProgress}%</span>
        <span>{((selectedFile?.size || 0) * (uploadProgress/100) / 1024 / 1024).toFixed(1)} / {((selectedFile?.size || 0) / 1024 / 1024).toFixed(1)} MB</span>
      </div>
    </motion.div>
  )

  const renderProcessingState = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md w-full mx-auto"
    >
      <div className="text-center mb-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-surface-100 shadow-inner mb-6">
          <Loader2 className="h-10 w-10 text-brand-500 animate-spin" />
        </div>
        <h2 className="text-2xl font-bold text-surface-900 mb-2">Analyzing Material</h2>
        <p className="text-surface-500">Our AI is processing your document to create a tailored study experience.</p>
      </div>

      <div className="space-y-4">
        {PROCESSING_STAGES.map((stage, index) => {
          const isCompleted = index < processingStageIndex
          const isCurrent = index === processingStageIndex
          const isPending = index > processingStageIndex

          return (
            <motion.div
              key={stage}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "flex items-center gap-4 rounded-xl p-4 transition-colors",
                isCurrent ? "bg-surface-0 border border-brand-200 shadow-sm" : "bg-transparent"
              )}
            >
              <div className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
                isCompleted ? "bg-success text-white" : 
                isCurrent ? "bg-brand-100 text-brand-600" : "bg-surface-200 text-surface-400"
              )}>
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : isCurrent ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <div className="h-2 w-2 rounded-full bg-current" />
                )}
              </div>
              <span className={cn(
                "font-medium transition-colors",
                isCompleted ? "text-surface-900" :
                isCurrent ? "text-brand-700" : "text-surface-400"
              )}>
                {stage}
              </span>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )

  const renderReadyState = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center max-w-md w-full mx-auto text-center"
    >
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-success/10 text-success mb-6">
        <CheckCircle2 className="h-12 w-12" />
      </div>
      <h2 className="text-3xl font-bold text-surface-900 mb-2">Ready to study!</h2>
      <p className="text-surface-600 mb-8">
        We've analyzed <strong>{selectedFile?.name}</strong> and generated interactive content for you.
      </p>
      
      <div className="flex w-full gap-4">
        <button 
          onClick={() => navigate('/materials')}
          className="flex-1 rounded-lg border border-surface-300 bg-surface-0 py-3 font-medium text-surface-700 transition-colors hover:bg-surface-50"
        >
          Back to Library
        </button>
        <button 
          onClick={() => navigate('/materials/mat-1')}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-brand-500 py-3 font-medium text-white transition-colors hover:bg-brand-600"
        >
          <BookOpen className="h-4 w-4" />
          View Material
        </button>
      </div>
    </motion.div>
  )

  return (
    <div className="flex min-h-full flex-col bg-surface-50 p-6">
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={state}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {state === 'select' && renderSelectState()}
            {state === 'uploading' && renderUploadingState()}
            {state === 'processing' && renderProcessingState()}
            {state === 'ready' && renderReadyState()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
