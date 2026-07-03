import * as React from 'react'
import { cn } from '@/lib/utils'

export type TimelineStatus = 'normal' | 'active' | 'success' | 'error'

export interface TimelineItem {
  id: string | number
  title: string
  description?: string
  timestamp?: string
  icon?: React.ReactNode
  status?: TimelineStatus
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[]
}

/**
 * Timeline — linha do tempo vertical data-driven (sem dependencias).
 * Cada item vem por props (title, description, timestamp, icon, status).
 * O ponto muda de cor por status; a copy vem toda do consumidor.
 */
export function Timeline({ items, className, ...props }: TimelineProps) {
  const getDotStyle = (status: TimelineItem['status']) => {
    switch (status) {
      case 'active':
        return 'bg-blue-500 border-blue-200 dark:border-blue-900 ring-4 ring-blue-500/20'
      case 'success':
        return 'bg-green-500 border-green-200 dark:border-green-900 ring-4 ring-green-500/20'
      case 'error':
        return 'bg-red-500 border-red-200 dark:border-red-900 ring-4 ring-red-500/20'
      default:
        return 'bg-slate-300 dark:bg-slate-700 border-slate-100 dark:border-slate-800'
    }
  }

  return (
    <div
      className={cn(
        'relative space-y-6 pl-6 before:absolute before:inset-y-1 before:left-2 before:w-[2px] before:bg-slate-200 dark:before:bg-slate-800',
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <div key={item.id} className="group relative flex flex-col gap-2 md:flex-row md:items-baseline">
          <div
            className={cn(
              'absolute -left-[22px] flex h-5 w-5 items-center justify-center rounded-full border-2 text-[10px] text-white transition-all duration-300',
              getDotStyle(item.status),
            )}
          >
            {item.icon}
          </div>

          <div className="flex-grow space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-semibold text-foreground">{item.title}</span>
              {item.timestamp && (
                <span className="whitespace-nowrap font-mono text-[10px] text-muted-foreground">
                  {item.timestamp}
                </span>
              )}
            </div>
            {item.description && (
              <p className="text-xs font-medium leading-normal text-muted-foreground">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
