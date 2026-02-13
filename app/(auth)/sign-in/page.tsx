'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { SignInForm } from "@/features/auth/components/SigninForm"
import { ShieldCheck, Zap, Globe, Lock } from 'lucide-react'

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

export default function SignInPage() {
  const securityFeatures = [
    {
      icon: ShieldCheck,
      title: 'HIPAA Compliant',
      description: 'Your medical data is encrypted with enterprise-grade security.',
    },
    {
      icon: Zap,
      title: 'Instant Access',
      description: 'Seamlessly sync with your clinic or patient records in real-time.',
    },
    {
      icon: Globe,
      title: 'Universal Care',
      description: 'Access your health profile from any device, anywhere.',
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary overflow-x-hidden transition-colors duration-300">
      
      {/* Dynamic Background Elements - Using Theme Variables */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[300px] md:h-[500px] w-[300px] md:w-[500px] bg-primary/20 dark:bg-primary/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[300px] md:h-[500px] w-[300px] md:w-[500px] bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-[80px] md:blur-[120px]" />
        
        {/* Subtle Grain Texture (Works in both modes) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] dark:opacity-20 mix-blend-overlay pointer-events-none" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center py-12">
        
        {/* Top Navigation - Responsive positioning */}
        <div className="absolute top-6 left-4 sm:left-6 lg:left-8">
          <Link href="/" className="group flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back Home</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center lg:gap-16">
          
          {/* Left Section: Hidden on small mobile, visible from tablet up */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 hidden md:block"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                <Lock className="h-3 w-3" /> Secure Access Point
              </div>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]">
                Welcome Back to <br />
                <span className="text-primary dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-white dark:to-zinc-500">
                  PH-HealthCare.
                </span>
              </h1>
              <p className="text-base lg:text-lg text-muted-foreground max-w-md font-light leading-relaxed">
                Experience the next generation of medical collaboration and data security.
              </p>
            </motion.div>

            {/* Feature Cards - Adaptive Border/Bg */}
            <div className="grid gap-4 max-w-lg">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group flex gap-4 p-4 rounded-2xl border border-border bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all cursor-default"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-background border border-border text-primary group-hover:scale-105 transition-transform">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-wide">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Trust Visual */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-7 w-7 rounded-full border-2 border-background bg-muted overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=med${i}`} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground font-medium italic">
                Trusted by 12k+ certified professionals
              </p>
            </motion.div>
          </motion.div>

          {/* Right Section: Sign In Form - Responsive Max Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[440px] mx-auto lg:mr-0 lg:ml-auto"
          >
            <div className="relative group">
              {/* Form Shadow/Glow - Subtle in Light, Visible in Dark */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative rounded-[2rem] border border-border bg-card/70 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-2xl">
              

                <SignInForm />

               
              </div>
            </div>

          
          </motion.div>
          
        </div>
      </div>
    </div>
  )
}