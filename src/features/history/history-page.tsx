import { Clock, MessageSquare, BookOpen, HelpCircle, RotateCcw, FileQuestion, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function HistoryPage() {
  const historyData = [
    {
      dateGroup: 'Today',
      items: [
        { id: 1, type: 'chat', title: 'Discussion on Newton\'s Laws', subject: 'Physics', time: '2 hours ago', icon: MessageSquare, color: 'text-brand-500', bg: 'bg-brand-100 dark:bg-brand-900/30' },
        { id: 2, type: 'study', title: 'Momentum Derivations', subject: 'Physics', time: '4 hours ago', icon: BookOpen, color: 'text-success-500', bg: 'bg-success-100 dark:bg-success-900/30' },
        { id: 3, type: 'question', title: 'Solved Quadratic Equation', subject: 'Math', time: '5 hours ago', icon: HelpCircle, color: 'text-warning-500', bg: 'bg-warning-100 dark:bg-warning-900/30' },
      ]
    },
    {
      dateGroup: 'Yesterday',
      items: [
        { id: 4, type: 'test', title: 'Chapter 3 Quiz', subject: 'English', time: 'Yesterday, 3:00 PM', icon: FileQuestion, color: 'text-danger-500', bg: 'bg-danger-100 dark:bg-danger-900/30' },
        { id: 5, type: 'revision', title: 'Urdu Grammar Review', subject: 'Urdu', time: 'Yesterday, 1:00 PM', icon: RotateCcw, color: 'text-info-500', bg: 'bg-info-100 dark:bg-info-900/30' },
      ]
    },
    {
      dateGroup: 'Earlier this week',
      items: [
        { id: 6, type: 'chat', title: 'Understanding Isotopes', subject: 'Chemistry', time: 'Mon, 10:30 AM', icon: MessageSquare, color: 'text-brand-500', bg: 'bg-brand-100 dark:bg-brand-900/30' },
        { id: 7, type: 'study', title: 'Trigonometry Basics', subject: 'Math', time: 'Sun, 4:15 PM', icon: BookOpen, color: 'text-success-500', bg: 'bg-success-100 dark:bg-success-900/30' },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-brand-500" />
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">Study History</h1>
        </header>

        {/* History List */}
        <div className="space-y-8">
          {historyData.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-4">
              <h2 className="text-sm font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider pl-2">
                {group.dateGroup}
              </h2>
              
              <div className="bg-surface-0 dark:bg-surface-900 rounded-xl border border-surface-200 dark:border-surface-800 shadow-sm overflow-hidden">
                <div className="divide-y divide-surface-100 dark:divide-surface-800">
                  {group.items.map((item) => {
                    const Icon = item.icon
                    return (
                      <button 
                        key={item.id}
                        className="w-full flex items-center p-4 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors group text-left"
                      >
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mr-4", item.bg, item.color)}>
                          <Icon className="w-5 h-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0 pr-4">
                          <h3 className="font-medium text-surface-900 dark:text-surface-50 truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-medium text-surface-500 dark:text-surface-400 bg-surface-100 dark:bg-surface-800 px-2 py-0.5 rounded">
                              {item.subject}
                            </span>
                            <span className="text-xs text-surface-400 dark:text-surface-500">
                              • {item.time}
                            </span>
                          </div>
                        </div>

                        <ChevronRight className="w-5 h-5 text-surface-300 dark:text-surface-600 group-hover:text-brand-500 transition-colors shrink-0" />
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}

          {historyData.length === 0 && (
            <div className="text-center py-20 bg-surface-0 dark:bg-surface-900 rounded-xl border border-surface-200 dark:border-surface-800 border-dashed">
              <Clock className="w-12 h-12 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
              <p className="text-surface-500 dark:text-surface-400">Your study sessions will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
