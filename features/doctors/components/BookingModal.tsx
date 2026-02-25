'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Loader2, Video, CreditCard, Timer, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { formatCurrency } from '@/features/shared/utils'
import { IDoctor } from '@/interfaces/doctor'
import { useUser } from '@/context/UserContext'
import useAppointment from '@/features/appointments/hook/useAppointment'
import { toast } from 'sonner' // Assuming you use sonner or similar for notifications
import { queryKeys } from '@/lib/react-query-keys'
import { useApiMutation } from '@/hooks/useApiMutation'

const bookingFormSchema = z.object({
  appointmentType: z.enum(['online']),
  selectedDate: z.string().min(1, 'Please select a date'),
  selectedTime: z.string().min(1, 'Please select a time'),
  paymentMethod: z.enum(['payNow', 'payLater']),
})

type BookingFormData = z.infer<typeof bookingFormSchema>

interface BookingModalProps {
  doctor: IDoctor
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BookingModal({ doctor, open, onOpenChange }: BookingModalProps) {
  const { user } = useUser()

     const bookAppointmentMutation = useApiMutation({
        endpoint:"/api/v1/appointments",
        method:"POST",
        invalidateKeys:[queryKeys.getDocotrIdKeys(doctor.id)]
    });
    const bookAppointmentWithPayLatarMutation = useApiMutation({
        endpoint:"/api/v1/appointments/book-with-pay-later",
        method:"POST",
        successMessage:"Appointment Reserved! Please pay within 24 hours.",
        invalidateKeys:[queryKeys.getDocotrIdKeys(doctor.id)]

    });



  const { control, watch, handleSubmit, formState: { errors }, reset } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      appointmentType: 'online',
      paymentMethod: 'payNow',
    },
  })

  const selectedDateValue = watch('selectedDate')
  const paymentMethodValue = watch('paymentMethod')

  // 1. Extract unique dates from doctor schedules
  const availableDates = useMemo(() => {
    if (!doctor.schedules) return []
    const seen = new Set()
    return doctor.schedules
      .map(s => ({
        date: s.startDate.split('T')[0],
        scheduleId: s.id
      }))
      .filter(el => {
        const duplicate = seen.has(el.date)
        seen.add(el.date)
        return !duplicate
      })
  }, [doctor.schedules])

  // 2. Filter specific slots for the selected "date" (grouped by ID in your schema)
  const availableTimesForSelectedDate = useMemo(() => {
    if (!selectedDateValue || !doctor.schedules) return []
    return doctor.schedules.filter(s => s.id === selectedDateValue)
  }, [selectedDateValue, doctor.schedules])

  const onSubmit = async (data: BookingFormData) => {
    const payload = {
      scheduleId: data.selectedDate, // Based on your current mapping
      doctorId: doctor.id,
      patientId: user?.patient?.id,
    }

    try {
      
     
        if (data.paymentMethod === 'payNow') {
               const result = await bookAppointmentMutation.mutateAsync(payload)
               if(result.success){
                window.location.href = result.data.paymentUrl
               }
          
        } else {
          await bookAppointmentWithPayLatarMutation.mutateAsync(payload)
        }
          onOpenChange(false)
          reset()
      
    } catch (error) {
      toast.error("Failed to book appointment. Please try again.")
    }
  }

  const appointmentBookingLoading = bookAppointmentMutation.isPending || bookAppointmentWithPayLatarMutation.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">Confirm Your Booking</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Doctor Summary Card */}
          <div className="flex items-center gap-4 rounded-xl bg-muted/50 p-4 border border-border">
            <img
              src={doctor.profilePhoto || "/api/placeholder/150/150"}
              alt={doctor.name}
              className="h-16 w-16 rounded-lg object-cover border border-primary/20"
            />
            <div className="flex-1">
              <h3 className="font-bold text-lg leading-tight">{doctor.name}</h3>
              <p className="text-sm text-muted-foreground">{doctor.designation}</p>
              <p className="text-primary font-bold mt-1">{formatCurrency(doctor.appointmentFee)}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Slot Selection Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Date</Label>
                <Controller
                  name="selectedDate"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger><SelectValue placeholder="Select Date" /></SelectTrigger>
                      <SelectContent>
                        {availableDates.map((d) => (
                          <SelectItem key={d.scheduleId} value={d.scheduleId}>
                            {new Date(d.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.selectedDate && <p className="text-[10px] text-destructive">{errors.selectedDate.message}</p>}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Clock className="h-4 w-4" /> Time Slot</Label>
                <Controller
                  name="selectedTime"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange} disabled={!selectedDateValue}>
                      <SelectTrigger><SelectValue placeholder="Select Time" /></SelectTrigger>
                      <SelectContent>
                        {availableTimesForSelectedDate.map((slot) => (
                          <SelectItem key={slot.id} value={slot.startTime} disabled={slot.isBooked}>
                            {slot.startTime} - {slot.endTime} {slot.isBooked && "(Booked)"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.selectedTime && <p className="text-[10px] text-destructive">{errors.selectedTime.message}</p>}
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Choose Payment Strategy</Label>
              <Controller
                name="paymentMethod"
                control={control}
                render={({ field }) => (
                  <RadioGroup 
                    value={field.value} 
                    onValueChange={field.onChange} 
                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                  >
                    <Label 
                      htmlFor="payNow" 
                      className={`relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-accent ${field.value === 'payNow' ? 'border-primary bg-primary/5' : 'border-border'}`}
                    >
                      <RadioGroupItem value="payNow" id="payNow" className="sr-only" />
                      <div className="flex items-center gap-2 mb-1">
                        <CreditCard className="h-4 w-4 text-primary" />
                        <span className="font-bold text-sm">Pay Instantly</span>
                      </div>
                      <span className="text-[11px] text-muted-foreground">Confirm now via Stripe to secure your video link immediately.</span>
                    </Label>

                    <Label 
                      htmlFor="payLater" 
                      className={`relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-accent ${field.value === 'payLater' ? 'border-primary bg-primary/5' : 'border-border'}`}
                    >
                      <RadioGroupItem value="payLater" id="payLater" className="sr-only" />
                      <div className="flex items-center gap-2 mb-1">
                        <Timer className="h-4 w-4 text-amber-500" />
                        <span className="font-bold text-sm">Pay Later</span>
                      </div>
                      <span className="text-[11px] text-muted-foreground">Reserve the slot now and pay from your dashboard later.</span>
                    </Label>
                  </RadioGroup>
                )}
              />

              <AnimatePresence>
                {paymentMethodValue === 'payLater' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-900"
                  >
                    <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-amber-800 dark:text-amber-400 leading-normal">
                      <strong>Policy:</strong> Unpaid appointments are automatically canceled after <strong>24 hours</strong>. Please complete payment within this window to keep your slot.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="ghost" className="flex-1" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 px-8" 
                disabled={appointmentBookingLoading}
              >
                {appointmentBookingLoading ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing...</>
                ) : (
                  paymentMethodValue === 'payNow' ? 'Proceed to Payment' : 'Confirm Reservation'
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}