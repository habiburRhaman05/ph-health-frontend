"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import LogoutButton from '@/features/auth/components/LogoutButton'
import { useApiQuery } from '@/hooks/useApiQuery'
import { motion } from 'framer-motion'
import { LayoutDashboard, Calendar, History, User, ArrowRight, Sparkles } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardPage() {
    const { data: profile, isLoading } = useApiQuery<{
        data: {
            name: string
            email: string
        }
    }>(["profile-data"], "/api/v1/auth/me")

    const user = profile?.data

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300 overflow-hidden">
            {/* Background Ambient Glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Header Section */}
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                            <Sparkles className="h-3 w-3" /> Patient Portal
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic">
                            {isLoading ? <Skeleton className="h-12 w-64" /> : `Welcome, ${user?.name.split(' ')[0]}`}
                        </h1>
                        <p className="text-muted-foreground mt-2 font-medium">
                            {isLoading ? <Skeleton className="h-4 w-48 mt-2" /> : user?.email}
                        </p>
                    </motion.div>

                    <motion.div 
                         initial={{ opacity: 0, scale: 0.9 }}
                         animate={{ opacity: 1, scale: 1 }}
                         className="flex items-center gap-3"
                    >
                        <LogoutButton />
                    </motion.div>
                </header>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Welcome Card / Main Action */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-2 relative group overflow-hidden rounded-[2rem] border border-border bg-card/50 backdrop-blur-xl p-8 lg:p-10 shadow-xl"
                    >
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold tracking-tight mb-4">Ready for your next checkup?</h2>
                            <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
                                Our network of certified specialists is ready to assist you. Book an appointment today and manage your health records seamlessly.
                            </p>
                            <Button asChild size="lg" className="rounded-xl px-8 font-bold group">
                                <Link href="/doctors" className="flex items-center gap-2">
                                    Browse Doctors <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </div>
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <LayoutDashboard size={180} />
                        </div>
                    </motion.div>

                    {/* Stats / Quick Info */}
                    <div className="space-y-6">
                        {[
                            { title: 'Appointments', icon: Calendar, label: '0 Upcoming', color: 'text-blue-500' },
                            { title: 'Medical History', icon: History, label: 'No records found', color: 'text-primary' },
                            { title: 'Profile Status', icon: User, label: '100% Complete', color: 'text-green-500' }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + (idx * 0.1) }}
                                className="flex items-center gap-4 p-6 rounded-[1.5rem] border border-border bg-card/30 backdrop-blur-sm hover:bg-card/60 transition-colors"
                            >
                                <div className={`p-3 rounded-xl bg-background border border-border ${item.color}`}>
                                    <item.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold tracking-tight">{item.title}</h3>
                                    <p className="text-xs text-muted-foreground">{item.label}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Placeholder for future features */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 p-8 rounded-[2rem] border border-dashed border-border flex flex-col items-center text-center justify-center min-h-[200px]"
                >
                    <p className="text-sm font-medium text-muted-foreground italic">
                        Advanced analytics and health tracking modules are being integrated.
                    </p>
                </motion.div>
            </div>
        </div>
    )
}