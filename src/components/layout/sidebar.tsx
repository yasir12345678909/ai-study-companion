import React from 'react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/stores/app-store';
import { useAuthStore } from '@/stores/auth-store';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home, BookOpen, Sparkles, FolderOpen, Users, Clock, Settings,
  Plus, ChevronLeft, ChevronRight, GraduationCap, Shield, User, Languages,
  Calendar, RotateCcw, FileText, GitBranch, PenTool, LayoutDashboard, CheckSquare, LogIn
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

export function Sidebar() {
  const { isSidebarOpen, toggleSidebar, userRole, setUserRole } = useAppStore();
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isSidebarOpen ? 256 : 64 }}
      className="hidden md:flex flex-col bg-surface-50 border-r border-surface-200 h-screen sticky top-0 transition-colors duration-200"
    >
      <div className="p-4 flex items-center justify-between relative h-[72px]">
        <AnimatePresence mode="popLayout">
          {isSidebarOpen ? (
            <motion.div
              key="logo-full"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-2 overflow-hidden"
            >
              <div className="bg-brand-500 text-surface-0 p-1.5 rounded-lg">
                <Sparkles size={20} />
              </div>
              <span className="font-semibold text-lg text-surface-900 whitespace-nowrap">StudyPilot</span>
            </motion.div>
          ) : (
            <motion.div
              key="logo-icon"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center justify-center w-full"
            >
              <div className="bg-brand-500 text-surface-0 p-1.5 rounded-lg">
                <Sparkles size={20} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-surface-0 border border-surface-200 rounded-full flex items-center justify-center text-surface-500 hover:text-surface-900 hover:border-surface-300 shadow-sm z-10 focus:outline-none focus:ring-2 focus:ring-brand-500"
          aria-label={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      <div className="px-3 pb-4">
        <button className={cn(
          "w-full bg-brand-600 hover:bg-brand-700 text-surface-0 rounded-lg flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-surface-50",
          isSidebarOpen ? "py-2.5 px-4" : "p-2 aspect-square"
        )}>
          <Plus size={20} />
          {isSidebarOpen && <span className="font-medium whitespace-nowrap">New Study</span>}
        </button>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto overflow-x-hidden">
        {((userRole === 'teacher' ? teacherNavItems : userRole === 'admin' ? adminNavItems : studentNavItems)).map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => cn(
                "flex items-center gap-3 rounded-md transition-all duration-200 group relative focus:outline-none focus:ring-2 focus:ring-brand-500",
                isSidebarOpen ? "px-3 py-2" : "p-2 justify-center",
                isActive 
                  ? "bg-brand-500/10 text-brand-600 font-medium" 
                  : "text-surface-600 hover:bg-surface-100 hover:text-surface-900"
              )}
              title={!isSidebarOpen ? item.label : undefined}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-nav-indicator"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-brand-500 rounded-r-full" 
                  initial={false}
                />
              )}
              <item.icon size={20} className={cn("shrink-0", isActive ? "text-brand-600" : "text-surface-500 group-hover:text-surface-700")} />
              {isSidebarOpen && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-surface-200">
        {isSidebarOpen ? (
          <div className="flex bg-surface-200/50 p-1 rounded-lg mb-4">
            {(['student', 'teacher', 'admin'] as const).map((role) => {
              const RoleIcon = role === 'student' ? GraduationCap : role === 'teacher' ? User : Shield;
              const isActive = userRole === role;
              return (
                <button
                  key={role}
                  onClick={() => {
                    setUserRole(role);
                    const authState = useAuthStore.getState();
                    if (role === 'student') authState.loginAs('returning-student');
                    else if (role === 'teacher') authState.loginAs('rep-teacher');
                    else if (role === 'admin') authState.loginAs('management');
                  }}
                  className={cn(
                    "flex-1 flex justify-center py-1.5 rounded-md text-xs font-medium capitalize transition-all focus:outline-none focus:ring-2 focus:ring-brand-500",
                    isActive ? "bg-surface-0 text-surface-900 shadow-sm" : "text-surface-500 hover:text-surface-700"
                  )}
                >
                  <RoleIcon size={14} className={cn("mr-1.5", isActive ? "hidden lg:block" : "hidden")} />
                  <span className="truncate">{role}</span>
                </button>
              );
            })}
          </div>
        ) : (
           <div className="flex justify-center mb-4">
             <button
                onClick={() => {
                  const roles = ['student', 'teacher', 'admin'] as const;
                  const nextIndex = (roles.indexOf(userRole as any) + 1) % roles.length;
                  setUserRole(roles[nextIndex]);
                }}
                className="p-2 text-surface-500 hover:bg-surface-100 hover:text-surface-900 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                title={`Role: ${userRole}`}
              >
                {userRole === 'student' ? <GraduationCap size={20} /> : userRole === 'teacher' ? <User size={20} /> : <Shield size={20} />}
             </button>
           </div>
        )}

        <div className="space-y-1">
          <NavLink
            to="/profile"
            className={({ isActive }) => cn(
              "flex items-center gap-3 rounded-md transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-brand-500",
              isSidebarOpen ? "px-3 py-2" : "p-2 justify-center",
              isActive ? "bg-surface-100 text-surface-900" : "text-surface-600 hover:bg-surface-100 hover:text-surface-900"
            )}
            title={!isSidebarOpen ? "Profile" : undefined}
          >
            <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold shrink-0">
              U
            </div>
            {isSidebarOpen && <span className="whitespace-nowrap font-medium text-sm">User Profile</span>}
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) => cn(
              "flex items-center gap-3 rounded-md transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-brand-500",
              isSidebarOpen ? "px-3 py-2" : "p-2 justify-center",
              isActive ? "bg-surface-100 text-surface-900" : "text-surface-600 hover:bg-surface-100 hover:text-surface-900"
            )}
            title={!isSidebarOpen ? "Settings" : undefined}
          >
            <Settings size={20} className="shrink-0 text-surface-500 group-hover:text-surface-700" />
            {isSidebarOpen && <span className="whitespace-nowrap font-medium text-sm">Settings</span>}
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) => cn(
              "flex items-center gap-3 rounded-md transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-brand-500 text-brand-600 hover:bg-brand-500/10",
              isSidebarOpen ? "px-3 py-2" : "p-2 justify-center",
              isActive && "bg-brand-500/10 font-semibold"
            )}
            title={!isSidebarOpen ? "Switch Persona / Login" : undefined}
          >
            <LogIn size={20} className="shrink-0 text-brand-600" />
            {isSidebarOpen && <span className="whitespace-nowrap font-medium text-sm">Switch Persona</span>}
          </NavLink>
        </div>
      </div>
    </motion.aside>
  );
}
