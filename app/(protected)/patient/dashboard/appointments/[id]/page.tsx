"use client"

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import ApppointmentDetailsSkelection from '@/features/appointments/components/ApppointmentDetailsSkelection'
import { useGetAppointment } from '@/hooks/appointments/useGetAppointment'
import { motion } from 'framer-motion'
import {
    Activity,
    ArrowLeft,
    Clock,
    Phone,
    User,
    Video
} from 'lucide-react'

export default function AppointmentDetailsPage({ params }: { params: { id: string } }) {
  const { data: res, isLoading } = useGetAppointment(params.id)
  const appointment = res?.data

  if (isLoading) return <ApppointmentDetailsSkelection />

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/50 backdrop-blur-md p-6 rounded-[2rem] border border-border shadow-sm">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
              <ArrowLeft className="h-5 w-5 text-primary" />
            </Button>
            <div>
              <h1 className="text-2xl font-black tracking-tighter italic uppercase">Summary</h1>
              <p className="text-muted-foreground text-[10px] font-bold tracking-widest">ID: {appointment.id}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-primary/10 text-primary border-none font-bold uppercase tracking-widest text-[10px] px-4 py-1.5">
              {appointment.status}
            </Badge>
            <Badge variant="outline" className="border-amber-500/50 text-amber-600 font-bold uppercase tracking-widest text-[10px] px-4 py-1.5">
              {appointment.paymentStatus}
            </Badge>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Doctor Info */}
            <Card className="rounded-[2.5rem] border-border bg-card/30 overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center text-primary-foreground shadow-xl shadow-primary/20">
                    <User size={40} strokeWidth={2.5} />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black tracking-tight">{appointment.doctor.name}</h2>
                    <p className="text-primary font-bold text-sm uppercase tracking-wide">{appointment.doctor.designation}</p>
                    <p className="text-muted-foreground text-xs font-medium italic">{appointment.doctor.qualification} • {appointment.doctor.experience} Years Exp.</p>
                    <div className="flex gap-2 mt-3">
                      {appointment.doctor.specialtys.map((s: any, i: number) => (
                        <Badge key={i} variant="secondary" className="text-[10px] rounded-lg px-2 py-0.5 font-bold uppercase tracking-tight">
                          {s.specialty.title}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Separator className="my-8 opacity-50" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
                    <p className="text-sm font-bold flex items-center gap-2"><Phone size={14} className="text-primary"/> {appointment.doctor.contactNumber}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Reg. Number</p>
                    <p className="text-sm font-bold">{appointment.doctor.registrationNumber}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Patient Info */}
            <Card className="rounded-[2rem] border-border bg-card/20">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-muted border border-border flex items-center justify-center font-black text-primary">HR</div>
                <div>
                  <p className="font-black text-lg leading-tight">{appointment.patient.name}</p>
                  <p className="text-sm text-muted-foreground font-medium">{appointment.patient.email}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Schedule Card */}
            <Card className="bg-primary text-primary-foreground p-8 rounded-[2.5rem] border-none shadow-2xl shadow-primary/30 relative overflow-hidden">
               <div className="relative z-10 space-y-6">
                 <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-2">Date</h3>
                    <p className="text-3xl font-black italic tracking-tighter">March 20, 2026</p>
                 </div>
                 <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-3">
                    <Clock className="h-5 w-5" />
                    <span className="font-black text-sm uppercase tracking-widest">{appointment.schedule.startTime} - {appointment.schedule.endTime}</span>
                 </div>
               </div>
               <Activity className="absolute -bottom-6 -right-6 h-32 w-32 opacity-10 rotate-12" />
            </Card>

            {/* Payment & CTA */}
            <Card className="rounded-[2.5rem] border-border bg-card p-8 text-center sm:text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Appointment Fee</p>
              <div className="flex items-baseline gap-1 justify-center sm:justify-start">
                <span className="text-4xl font-black tracking-tighter italic">${appointment.doctor.appointmentFee}</span>
                <span className="text-xs font-bold text-muted-foreground">.00</span>
              </div>
              <Button className="w-full mt-8 h-14 rounded-2xl font-black uppercase tracking-widest text-xs gap-3 shadow-lg shadow-primary/20 group">
                <Video className="h-4 w-4 group-hover:scale-110 transition-transform" />
                Join Video Call
              </Button>
              <p className="mt-4 text-[9px] text-center font-bold text-muted-foreground/60 uppercase tracking-widest leading-relaxed">
                Link available 5 mins before start<br/>Feb 17, 2026 03:41 PM
              </p>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
