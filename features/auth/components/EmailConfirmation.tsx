'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface EmailConfirmationProps {
  email: string
  isOpen: boolean;
  onClose?: () => void;
}

export function EmailConfirmation({ email, isOpen, onClose }: EmailConfirmationProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* 1. Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* 2. Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-xl border border-border bg-card p-8 shadow-2xl"
          >
            {/* Optional Close Button */}
            {onClose && (
              <button 
                onClick={onClose}
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            <div className="flex flex-col items-center text-center space-y-6">
              {/* Icon Circle - Using your Primary Emerald */}
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="h-10 w-10 text-primary" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  Check your email
                </h2>
                <p className="text-muted-foreground text-sm">
                  We've sent a verification link to <br />
                  <span className="font-semibold text-primary">{email}</span>
                </p>
              </div>

              <div className="bg-muted/20 p-4 rounded-lg border border-border/50 w-full text-xs text-left">
                <p className="font-semibold mb-1 text-foreground">Didn't receive it?</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Check your spam or promotions folder</li>
                  <li>Ensure the email address is correct</li>
                </ul>
              </div>

              <Button asChild className="w-full group shadow-lg shadow-primary/20">
                <Link href="/sign-in">
                  Go to Sign In
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}