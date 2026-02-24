'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Video, Calendar, Clock, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { formatCurrency } from '@/features/shared/utils'
import { IDoctor } from '@/interfaces/doctor'
import { useUser } from '@/context/UserContext'
import useAppointment from '@/features/appointments/hook/useAppointment'

const bookingFormSchema = z.object({
  appointmentType: z.enum(['online']),
  selectedDate: z.string().min(1, 'Please select a date'),
  selectedTime: z.string().min(1, 'Please select a time'),
})

type BookingFormData = z.infer<typeof bookingFormSchema>

interface BookingModalProps {
  doctor: IDoctor
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm?: (data: any) => void
}

export function BookingModal({ doctor, open, onOpenChange, onConfirm }: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {user} = useUser();
  const { control, watch, handleSubmit, formState: { errors }, reset } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      appointmentType: 'online',
    },
  })
  const selectedDateValue = watch('selectedDate')
  // 1. Group unique dates from doctor.schedules
  const availableDates = useMemo(() => {
    if (!doctor.schedules) return []
    // Get unique dates (stripping time)
    const uniqueDates = Array.from(new Set(doctor.schedules.map(s => (
      {
      data:s.startDate.split('T')[0],
      scheduleId:s.id
    }
    ))))
    return uniqueDates
  }, [doctor.schedules])
 
  // 2. Filter times based on the selected date
  const availableTimesForSelectedDate = useMemo(() => {
    if (!selectedDateValue || !doctor.schedules) return []
    return doctor.schedules.filter(s => s.id === selectedDateValue)
  }, [selectedDateValue, doctor.schedules])


  const {bookAppointmentMutation} = useAppointment()


  const onSubmit = async (data: BookingFormData) => {

    const payload = {
       scheduleId:data.selectedDate,
      doctorId: doctor.id,
      patientId:user?.patient?.id,
      
}

   const result = await bookAppointmentMutation.mutateAsync(payload);
   console.log(result);
    if(result.success){
       window.location.href = result.data.paymentUrl
    }

  }



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary">Book Appointment</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Doctor Info Card */}
          <div className="flex items-center gap-4 rounded-xl bg-secondary/20 p-4 border border-border">
            <img
              src={doctor.profilePhoto || "/api/placeholder/150/150"}
              alt={doctor.name}
              className="h-20 w-20 rounded-lg object-cover border-2 border-primary/10"
            />
            <div>
              <h3 className="text-lg font-bold">{doctor.name}</h3>
              <p className="text-sm text-muted-foreground">{doctor.designation}</p>
              <div className="flex gap-2 mt-1">
                {doctor.doctorSpecialties?.map(spec => (
                  <span key={spec.id} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase font-bold">
                    {spec.title}
                  </span>
                ))}
              </div>
              <p className="text-md font-bold text-primary mt-2">
                {formatCurrency(doctor.appointmentFee)}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Appointment Type */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">How would you like to meet?</Label>
              <Controller
                name="appointmentType"
                control={control}
                render={({ field }) => (
                  <RadioGroup value={field.value} onValueChange={field.onChange} className="grid grid-cols-1 gap-4">
                    <Label htmlFor="online" className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer ${field.value === 'online' ? 'border-primary bg-primary/5' : 'border-muted'}`}>
                      <RadioGroupItem value="online" id="online" className="sr-only" />
                      <Video className="mb-3 h-6 w-6 text-primary" />
                      <span className="font-semibold">Online</span>
                    </Label>
                  </RadioGroup>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date Selection */}
              <div className="space-y-2">
                <Label className="font-semibold flex items-center gap-2"><Calendar className="h-4 w-4" /> Select Date</Label>
                <Controller
                  name="selectedDate"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger><SelectValue placeholder="Pick a date" /></SelectTrigger>
                      <SelectContent>
                        {availableDates.map((dateStr) => (
                          <SelectItem key={dateStr.data} value={dateStr.scheduleId}>
                            {new Date(dateStr.data).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.selectedDate && <p className="text-xs text-destructive">{errors.selectedDate.message}</p>}
              </div>

              {/* Time Selection */}
              <div className="space-y-2">
                <Label className="font-semibold flex items-center gap-2"><Clock className="h-4 w-4" /> Available Slots</Label>
                <Controller
                  name="selectedTime"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange} disabled={!selectedDateValue}>
                      <SelectTrigger><SelectValue placeholder={selectedDateValue ? "Pick a time" : "Select date first"} /></SelectTrigger>
                      <SelectContent>
                        {availableTimesForSelectedDate.map((slot, idx) => (
                          <SelectItem key={idx} value={slot.startTime} disabled={slot.isBooked}>
                            {slot.startTime} - {slot.endTime} {slot.isBooked && "(Booked)"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.selectedTime && <p className="text-xs text-destructive">{errors.selectedTime.message}</p>}
              </div>
            </div>

          

    

            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" className="flex-1" disabled={bookAppointmentMutation.isPending}>
                {bookAppointmentMutation.isPending ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Booking...</> : 'Confirm Appointment'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}