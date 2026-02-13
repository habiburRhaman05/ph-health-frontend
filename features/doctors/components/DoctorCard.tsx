'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, MapPin, Clock, BadgeCheck, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import type { Doctor } from '@/features/shared/types'
import { getInitials, formatCurrency } from '@/features/shared/utils'
import { BookingModal } from './BookingModal'

interface DoctorCardProps {
  doctor: Doctor
  onBook?: (doctorId: string) => void
}

export function DoctorCard({ doctor, onBook }: DoctorCardProps) {
  const [bookingOpen, setBookingOpen] = useState(false)
  const { toast } = useToast()

  const handleBookingConfirm = (data: any) => {
    toast({
      title: 'Appointment Confirmed',
      description: `Your appointment with ${doctor.name} has been scheduled for ${data.selectedDate} at ${data.selectedTime}`,
    })
    onBook?.(doctor.id)
  }

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        className="h-full rounded-lg border border-border bg-card p-6 transition-all"
      >
      <div className="space-y-4">
        {/* Doctor Header */}
        <div className="flex gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={doctor.image} alt={doctor.name} />
            <AvatarFallback className="bg-primary text-primary-foreground font-bold">
              {getInitials(doctor.name, '')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{doctor.name}</h3>
                <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
              </div>
              {doctor.verified && (
                <BadgeCheck className="h-5 w-5 text-primary flex-shrink-0" />
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-md bg-muted/50 p-2">
            <p className="text-xs text-muted-foreground">Experience</p>
            <p className="font-semibold">{doctor.experience} yrs</p>
          </div>
          <div className="rounded-md bg-muted/50 p-2">
            <p className="text-xs text-muted-foreground">Rating</p>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{doctor.rating?.toFixed(1) || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        {doctor.bio && (
          <p className="line-clamp-2 text-sm text-muted-foreground">{doctor.bio}</p>
        )}

        {/* Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-xs">
              {doctor.reviewsCount || 0} reviews
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-primary">
              {formatCurrency(doctor.consultationFee)}
            </span>
            <span className="text-muted-foreground">per session</span>
          </div>
        </div>

        {/* Qualifications Badge */}
        <div className="flex flex-wrap gap-1">
          {doctor.qualifications?.slice(0, 2).map((qual, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {qual}
            </Badge>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            className="flex-1"
            size="sm"
            asChild
          >
            <Link href={`/doctors/${doctor.id}`}>
              View Profile
            </Link>
          </Button>
          <Button
            className="flex-1"
            size="sm"
            onClick={() => setBookingOpen(true)}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            Book
          </Button>
        </div>
      </div>
      </motion.div>

      <BookingModal
        doctor={doctor}
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        onConfirm={handleBookingConfirm}
      />
    </>
  )
}
