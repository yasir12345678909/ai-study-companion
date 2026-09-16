import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastOptions {
  id?: string
  message: string
  type?: ToastType
  duration?: number
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined)

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastOptions[]>([])

  const toast = React.useCallback(
    ({ message, type = 'info', duration = 3000, id = Math.random().toString(36).substring(2, 9) }: ToastOptions) => {
      setToasts((prev) => {
        const newToasts = [...prev, { id, message, type, duration }]
        if (newToasts.length > 3) {
          return newToasts.slice(newToasts.length - 3)
        }
        return newToasts
      })
    },
    []
  )

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className="fixed bottom-0 right-0 z-50 p-4 sm:p-6 w-full sm:max-w-md flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id!)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

function ToastItem({ toast, onDismiss }: { toast: ToastOptions; onDismiss: () => void }) {
  React.useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(onDismiss, toast.duration)
      return () => clearTimeout(timer)
    }
  }, [toast.duration, onDismiss])

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-success" />,
    error: <AlertCircle className="h-5 w-5 text-danger" />,
    warning: <AlertTriangle className="h-5 w-5 text-warning" />,
    info: <Info className="h-5 w-5 text-brand-500" />,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className="pointer-events-auto flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border-surface-200 bg-surface-0 p-4 pr-6 shadow-lg"
    >
      <div className="flex items-center gap-3">
        {icons[toast.type || 'info']}
        <p className="text-sm font-medium text-surface-900">{toast.message}</p>
      </div>
      <button
        onClick={onDismiss}
        className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  )
}
