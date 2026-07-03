'use client'

import * as React from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /** Callback com debounce ao digitar (e ao limpar). */
  onSearch?: (value: string) => void
  /** Callback bruto de cada tecla (opcional). */
  onValueChange?: (value: string) => void
  /** Atraso do debounce em ms. */
  debounceMs?: number
}

/**
 * SearchInput — campo de busca com icone, botao de limpar e debounce.
 * Controlado internamente; sem copy fixa (placeholder vem por prop).
 * Foco/aro usam o token `primary`; superficie/borda usam `slate` neutro.
 */
export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onSearch, onValueChange, debounceMs = 300, ...props }, ref) => {
    const [value, setValue] = React.useState('')
    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    const emit = React.useCallback(
      (val: string) => {
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => onSearch?.(val), debounceMs)
      },
      [onSearch, debounceMs],
    )

    const handleClear = () => {
      setValue('')
      onValueChange?.('')
      if (timerRef.current) clearTimeout(timerRef.current)
      onSearch?.('')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setValue(val)
      onValueChange?.(val)
      emit(val)
    }

    React.useEffect(() => {
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    }, [])

    return (
      <div className="relative flex w-full items-center">
        <Search className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          className={cn(
            'w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-8 text-xs font-semibold text-slate-700 placeholder-slate-400 transition-all duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300',
            className,
          )}
          {...props}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Limpar busca"
            className="absolute right-3 rounded-full p-0.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-500 dark:hover:bg-slate-800"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    )
  },
)
SearchInput.displayName = 'SearchInput'
