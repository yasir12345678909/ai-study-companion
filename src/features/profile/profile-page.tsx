import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/stores/app-store'
import { achievements } from '@/data/mock-data'
import { 
  ArrowLeft, 
  User, 
  Award, 
  Flame, 
  BookOpen, 
  CheckCircle, 
  ShieldCheck, 
  Calendar, 
  Zap, 
  Clock, 
  Edit3 
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function ProfilePage() {
  const navigate = useNavigate()
  const { user } = useAppStore()

  return (
    <div className="min-h-screen bg-surface-950 text-surface-50 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Navigation */}
        <div className="flex items-center gap-3 text-sm text-surface-400">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-surface-800 text-surface-400 hover:text-surface-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span>Student Workspace</span>
          <span>&gt;</span>
          <span className="text-surface-200 font-medium">Academic Profile</span>
        </div>

        {/* Identity & Level Card */}
        <div className="bg-surface-900 border border-surface-800 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-brand-600/20 border-2 border-brand-500 flex items-center justify-center text-brand-400 text-3xl font-bold">
              {user.name.charAt(0)}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h1 className="text-2xl md:text-3xl font-bold text-surface-50">{user.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20 capitalize">
                  {user.role}
                </span>
              </div>
              <p className="text-sm text-surface-400">
                Class {user.classLevel || 10} • Section {user.section || 'A'} • Federal Board of Intermediate & Secondary Education
              </p>

              {/* Stats Ribbon */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 mt-4 pt-4 border-t border-surface-800 text-sm">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-warning" />
                  <span className="font-bold text-surface-100">{user.xp || 450} XP</span>
                  <span className="text-surface-500 text-xs">earned</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-brand-400" />
                  <span className="font-bold text-surface-100">Level {user.level || 5}</span>
                  <span className="text-surface-500 text-xs">scholar</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-danger" />
                  <span className="font-bold text-surface-100">4 Day</span>
                  <span className="text-surface-500 text-xs">study streak</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/settings')}
              className="px-4 py-2 bg-surface-800 hover:bg-surface-700 text-surface-200 text-sm font-medium rounded-lg transition-colors border border-surface-700 flex items-center gap-2 shrink-0"
            >
              <Edit3 className="w-4 h-4" />
              Edit Settings
            </button>
          </div>
        </div>

        {/* Academic Goals Progress */}
        <div className="bg-surface-900 border border-surface-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-surface-50">Target Board Examination Goal</h2>
              <p className="text-xs text-surface-400 mt-0.5">Target: 85% Aggregate Score • 12 Days Remaining</p>
            </div>
            <button
              onClick={() => navigate('/planner')}
              className="text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors"
            >
              Adjust Plan
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-surface-300 font-medium">
              <span>Current Syllabus Completion</span>
              <span>64% Completed</span>
            </div>
            <div className="h-2 w-full bg-surface-800 rounded-full overflow-hidden">
              <div className="h-full bg-brand-500 rounded-full" style={{ width: '64%' }} />
            </div>
          </div>
        </div>

        {/* Earned Academic Achievements */}
        <div className="bg-surface-900 border border-surface-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-surface-50">Earned Milestones & Badges</h2>
            <span className="text-xs text-surface-400">
              {achievements.filter(a => a.earned).length} of {achievements.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={cn(
                  "p-4 rounded-xl border flex items-start gap-3 transition-colors",
                  ach.earned
                    ? "bg-surface-950/80 border-surface-800"
                    : "bg-surface-950/30 border-surface-900 opacity-60"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg",
                  ach.earned ? "bg-brand-500/20 text-brand-400" : "bg-surface-800 text-surface-600"
                )}>
                  {ach.earned ? <CheckCircle className="w-5 h-5 text-success" /> : <Award className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-semibold text-surface-100 text-sm">{ach.title}</h3>
                  <p className="text-xs text-surface-400 mt-0.5 leading-snug">{ach.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
