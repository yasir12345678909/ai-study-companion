import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { MobileNav } from './mobile-nav';
import { SearchDialog } from './search-dialog';
import { OnboardingOverlay } from '@/features/onboarding/onboarding-overlay';
import { AICompanion } from './ai-companion';
import { useAppStore } from '@/stores/app-store';

export function AppShell() {
  const { setIsSearchOpen } = useAppStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-surface-50 text-surface-900 font-sans">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden w-full relative z-0">
        <Header />
        <main className="flex-1 overflow-y-auto bg-surface-0 rounded-tl-xl md:m-2 md:shadow-sm md:border md:border-surface-200">
          <Outlet />
        </main>
      </div>
      <MobileNav />
      <SearchDialog />
      <OnboardingOverlay />
      <AICompanion />
    </div>
  );
}
