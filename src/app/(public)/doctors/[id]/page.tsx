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
import { ISchedule } from '@/interfaces/schedule'
import { ISpecialty } from '@/interfaces/speciality'
import { IReview } from '@/interfaces/review'

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

  const doctor:IDoctor | any  = response?.data || null

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
    {doctor.schedules.map((sc:ISchedule) => (
      <div 
        key={sc.id} 
        className={`flex flex-col p-4 rounded-xl border transition-all relative overflow-hidden group ${
          sc.isBooked 
            ? "bg-muted/30 border-border/50 opacity-80" 
            : "bg-card border-primary/20 hover:border-primary hover:ring-1 hover:ring-primary/20 shadow-sm hover:shadow-md"
        }`}
      >
        <div className="flex justify-between items-start mb-4">
          <Badge 
            variant="outline" 
            className={`font-bold px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${
              sc.isBooked 
                ? "bg-destructive/10 text-destructive border-destructive/20" 
                : "bg-primary/10 text-primary border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            }`}
          >
            {sc.isBooked ? "Reserved" : "Available"}
          </Badge>
          
          <span className="text-[10px] font-mono text-muted-foreground/40">
            #{sc.id.split('-')[0]}
          </span>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
              sc.isBooked ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
            }`}>
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase text-muted-foreground font-bold tracking-tight">Date</p>
              <p className={`text-sm font-semibold ${sc.isBooked ? "text-muted-foreground" : "text-foreground"}`}>
                {format(new Date(sc.startDate), 'PPP')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
              sc.isBooked ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
            }`}>
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase text-muted-foreground font-bold tracking-tight">Time Slot</p>
              <p className="text-sm font-medium text-muted-foreground italic">
                {sc.startTime} — {sc.endTime}
              </p>
            </div>
          </div>
        </div>

        {/* Visual indicator for Available vs Booked */}
        {!sc.isBooked && (
          <div className="absolute top-0 right-0 p-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          </div>
        )}
      </div>
    ))}
  </div>
) : (
  <div className="flex flex-col items-center justify-center py-12 rounded-xl border border-dashed border-border bg-muted/10">
    <Calendar className="h-8 w-8 text-muted-foreground/30 mb-2" />
    <p className="text-muted-foreground text-sm font-medium">No available slots found.</p>
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
                  {doctor.doctorSpecialties?.map((spec:ISpecialty) => (
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
                    {doctor.reviews.map((review:IReview) => (
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
                  {doctor.qualification.split(',').map((qual:string, idx:number) => (
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