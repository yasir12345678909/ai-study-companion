import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  label?: string
  showValue?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export function Progress({
  value,
  label,
  showValue,
  size = 'md',
  color,
  className,
  ...props
}: ProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value))
  
  let barColor = color
  if (!barColor) {
    if (clampedValue < 30) barColor = 'bg-danger'
    else if (clampedValue < 70) barColor = 'bg-warning'
    else barColor = 'bg-success'
  }

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  }

  return (
    <div className={cn('w-full', className)} {...props}>
      {(label || showValue) && (
        <div className="mb-1 flex justify-between text-sm font-medium text-surface-900">
          {label && <span>{label}</span>}
          {showValue && <span>{Math.round(clampedValue)}%</span>}
        </div>
      )}
      <div
        className={cn(
          'w-full overflow-hidden rounded-full bg-surface-200',
          heightClasses[size]
        )}
      >
        <motion.div
          className={cn('h-full w-full flex-1 transition-all', barColor)}
          initial={{ x: '-100%' }}
          animate={{ x: `-${100 - clampedValue}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}
