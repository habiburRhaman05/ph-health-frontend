'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { UserCircle, Stethoscope } from 'lucide-react'
import { cn } from '@/features/shared/utils'

interface RoleTabProps {
  selectedRole: 'patient' | 'doctor'
  onRoleChange: (role: 'patient' | 'doctor') => void
}

export function RoleTab({ selectedRole, onRoleChange }: RoleTabProps) {
  const roles = [
    { id: 'patient', label: 'Patient', icon: UserCircle },
    { id: 'doctor', label: 'Doctor', icon: Stethoscope },
  ]

  return (
    <div className="flex gap-2 p-1 bg-muted rounded-lg w-full">
      {roles.map((role) => {
        const Icon = role.icon
        const isSelected = selectedRole === role.id

        return (
          <motion.button
            key={role.id}
            disabled={role.id === "doctor"}
            onClick={() => onRoleChange(role.id as 'patient' | 'doctor')}
            className={cn(
              'flex-1 relative flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all font-medium text-sm',
              isSelected
                ? 'text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSelected && (
              <motion.div
                layoutId="role-indicator"
                className="absolute inset-0 bg-primary rounded-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <Icon className="h-5 w-5 relative z-10" />
            <span className="relative z-10">{role.label}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
