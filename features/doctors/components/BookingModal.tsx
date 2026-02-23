'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Video, Calendar, Clock, Loader2 } from 'lucide-react'
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
import type {  AppointmentFormData } from '@/features/shared/types'
import { generateVideoCallId } from '@/features/doctors/services/mockData'
import { formatCurrency } from '@/features/shared/utils'
import { IDoctor } from '@/interfaces/doctor'

const bookingFormSchema = z.object({
  appointmentType: z.enum(['online', 'local']),
  selectedDate: z.string().min(1, 'Please select a date'),
  selectedTime: z.string().min(1, 'Please select a time'),
  place: z.string().optional(),
  notes: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingFormSchema>

interface BookingModalProps {
  doctor: IDoctor
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm?: (data: AppointmentFormData & { videoCallId?: string }) => void
}

export function BookingModal({
  doctor,
  open,
  onOpenChange,
  onConfirm,
}: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [videoCallId, setVideoCallId] = useState<string>('')

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      appointmentType: 'online',
      place: doctor.currentWorkingPlace,
    },
  })

  const appointmentType = watch('appointmentType')

  // Generate future dates (next 30 days)
  const availableDates = useMemo(() => {
    const dates = []
    for (let i = 1; i <= 30; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      dates.push(date.toISOString().split('T')[0])
    }
    return dates
  }, [])

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    let generatedVideoCallId = ''
    if (data.appointmentType === 'online') {
      generatedVideoCallId = generateVideoCallId()
      setVideoCallId(generatedVideoCallId)
    }

    const appointmentData: AppointmentFormData & { videoCallId?: string } = {
      ...data,
      place: data.appointmentType === 'local' ? data.place || doctor.currentWorkingPlace : undefined,
      videoCallId: generatedVideoCallId,
    }

    onConfirm?.(appointmentData)
    setIsSubmitting(false)

    // Reset form and close modal
    setTimeout(() => {
      reset()
      onOpenChange(false)
    }, 1000)
  }
  console.log(doctor);
  

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Book Appointment</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Doctor Info */}
          <div className="flex items-center gap-4 rounded-lg bg-muted/50 p-4">
            <img
              src={doctor.profilePhoto || ""}
              alt={doctor.name}
              className="h-16 w-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold">{doctor.name}</h3>
              <p className="text-sm text-muted-foreground">{doctor.designation}</p>
              <p className="text-sm font-medium text-primary">
                {formatCurrency(doctor.appointmentFee)}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Appointment Type Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Appointment Type</Label>
              <Controller
                name="appointmentType"
                control={control}
                render={({ field }) => (
                  <RadioGroup value={field.value} onValueChange={field.onChange}>
                    <div className="space-y-2">
                      {/* Online Option */}
                      <motion.label
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-3 rounded-lg border border-border bg-card p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                      >
                        <RadioGroupItem value="online" id="online" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Video className="h-5 w-5 text-primary" />
                            <Label htmlFor="online" className="cursor-pointer font-semibold">
                              Online Consultation
                            </Label>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Video call consultation with auto-generated call ID
                          </p>
                        </div>
                      </motion.label>

                      {/* Local Option */}
                      <motion.label
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-3 rounded-lg border border-border bg-card p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                      >
                        <RadioGroupItem value="local" id="local" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            <Label htmlFor="local" className="cursor-pointer font-semibold">
                              In-Person Visit
                            </Label>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Visit at doctor's clinic or hospital
                          </p>
                        </div>
                      </motion.label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <Label htmlFor="date" className="font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Select Date
              </Label>
              <Controller
                name="selectedDate"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="date">
                      <SelectValue placeholder="Choose a date" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDates.map((date) => {
                        const dateObj = new Date(date)
                        const formatted = dateObj.toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })
                        return (
                          <SelectItem key={date} value={date}>
                            {formatted}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.selectedDate && (
                <p className="text-sm text-destructive">{errors.selectedDate.message}</p>
              )}
            </div>

            {/* Time Selection */}
            <div className="space-y-2">
              <Label htmlFor="time" className="font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Select Time Slot
              </Label>
              <Controller
                name="selectedTime"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Choose a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctor.schedule?.map((slot) => (
                        <SelectItem key={slot.id} value={slot.startDate}>
                          {slot.startDate}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.selectedTime && (
                <p className="text-sm text-destructive">{errors.selectedTime.message}</p>
              )}
            </div>

            {/* Place Selection for Local Appointment */}
            <AnimatePresence>
              {appointmentType === 'local' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <Label htmlFor="place" className="font-semibold">
                    Clinic/Hospital Location
                  </Label>
                  <Controller
                    name="place"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="place"
                        placeholder={doctor.currentWorkingPlace || 'Enter clinic location'}
                        {...field}
                        value={field.value || doctor.currentWorkingPlace || ''}
                      />
                    )}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="font-semibold">
                Additional Notes (Optional)
              </Label>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <Textarea
                    id="notes"
                    placeholder="Describe your symptoms or concerns..."
                    className="resize-none"
                    rows={3}
                    {...field}
                  />
                )}
              />
            </div>

            {/* Video Call ID Display for Online */}
            <AnimatePresence>
              {appointmentType === 'online' && videoCallId && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-lg bg-primary/10 border border-primary/20 p-4"
                >
                  <p className="text-sm font-semibold text-primary mb-2">Video Call ID Generated:</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-background rounded px-3 py-2 font-mono text-sm">
                      {videoCallId}
                    </code>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(videoCallId)
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Confirming...
                  </>
                ) : (
                  'Confirm Appointment'
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
