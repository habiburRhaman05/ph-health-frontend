"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Search, Filter, MoreVertical } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MyAppointmentsPage() {
  const [loading] = useState(false) // Toggle for demo loading state

  return (
    <div className="space-y-8 p-6 lg:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter italic uppercase">My Appointments</h1>
          <p className="text-muted-foreground text-sm font-medium">Manage and track your medical consultations.</p>
        </div>
        <Button className="font-bold rounded-xl shadow-lg shadow-primary/20">
          Book New Appointment
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by doctor or specialty..." className="pl-10 h-11 bg-card/50" />
        </div>
        <Tabs defaultValue="upcoming" className="w-full md:w-auto">
          <TabsList className="bg-muted/50 h-11 p-1">
            <TabsTrigger value="upcoming" className="rounded-lg font-bold">Upcoming</TabsTrigger>
            <TabsTrigger value="completed" className="rounded-lg font-bold">History</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          Array(3).fill(0).map((_, i) => <AppointmentSkeleton key={i} />)
        ) : (
          <AppointmentCard 
            doctor="Dr. Sarah Johnson" 
            specialty="Cardiologist" 
            date="Oct 24, 2024" 
            time="10:30 AM" 
            status="Confirmed"
          />
        )}
      </div>
    </div>
  )
}

function AppointmentCard({ doctor, specialty, date, time, status }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden rounded-[2rem] border border-border bg-card/40 p-6 transition-all hover:bg-card/80 hover:shadow-xl hover:shadow-primary/5"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Calendar className="h-6 w-6 text-primary" />
        </div>
        <Badge className="bg-green-500/10 text-green-500 border-none font-bold uppercase tracking-widest text-[10px]">
          {status}
        </Badge>
      </div>
      <h3 className="text-lg font-black tracking-tight">{doctor}</h3>
      <p className="text-sm text-muted-foreground font-medium mb-4">{specialty}</p>
      
      <div className="space-y-2 pt-4 border-t border-border/50">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Clock className="h-3.5 w-3.5 text-primary" /> {date} at {time}
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary" /> Central Health Plaza, Room 402
        </div>
      </div>
    </motion.div>
  )
}

function AppointmentSkeleton() {
  return (
    <div className="rounded-[2rem] border border-border p-6 space-y-4">
      <div className="flex justify-between"><Skeleton className="h-12 w-12 rounded-2xl" /><Skeleton className="h-5 w-20" /></div>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="pt-4"><Skeleton className="h-10 w-full rounded-xl" /></div>
    </div>
  )
}