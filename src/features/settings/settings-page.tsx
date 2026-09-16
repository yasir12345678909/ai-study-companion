import React, { useState } from 'react';
import { User, Palette, Bell, Shield, Smartphone, Monitor } from 'lucide-react';
import { useAppStore } from '@/stores/app-store';
import { cn } from '@/lib/utils';

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

function Toggle({ label, checked, onChange, disabled }: ToggleProps) {
  return (
    <label className={cn(
      "flex items-center justify-between py-3 cursor-pointer",
      disabled && "opacity-50 cursor-not-allowed"
    )}>
      <span className="text-surface-900 font-medium">{label}</span>
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
        />
        <div className={cn(
          "w-11 h-6 rounded-full transition-colors",
          checked ? "bg-brand-500" : "bg-surface-300"
        )}>
          <div className={cn(
            "absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full transition-transform",
            checked ? "translate-x-5" : "translate-x-0"
          )} />
        </div>
      </div>
    </label>
  );
}

export function SettingsPage() {
  const { user, theme, setTheme } = useAppStore();
  
  // Local state for settings
  const [reminders, setReminders] = useState(true);
  const [groupUpdates, setGroupUpdates] = useState(true);
  const [teacherAnnouncements, setTeacherAnnouncements] = useState(true);
  const [isUrdu, setIsUrdu] = useState(false);
  const [detailedAi, setDetailedAi] = useState(false);

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all your study history? This cannot be undone.')) {
      // Mock clear
    }
  };

  return (
    <div className="flex-1 p-6 lg:p-10 bg-surface-50 text-surface-900 overflow-y-auto">
      <div className="max-w-3xl mx-auto space-y-10 pb-20">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-surface-900">Settings</h1>
          <p className="text-surface-500 mt-1">Manage your account and preferences.</p>
        </div>

        <div className="space-y-12">
          {/* Profile */}
          <section>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-surface-900 mb-4 border-b border-surface-200 pb-2">
              <User className="w-5 h-5 text-brand-500" />
              Profile
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 py-2 border-b border-surface-200/50">
                <span className="text-surface-500">Name</span>
                <span className="col-span-2 text-surface-900 font-medium">{user?.name || 'Student'}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 py-2 border-b border-surface-200/50">
                <span className="text-surface-500">Class</span>
                <span className="col-span-2 text-surface-900">10</span>
              </div>
              <div className="grid grid-cols-3 gap-4 py-2 border-b border-surface-200/50">
                <span className="text-surface-500">Section</span>
                <span className="col-span-2 text-surface-900">A</span>
              </div>
              <div className="grid grid-cols-3 gap-4 py-2">
                <span className="text-surface-500">Board</span>
                <span className="col-span-2 text-surface-900">Federal Board</span>
              </div>
            </div>
          </section>

          {/* Appearance */}
          <section>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-surface-900 mb-4 border-b border-surface-200 pb-2">
              <Palette className="w-5 h-5 text-brand-500" />
              Appearance & Language
            </h2>
            <div className="space-y-4">
              <div className="py-2 flex items-center justify-between">
                <div>
                  <span className="text-surface-900 font-medium block">Theme</span>
                  <span className="text-surface-500 text-xs">Switch between dark mode and light mode</span>
                </div>
                <div className="flex bg-surface-100 border border-surface-200 p-1 rounded-xl">
                  <button
                    onClick={() => setTheme('dark')}
                    className={cn(
                      "px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5",
                      theme === 'dark' ? "bg-surface-0 text-brand-400 shadow-sm border border-surface-300" : "text-surface-500 hover:text-surface-800"
                    )}
                  >
                    🌙 Dark
                  </button>
                  <button
                    onClick={() => setTheme('light')}
                    className={cn(
                      "px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5",
                      theme === 'light' ? "bg-surface-0 text-brand-600 shadow-sm border border-surface-300" : "text-surface-500 hover:text-surface-800"
                    )}
                  >
                    ☀️ Light
                  </button>
                </div>
              </div>

              <div className="py-3 flex items-center justify-between border-t border-surface-200/50 mt-2 pt-4">
                <span className="text-surface-900 font-medium">Content Language</span>
                <div className="flex bg-surface-100 border border-surface-200 p-1 rounded-lg">
                  <button
                    onClick={() => setIsUrdu(false)}
                    className={cn("px-4 py-1.5 rounded-md text-sm font-medium transition-colors", !isUrdu ? "bg-surface-0 text-brand-600 shadow-sm" : "text-surface-500 hover:text-surface-700")}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setIsUrdu(true)}
                    className={cn("px-4 py-1.5 rounded-md text-sm font-medium transition-colors", isUrdu ? "bg-surface-0 text-brand-600 shadow-sm" : "text-surface-500 hover:text-surface-700")}
                  >
                    اردو
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Study Preferences */}
          <section>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-surface-900 mb-4 border-b border-surface-200 pb-2">
              <Monitor className="w-5 h-5 text-brand-500" />
              Study Preferences
            </h2>
            <div className="space-y-2">
              <Toggle label="Daily Study Reminder" checked={reminders} onChange={setReminders} />
              {reminders && (
                <div className="pl-4 py-2 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                  <span className="text-surface-500">Reminder Time</span>
                  <input type="time" defaultValue="16:00" className="bg-surface-100 border border-surface-200 text-surface-900 px-3 py-1.5 rounded-md" />
                </div>
              )}
              <div className="py-3 flex items-center justify-between border-t border-surface-200/50 mt-2 pt-4">
                <span className="text-surface-900 font-medium">AI Explanations</span>
                <div className="flex bg-surface-100 border border-surface-200 p-1 rounded-lg">
                  <button
                    onClick={() => setDetailedAi(false)}
                    className={cn("px-4 py-1.5 rounded-md text-sm font-medium transition-colors", !detailedAi ? "bg-surface-0 text-brand-600 shadow-sm" : "text-surface-500 hover:text-surface-700")}
                  >
                    Simple
                  </button>
                  <button
                    onClick={() => setDetailedAi(true)}
                    className={cn("px-4 py-1.5 rounded-md text-sm font-medium transition-colors", detailedAi ? "bg-surface-0 text-brand-600 shadow-sm" : "text-surface-500 hover:text-surface-700")}
                  >
                    Detailed
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-surface-900 mb-4 border-b border-surface-200 pb-2">
              <Bell className="w-5 h-5 text-brand-500" />
              Notifications
            </h2>
            <div className="space-y-2">
              <Toggle label="Study Plan Reminders" checked={true} onChange={() => {}} />
              <Toggle label="Group Updates" checked={groupUpdates} onChange={setGroupUpdates} />
              <Toggle label="Teacher Announcements" checked={teacherAnnouncements} onChange={setTeacherAnnouncements} />
            </div>
          </section>

          {/* Data */}
          <section>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-surface-900 mb-4 border-b border-surface-200 pb-2">
              <Shield className="w-5 h-5 text-danger" />
              Data & Privacy
            </h2>
            <div className="space-y-4">
              <button
                onClick={clearHistory}
                className="px-4 py-2 bg-danger/10 hover:bg-danger/20 text-danger border border-danger/20 rounded-lg font-medium transition-colors w-full sm:w-auto"
              >
                Clear Study History
              </button>
              <p className="text-sm text-surface-500">This will delete all completed missions and quiz scores from your local device.</p>
            </div>
          </section>

          {/* About */}
          <section className="pt-8 text-center border-t border-surface-200">
            <p className="text-brand-500 font-bold text-xl mb-1">StudyPilot</p>
            <p className="text-surface-500 text-sm">Version 0.1.0</p>
            <p className="text-surface-400 text-xs mt-2">Built with care for students in Pakistan.</p>
          </section>
        </div>

      </div>
    </div>
  );
}
