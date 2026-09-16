import { useState } from 'react'
import { ArrowLeft, Users, BookOpen, MessageSquare, Info, FileText, Download, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Tab = 'overview' | 'materials' | 'members' | 'discussions'

export function GroupDetailPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  const tabs: { id: Tab, label: string, icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'materials', label: 'Materials', icon: BookOpen },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'discussions', label: 'Discussions', icon: MessageSquare },
  ]

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex flex-col">
      {/* Header */}
      <header className="bg-surface-0 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 p-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <button 
              className="p-2 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-full transition-colors -ml-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5 text-surface-600 dark:text-surface-300" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">Class 10 Physics - Section A</h1>
              <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">Lahore Grammar School</p>
            </div>
          </div>

          {/* Inline Tabs */}
          <div className="flex space-x-1 overflow-x-auto no-scrollbar border-b border-surface-200 dark:border-surface-800">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                    isActive 
                      ? "border-brand-500 text-brand-600 dark:text-brand-400" 
                      : "border-transparent text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100 hover:border-surface-300"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-surface-0 dark:bg-surface-900 p-4 rounded-xl border border-surface-200 dark:border-surface-800 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center text-brand-600 dark:text-brand-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Teacher</p>
                    <p className="font-semibold text-surface-900 dark:text-surface-50">Sir Ahmed</p>
                  </div>
                </div>
                <div className="bg-surface-0 dark:bg-surface-900 p-4 rounded-xl border border-surface-200 dark:border-surface-800 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-info-100 dark:bg-info-900/30 rounded-full flex items-center justify-center text-info-600 dark:text-info-400">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Members</p>
                    <p className="font-semibold text-surface-900 dark:text-surface-50">34 Students</p>
                  </div>
                </div>
                <div className="bg-surface-0 dark:bg-surface-900 p-4 rounded-xl border border-surface-200 dark:border-surface-800 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center text-success-600 dark:text-success-400">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Materials</p>
                    <p className="font-semibold text-surface-900 dark:text-surface-50">12 Files</p>
                  </div>
                </div>
              </div>

              <div className="bg-surface-0 dark:bg-surface-900 p-6 rounded-xl border border-surface-200 dark:border-surface-800 shadow-sm">
                <h3 className="font-bold text-lg text-surface-900 dark:text-surface-50 mb-4">Recent Announcements</h3>
                <div className="space-y-4">
                  <div className="pb-4 border-b border-surface-100 dark:border-surface-800">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-surface-900 dark:text-surface-50">Sir Ahmed</span>
                      <span className="text-xs text-surface-500">2 days ago</span>
                    </div>
                    <p className="text-surface-700 dark:text-surface-300">Don't forget the Chapter 4 test on Friday. Focus on Momentum derivations.</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-surface-900 dark:text-surface-50">Sir Ahmed</span>
                      <span className="text-xs text-surface-500">5 days ago</span>
                    </div>
                    <p className="text-surface-700 dark:text-surface-300">I've uploaded the new revision notes in the Materials section.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'materials' && (
            <div className="space-y-4">
              {[
                { name: 'Chapter 4 Notes - Verified', uploader: 'Sir Ahmed', isTeacher: true, date: 'Oct 12', size: '2.4 MB' },
                { name: 'Past Paper Solutions 2023', uploader: 'Ali Khan', isTeacher: false, date: 'Oct 10', size: '1.1 MB' },
                { name: 'Momentum Formulas Sheet', uploader: 'Sir Ahmed', isTeacher: true, date: 'Oct 05', size: '0.8 MB' },
              ].map((file, i) => (
                <div key={i} className="bg-surface-0 dark:bg-surface-900 p-4 rounded-xl border border-surface-200 dark:border-surface-800 shadow-sm flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-brand-50 dark:bg-brand-900/20 rounded-lg flex items-center justify-center text-brand-500">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-surface-900 dark:text-surface-50 group-hover:text-brand-500 transition-colors flex items-center gap-2">
                        {file.name}
                        {file.isTeacher && <CheckCircle2 className="w-4 h-4 text-success-500" />}
                      </h4>
                      <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                        Uploaded by <span className={file.isTeacher ? "text-brand-600 dark:text-brand-400 font-medium" : ""}>{file.uploader}</span> • {file.date} • {file.size}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 text-surface-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-full transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'members' && (
            <div className="bg-surface-0 dark:bg-surface-900 rounded-xl border border-surface-200 dark:border-surface-800 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-surface-100 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-800/20 font-medium text-surface-500 dark:text-surface-400">
                Teacher
              </div>
              <div className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-500 text-white rounded-full flex items-center justify-center font-bold">A</div>
                <div>
                  <p className="font-medium text-surface-900 dark:text-surface-50">Sir Ahmed</p>
                  <p className="text-xs text-surface-500">Admin</p>
                </div>
              </div>
              
              <div className="p-4 border-y border-surface-100 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-800/20 font-medium text-surface-500 dark:text-surface-400">
                Students (34)
              </div>
              <div className="divide-y divide-surface-100 dark:divide-surface-800">
                {['Ali Khan', 'Zainab Fatima', 'Hassan Raza', 'Ayesha Noor'].map((name, i) => (
                  <div key={i} className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-full flex items-center justify-center font-bold">
                      {name.charAt(0)}
                    </div>
                    <p className="font-medium text-surface-900 dark:text-surface-50">{name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'discussions' && (
            <div className="bg-surface-0 dark:bg-surface-900 p-12 rounded-xl border border-surface-200 dark:border-surface-800 shadow-sm text-center">
              <MessageSquare className="w-12 h-12 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-surface-900 dark:text-surface-50 mb-2">No discussions yet</h3>
              <p className="text-surface-500 dark:text-surface-400 mb-6">Start a conversation with your class.</p>
              <button className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors">
                New Discussion
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
