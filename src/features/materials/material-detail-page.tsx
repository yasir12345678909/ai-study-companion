import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { materials } from '@/data/mock-data'
import { StatusIndicator } from '@/components/ui/status-indicator'
import { 
  ArrowLeft, 
  FileText, 
  StickyNote, 
  Play, 
  Scroll, 
  Sparkles, 
  Download, 
  Share2, 
  CheckCircle, 
  ShieldCheck, 
  ExternalLink,
  BookOpen,
  Calendar,
  User,
  HardDrive
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function MaterialDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const material = materials.find((m) => m.id === id) || materials[0]
  const [activeTab, setActiveTab] = useState<'content' | 'concepts' | 'practice'>('content')

  if (!material) {
    return (
      <div className="p-8 text-center text-surface-500">
        Material not found.
      </div>
    )
  }

  const getTierBadge = (tier?: string) => {
    switch (tier) {
      case 'official':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">Official Board Curriculum</span>
      case 'teacher':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-success/10 text-success border border-success/20">Teacher Approved</span>
      case 'student':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-info/10 text-info border border-info/20">Student Contribution</span>
      default:
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-surface-800 text-surface-300">Class Resource</span>
    }
  }

  return (
    <div className="min-h-screen bg-surface-950 text-surface-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-surface-400">
            <button
              onClick={() => navigate('/materials')}
              className="p-2 rounded-full hover:bg-surface-800 text-surface-400 hover:text-surface-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span>Materials</span>
            <span>&gt;</span>
            <span className="text-surface-200 font-medium truncate max-w-xs">{material.name || material.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/tutor')}
              className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              Ask AI About This
            </button>
          </div>
        </div>

        {/* Hero Header Card */}
        <div className="bg-surface-900 border border-surface-800 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-surface-800 border border-surface-700 flex items-center justify-center shrink-0">
                {material.type === 'pdf' && <FileText className="w-7 h-7 text-danger" />}
                {material.type === 'notes' && <StickyNote className="w-7 h-7 text-warning" />}
                {material.type === 'lecture' && <Play className="w-7 h-7 text-info" />}
                {material.type === 'pastpaper' && <Scroll className="w-7 h-7 text-success" />}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-surface-800 text-surface-300">
                    {material.type}
                  </span>
                  <StatusIndicator status={material.status} showLabel />
                  {getTierBadge(material.sourceTier)}
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-surface-50 leading-tight">
                  {material.name || material.title}
                </h1>
                
                <p className="text-sm text-surface-400 mt-2 flex flex-wrap items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-surface-500" />
                    Uploaded by: {material.uploadedBy || 'Academic Staff'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-surface-500" />
                    Added: {new Date(material.uploadedAt || material.createdAt || Date.now()).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <HardDrive className="w-4 h-4 text-surface-500" />
                    Size: {material.size || '3.4 MB'}
                  </span>
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex md:flex-col gap-2 shrink-0">
              <button 
                onClick={() => navigate('/tutor')}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium transition-colors shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                Ask AI Tutor
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-surface-800 hover:bg-surface-700 text-surface-200 text-sm font-medium transition-colors border border-surface-700">
                <Download className="w-4 h-4" />
                Download
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-surface-800 hover:bg-surface-700 text-surface-200 text-sm font-medium transition-colors border border-surface-700">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Source Trust Explanation Banner */}
        <div className="p-4 rounded-xl bg-brand-500/5 border border-brand-500/20 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-brand-300">Trust & AI Grounding Status</p>
            <p className="text-surface-300 mt-0.5">
              This document has been fully indexed into the AI Knowledge Store. When asking your AI tutor questions in this subject, answers will prioritize and cite verified passages from this resource.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-surface-800 pb-1">
          <button
            onClick={() => setActiveTab('content')}
            className={cn(
              "px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors border-b-2",
              activeTab === 'content'
                ? "border-brand-500 text-brand-400 bg-surface-900/50"
                : "border-transparent text-surface-400 hover:text-surface-200"
            )}
          >
            Document Viewer & Notes
          </button>
          <button
            onClick={() => setActiveTab('concepts')}
            className={cn(
              "px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors border-b-2",
              activeTab === 'concepts'
                ? "border-brand-500 text-brand-400 bg-surface-900/50"
                : "border-transparent text-surface-400 hover:text-surface-200"
            )}
          >
            Extracted Key Concepts (6)
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={cn(
              "px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors border-b-2",
              activeTab === 'practice'
                ? "border-brand-500 text-brand-400 bg-surface-900/50"
                : "border-transparent text-surface-400 hover:text-surface-200"
            )}
          >
            Associated Practice Questions
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'content' && (
          <div className="bg-surface-900 border border-surface-800 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-surface-800 pb-4">
              <span className="text-sm text-surface-400 font-medium">Page 1 of {material.pageCount || 12}</span>
              <span className="text-xs text-surface-500">Document Reader Preview</span>
            </div>

            <div className="space-y-4 text-surface-200 leading-relaxed font-serif text-base md:text-lg max-w-3xl">
              <h2 className="text-xl font-bold font-sans text-surface-100">Chapter Summary & Derivations</h2>
              <p>
                Momentum is fundamentally defined as the measure of mass in motion. Any moving body has momentum, which is mathematically the product of its mass and its velocity:
              </p>
              
              <div className="p-4 rounded-lg bg-surface-950 border-l-4 border-brand-500 font-mono text-base text-brand-300">
                p = m · v
              </div>

              <p>
                Because velocity is a vector quantity, momentum is also a vector directed in the same orientation as the velocity vector. In the SI system of units, momentum is represented as kilogram meters per second (kg·m/s), which is dimensionally equivalent to Newton-seconds (N·s).
              </p>

              <h3 className="text-lg font-bold font-sans text-surface-100 mt-6">Law of Conservation of Linear Momentum</h3>
              <p>
                When two or more bodies interact in an isolated system where no net external force acts upon them, the vector sum of their initial momenta is strictly equal to the vector sum of their final momenta:
              </p>

              <div className="p-4 rounded-lg bg-surface-950 border-l-4 border-warning font-mono text-base text-warning">
                m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂
              </div>
            </div>
          </div>
        )}

        {activeTab === 'concepts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Linear Momentum Definition', desc: 'Product of mass and velocity. Key vector properties.', tag: 'Definition' },
              { title: 'SI Unit & Dimensional Formula', desc: 'kg·m/s or N·s. Derivation from Newton\'s second law.', tag: 'Formula' },
              { title: 'Isolated System Condition', desc: 'Zero external unbalanced force requirement.', tag: 'Principle' },
              { title: 'Elastic vs Inelastic Collisions', desc: 'Kinetic energy conservation contrast in collisions.', tag: 'Comparison' },
              { title: 'Impulse of Force', desc: 'J = F · Δt = Δp. Area under force-time curve.', tag: 'Concept' },
              { title: 'Rocket Propulsion Mechanics', desc: 'Application of conservation of momentum in variable mass.', tag: 'Application' }
            ].map((concept, idx) => (
              <div key={idx} className="bg-surface-900 border border-surface-800 rounded-xl p-5 hover:border-brand-500/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-500/10 text-brand-400">
                    {concept.tag}
                  </span>
                  <span className="text-xs text-surface-500">Extracted</span>
                </div>
                <h3 className="font-semibold text-surface-100">{concept.title}</h3>
                <p className="text-sm text-surface-400 mt-1">{concept.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="bg-surface-900 border border-surface-800 rounded-xl divide-y divide-surface-800">
            {[
              { id: 'q1', text: 'Define momentum and state its SI unit.', marks: 2, type: 'Short Question' },
              { id: 'q2', text: 'State the law of conservation of momentum with example.', marks: 4, type: 'Long Question' },
              { id: 'q3', text: 'Derive the relationship between applied force and rate of change of momentum.', marks: 5, type: 'Derivation' }
            ].map((q) => (
              <div key={q.id} className="p-4 flex items-center justify-between hover:bg-surface-800/40 transition-colors">
                <div>
                  <span className="text-xs font-medium text-brand-400 uppercase tracking-wide mr-2">{q.type}</span>
                  <span className="text-xs text-surface-400">({q.marks} Marks)</span>
                  <p className="font-medium text-surface-100 mt-1">{q.text}</p>
                </div>
                <button
                  onClick={() => navigate(`/questions/${q.id}`)}
                  className="px-3 py-1.5 bg-surface-800 hover:bg-brand-600 text-surface-200 hover:text-white text-xs font-semibold rounded-lg transition-colors shrink-0 ml-4"
                >
                  View Exam Answer
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
