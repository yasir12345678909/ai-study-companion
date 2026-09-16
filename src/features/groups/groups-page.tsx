import { Users, Plus, ChevronRight, BookOpen, Clock, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { groups } from '@/data/mock-data'

export function GroupsPage() {
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50 flex items-center gap-2">
              <Users className="w-6 h-6 text-brand-500" />
              My Groups
            </h1>
            <p className="text-surface-500 dark:text-surface-400 mt-1">Join class groups to share materials and discuss topics.</p>
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Join Group
          </button>
        </header>

        {/* Groups List */}
        <div className="bg-surface-0 dark:bg-surface-900 rounded-xl shadow-sm border border-surface-200 dark:border-surface-800 overflow-hidden">
          <div className="divide-y divide-surface-200 dark:divide-surface-800">
            {groups?.map((group) => (
              <a 
                key={group.id} 
                href={`/groups/${group.id}`}
                className="block p-4 sm:p-6 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors group cursor-pointer"
              >
                <div className="flex items-start sm:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50 truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {group.name}
                      </h2>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-brand-100 text-brand-800 dark:bg-brand-900/30 dark:text-brand-300 border border-brand-200 dark:border-brand-800/50">
                        Class {group.classLevel || group.class || 10} - {group.section}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-surface-500 dark:text-surface-400 mt-2">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-success-500" />
                        Teacher: {group.teacherName || 'Assigned'}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        {group.membersCount || 0} Members
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        {group.materialsCount || 0} Materials
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        Active {group.recentActivity || 'recently'}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-surface-400 group-hover:text-brand-500 flex-shrink-0 transition-colors" />
                </div>
              </a>
            )) || (
              <div className="p-12 text-center text-surface-500 dark:text-surface-400">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>You haven't joined any groups yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
