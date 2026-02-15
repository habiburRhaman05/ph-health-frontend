'use client'

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
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Loader2, Activity } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LoginFormData, LoginSchema } from '../validations'
import SocialLogin from './SocialLogin'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export function SignInForm() {
    const router = useRouter()
    const [mounted, setMounted] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showLoading, setShowLoading] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const form = useForm<LoginFormData>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const { mutateAsync: signInMutation, isPending: isLoading } = useMutation({
        mutationFn: async (data: LoginFormData) => {
            const res = await fetch(`/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || "Login failed");
            }

            return res.json();
        },
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            // Trigger the full screen loader once the API is successful
            setShowLoading(true)
        }
    });

    async function onSubmit(data: LoginFormData) {
        try {
            const userData = await signInMutation(data);

            if (userData?.success) {
                const role = userData.data.user.role;
                
                let url = "/dashboard";
                if (role === "PATIENT") url = "/dashboard/patient";
                else if (role === "DOCTOR") url = "/dashboard/doctor";
                else if (role === "ADMIN") url = "/dashboard/admin";

                // We keep showLoading true while Next.js finishes the push
                router.push(url);
            }
        } catch (error) {
            console.error("Login Error:", error);
            setShowLoading(false) // Hide loader if logic fails after success
        }
    }

    if (!mounted) return null;

    return (
        <div className='relative w-full'>
            {/* Full Screen Pre-loader */}
            <AnimatePresence>
                {showLoading && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md"
                    >
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-xl shadow-primary/20">
                                <Activity className="h-8 w-8 text-primary-foreground animate-pulse" />
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <h3 className="text-lg font-bold tracking-tight">Preparing your portal</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                    <span>Redirecting...</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: showLoading ? 0 : 1 }} // Fade out form when loader appears
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
                                            disabled={isLoading || showLoading}
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
                                                disabled={isLoading || showLoading}
                                                className="h-10"
                                            />
                                            <button
                                                type="button"
                                                disabled={isLoading || showLoading}
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

                        <Button type="submit" className="w-full h-11 font-bold" disabled={isLoading || showLoading}>
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

                <div className="my-6 flex items-center gap-3">
                    <div className="flex-1 border-t border-border" />
                    <span className="text-xs text-muted-foreground">or continue with</span>
                    <div className="flex-1 border-t border-border" />
                </div>
                
                <SocialLogin />
            </motion.div>
        </div>
    )
}