'use client'

import { createPortal } from 'react-dom' // Import Portal
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useApiMutation } from '@/hooks/useApiMutation'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Loader2, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LoginFormData, LoginSchema } from '../validations'
import SocialLogin from './SocialLogin'
export function SignInForm() {
    const router = useRouter()
    const [mounted, setMounted] = useState(false) // Required for Portals in Next.js
    const [showPassword, setShowPassword] = useState(false)
    const [isSuccessOverlay, setIsSuccessOverlay] = useState(false)
    // Handle Hydration for Portal
    useEffect(() => {
        setMounted(true)
    }, [])

    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const { mutateAsync: handleSignIn, isPending: isLoading, isSuccess } = useApiMutation({
        method: "POST",
        endpoint: "/api/v1/auth/login",
    })

    async function onSubmit(data: LoginFormData) {
        const payload = {
            email: data.email,
            password: data.password,
        }
       const userData = await handleSignIn(payload)
     
console.log(userData);

        //  setIsRedirecting(true);
          
        //   await refetchQueries("user-profile");

          // Determine route
        if(userData.success){
              const url = userData.data.user.role === "PATIENT" 
            ? "/dashboard/patient" 
            : userData.data.user.role === "DOCTOR" 
            ? "/dashboard/doctor" 
            : "/dashboard/admin";

          // Use window.location for a fresh state, or router.push for SPA speed
          // window.location.href = route;
          router.push(url)
        }
       
    }

    useEffect(() => {
        setMounted(true)
        // if (isSuccess) {
        //         router.push("/dashboard")
        // }
    }, [isSuccess, router])


    return (
        <div className='relative w-full'>
            
      
            
            

            {/* 2. The Login Form remains in its layout position */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full"
            >
                <div className="mb-8 text-center lg:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Sign In</h2>
                    <p className="text-muted-foreground text-sm mt-2 font-medium">Access your secure medical dashboard.</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="example@gmail.com"
                                            {...field}
                                            disabled={isLoading}
                                            className="h-10"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
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
                                                className="h-10"
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

                        <Button type="submit" className="w-full h-11 font-bold" disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : 'Sign In'}
                        </Button>

                        <p className="text-center text-xs text-muted-foreground py-2 font-medium">
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={() => router.push('/sign-up')}
                                className="text-primary font-black hover:underline underline-offset-4"
                            >
                                Sign Up
                            </button>
                        </p>
                    </form>
                </Form>

                        {/* Divider */}
          <div className="my-6  flex items-center gap-3">
            <div className="flex-1 border-t border-border" />
            <span className="text-xs text-muted-foreground">or continue with</span>
            <div className="flex-1 border-t border-border" />
          </div>

               
                 <SocialLogin />
               
            </motion.div>
        </div>
    )
}