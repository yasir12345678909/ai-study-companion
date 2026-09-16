import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/stores/app-store';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, BookOpen, BookText, FileText, X, Sparkles, Calendar, RotateCcw, GitBranch, PenTool, Languages, Users, Clock, Shield, LayoutDashboard } from 'lucide-react';
import { subjects, physicsChapters } from '@/data/mock-data';
import { cn } from '@/lib/utils';

const quickPages = [
  { id: 'tutor', title: 'Ask AI Tutor', type: 'Quick Action', icon: Sparkles, path: '/tutor', color: 'text-brand-600', bg: 'bg-brand-100' },
  { id: 'revision', title: 'Quick Revision Mode', type: 'Feature', icon: RotateCcw, path: '/revision', color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { id: 'planner', title: 'Study Planner & Goals', type: 'Feature', icon: Calendar, path: '/planner', color: 'text-blue-600', bg: 'bg-blue-100' },
  { id: 'exams', title: 'Past Papers & Tests', type: 'Feature', icon: FileText, path: '/exams', color: 'text-amber-600', bg: 'bg-amber-100' },
  { id: 'flowchart', title: 'Visual Revision Flowchart', type: 'Feature', icon: GitBranch, path: '/flowchart', color: 'text-purple-600', bg: 'bg-purple-100' },
  { id: 'handwritten', title: 'Notebook Revision', type: 'Feature', icon: PenTool, path: '/handwritten', color: 'text-orange-600', bg: 'bg-orange-100' },
  { id: 'writing', title: 'Writing Formats & Practice', type: 'Feature', icon: Languages, path: '/writing', color: 'text-teal-600', bg: 'bg-teal-100' },
  { id: 'materials', title: 'Study Materials & Notes', type: 'Library', icon: FileText, path: '/materials', color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { id: 'groups', title: 'Class Groups', type: 'Collaboration', icon: Users, path: '/groups', color: 'text-cyan-600', bg: 'bg-cyan-100' },
  { id: 'history', title: 'Study History & Timeline', type: 'History', icon: Clock, path: '/history', color: 'text-gray-600', bg: 'bg-gray-100' },
];

export function SearchDialog() {
  const { isSearchOpen, setIsSearchOpen } = useAppStore();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Reset query when closed
  useEffect(() => {
    if (!isSearchOpen) {
      setTimeout(() => setQuery(''), 200);
    }
  }, [isSearchOpen]);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsSearchOpen(false);
  };

  // Mock search logic
  const results = [
    ...quickPages.filter(p => p.title.toLowerCase().includes(query.toLowerCase())),
    ...(subjects || []).filter(s => s.name.toLowerCase().includes(query.toLowerCase())).map(s => ({
      id: s.id,
      title: s.name,
      type: 'Subject',
      icon: BookOpen,
      path: `/subjects/${s.id}`,
      color: 'text-brand-600',
      bg: 'bg-brand-100'
    })),
    ...(physicsChapters || []).filter(c => (c.title || c.name || '').toLowerCase().includes(query.toLowerCase())).map(c => ({
      id: c.id,
      title: c.title || c.name || 'Chapter',
      type: 'Chapter',
      icon: BookText,
      path: `/subjects/physics/${c.id}`,
      color: 'text-emerald-600',
      bg: 'bg-emerald-100'
    }))
  ];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-surface-950/50 backdrop-blur-sm z-[100]"
            onClick={() => setIsSearchOpen(false)}
          />

          <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[10vh] px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-2xl bg-surface-0 rounded-xl shadow-2xl border border-surface-200 overflow-hidden pointer-events-auto flex flex-col max-h-[80vh]"
            >
              <div className="flex items-center px-4 py-3 border-b border-surface-200 relative">
                <Search className="w-5 h-5 text-surface-400 absolute left-4" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search subjects, chapters, materials..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-surface-900 placeholder:text-surface-400 pl-10 pr-12 py-2 text-lg"
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 p-1 rounded-md text-surface-400 hover:text-surface-900 hover:bg-surface-100 focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto p-2">
                {!query && (
                  <div className="space-y-1 p-1">
                    <p className="px-3 py-1.5 text-xs font-semibold text-surface-500 uppercase tracking-wider">Quick Navigation</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                      {quickPages.map((page) => (
                        <button
                          key={page.id}
                          onClick={() => handleNavigate(page.path)}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-100 focus:bg-surface-100 focus:outline-none text-left transition-colors group"
                        >
                          <div className={cn("p-1.5 rounded-md shrink-0", page.bg, page.color)}>
                            <page.icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-surface-900 truncate group-hover:text-brand-600 transition-colors">
                              {page.title}
                            </p>
                            <p className="text-xs text-surface-400">{page.type}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {query && results.length === 0 && (
                  <div className="p-8 text-center text-surface-500">
                    <p>No results found for "{query}"</p>
                  </div>
                )}

                {query && results.length > 0 && (
                  <div className="space-y-1">
                    <p className="px-3 py-2 text-xs font-semibold text-surface-500 uppercase">Results</p>
                    {results.map((result) => (
                      <button
                        key={`${result.type}-${result.id}`}
                        onClick={() => handleNavigate(result.path)}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-100 focus:bg-surface-100 focus:outline-none text-left transition-colors group"
                      >
                        <div className={cn("p-2 rounded-md shrink-0", result.bg, result.color)}>
                          <result.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-surface-900 truncate group-hover:text-brand-600 transition-colors">
                            {result.title}
                          </p>
                          <p className="text-xs text-surface-500">{result.type}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="px-4 py-3 border-t border-surface-200 bg-surface-50 text-xs text-surface-500 flex justify-between items-center">
                <span>Use <kbd className="font-mono bg-surface-200 px-1 rounded text-surface-700">↑</kbd> <kbd className="font-mono bg-surface-200 px-1 rounded text-surface-700">↓</kbd> to navigate</span>
                <span>Press <kbd className="font-mono bg-surface-200 px-1 rounded text-surface-700">esc</kbd> to close</span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
