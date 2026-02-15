'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { RoleTab } from '@/features/auth/services/RoleTab'
import { SignupForm } from '@/features/auth/components/SignupForm'
import { Stethoscope, Heart, Clock, ShieldCheck, Sparkles } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
}

export default function SignupPage() {
  const [selectedRole, setSelectedRole] = useState<'patient' | "doctor">('patient')

  const features = [
    {
      icon: Heart,
      title: 'Patient-Centric Care',
      description: 'Manage your medical records and appointments in one secure hub.',
    },
    {
      icon: Clock,
      title: 'Real-time Scheduling',
      description: 'Instant booking with certified professionals at your convenience.',
    },
    {
      icon: Stethoscope,
      title: 'Verified Network',
      description: 'Access a curated community of specialized medical experts.',
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary overflow-x-hidden transition-colors duration-300">
      
      {/* Background Cinematic Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] right-[-5%] h-[400px] md:h-[600px] w-[400px] md:w-[600px] bg-primary/15 dark:bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-5%] left-[-5%] h-[300px] md:h-[500px] w-[300px] md:w-[500px] bg-blue-500/10 rounded-full blur-[80px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.12] dark:opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center py-12 md:py-20">
        
        {/* Navigation */}
        <div className="absolute top-6 left-4 sm:left-6 lg:left-8">
          <Link href="/" className="group flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-tighter text-muted-foreground hover:text-foreground transition-colors">
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Home</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start lg:gap-16">
          
          {/* Left Section: Branding & Features (Hidden on mobile) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-10 hidden md:block lg:sticky lg:top-24"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                <Sparkles className="h-3 w-3" /> Start Your Journey
              </div>
              <h1 className="text-4xl lg:text-6xl font-black tracking-tighter leading-[0.95]">
                Better Health <br />
                <span className="text-primary dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-zinc-200 dark:to-zinc-500">
                  Starts Here.
                </span>
              </h1>
              <p className="text-base lg:text-lg text-muted-foreground max-w-md font-medium leading-relaxed">
                Join PH-HealthCare to connect with world-class providers and take control of your wellness.
              </p>
            </motion.div>

            {/* Feature List */}
            <div className="grid gap-4 max-w-lg">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group flex gap-5 p-5 rounded-2xl border border-border bg-card/30 backdrop-blur-md hover:bg-card/50 transition-all border-dashed"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-background border border-border text-primary shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-tight">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="pt-4 flex items-center gap-3 opacity-60">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <p className="text-[10px] font-bold uppercase tracking-widest">End-to-End Encrypted Registration</p>
            </motion.div>
          </motion.div>

          {/* Right Section: Form Container */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[470px] mx-auto lg:ml-auto"
          >
            <div className="relative">
              {/* Decorative Glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary/20 to-transparent rounded-[3rem] blur-3xl opacity-50 pointer-events-none" />
              
              <div className="relative rounded-[2.5rem] border border-border bg-card/80 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl overflow-hidden">
                
                {/* Progress Header */}
                <div className="mb-8">
                  <h2 className="text-2xl font-black  ">
                    Create Your New Patient Account
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1 font-medium">Please select your account type and fill details.</p>
                </div>

                {/* The Form */}
             
                  <motion.div
                    key={selectedRole}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SignupForm  />
                  </motion.div>
             

              
              </div>
            </div>

           
          </motion.div>
          
        </div>
      </div>
    </div>
  )
}