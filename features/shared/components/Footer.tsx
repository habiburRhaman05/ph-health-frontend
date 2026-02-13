import React from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                PH
              </div>
              <span className="font-bold">PH-HealthCare</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted partner in digital health. Book appointments with verified doctors and manage your health online.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/doctors" className="text-sm text-muted-foreground hover:text-primary">
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link href="/appointments" className="text-sm text-muted-foreground hover:text-primary">
                  My Appointments
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-4">
            <h3 className="font-semibold">Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">+92 300 1234567</span>
              </div>
              <div className="flex gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">support@phealthcare.com</span>
              </div>
              <div className="flex gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">Karachi, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-border" />

        {/* Copyright */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            © {currentYear} PH-HealthCare. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 sm:justify-end">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Facebook
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Twitter
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
