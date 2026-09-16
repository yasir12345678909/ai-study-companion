import React, { useEffect } from 'react';
import { useAppStore } from '@/stores/app-store';
import { motion, AnimatePresence } from 'motion/react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Home, BookOpen, Sparkles, FolderOpen, Users, Clock, Settings,
  X, GraduationCap, Shield, User as UserIcon, Calendar, RotateCcw,
  FileText, GitBranch, PenTool, LayoutDashboard, CheckSquare, Languages
} from 'lucide-react';

const studentNavItems = [
  { icon: Home, label: 'Home', to: '/' },
  { icon: BookOpen, label: 'Subjects', to: '/subjects' },
  { icon: Sparkles, label: 'AI Tutor', to: '/tutor' },
  { icon: Calendar, label: 'Study Planner', to: '/planner' },
  { icon: RotateCcw, label: 'Quick Revision', to: '/revision' },
  { icon: FileText, label: 'Exams & Papers', to: '/exams' },
  { icon: GitBranch, label: 'Flowcharts', to: '/flowchart' },
  { icon: PenTool, label: 'Notebook Notes', to: '/handwritten' },
  { icon: FolderOpen, label: 'Materials', to: '/materials' },
  { icon: Languages, label: 'Writing Practice', to: '/writing' },
  { icon: Users, label: 'Class Groups', to: '/groups' },
  { icon: Clock, label: 'History', to: '/history' },
];

const teacherNavItems = [
  { icon: LayoutDashboard, label: 'Teacher Dashboard', to: '/teacher' },
  { icon: CheckSquare, label: 'Pending Reviews', to: '/teacher/review' },
  { icon: FolderOpen, label: 'Course Materials', to: '/materials' },
  { icon: Users, label: 'Class Groups', to: '/groups' },
  { icon: Sparkles, label: 'AI Assistant', to: '/tutor' },
  { icon: BookOpen, label: 'Subjects Curriculum', to: '/subjects' },
];

const adminNavItems = [
  { icon: Shield, label: 'Admin Dashboard', to: '/admin' },
  { icon: BookOpen, label: 'Curriculum & Boards', to: '/subjects' },
  { icon: FolderOpen, label: 'System Materials', to: '/materials' },
  { icon: Users, label: 'All Groups', to: '/groups' },
];

export function MobileNav() {
  const { isMobileNavOpen, setMobileNavOpen, userRole, setUserRole } = useAppStore();
  const location = useLocation();

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname, setMobileNavOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileNavOpen]);

  return (
    <AnimatePresence>
      {isMobileNavOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-surface-950/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileNavOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-[280px] bg-surface-50 shadow-2xl z-50 flex flex-col md:hidden border-r border-surface-200"
          >
            <div className="p-4 flex items-center justify-between border-b border-surface-200 h-14">
              <div className="flex items-center gap-2">
                <div className="bg-brand-500 text-surface-0 p-1.5 rounded-lg">
                  <Sparkles size={20} />
                </div>
                <span className="font-semibold text-lg text-surface-900">StudyPilot</span>
              </div>
              <button
                onClick={() => setMobileNavOpen(false)}
                className="p-2 -mr-2 text-surface-500 hover:text-surface-900 hover:bg-surface-200 rounded-md"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              <div className="mb-6">
                <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2 px-3">Main Menu</p>
                {(userRole === 'teacher' ? teacherNavItems : userRole === 'admin' ? adminNavItems : studentNavItems).map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) => cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200",
                        isActive 
                          ? "bg-brand-500/10 text-brand-600 font-medium" 
                          : "text-surface-600 hover:bg-surface-100 hover:text-surface-900"
                      )}
                    >
                      <item.icon size={20} className={isActive ? "text-brand-600" : "text-surface-500"} />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>

              <div>
                 <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2 px-3">Role</p>
                 <div className="flex bg-surface-200/50 p-1 rounded-lg mx-3">
                  {(['student', 'teacher', 'admin'] as const).map((role) => {
                    const RoleIcon = role === 'student' ? GraduationCap : role === 'teacher' ? UserIcon : Shield;
                    const isActive = userRole === role;
                    return (
                      <button
                        key={role}
                        onClick={() => setUserRole(role)}
                        className={cn(
                          "flex-1 flex justify-center py-1.5 rounded-md text-xs font-medium capitalize transition-all",
                          isActive ? "bg-surface-0 text-surface-900 shadow-sm" : "text-surface-500 hover:text-surface-700"
                        )}
                      >
                        <RoleIcon size={14} className="mr-1.5" />
                        <span className="truncate">{role}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </nav>

            <div className="p-4 border-t border-surface-200 space-y-1">
              <NavLink
                to="/profile"
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200",
                  isActive ? "bg-surface-100 text-surface-900" : "text-surface-600 hover:bg-surface-100 hover:text-surface-900"
                )}
              >
                <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold shrink-0">
                  U
                </div>
                <span className="font-medium text-sm">User Profile</span>
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200",
                  isActive ? "bg-surface-100 text-surface-900" : "text-surface-600 hover:bg-surface-100 hover:text-surface-900"
                )}
              >
                <Settings size={20} className="shrink-0 text-surface-500" />
                <span className="font-medium text-sm">Settings</span>
              </NavLink>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
