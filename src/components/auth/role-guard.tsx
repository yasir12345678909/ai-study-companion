import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth-store'
import { ShieldAlert, ArrowLeft } from 'lucide-react'
import type { UserRole } from '@/types'

interface RoleGuardProps {
  allowedRoles: UserRole[]
  children: React.ReactNode
}

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const { currentUser, isAuthenticated } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Student Incomplete Academic Profile Check (Spec v2 §10)
  if (currentUser.role === 'student' && !currentUser.academicProfile && location.pathname !== '/onboarding/academic') {
    return <Navigate to="/onboarding/academic" replace />
  }

  // Check if current role or alias matches allowed roles ('admin' is alias for 'management')
  const roleMatches = allowedRoles.includes(currentUser.role) || 
    (currentUser.role === 'management' && allowedRoles.includes('admin')) ||
    (currentUser.role === 'admin' && allowedRoles.includes('management'))

  if (!roleMatches) {
    // Non-Negotiable Rule (Spec v2 §20):
    // "Never redirect users to another role's dashboard to handle a permission problem. Use role-aware empty/error states rather than exposing another role's interface."
    return (
      <div className="min-h-screen bg-surface-950 text-surface-50 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-surface-900 border border-surface-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-danger/15 text-danger border border-danger/30 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-surface-100">Access Restricted</h2>
            <p className="text-sm text-surface-400 leading-relaxed">
              This area requires credentials for: <span className="font-semibold text-surface-200 capitalize">{allowedRoles.join(', ')}</span>.
            </p>
            <p className="text-xs text-surface-500">
              You are currently signed in as <strong className="text-surface-300">{currentUser.name}</strong> with role <span className="capitalize font-mono text-brand-400">[{currentUser.role}]</span>.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                if (currentUser.role === 'teacher') navigate('/teacher')
                else if (currentUser.role === 'management' || currentUser.role === 'admin') navigate('/admin')
                else navigate('/home')
              }}
              className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to My Authorized Workspace</span>
            </button>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-2.5 px-4 rounded-xl bg-surface-800 hover:bg-surface-700 text-surface-300 text-xs font-semibold transition-colors"
            >
              Switch Account Persona
            </button>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
