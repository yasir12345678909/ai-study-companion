import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { materials, englishFormats, urduFormats } from '@/data/mock-data'
import { StatusIndicator } from '@/components/ui/status-indicator'
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  AlertCircle,
  Clock,
  Eye,
  Check,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function TeacherReviewPage() {
  const navigate = useNavigate()
  
  const [pendingList, setPendingList] = useState(materials)
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0])
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)

  const handleAction = (id: string, status: 'teacher_verified' | 'rejected') => {
    setPendingList((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    )
    if (selectedMaterial?.id === id) {
      setSelectedMaterial((prev) => ({ ...prev, status }))
    }
    setFeedbackMessage(
      status === 'teacher_verified'
        ? 'Material approved and marked trusted for Class AI context.'
        : 'Material rejected.'
    )
    setTimeout(() => setFeedbackMessage(null), 3000)
  }

  return (
    <div className="min-h-screen bg-surface-950 text-surface-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/teacher')}
              className="p-2 rounded-full hover:bg-surface-800 text-surface-400 hover:text-surface-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-surface-50">Teacher Material Verification Queue</h1>
              <p className="text-xs text-surface-400">Review student uploads and control class AI retrieval trust.</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/teacher')}
            className="px-4 py-2 bg-surface-800 hover:bg-surface-700 text-surface-200 text-sm font-medium rounded-lg transition-colors border border-surface-700"
          >
            Back to Dashboard
          </button>
        </div>

        {feedbackMessage && (
          <div className="p-3 bg-brand-500/10 border border-brand-500/30 text-brand-300 rounded-lg text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-400" />
            {feedbackMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Submissions List */}
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-surface-400">
              Submitted Items ({pendingList.length})
            </h2>

            <div className="space-y-2">
              {pendingList.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMaterial(m)}
                  className={cn(
                    "p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-2",
                    selectedMaterial?.id === m.id
                      ? "bg-surface-800 border-brand-500 shadow-sm"
                      : "bg-surface-900 border-surface-800 hover:bg-surface-850 hover:border-surface-700"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold text-surface-400">{m.type}</span>
                    <StatusIndicator status={m.status} showLabel />
                  </div>
                  <h3 className="font-semibold text-surface-100 text-sm">{m.name || m.title}</h3>
                  <div className="flex items-center justify-between text-xs text-surface-400 pt-1 border-t border-surface-800/60">
                    <span>By: {m.uploadedBy || 'Student'}</span>
                    <span>{new Date(m.uploadedAt || m.createdAt || Date.now()).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Inspection Panel */}
          <div className="lg:col-span-7 bg-surface-900 border border-surface-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-start justify-between border-b border-surface-800 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-brand-400">Material Inspection</span>
                <h2 className="text-xl font-bold text-surface-50 mt-1">{selectedMaterial.name || selectedMaterial.title}</h2>
                <p className="text-xs text-surface-400 mt-0.5">Contributor: {selectedMaterial.uploadedBy || 'Student'}</p>
              </div>
              <StatusIndicator status={selectedMaterial.status} showLabel />
            </div>

            {/* Document Abstract & Quality Preview */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-surface-400">Content Sample & Extracted Text</h3>
              <div className="p-4 rounded-xl bg-surface-950 border border-surface-800 text-sm text-surface-300 leading-relaxed font-mono">
                "Definition of Momentum: Momentum is the product of mass and velocity. SI Unit: kg·m/s. Law of conservation: In an isolated system, total momentum before collision equals total momentum after collision. Derivation: F = Δp/Δt."
              </div>
            </div>

            {/* AI Trust Evaluation */}
            <div className="p-4 rounded-xl bg-surface-950/80 border border-surface-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 uppercase tracking-wide">
                <Sparkles className="w-4 h-4" />
                AI Syllabus Compatibility Audit
              </div>
              <p className="text-xs text-surface-300">
                Matches Class 10 Federal Board Physics syllabus Chapter 4. No conflicting formulas detected. High alignment with board past papers (2021–2024).
              </p>
            </div>

            {/* Verification Decision Controls */}
            <div className="pt-4 border-t border-surface-800 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-surface-400">Teacher Decision</span>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleAction(selectedMaterial.id, 'teacher_verified')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-success hover:bg-success/90 text-white rounded-xl text-sm font-semibold transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Approve for Class AI
                </button>
                <button
                  onClick={() => handleAction(selectedMaterial.id, 'rejected')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-danger/10 hover:bg-danger/20 text-danger border border-danger/30 rounded-xl text-sm font-semibold transition-colors"
                >
                  <X className="w-4 h-4" />
                  Reject Material
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
