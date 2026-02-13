'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Star, MapPin, Award, BadgeCheck, Stethoscope, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { DoctorProfileSkeleton } from '@/features/shared/components/Skeletons'
import { getMockDoctors, getMockReviewsForDoctor } from '@/features/doctors/services/mockData'
import { formatCurrency, getInitials } from '@/features/shared/utils'
import { BookingModal } from '@/features/doctors/components/BookingModal'
import { useToast } from '@/hooks/use-toast'
import type { Doctor, DoctorReview } from '@/features/shared/types'

export default function DoctorProfilePage() {
  const params = useParams()
  const doctorId = params.id as string
  const { toast } = useToast()
  const [bookingOpen, setBookingOpen] = useState(false)

  const { data: doctor, isLoading: doctorLoading } = useQuery<Doctor | undefined>({
    queryKey: ['doctor', doctorId],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const result = getMockDoctors({ limit: 100 })
      return result.doctors.find((d) => d.id === doctorId)
    },
  })

  const { data: reviews = [] } = useQuery<DoctorReview[]>({
    queryKey: ['doctorReviews', doctorId],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return getMockReviewsForDoctor(doctorId)
    },
    enabled: !!doctor,
  })

  if (doctorLoading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <DoctorProfileSkeleton />
        </div>
      </div>
    )
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <p className="text-lg font-semibold mb-4">Doctor not found</p>
            <Button asChild>
              <Link href="/doctors">Back to Doctors</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const handleBookingConfirm = (data: any) => {
    toast({
      title: 'Appointment Confirmed',
      description: `Your appointment with ${doctor.name} has been scheduled for ${data.selectedDate} at ${data.selectedTime}`,
    })
  }

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : doctor.rating.toFixed(1)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/30 py-6">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <Link
              href="/doctors"
              className="text-primary hover:underline text-sm font-medium"
            >
              ← Back to Doctors
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Doctor Info Card */}
          <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <div className="flex gap-6 mb-6">
              <div>
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-32 w-32 rounded-lg object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                      {doctor.name}
                      {doctor.verified && (
                        <BadgeCheck className="h-7 w-7 text-primary" />
                      )}
                    </h1>
                    <p className="text-lg text-muted-foreground mt-1">{doctor.specialty}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Experience</p>
                    <p className="text-lg font-semibold">{doctor.experience} years</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Consultation Fee</p>
                    <p className="text-lg font-semibold text-primary">
                      {formatCurrency(doctor.consultationFee)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Rating</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold">{averageRating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({reviews.length || doctor.reviewsCount} reviews)
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">License</p>
                    <p className="text-sm font-mono">{doctor.licenseNumber || 'N/A'}</p>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={() => setBookingOpen(true)}
                  className="w-full sm:w-auto"
                >
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>

          {/* About & Qualifications */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* About */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-primary" />
                About
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {doctor.bio}
              </p>
            </div>

            {/* Qualifications */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Qualifications
              </h2>
              <div className="space-y-2">
                {doctor.qualifications.map((qual, idx) => (
                  <Badge key={idx} variant="secondary" className="block w-fit">
                    {qual}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Workplace */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Current Workplace
            </h2>
            <p className="text-muted-foreground">{doctor.currentWorkplace || 'Not specified'}</p>
          </div>

          {/* Reviews Section */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-semibold mb-6">Patient Reviews ({reviews.length})</h2>

            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review, idx) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="border-t pt-4 first:border-t-0 first:pt-0"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">{review.patientName}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-sm">{review.rating}</span>
                      </div>
                    </div>
                    <h4 className="font-medium mb-1">{review.title}</h4>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No reviews yet. Be the first to review!
              </p>
            )}
          </div>

          {/* Available Slots */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Available Time Slots</h2>
            <div className="flex flex-wrap gap-2">
              {doctor.availableSlots?.map((slot) => (
                <Badge key={slot} variant="outline">
                  {slot}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        doctor={doctor}
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        onConfirm={handleBookingConfirm}
      />
    </div>
  )
}
