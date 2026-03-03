'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import * as z from 'zod'
import { Mail, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useApiMutation } from '@/hooks/useApiMutation'
import Link from 'next/link'

const ForgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const { mutateAsync: handleReset, isPending: isLoading } = useApiMutation({
    method: "POST",
    endpoint: "/api/v1/auth/forgot-password",
  })

  async function onSubmit(data: z.infer<typeof ForgotPasswordSchema>) {
    try {
      await handleReset(data)
      setIsSubmitted(true)
    } catch (error) {
      // Error handled by mutation hook
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div key="form" exit={{ opacity: 0, scale: 0.95 }}>
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-2xl font-bold tracking-tight">Reset Password</h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                No worries! Enter your email and we'll send you a secure link to reset your password.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="name@example.com" 
                            {...field} 
                            disabled={isLoading} 
                            className="pl-10 h-11 bg-background/50" 
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full h-11 font-bold text-base shadow-lg shadow-primary/20" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>

                <div className="text-center">
                  <Link 
                    href="/sign-in" 
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Sign In
                  </Link>
                </div>
              </form>
            </Form>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-4"
          >
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Check your email</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We've sent a password reset link to <br />
                <span className="font-semibold text-foreground">{form.getValues('email')}</span>
              </p>
            </div>

            <div className="pt-4 space-y-4">
              <p className="text-xs text-muted-foreground">
                Didn't receive the email? Check your spam folder or
              </p>
              <Button 
                variant="outline" 
                onClick={() => setIsSubmitted(false)}
                className="h-10 w-full"
              >
                Try another email
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}