import * as React from 'react'
import { cn } from '@/lib/utils'
import { AlertCircle } from 'lucide-react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-surface-800">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-surface-400">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              'flex h-10 w-full rounded-md border border-surface-400 bg-surface-100 px-3 py-2 text-sm text-surface-950 placeholder:text-surface-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-50',
              icon && 'pl-10',
              error && 'border-danger focus:border-danger focus:ring-danger',
              className
            )}
            ref={ref}
            {...props}
          />
          {error && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-danger">
              <AlertCircle className="h-4 w-4" />
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-danger">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
