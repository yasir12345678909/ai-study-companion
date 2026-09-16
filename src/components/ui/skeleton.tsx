import { cn } from '@/lib/utils'
import * as React from 'react'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'card' | 'avatar' | 'custom'
}

function Skeleton({ className, variant = 'custom', ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-surface-200',
        {
          'h-4 w-full': variant === 'text',
          'h-full w-full min-h-[100px]': variant === 'card',
          'h-10 w-10 rounded-full': variant === 'avatar',
        },
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
