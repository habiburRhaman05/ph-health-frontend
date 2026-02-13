import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Appointments</h1>
        <div className="rounded-lg border border-border bg-card p-8">
          <p className="text-muted-foreground mb-4">
            Appointments management feature coming soon. View, reschedule, and cancel your appointments here.
          </p>
          <Button asChild>
            <Link href="/doctors">Book Appointment</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
