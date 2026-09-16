import * as React from 'react'
import { cn } from '@/lib/utils'
import { CheckCircle, Clock, AlertCircle, XCircle, Archive, ShieldCheck } from 'lucide-react'

// From @/types or similar
export type VerificationStatus = 'verified' | 'teacher_verified' | 'pending' | 'student_uploaded' | 'rejected' | 'archived'

export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: VerificationStatus
  showLabel?: boolean
}

export function StatusIndicator({ status, showLabel = false, className, ...props }: StatusIndicatorProps) {
  const config = {
    verified: {
      icon: CheckCircle,
      color: 'bg-success/10 text-success border-success/20',
      label: 'Verified'
    },
    teacher_verified: {
      icon: ShieldCheck,
      color: 'bg-success/10 text-success border-success/20',
      label: 'Teacher Verified'
    },
    pending: {
      icon: Clock,
      color: 'bg-warning/10 text-warning border-warning/20',
      label: 'Pending'
    },
    student_uploaded: {
      icon: Clock,
      color: 'bg-brand-500/10 text-brand-500 border-brand-500/20',
      label: 'Uploaded'
    },
    rejected: {
      icon: XCircle,
      color: 'bg-danger/10 text-danger border-danger/20',
      label: 'Rejected'
    },
    archived: {
      icon: Archive,
      color: 'bg-surface-200 text-surface-600 border-surface-300',
      label: 'Archived'
    }
  }

  const { icon: Icon, color, label } = config[status] || { icon: AlertCircle, color: 'bg-surface-200 text-surface-600', label: 'Unknown' }

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium',
        color,
        className
      )}
      {...props}
    >
      <Icon className={cn('h-3.5 w-3.5', showLabel && 'mr-1.5')} />
      {showLabel && <span>{label}</span>}
    </div>
  )
}
