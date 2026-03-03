'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { SPECIALTIES } from '@/features/shared/constants'
import type { PatientSignupFormData, DoctorSignupFormData } from '../validations'
import { PatientSignupSchema, DoctorSignupSchema } from '../validations'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useApiMutation } from '@/hooks/useApiMutation'
import { useRouter } from 'next/navigation'
import { EmailConfirmation } from './EmailConfirmation'
import SocialLogin from './SocialLogin'



export function SignupForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(PatientSignupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      acceptTerms: false,
},
  })

  const { mutateAsync: handleSignup, isPending: isLoading } = useApiMutation({
    method: "POST",
    endpoint: "/auth/register",
  })

  async function onSubmit(data: PatientSignupFormData | DoctorSignupFormData) {
    
      const payload = {
        email: data.email,
        role: "PATIENT",
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
        contactNumber: data.phone,
      }
      
      await handleSignup(payload)
      setIsModalOpen(true)
      
  }

  return (
  
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full "
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            
            {/* 1. Name Fields */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} disabled={isLoading} className="h-9" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} disabled={isLoading} className="h-9" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

           {/* 2. Contact Fields */}
            
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} disabled={isLoading} className="h-9" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+92 300 1234567" {...field} disabled={isLoading} className="h-9" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
          

          
            {/* 4. Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          {...field}
                          disabled={isLoading}
                          className="h-9 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Confirm</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          {...field}
                          disabled={isLoading}
                          className="h-9 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* 5. Footer & Terms */}
            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem className="flex items-start gap-2 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                  </FormControl>
                  <FormLabel className="text-xs font-normal leading-tight cursor-pointer">
                    I agree to the Terms & Conditions and Privacy Policy
                  </FormLabel>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full h-10 font-semibold" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : 'Create Account'}
            </Button>

              {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 border-t border-border" />
            <span className="text-xs text-muted-foreground">or continue with</span>
            <div className="flex-1 border-t border-border" />
          </div>

          {/* Social Login Placeholder */}
         <SocialLogin/>

            <p className="text-center text-xs text-muted-foreground">
              Already have an account?{' '}
              <button 
                type="button" 
                onClick={() => router.push('/sign-in')} 
                className="text-primary font-bold hover:underline"
              >
                Sign In
              </button>
            </p>
          </form>
        </Form>
      </motion.div>

     
      
            
  
  )
}