'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Clock, BadgeCheck, MessageSquare, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'

import { getInitials, formatCurrency } from '@/features/shared/utils'
import { BookingModal } from './BookingModal'
// Assuming IDoctor interface now matches your Prisma include structure
import { IDoctor } from '@/interfaces/doctor' 

interface DoctorCardProps {
  doctor: IDoctor // Use IDoctorExtended if typed
  onBook?: (doctorId: string) => void
}

export function DoctorCard({ doctor, onBook }: DoctorCardProps) {
  const [bookingOpen, setBookingOpen] = useState(false)
  const { toast } = useToast()

  // Extract primary specialty or show multiple
  const primarySpecialty = doctor.specialtys?.map((s,index)=>{
    return index === 0 && s.specialty.title || 'General Physician'
  })
  
  
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
        className="h-full rounded-lg border border-border bg-card p-6 transition-all shadow-sm hover:shadow-md"
      >
        <div className="space-y-4">
          {/* Doctor Header */}
          <div className="flex gap-4">
            <Avatar className="h-16 w-16 border">
              <AvatarImage src={doctor.profilePhoto || ''} alt={doctor.name} />
              <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                {getInitials(doctor.name, '')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg leading-tight">{doctor.name}</h3>
                  <p className="text-sm font-medium text-primary mt-1">{primarySpecialty && primarySpecialty[0]}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Building2 className="h-3 w-3" />
                    {doctor.currentWorkingPlace}
                  </p>
                </div>
                {doctor.user?.emailVerified && (
                  <BadgeCheck className="h-5 w-5 text-blue-500 flex-shrink-0" />
                )}
              </div>
            </div> 
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-md bg-muted/50 p-2 text-center">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Experience</p>
              <p className="font-bold text-sm">{doctor.experience} Years</p>
            </div>
            <div className="rounded-md bg-muted/50 p-2 text-center">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Avg. Rating</p>
              <div className="flex items-center justify-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-sm">{doctor.averageRating > 0 ? doctor.averageRating.toFixed(1) : 'New'}</span>
              </div>
            </div>
          </div>

          {/* Specialties Badges */}
          <div className="flex flex-wrap gap-1">
            {doctor.specialtys?.map((item: any) => (
              <Badge key={item.id} variant="outline" className="text-[10px] py-0 px-2 font-normal">
                {item.specialty.title}
              </Badge>
            ))}
          </div>

          {/* Fee & Designation */}
          <div className="pt-2 border-t border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Consultation Fee</p>
                <p className="font-bold text-primary">
                  {formatCurrency(doctor.appointmentFee)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground uppercase">Designation</p>
                <p className="text-xs font-medium">{doctor.designation}</p>
              </div>
            </div>
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
              <MessageSquare className="h-4 w-4 mr-2" />
              Book Now
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