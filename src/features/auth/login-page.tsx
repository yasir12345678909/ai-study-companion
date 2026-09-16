import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { 
  Sparkles, 
  GraduationCap, 
  Users, 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Building,
  Sun,
  Moon,
  Mail,
  Lock,
  User as UserIcon
} from 'lucide-react'
import { useAuthStore, seedUsers } from '@/stores/auth-store'
import { useAppStore } from '@/stores/app-store'
import { cn } from '@/lib/utils'

export function LoginPage() {
  const navigate = useNavigate()
  const { loginAs, currentUser } = useAuthStore()
  const { theme, toggleTheme } = useAppStore()

  const [authTab, setAuthTab] = useState<'persona' | 'credentials'>('persona')
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
  const [selectedPersona, setSelectedPersona] = useState<string>('returning-student')
  const [isSigningIn, setIsSigningIn] = useState(false)
  
  // Credentials simulation form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [roleSelection, setRoleSelection] = useState<'student' | 'teacher' | 'management'>('student')

  const personas = [
    {
      id: 'returning-student',
      title: 'Returning Student',
      subtitle: 'Class 10 (FBISE) • ICS • Roll #1042',
      badge: 'Student Active',
      badgeColor: 'bg-brand-500/10 text-brand-600 border-brand-500/30',
      icon: GraduationCap,
      description: 'Pre-configured Pakistani academic profile. Direct routing to Student Workspace (/home).'
    },
    {
      id: 'new-student',
      title: 'New Student Signup',
      subtitle: 'Unregistered • Profile Incomplete',
      badge: 'Needs Setup',
      badgeColor: 'bg-warning/15 text-warning border-warning/30',
      icon: Sparkles,
      description: 'Triggers mandatory Pakistan Academic Onboarding (Board → Class → Stream → Subjects → Roll #).'
    },
    {
      id: 'rep-teacher',
      title: 'Class Representative Teacher',
      subtitle: 'Mr. Asif Ahmed • Class 10-A Admin Teacher',
      badge: 'Verified Rep',
      badgeColor: 'bg-success/15 text-success border-success/30',
      icon: Users,
      description: 'Authorized to approve/reject student join requests, add/remove students, and publish verified notes.'
    },
    {
      id: 'standard-teacher',
      title: 'Verified Subject Teacher',
      subtitle: 'Ms. Fatima Noor • Chemistry Teacher (Non-Rep)',
      badge: 'Verified Non-Rep',
      badgeColor: 'bg-info/15 text-info border-info/30',
      icon: Users,
      description: 'Teaching and materials permissions active; class membership controls strictly restricted.'
    },
    {
      id: 'pending-teacher',
      title: 'New Teacher Signup',
      subtitle: 'Mr. Bilal Farooq • Pending Review',
      badge: 'Pending Verification',
      badgeColor: 'bg-warning/15 text-warning border-warning/30',
      icon: Clock,
      description: 'Starts in Read-Only mode. Privileged actions blocked until Institutional Management approves.'
    },
    {
      id: 'management',
      title: 'Institutional Management',
      subtitle: 'Dr. Sarah Khan • Principal & Admin Office',
      badge: 'Management',
      badgeColor: 'bg-purple-500/15 text-purple-600 border-purple-500/30',
      icon: Shield,
      description: 'Institutional authority: verify/reject pending teachers, allocate classes, and oversee curriculum.'
    },
  ]

  const routeUserAfterAuth = (personaKey: string) => {
    if (personaKey === 'returning-student') {
      navigate('/home', { replace: true })
    } else if (personaKey === 'new-student') {
      navigate('/onboarding/academic', { replace: true })
    } else if (personaKey === 'pending-teacher' || personaKey === 'rep-teacher' || personaKey === 'standard-teacher') {
      navigate('/teacher', { replace: true })
    } else if (personaKey === 'management') {
      navigate('/admin', { replace: true })
    }
  }

  const handleSignIn = () => {
    setIsSigningIn(true)
    setTimeout(() => {
      loginAs(selectedPersona as any)
      setIsSigningIn(false)
      routeUserAfterAuth(selectedPersona)
    }, 350)
  }

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSigningIn(true)
    setTimeout(() => {
      if (authMode === 'signup') {
        if (roleSelection === 'student') {
          loginAs('new-student' as any)
          routeUserAfterAuth('new-student')
        } else if (roleSelection === 'teacher') {
          loginAs('pending-teacher' as any)
          routeUserAfterAuth('pending-teacher')
        } else {
          loginAs('management' as any)
          routeUserAfterAuth('management')
        }
      } else {
        // Sign in default
        loginAs('returning-student' as any)
        routeUserAfterAuth('returning-student')
      }
      setIsSigningIn(false)
    }, 350)
  }

  return (
    <div className="min-h-screen bg-surface-50 text-surface-900 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-200 relative">
      {/* Top Bar with Theme Toggle */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full bg-surface-0 border border-surface-200 text-surface-700 hover:text-surface-900 hover:bg-surface-100 transition-colors shadow-xs"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-surface-600" />}
        </button>
      </div>

      <div className="max-w-xl w-full mx-auto space-y-7">
        {/* Logo & Header */}
        <div className="text-center space-y-2.5">
          <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center mx-auto shadow-md shadow-brand-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-surface-900">
              Welcome to StudyPilot
            </h1>
            <p className="text-xs sm:text-sm text-surface-500 mt-1 max-w-md mx-auto">
              Course-Specific AI Learning Environment for Pakistan Classes 9–12
            </p>
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-surface-0 border border-surface-200 rounded-3xl p-5 sm:p-8 shadow-md space-y-6">
          {/* Main Auth Tabs */}
          <div className="flex bg-surface-100 p-1 rounded-2xl border border-surface-200">
            <button
              onClick={() => setAuthTab('persona')}
              className={cn(
                "flex-1 py-2 text-xs font-bold rounded-xl transition-all",
                authTab === 'persona' ? "bg-surface-0 text-brand-600 shadow-xs" : "text-surface-500 hover:text-surface-800"
              )}
            >
              Single-Click Persona Access
            </button>
            <button
              onClick={() => setAuthTab('credentials')}
              className={cn(
                "flex-1 py-2 text-xs font-bold rounded-xl transition-all",
                authTab === 'credentials' ? "bg-surface-0 text-brand-600 shadow-xs" : "text-surface-500 hover:text-surface-800"
              )}
            >
              Email & Password Sign In
            </button>
          </div>

          {authTab === 'persona' ? (
            /* Persona Flow */
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                    Deterministic Roles & Gates (Spec v2 §9)
                  </span>
                  <span className="text-[11px] font-semibold text-surface-500">Identity Switcher</span>
                </div>
                <p className="text-xs text-surface-500 mt-1">
                  Select an account persona below to experience role-based routing, board curriculum onboarding, and permissions.
                </p>
              </div>

              {/* Persona List */}
              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                {personas.map((p) => {
                  const isSelected = selectedPersona === p.id
                  const Icon = p.icon
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPersona(p.id)}
                      className={cn(
                        "w-full p-3 sm:p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 group",
                        isSelected 
                          ? "bg-brand-500/10 border-brand-500 ring-1 ring-brand-500" 
                          : "bg-surface-100/60 border-surface-200 hover:border-surface-300 hover:bg-surface-100"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
                        isSelected ? "bg-brand-600 text-white" : "bg-surface-200 text-surface-600 group-hover:text-surface-900"
                      )}>
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-bold text-surface-900 truncate group-hover:text-brand-600">
                            {p.title}
                          </p>
                          <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold border", p.badgeColor)}>
                            {p.badge}
                          </span>
                        </div>
                        <p className="text-xs text-surface-500 font-medium mt-0.5">{p.subtitle}</p>
                        <p className="text-[11px] text-surface-500 mt-1 leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Action Trigger */}
              <button
                onClick={handleSignIn}
                disabled={isSigningIn}
                className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
              >
                {isSigningIn ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google as Selected Persona</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Credentials Sign In / Sign Up Form */
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div className="flex items-center justify-between border-b border-surface-200 pb-3">
                <span className="text-sm font-bold text-surface-900">
                  {authMode === 'signin' ? 'Sign in with your email' : 'Create a new StudyPilot account'}
                </span>
                <div className="text-xs">
                  {authMode === 'signin' ? (
                    <button
                      type="button"
                      onClick={() => setAuthMode('signup')}
                      className="text-brand-600 font-semibold hover:underline"
                    >
                      Need an account? Sign up
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setAuthMode('signin')}
                      className="text-brand-600 font-semibold hover:underline"
                    >
                      Have an account? Sign in
                    </button>
                  )}
                </div>
              </div>

              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-surface-700 mb-1.5">Full Name</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-surface-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ahmed Raza"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-surface-100 border border-surface-200 rounded-xl text-sm text-surface-900 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-surface-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-surface-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="student@example.edu.pk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-surface-100 border border-surface-200 rounded-xl text-sm text-surface-900 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-surface-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-surface-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-surface-100 border border-surface-200 rounded-xl text-sm text-surface-900 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  />
                </div>
              </div>

              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-surface-700 mb-1.5">Primary Role</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['student', 'teacher', 'management'] as const).map((r) => (
                      <button
                        type="button"
                        key={r}
                        onClick={() => setRoleSelection(r)}
                        className={cn(
                          "py-2 px-2 text-xs font-semibold capitalize rounded-xl border transition-all",
                          roleSelection === r
                            ? "bg-brand-500/10 border-brand-500 text-brand-600 font-bold"
                            : "bg-surface-100 border-surface-200 text-surface-600 hover:bg-surface-200"
                        )}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSigningIn}
                className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] mt-2"
              >
                {isSigningIn ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{authMode === 'signin' ? 'Sign In' : 'Create Account & Continue'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <p className="text-center text-[11px] text-surface-500">
            Pakistan curriculum standards & verification policies enforced in accordance with StudyPilot Specification v2.
          </p>
        </div>

      </div>
    </div>
  )
}

