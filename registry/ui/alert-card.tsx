import * as React from 'react'
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type AlertSeverity = 'critical' | 'warning' | 'success' | 'info'

export interface AlertCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  severity?: AlertSeverity
  /** Exibe botao de fechar quando informado. */
  onClose?: () => void
  /** Rotulo do botao de acao (opcional). */
  actionLabel?: string
  onAction?: () => void
}

/**
 * AlertCard — cartao de alerta com severidade (critical/warning/success/info),
 * icone, acao opcional e dismiss opcional. Toda a copy vem por props.
 * Cores por severidade usam a paleta neutra (red/amber/green/blue) em light e dark.
 */
export function AlertCard({
  title,
  description,
  severity = 'info',
  onClose,
  actionLabel,
  onAction,
  className,
  ...props
}: AlertCardProps) {
  const styles = {
    critical: {
      card: 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50 text-red-900 dark:text-red-200',
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      action: 'text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-950/40',
    },
    warning: {
      card: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200',
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      action: 'text-amber-700 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-950/40',
    },
    success: {
      card: 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900/50 text-green-900 dark:text-green-200',
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      action: 'text-green-700 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-950/40',
    },
    info: {
      card: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50 text-blue-900 dark:text-blue-200',
      icon: <Info className="h-5 w-5 text-blue-500" />,
      action: 'text-blue-700 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-950/40',
    },
  }[severity]

  return (
    <div
      className={cn(
        'relative flex gap-3 overflow-hidden rounded-lg border p-4 shadow-sm transition-all duration-300',
        styles.card,
        className,
      )}
      role="alert"
      {...props}
    >
      <div className="mt-0.5 flex-shrink-0">{styles.icon}</div>
      <div className="flex-grow space-y-1">
        <h4 className="text-sm font-semibold leading-none">{title}</h4>
        <p className="text-xs font-medium leading-relaxed opacity-90">{description}</p>
        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className={cn(
              'mt-2 select-none rounded-md border border-current/25 px-2.5 py-1 text-xs font-semibold transition-all duration-200',
              styles.action,
            )}
          >
            {actionLabel}
          </button>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="flex-shrink-0 self-start rounded-full p-1 opacity-65 transition-opacity hover:bg-black/5 hover:opacity-100 dark:hover:bg-white/5"
          aria-label="Fechar alerta"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
