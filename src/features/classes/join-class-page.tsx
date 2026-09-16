import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Phone, 
  ArrowRight, 
  ArrowLeft,
  Building,
  GraduationCap
} from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'
import { cn } from '@/lib/utils'

export function JoinClassPage() {
  const { classCode = 'PHY-10A' } = useParams<{ classCode: string }>()
  const navigate = useNavigate()
  const { 
    classes, 
    currentUser, 
    joinRequests, 
    submitJoinRequest 
  } = useAuthStore()

  // Look up class by join code
  const targetClass = classes.find(c => c.joinCode.toLowerCase() === classCode.toLowerCase()) || classes[0]
  
  // Look up any existing join request by this student for this class
  const existingRequest = joinRequests.find(r => 
    r.classId === targetClass?.id && 
    (r.studentId === currentUser.id || r.rollNumber === currentUser.rollNumber)
  )

  const [studentName, setStudentName] = useState(currentUser.name || '')
  const [rollNumber, setRollNumber] = useState(currentUser.rollNumber || '')
  const [submittedRequest, setSubmittedRequest] = useState(existingRequest || null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!studentName.trim() || !rollNumber.trim()) {
      setError('Please provide both student name and roll number.')
      return
    }

    const res = submitJoinRequest(targetClass.joinCode, studentName.trim(), rollNumber.trim())
    if (res.success && res.request) {
      setSubmittedRequest(res.request)
      setError(null)
    } else {
      setError(res.message)
    }
  }

  if (!targetClass) {
    return (
      <div className="min-h-screen bg-surface-950 text-surface-50 flex items-center justify-center p-4">
        <div className="p-8 max-w-md w-full bg-surface-900 border border-surface-800 rounded-2xl text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-danger mx-auto" />
          <h2 className="text-xl font-bold">Class Not Found</h2>
          <p className="text-sm text-surface-400">
            No active class matches code <code className="font-mono text-brand-300">{classCode}</code>.
          </p>
          <button
            onClick={() => navigate('/home')}
            className="px-4 py-2 rounded-xl bg-surface-800 hover:bg-surface-700 text-sm font-medium"
          >
            Return to Study Workspace
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-950 text-surface-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-brand-500/15 border border-brand-500/30 flex items-center justify-center text-brand-400 mx-auto">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-surface-0">
            Join Class Roster
          </h1>
          <p className="text-xs text-surface-400">
            Course-specific group registration (Spec v2 §14)
          </p>
        </div>

        {/* Class Overview Card */}
        <div className="bg-surface-900 border border-surface-800 rounded-2xl p-5 space-y-3 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-400">Target Class</span>
              <h2 className="text-lg font-bold text-surface-100">{targetClass.name}</h2>
              <p className="text-xs text-surface-400">Section {targetClass.section} • Class Level {targetClass.classLevel}</p>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-surface-950 border border-surface-750 font-mono text-xs text-brand-300 font-bold">
              {targetClass.joinCode}
            </span>
          </div>

          <div className="pt-2 border-t border-surface-800 text-xs space-y-1">
            <p className="text-surface-300">
              <strong className="text-surface-400">Class Representative:</strong> {targetClass.representativeTeacherName}
            </p>
            {targetClass.representativePhone && (
              <p className="text-surface-400 flex items-center gap-1.5 pt-0.5">
                <Phone className="w-3.5 h-3.5 text-surface-500" />
                Teacher Contact: <span className="text-surface-300 font-mono">{targetClass.representativePhone}</span>
              </p>
            )}
          </div>
        </div>

        {/* Main State Card */}
        <div className="bg-surface-900 border border-surface-800 rounded-2xl p-6 shadow-xl">
          
          {/* STATE 1: JOIN REQUEST FORM */}
          {!submittedRequest && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-surface-100 mb-1">Confirm Student Identity</h3>
                <p className="text-xs text-surface-400">
                  Your representative teacher requires your official roll number to approve class enrollment.
                </p>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-danger/10 border border-danger/30 text-danger text-xs font-semibold">
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-surface-300 uppercase tracking-wider">
                  Full Student Name
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Ahmed Khan"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-950 border border-surface-700 text-surface-100 text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-surface-300 uppercase tracking-wider">
                  Class Roll Number
                </label>
                <input
                  type="text"
                  required
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  placeholder="e.g. 1042"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-950 border border-surface-700 text-surface-100 text-sm font-mono focus:outline-none focus:border-brand-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-brand-500/20 mt-2"
              >
                <span>Submit Join Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STATE 2: PENDING APPROVAL */}
          {submittedRequest && submittedRequest.status === 'pending' && (
            <div className="text-center space-y-4 py-3">
              <div className="w-12 h-12 rounded-full bg-warning/15 border border-warning/30 flex items-center justify-center text-warning mx-auto">
                <Clock className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-bold text-surface-100">Join Request Pending</h3>
                <p className="text-xs text-surface-400 mt-1 max-w-xs mx-auto leading-relaxed">
                  Your request has been submitted for <strong>{targetClass.name}</strong> as <strong>{submittedRequest.studentName}</strong> (Roll #{submittedRequest.rollNumber}).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-surface-950 border border-surface-800 text-left text-xs space-y-1">
                <p className="text-surface-300 font-semibold">What happens next?</p>
                <p className="text-surface-400">
                  Representative Teacher <strong>{targetClass.representativeTeacherName}</strong> will review and verify your roll number against the class roster. Once approved, class materials and shared AI context will appear automatically.
                </p>
              </div>

              <button
                onClick={() => navigate('/home')}
                className="w-full py-2.5 px-4 rounded-xl bg-surface-800 hover:bg-surface-700 text-surface-200 text-xs font-semibold transition-colors"
              >
                Continue to Student Workspace
              </button>
            </div>
          )}

          {/* STATE 3: APPROVED */}
          {submittedRequest && submittedRequest.status === 'approved' && (
            <div className="text-center space-y-4 py-3">
              <div className="w-12 h-12 rounded-full bg-success/15 border border-success/30 flex items-center justify-center text-success mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-success">Enrollment Approved!</h3>
                <p className="text-xs text-surface-400 mt-1">
                  You are now an active member of <strong>{targetClass.name}</strong>.
                </p>
              </div>

              <button
                onClick={() => navigate(`/groups/${targetClass.id}`)}
                className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-colors"
              >
                View Class Materials & Group
              </button>
            </div>
          )}

          {/* STATE 4: REJECTED (WITH MANDATORY TEACHER CONTACT INFO SPEC V2 §14.2 & §14.3) */}
          {submittedRequest && submittedRequest.status === 'rejected' && (
            <div className="text-center space-y-4 py-3">
              <div className="w-12 h-12 rounded-full bg-danger/15 border border-danger/30 flex items-center justify-center text-danger mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-danger">Join Request Rejected</h3>
                <p className="text-xs text-surface-300 mt-1">
                  {submittedRequest.rejectionReason || 'The representative teacher was unable to verify your roll number.'}
                </p>
              </div>

              {/* Teacher Contact Info Promoted per Spec v2 §14.3 */}
              <div className="p-3.5 rounded-xl bg-surface-950 border border-surface-800 text-left text-xs space-y-1.5">
                <p className="text-surface-300 font-semibold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-brand-400" />
                  Contact Representative Teacher for Help:
                </p>
                <p className="text-surface-200 font-medium">
                  {targetClass.representativeTeacherName}
                </p>
                {targetClass.representativePhone && (
                  <p className="text-brand-300 font-mono">
                    {targetClass.representativePhone}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSubmittedRequest(null)}
                  className="flex-1 py-2 rounded-xl bg-surface-800 hover:bg-surface-700 text-surface-300 text-xs font-semibold transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate('/home')}
                  className="flex-1 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition-colors"
                >
                  Home
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  )
}
