'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/navigation' // Ensure this is next/link usually
import NextLink from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Menu, X, Moon, Sun, User, LogOut, Settings, LayoutDashboard } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useUser } from '@/context/UserContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import LogoutButton from '@/features/auth/components/LogoutButton'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
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

  // Mock logout function
  const handleLogout = () => {
    // Add your logout logic here (e.g., delete cookie, redirect)
    console.log("Logging out...")
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NextLink href="/" className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                PH
              </div>
              <span className="hidden font-bold text-lg sm:inline">PH-HealthCare</span>
            </motion.div>
          </NextLink>

          {/* Desktop Navigation */}
          <div className="hidden gap-8 md:flex">
            {navLinks.map((link) => (
              <NextLink key={link.href} href={link.href} className="relative text-sm font-medium transition-colors hover:text-primary">
                {link.label}
              </NextLink>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="h-10 w-10 rounded-full"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}

            {!isLoading && user ? (
              /* Profile Popover Section */
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center focus:outline-none"
                >
                  <Avatar className="h-9 w-9 border-2 border-primary/20 transition-hover hover:border-primary">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <>
                      {/* Invisible backdrop to close popover */}
                      <div className="fixed inset-0 z-[-1]" onClick={() => setIsProfileOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute right-0 mt-2 w-64 rounded-xl border border-border bg-popover p-2 shadow-xl"
                      >
                        <div className="px-3 py-3 border-b border-border mb-2">
                          <p className="text-sm font-semibold truncate">{user.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                          <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase text-primary">
                            {user.role}
                          </span>
                        </div>
                        
                        <div className="space-y-1">
                          <NextLink href={`/${user.role.toLowerCase()}/dashboard`} onClick={() => setIsProfileOpen(false)}>
                            <div className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors">
                              <LayoutDashboard className="h-4 w-4" /> Dashboard
                            </div>
                          </NextLink>
                          <NextLink href="/profile/settings" onClick={() => setIsProfileOpen(false)}>
                            <div className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors">
                              <Settings className="h-4 w-4" /> Settings
                            </div>
                          </NextLink>
                          <LogoutButton/>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Auth Buttons (if not logged in) */
              <div className="hidden sm:flex gap-3">
                <Button variant="ghost" asChild>
                  <NextLink href="/sign-in">Sign In</NextLink>
                </Button>
                <Button asChild>
                  <NextLink href="/sign-up">Get Started</NextLink>
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}