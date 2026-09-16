import { create } from 'zustand'
import type { User, UserRole } from '@/types'
import { demoUser, demoTeacher, demoAdmin } from '@/data/mock-data'

export type ThemeMode = 'dark' | 'light'

const getInitialTheme = (): ThemeMode => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('studypilot-theme')
    if (saved === 'light' || saved === 'dark') return saved
  }
  return 'dark'
}

const applyThemeToDOM = (theme: ThemeMode) => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(theme)
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.colorScheme = theme
    localStorage.setItem('studypilot-theme', theme)
  }
}

// Initial theme application
const initialTheme = getInitialTheme()
applyThemeToDOM(initialTheme)

interface AppState {
  user: User
  theme: ThemeMode
  sidebarOpen: boolean
  isSidebarOpen: boolean
  sidebarCollapsed: boolean
  mobileNavOpen: boolean
  isMobileNavOpen: boolean
  searchOpen: boolean
  isSearchOpen: boolean
  activeRole: UserRole
  userRole: UserRole
  toggleTheme: () => void
  setTheme: (theme: ThemeMode) => void
  toggleSidebar: () => void
  toggleMobileNav: () => void
  setMobileNavOpen: (val: boolean) => void
  toggleSearch: () => void
  setIsSearchOpen: (val: boolean) => void
  switchRole: (role: UserRole) => void
  setUserRole: (role: UserRole) => void
  setSidebarCollapsed: (val: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  user: demoUser,
  theme: initialTheme,
  sidebarOpen: true,
  isSidebarOpen: true,
  sidebarCollapsed: false,
  mobileNavOpen: false,
  isMobileNavOpen: false,
  searchOpen: false,
  isSearchOpen: false,
  activeRole: 'student',
  userRole: 'student',
  
  toggleTheme: () => set((state) => {
    const nextTheme: ThemeMode = state.theme === 'dark' ? 'light' : 'dark'
    applyThemeToDOM(nextTheme)
    return { theme: nextTheme }
  }),
  
  setTheme: (theme: ThemeMode) => {
    applyThemeToDOM(theme)
    set({ theme })
  },

  toggleSidebar: () => set((state) => ({ 
    sidebarOpen: !state.sidebarOpen, 
    isSidebarOpen: !state.isSidebarOpen 
  })),
  toggleMobileNav: () => set((state) => ({ 
    mobileNavOpen: !state.mobileNavOpen, 
    isMobileNavOpen: !state.isMobileNavOpen 
  })),
  setMobileNavOpen: (val: boolean) => set({ 
    mobileNavOpen: val, 
    isMobileNavOpen: val 
  }),
  toggleSearch: () => set((state) => ({ 
    searchOpen: !state.searchOpen, 
    isSearchOpen: !state.isSearchOpen 
  })),
  setIsSearchOpen: (val: boolean) => set({ 
    searchOpen: val, 
    isSearchOpen: val 
  }),
  switchRole: (role: UserRole) => set(() => {
    let newUser: User = demoUser
    if (role === 'teacher') newUser = demoTeacher
    if (role === 'admin' || role === 'management') newUser = demoAdmin
    return { activeRole: role, userRole: role, user: newUser }
  }),
  setUserRole: (role: UserRole) => set(() => {
    let newUser: User = demoUser
    if (role === 'teacher') newUser = demoTeacher
    if (role === 'admin' || role === 'management') newUser = demoAdmin
    return { activeRole: role, userRole: role, user: newUser }
  }),
  setSidebarCollapsed: (val: boolean) => set({ sidebarCollapsed: val }),
}))
