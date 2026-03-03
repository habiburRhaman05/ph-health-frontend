'use client'

import React, { useState, useEffect } from 'react'
import NextLink from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Menu, Moon, Sun, LayoutDashboard, LogIn, UserPlus, Settings } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useUser } from '@/context/UserContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import LogoutButton from '@/features/auth/components/LogoutButton'
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import UserProfile from '@/features/auth/components/UserProfilePopup'

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { user, isLoading } = useUser()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navLinks = [
    { label: 'Find Doctors', href: '/doctors' },
    { label: 'Roadmap', href: '/roadmap' },
    { label: 'About', href: '#about' },
  ]

  if (!mounted) return null

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* --- LEFT: LOGO --- */}
          <NextLink href="/" className="flex items-center gap-2 shrink-0">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20">
                PH
              </div>
              <span className="hidden font-bold text-xl tracking-tight sm:inline">
                PH-<span className="text-primary">HealthCare</span>
              </span>
            </motion.div>
          </NextLink>

          {/* --- CENTER: DESKTOP NAV --- */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NextLink 
                key={link.href} 
                href={link.href} 
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </NextLink>
            ))}
          </div>

          {/* --- RIGHT: ACTIONS --- */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-9 w-9 rounded-full border border-border/50 bg-background/50 transition-all hover:bg-accent"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-slate-700" />}
            </Button>

            {/* Auth Logic with Shadcn Popover */}
            {!isLoading && user ? (
            <UserProfile user={user}/>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <NextLink href="/sign-in">Sign In</NextLink>
                </Button>
                <Button size="sm" className="shadow-md shadow-primary/20" asChild>
                  <NextLink href="/sign-up">Get Started</NextLink>
                </Button>
              </div>
            )}

            {/* --- MOBILE MENU --- */}
            <div className="md:hidden flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Open Menu">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                  <SheetHeader className="text-left border-b border-border pb-4">
                    <SheetTitle className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">PH</div>
                      <span className="font-bold tracking-tight text-xl">Navigation</span>
                    </SheetTitle>
                  </SheetHeader>
                  
                  <div className="flex flex-col h-[calc(100vh-120px)] justify-between py-8">
                    <nav className="flex flex-col gap-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2 mb-2">Menu</p>
                      {navLinks.map((link) => (
                        <NextLink 
                          key={link.href} 
                          href={link.href} 
                          className="flex items-center px-2 py-3 text-lg font-semibold text-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
                        >
                          {link.label}
                        </NextLink>
                      ))}
                      {user && (
                        <NextLink 
                          href={`/${user.role?.toLowerCase()}/dashboard`}
                          className="flex items-center px-2 py-3 text-lg font-semibold text-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
                        >
                          Dashboard
                        </NextLink>
                      )}
                    </nav>

                    <div className="space-y-4">
                      {!user && (
                        <div className="grid gap-3">
                          <Button variant="outline" className="w-full justify-start gap-3 h-11" asChild>
                            <NextLink href="/sign-in"><LogIn className="h-4 w-4" /> Sign In</NextLink>
                          </Button>
                          <Button className="w-full justify-start gap-3 h-11" asChild>
                            <NextLink href="/sign-up"><UserPlus className="h-4 w-4" /> Get Started</NextLink>
                          </Button>
                        </div>
                      )}
                      <p className="text-center text-[10px] text-muted-foreground">© 2026 PH-HealthCare</p>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

          </div>
        </div>
      </div>
    </nav>
  )
}