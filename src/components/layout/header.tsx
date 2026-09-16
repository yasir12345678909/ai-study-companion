import React from 'react';
import { useAppStore } from '@/stores/app-store';
import { Search, Bell, Menu, Sun, Moon } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

const routeTitles: Record<string, string> = {
  '/': 'Home',
  '/subjects': 'Subjects',
  '/tutor': 'AI Tutor',
  '/materials': 'Study Materials',
  '/groups': 'Study Groups',
  '/history': 'History',
  '/settings': 'Settings',
  '/profile': 'Profile'
};

export function Header() {
  const { toggleMobileNav, setIsSearchOpen, theme, toggleTheme } = useAppStore();
  const location = useLocation();
  
  const title = routeTitles[location.pathname] || 'StudyPilot';

  return (
    <header className="h-14 flex items-center justify-between px-4 bg-surface-0 border-b border-surface-200 shrink-0 relative">
      {/* Left: Mobile Menu & Page Title */}
      <div className="flex items-center gap-3 min-w-[140px]">
        <button
          onClick={toggleMobileNav}
          className="md:hidden p-2 -ml-2 text-surface-500 hover:bg-surface-100 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-base sm:text-lg font-bold text-surface-900 truncate">{title}</h1>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-md mx-2 sm:mx-4 flex justify-center">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center gap-2 px-3.5 py-1.5 bg-surface-100 hover:bg-surface-200 border border-surface-200 rounded-xl text-surface-500 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs sm:text-sm shadow-2xs group"
        >
          <Search size={15} className="text-surface-400 group-hover:text-brand-600 transition-colors shrink-0" />
          <span className="truncate text-left">Search subjects, chapters, questions...</span>
          <span className="hidden sm:inline-flex ml-auto text-[10px] font-mono font-bold bg-surface-0 text-surface-500 px-1.5 py-0.5 rounded-md border border-surface-200 shadow-2xs">
            ⌘K
          </span>
        </button>
      </div>

      {/* Right: Actions (Theme, Notifications, Avatar) */}
      <div className="flex items-center gap-1.5 sm:gap-3 min-w-[140px] justify-end">
        <button
          onClick={toggleTheme}
          className="p-2 text-surface-500 hover:bg-surface-100 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-surface-600" />}
        </button>

        <button className="relative p-2 text-surface-500 hover:bg-surface-100 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full border-2 border-surface-0"></span>
        </button>

        <button className="focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-full ml-1">
          <Avatar className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-brand-500 hover:ring-offset-2 transition-all">
            <span className="text-xs font-bold text-brand-600">SP</span>
          </Avatar>
        </button>
      </div>
    </header>
  );
}
