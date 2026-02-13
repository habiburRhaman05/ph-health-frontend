import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/features/shared/utils'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  description?: string
  variant?: 'default' | 'success' | 'warning' | 'error'
}

const variantStyles = {
  default: 'bg-muted/50 text-foreground',
  success: 'bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100',
  warning: 'bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-100',
  error: 'bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100',
}

const iconStyles = {
  default: 'bg-primary/10 text-primary',
  success: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400',
  warning: 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400',
  error: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400',
}

export function StatCard({
  icon: Icon,
  label,
  value,
  description,
  variant = 'default',
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        'rounded-lg border border-border p-6 transition-all',
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
        <div className={cn('rounded-lg p-3', iconStyles[variant])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  )
}
