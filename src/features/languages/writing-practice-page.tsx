import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { englishFormats, urduFormats } from '@/data/mock-data'
import { 
  ArrowLeft, 
  Languages, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  PenTool, 
  Copy, 
  Check 
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function WritingPracticePage() {
  const navigate = useNavigate()
  
  const [activeLang, setActiveLang] = useState<'english' | 'urdu'>('english')
  const [selectedFormatId, setSelectedFormatId] = useState<string>(englishFormats[0].id)
  const [copied, setCopied] = useState(false)

  const currentFormats = activeLang === 'english' ? englishFormats : urduFormats
  const activeFormat = currentFormats.find(f => f.id === selectedFormatId) || currentFormats[0]

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn(
      "min-h-screen bg-surface-950 text-surface-50 p-4 md:p-8 font-sans",
      activeLang === 'urdu' && "font-serif"
    )}>
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Navigation & Language Switcher */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-surface-400">
            <button
              onClick={() => navigate('/subjects')}
              className="p-2 rounded-full hover:bg-surface-800 text-surface-400 hover:text-surface-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span>Subjects</span>
            <span>&gt;</span>
            <span className="text-surface-200 font-medium">Bilingual Academic Writing Formats</span>
          </div>

          {/* English / Urdu Selector */}
          <div className="flex p-1 bg-surface-900 border border-surface-800 rounded-xl">
            <button
              onClick={() => {
                setActiveLang('english')
                setSelectedFormatId(englishFormats[0].id)
              }}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-semibold transition-all",
                activeLang === 'english'
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-surface-400 hover:text-surface-200"
              )}
            >
              English Academic Formats
            </button>
            <button
              onClick={() => {
                setActiveLang('urdu')
                setSelectedFormatId(urduFormats[0].id)
              }}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-semibold transition-all",
                activeLang === 'urdu'
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-surface-400 hover:text-surface-200"
              )}
            >
              اردو امتحانی فارمیٹس
            </button>
          </div>
        </div>

        {/* Hero Card */}
        <div className="bg-surface-900 border border-surface-800 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-brand-500/10 text-brand-400 uppercase tracking-wider">
                {activeLang === 'english' ? 'Board Marking Scheme Structures' : 'بورڈ پیٹرن تشریح و خلاصہ'}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-surface-50 mt-1">
                {activeLang === 'english' ? 'English & Urdu Writing Formats' : 'اردو و انگریزی تحریری امتحانی خاکے'}
              </h1>
              <p className="text-surface-400 text-sm mt-1">
                {activeLang === 'english' 
                  ? 'Master exact examination structures for letters, applications, stories, and passages.' 
                  : 'امتحانی اصولوں کے مطابق اشعار کی تشریح اور سبق کے خلاصے کے معیاری اجزاء۔'}
              </p>
            </div>

            <button
              onClick={() => navigate('/tutor')}
              className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium rounded-lg transition-colors shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              Ask AI to Review Writing
            </button>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Format Selector List */}
          <div className="md:col-span-4 space-y-2">
            <h2 className="text-xs uppercase font-bold tracking-wider text-surface-400 px-1">
              {activeLang === 'english' ? 'Standard Formats' : 'امتحانی اصناف'}
            </h2>
            {currentFormats.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFormatId(f.id)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border transition-all",
                  selectedFormatId === f.id
                    ? "bg-surface-800 border-brand-500/60 shadow-sm"
                    : "bg-surface-900 border-surface-800 hover:bg-surface-850 hover:border-surface-700",
                  activeLang === 'urdu' && "text-right"
                )}
                dir={activeLang === 'urdu' ? 'rtl' : 'ltr'}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-brand-400">
                    {f.type || 'format'}
                  </span>
                  <span className="text-xs text-surface-500">
                    {f.sections?.length || 4} sections
                  </span>
                </div>
                <h3 className="font-semibold text-surface-100 text-base">
                  {f.title || f.name}
                </h3>
                {f.description && (
                  <p className="text-xs text-surface-400 mt-1 line-clamp-1">{f.description}</p>
                )}
              </button>
            ))}
          </div>

          {/* Active Format Breakdown */}
          <div 
            className="md:col-span-8 bg-surface-900 border border-surface-800 rounded-2xl p-6 space-y-6"
            dir={activeLang === 'urdu' ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center justify-between border-b border-surface-800 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-brand-400">
                  {activeLang === 'english' ? 'Structural Blueprint' : 'اجزائے ترکیبی'}
                </span>
                <h2 className="text-2xl font-bold text-surface-50 mt-1">
                  {activeFormat.title || activeFormat.name}
                </h2>
              </div>

              <button
                onClick={() => handleCopy(activeFormat.sections?.map(s => `${s.label || s.name}: ${s.content || s.description}`).join('\n') || '')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-800 hover:bg-surface-700 text-surface-300 text-xs font-medium transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Blueprint'}
              </button>
            </div>

            {/* Sections Accordion / Cards */}
            <div className="space-y-4">
              {activeFormat.sections?.map((section, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-surface-950/60 border border-surface-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-xs font-bold">
                        {idx + 1}
                      </span>
                      <h4 className="font-semibold text-surface-100 text-base">
                        {section.label || section.name}
                      </h4>
                    </div>
                    {section.required && (
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-warning/10 text-warning">
                        Compulsory Marks
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-surface-300 leading-relaxed pr-6">
                    {section.content || section.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Exam Board Tip */}
            <div className="p-4 rounded-xl bg-brand-500/10 border border-brand-500/20 text-xs text-brand-300 leading-relaxed">
              <strong>{activeLang === 'english' ? 'Examiner Tip:' : 'امتحانی نکتہ:'}</strong>{' '}
              {activeLang === 'english'
                ? 'Board examiners award specific breakdown marks for correct Salutation, Date alignment, and Margin layout. Ensure each section begins on a new indent.'
                : 'اشعار کی تشریح میں شاعر کا نام اور نظم کا عنوان ایک ایک نمبر کے ہوتے ہیں۔ تشریح کو دو سے تین پیراگراف میں ترتیب دیں۔'}
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
