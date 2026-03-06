'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useUser } from '@/context/UserContext'
import { BookingModal } from '@/features/doctors/components/BookingModal'
import { DoctorProfileSkeleton } from '@/features/doctors/components/DoctorsSkelections'
import { formatCurrency } from '@/features/shared/utils'
import { useToast } from '@/hooks/use-toast'
import { useApiQuery } from '@/hooks/useApiQuery'
import { IDoctor } from '@/interfaces/doctor'
import { UserRole } from '@/interfaces/enum'
import { queryKeys } from '@/lib/react-query-keys'
import { motion } from 'framer-motion'
import { Award, BadgeCheck, Calendar, Clock, MapPin, Star, Stethoscope } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { format } from 'date-fns'

export default function DoctorProfilePage() {
  const params = useParams()
  const doctorId = params.id as string
  const [bookingOpen, setBookingOpen] = useState(false)
  const { user } = useUser()

  const { data: response, isLoading: doctorLoading } = useApiQuery<{
    data: IDoctor
  }>([queryKeys.getDocotrIdKeys(doctorId)], `/doctors/${doctorId}`, "axios", {
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: true,
  })

  const doctor = response?.data

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
      <div className="min-h-screen bg-background text-center py-20">
        <p className="text-lg font-semibold mb-4">Doctor not found</p>
        <Button asChild>
          <Link href="/doctors">Back to Doctors</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="border-b border-border bg-muted/30 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/doctors" className="text-primary hover:underline text-sm font-medium">
              ← Back to Doctors
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          
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
                    <p className="text-lg text-muted-foreground mt-1">{doctor.designation}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Experience</p>
                    <p className="text-lg font-semibold">{doctor.experience} years</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Fee</p>
                    <p className="text-lg font-semibold text-primary">{formatCurrency(doctor.appointmentFee)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Rating</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{doctor.reviews?.length || 0}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Registration</p>
                    <p className="text-sm font-mono truncate">{doctor.registrationNumber}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button 
                    disabled={!user || user.role !== UserRole.PATIENT}
                    size="lg" 
                    onClick={() => setBookingOpen(true)} 
                    className="w-full sm:w-auto"
                  >
                    Book Appointment
                  </Button>
                  {!user && <p className='text-destructive text-xs font-medium'>Please login to book an appointment</p>}
                  {user && user.role !== UserRole.PATIENT && (
                    <p className='text-destructive text-xs font-medium'>Only patients can book appointments</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* SCHEDULES LAYOUT - REFORMATTED */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Available Schedules
                </h2>
                
                {doctor.schedules && doctor.schedules.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {doctor.schedules.map((sc) => (
                      <div 
                        key={sc.id} 
                        className={`flex flex-col p-4 rounded-xl border transition-all ${
                          sc.isBooked 
                            ? "bg-muted/50 border-border opacity-60" 
                            : "bg-background border-primary/20 hover:border-primary hover:shadow-sm"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <Badge variant={sc.isBooked ? "outline" : "default"} className={sc.isBooked ? "bg-transparent" : "bg-green-500/10 text-green-600 hover:bg-green-500/20 border-none"}>
                            {sc.isBooked ? "Booked" : "Available"}
                          </Badge>
                          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                            ID: {sc.id.split('-')[0]}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            {format(new Date(sc.startDate), 'PPP')}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            {sc.startTime} - {sc.endTime}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-muted/20 rounded-lg border border-dashed">
                    <p className="text-muted-foreground text-sm">No schedules available for this doctor.</p>
                  </div>
                )}
              </div>

              {/* Specialties */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  Specialties
                </h2>
                <div className="flex flex-wrap gap-2">
                  {doctor.doctorSpecialties?.map((spec) => (
                    <Badge key={spec.id} variant="secondary" className="px-3 py-1">
                      {spec.title}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-xl font-semibold mb-6">Patient Reviews ({doctor.reviews?.length || 0})</h2>
                {doctor.reviews && doctor.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {doctor.reviews.map((review) => (
                      <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                        <div className="flex justify-between mb-2">
                          <p className="font-medium">{review.patient?.name}</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-bold">{review.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground italic">"{review.comment}"</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">No reviews yet.</p>
                )}
              </div>
            </div>

            {/* Right Column: Qualifications & Workplace */}
            <div className="space-y-8">
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Qualifications
                </h2>
                <div className="flex flex-wrap gap-2">
                  {doctor.qualification.split(',').map((qual, idx) => (
                    <Badge key={idx} variant="outline" className="border-primary/30">
                      {qual.trim()}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Workplace
                </h2>
                <p className="font-medium">{doctor.currentWorkingPlace || 'Private Practice'}</p>
                <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                   Phone: {doctor.contactNumber}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <BookingModal
        doctor={doctor}
        open={bookingOpen}
        onOpenChange={setBookingOpen}
      />
    </div>
  )
}