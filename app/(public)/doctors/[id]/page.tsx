'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Star, MapPin, Award, BadgeCheck, Stethoscope } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { DoctorProfileSkeleton } from '@/features/shared/components/Skeletons'
import { getMockReviewsForDoctor } from '@/features/doctors/services/mockData'
import { formatCurrency } from '@/features/shared/utils'
import { BookingModal } from '@/features/doctors/components/BookingModal'
import { useToast } from '@/hooks/use-toast'
import type { DoctorReview } from '@/features/shared/types'
import { useApiQuery } from '@/hooks/useApiQuery'
import { IDoctor } from '@/interfaces/doctor'
import { queryKeys } from '@/lib/react-query-keys'
import { useUser } from '@/context/UserContext'
import { UserRole } from '@/interfaces/enum'

export default function DoctorProfilePage() {
  const params = useParams()
  const doctorId = params.id as string
  const { toast } = useToast()
  const [bookingOpen, setBookingOpen] = useState(false)
  const {user,isLoading} = useUser()
  // Mapping to your specific API structure
  const { data: response, isLoading: doctorLoading } = useApiQuery<{
    data: IDoctor
  }>([queryKeys.getDocotrIdKeys(doctorId)], `/api/v1/doctors/${doctorId}`)

  const doctor = response?.data

  const { data: reviews = [] } = useQuery<DoctorReview[]>({
    queryKey: ['doctorReviews', doctorId],
    queryFn: async () => {
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
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
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
      description: `Your appointment with ${doctor.name} has been scheduled.`,
    })
  };



  // Calculate rating based on JSON "averageRating" or reviews
  const displayRating = doctor.averageRating > 0 
    ? doctor.averageRating.toFixed(1) 
    : reviews.length > 0 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0"

  return (
    <div className="min-h-screen bg-background">
     
     
      {/* Header */}
      <div className="border-b border-border bg-muted/30 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link href="/doctors" className="text-primary hover:underline text-sm font-medium">
              ← Back to Doctors
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Doctor Info Card */}
          <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <div className="relative h-32 w-32 shrink-0 self-center sm:self-start">
                <img
                  src={doctor.profilePhoto || '/api/placeholder/150/150'}
                  alt={doctor.name}
                  className="h-full w-full rounded-lg object-cover border border-border"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                      {doctor.name}
                      <BadgeCheck className="h-6 w-6 text-blue-500" />
                    </h1>
                    <p className="text-lg text-muted-foreground mt-1">
                      {doctor.designation} 
                    </p>
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
                      {formatCurrency(doctor.appointmentFee)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Rating</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold">{displayRating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({reviews.length} reviews)
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Reg Number</p>
                    <p className="text-sm font-mono truncate">{doctor.registrationNumber}</p>
                  </div>
                </div>

                <Button 
                disabled={!user || user.role !== UserRole.PATIENT}
                size="lg" onClick={() => setBookingOpen(true)} className="w-full sm:w-auto">
                  Book Appointment
                </Button>
                <p className='text-red-600 font-bold mt-2'>
                  {!user  ? "Please Login First" : user.role !== UserRole.PATIENT ? "Patient Can Only Book Appointment" : ""
                
                  }</p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Qualifications - Using the "qualification" string from JSON */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Qualifications
              </h2>
              <div className="flex flex-wrap gap-2">
                {doctor.qualification.split(',').map((qual, idx) => (
                  <Badge key={idx} variant="secondary">
                    {qual.trim()}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Workplace - Using "currentWorkingPlace" */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Current Workplace
              </h2>
              <p className="text-muted-foreground">{doctor.currentWorkingPlace || 'Private Practice'}</p>
              <p className="text-sm text-muted-foreground mt-1">{doctor.contactNumber}</p>
            </div>
          </div>

          {/* Specialties Section */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-primary" />
              Specialties
            </h2>
            <div className="flex flex-wrap gap-3">
              {doctor.doctorSpecialties?.map((spec) => (
                <div key={spec.id} className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-sm">
                  <span>{spec.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-semibold mb-6">Patient Reviews ({reviews.length})</h2>
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review, idx) => (
                  <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex justify-between mb-2">
                      <p className="font-medium">{review.patientName}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No reviews yet.</p>
            )}
          </div>
        </motion.div>
      </div>

      <BookingModal
        doctor={doctor}
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        onConfirm={handleBookingConfirm}
      />
    </div>
  )
}