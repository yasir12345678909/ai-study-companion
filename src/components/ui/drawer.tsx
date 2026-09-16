import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DrawerProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  side?: 'right' | 'bottom'
}

export function Drawer({
  open,
  onClose,
  title,
  children,
  side = 'right',
}: DrawerProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  const variants = {
    right: {
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '100%' },
      className: 'fixed inset-y-0 right-0 h-full w-full sm:w-96 border-l border-surface-200'
    },
    bottom: {
      initial: { y: '100%' },
      animate: { y: 0 },
      exit: { y: '100%' },
      className: 'fixed inset-x-0 bottom-0 max-h-[90vh] w-full rounded-t-[10px] border-t border-surface-200'
    }
  }

  const activeVariant = variants[side]

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={activeVariant.initial}
            animate={activeVariant.animate}
            exit={activeVariant.exit}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn('z-50 bg-surface-0 shadow-xl flex flex-col', activeVariant.className)}
          >
            {title && (
              <div className="flex items-center justify-between border-b border-surface-200 px-4 py-3">
                <h2 className="text-lg font-semibold text-surface-950">{title}</h2>
                <button
                  onClick={onClose}
                  className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <X className="h-5 w-5 text-surface-900" />
                  <span className="sr-only">Close</span>
                </button>
              </div>
            )}
            {!title && (
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <X className="h-5 w-5 text-surface-900" />
                <span className="sr-only">Close</span>
              </button>
            )}
            <div className="flex-1 overflow-y-auto p-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
