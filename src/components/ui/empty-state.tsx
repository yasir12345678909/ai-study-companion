import * as React from 'react'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon
  title: string
  description: string
  action?: React.ReactNode
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border border-dashed border-surface-300 p-8 text-center animate-in fade-in-50 duration-500',
        className
      )}
      {...props}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-100 mb-4">
        <Icon className="h-6 w-6 text-surface-500" />
      </div>
      <h3 className="mb-1 text-lg font-semibold text-surface-900">{title}</h3>
      <p className="mb-4 max-w-sm text-sm text-surface-500">{description}</p>
      {action && <div>{action}</div>}
    </div>
  )
}
