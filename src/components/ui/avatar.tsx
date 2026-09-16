import * as React from 'react'
import { cn } from '@/lib/utils'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  name?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Avatar({ src, name, size = 'md', className, ...props }: AvatarProps) {
  const [imgError, setImgError] = React.useState(false)

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  }

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?'

  return (
    <div
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full bg-surface-300',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          className="aspect-square h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-medium text-surface-700">
          {initials}
        </div>
      )}
    </div>
  )
}
