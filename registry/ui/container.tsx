import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type ContainerSize = 'md' | 'lg' | 'xl'

const containerSizes: Record<ContainerSize, string> = {
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
}

interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
  size?: ContainerSize
}

/**
 * Container centralizado com gutters responsivos no padrao V-STACK.
 * `size` controla a largura maxima (md=4xl, lg=6xl, xl=7xl).
 */
export function Container({ size = 'xl', className, ...props }: ContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full px-5 sm:px-6 lg:px-8', containerSizes[size], className)}
      {...props}
    />
  )
}
