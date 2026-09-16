import { cn } from '@/lib/utils'
import { materials } from '@/data/mock-data'
import { motion } from 'motion/react'
import { Upload, FileText, StickyNote, Play, Scroll, Image as ImageIcon, Search, Filter, Plus } from 'lucide-react'
import { StatusIndicator } from '@/components/ui/status-indicator'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import type { MaterialType } from '@/types'

const FILTER_TABS: { label: string; value: MaterialType | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'PDFs', value: 'pdf' },
  { label: 'Notes', value: 'notes' },
  { label: 'Lectures', value: 'lecture' },
  { label: 'Past Papers', value: 'pastpaper' },
]

export function MaterialsPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<MaterialType | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredMaterials = materials.filter((m) => {
    const matchesTab = activeTab === 'all' || m.type === activeTab
    const matchesSearch = (m.name || m.title || '').toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  const getIcon = (type: MaterialType) => {
    switch (type) {
      case 'pdf': return <FileText className="h-5 w-5 text-danger" />
      case 'notes': return <StickyNote className="h-5 w-5 text-warning" />
      case 'lecture': return <Play className="h-5 w-5 text-info" />
      case 'pastpaper': return <Scroll className="h-5 w-5 text-success" />
      case 'image': return <ImageIcon className="h-5 w-5 text-brand-500" />
      default: return <FileText className="h-5 w-5 text-surface-500" />
    }
  }

  return (
    <div className="flex h-full flex-col bg-surface-50">
      <header className="sticky top-0 z-10 border-b border-surface-200 bg-surface-0/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-surface-900">Materials</h1>
          <button
            onClick={() => navigate('/materials/upload')}
            className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 font-medium text-white transition-colors hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <Upload className="h-4 w-4" />
            Upload
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  activeTab === tab.value
                    ? "bg-surface-900 text-surface-0"
                    : "bg-surface-100 text-surface-600 hover:bg-surface-200"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-surface-200 bg-surface-0 py-2 pl-9 pr-4 text-sm text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 sm:w-64"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        {filteredMaterials.length > 0 ? (
          <div className="flex flex-col gap-2">
            {filteredMaterials.map((material, index) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={material.id}
                onClick={() => navigate(`/materials/${material.id}`)}
                className="group flex cursor-pointer items-center justify-between rounded-xl border border-surface-200 bg-surface-0 p-4 transition-all hover:border-brand-300 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-100">
                    {getIcon(material.type)}
                  </div>
                  <div>
                    <h3 className="font-medium text-surface-900 group-hover:text-brand-600">
                      {material.name || material.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-3 text-xs text-surface-500">
                      <span className="rounded bg-surface-100 px-1.5 py-0.5 font-medium">
                        {material.subjectId}
                      </span>
                      <span>Added {new Date(material.uploadedAt || material.createdAt || Date.now()).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <StatusIndicator status={material.status} />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-100">
              <Filter className="h-8 w-8 text-surface-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-surface-900">No materials found</h3>
            <p className="mt-1 text-surface-500">
              {searchQuery ? "We couldn't find anything matching your search." : "Try adjusting your filters or upload a new material."}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
