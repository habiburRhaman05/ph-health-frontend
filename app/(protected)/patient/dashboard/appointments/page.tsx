"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  Video,
  Phone,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Stethoscope,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

type AppointmentStatus = "confirmed" | "pending" | "completed" | "cancelled"
type AppointmentType = "in-person" | "video" | "phone"

interface Appointment {
  id: number
  doctor: string
  specialty: string
  date: string
  time: string
  status: AppointmentStatus
  type: AppointmentType
  location: string
  fee: string
  notes: string
}

const allAppointments: Appointment[] = [
  { id: 1, doctor: "Dr. Sarah Johnson", specialty: "Cardiologist", date: "Dec 24, 2024", time: "10:30 AM", status: "confirmed", type: "in-person", location: "Central Health Plaza, Room 402", fee: "$120", notes: "Annual heart checkup" },
  { id: 2, doctor: "Dr. Michael Chen", specialty: "Dermatologist", date: "Dec 28, 2024", time: "2:00 PM", status: "pending", type: "video", location: "Online Consultation", fee: "$80", notes: "Skin rash follow-up" },
  { id: 3, doctor: "Dr. Emily Stone", specialty: "General Physician", date: "Jan 03, 2025", time: "11:00 AM", status: "confirmed", type: "in-person", location: "City Medical Center, 3rd Floor", fee: "$60", notes: "Routine checkup" },
  { id: 4, doctor: "Dr. Aisha Rahman", specialty: "Neurologist", date: "Jan 10, 2025", time: "9:30 AM", status: "pending", type: "phone", location: "Phone Consultation", fee: "$150", notes: "Headache consultation" },
  { id: 5, doctor: "Dr. James Wilson", specialty: "Orthopedist", date: "Nov 15, 2024", time: "3:00 PM", status: "completed", type: "in-person", location: "Bone & Joint Clinic, Suite 201", fee: "$100", notes: "Knee pain follow-up" },
  { id: 6, doctor: "Dr. Fatima Khan", specialty: "Gynecologist", date: "Nov 08, 2024", time: "10:00 AM", status: "completed", type: "in-person", location: "Women's Health Center", fee: "$90", notes: "Regular checkup" },
  { id: 7, doctor: "Dr. Robert Lee", specialty: "Ophthalmologist", date: "Oct 22, 2024", time: "4:30 PM", status: "completed", type: "in-person", location: "Eye Care Center", fee: "$110", notes: "Vision test" },
  { id: 8, doctor: "Dr. Priya Patel", specialty: "Endocrinologist", date: "Oct 10, 2024", time: "11:30 AM", status: "cancelled", type: "video", location: "Online Consultation", fee: "$130", notes: "Thyroid follow-up" },
  { id: 9, doctor: "Dr. Hassan Ali", specialty: "Psychiatrist", date: "Sep 28, 2024", time: "1:00 PM", status: "completed", type: "video", location: "Online Consultation", fee: "$140", notes: "Mental health session" },
  { id: 10, doctor: "Dr. Lisa Wang", specialty: "Pediatrician", date: "Sep 15, 2024", time: "9:00 AM", status: "cancelled", type: "phone", location: "Phone Consultation", fee: "$70", notes: "Child vaccination inquiry" },
]

const statusConfig: Record<AppointmentStatus, { label: string; icon: React.ElementType; variant: "default" | "secondary" | "outline" | "destructive"; className: string }> = {
  confirmed: { label: "Confirmed", icon: CheckCircle2, variant: "default", className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none hover:bg-emerald-500/20" },
  pending: { label: "Pending", icon: AlertCircle, variant: "secondary", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-none hover:bg-amber-500/20" },
  completed: { label: "Completed", icon: CheckCircle2, variant: "outline", className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-none hover:bg-blue-500/20" },
  cancelled: { label: "Cancelled", icon: XCircle, variant: "destructive", className: "bg-red-500/10 text-red-600 dark:text-red-400 border-none hover:bg-red-500/20" },
}

const typeIcons: Record<AppointmentType, React.ElementType> = {
  "in-person": MapPin,
  video: Video,
  phone: Phone,
}

function AppointmentsSkeleton() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-56" />
          <Skeleton className="h-4 w-80" />
        </div>
        <Skeleton className="h-10 w-44" />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-64" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array(6).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-52 rounded-xl" />
        ))}
      </div>
    </div>
  )
}

export default function MyAppointmentsPage() {
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("upcoming")

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <AppointmentsSkeleton />

  const filteredAppointments = allAppointments.filter((apt) => {
    const matchesSearch =
      apt.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.specialty.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "upcoming") return matchesSearch && (apt.status === "confirmed" || apt.status === "pending")
    if (activeTab === "completed") return matchesSearch && apt.status === "completed"
    if (activeTab === "cancelled") return matchesSearch && apt.status === "cancelled"
    return matchesSearch
  })

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 lg:p-8 space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Appointments</h1>
          <p className="text-sm text-muted-foreground">Manage and track all your medical consultations.</p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/doctors">
            <Stethoscope className="h-4 w-4" />
            Book New Appointment
          </Link>
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by doctor or specialty..."
            className="pl-10 h-10 bg-card"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs defaultValue="upcoming" className="w-full md:w-auto" onValueChange={setActiveTab}>
          <TabsList className="bg-muted/50 h-10 p-1 w-full md:w-auto">
            <TabsTrigger value="upcoming" className="text-sm">Upcoming</TabsTrigger>
            <TabsTrigger value="completed" className="text-sm">Completed</TabsTrigger>
            <TabsTrigger value="cancelled" className="text-sm">Cancelled</TabsTrigger>
            <TabsTrigger value="all" className="text-sm">All</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Results Count */}
      <motion.p variants={itemVariants} className="text-xs text-muted-foreground">
        Showing {filteredAppointments.length} appointment{filteredAppointments.length !== 1 ? "s" : ""}
      </motion.p>

      {/* Appointments Grid */}
      {filteredAppointments.length === 0 ? (
        <motion.div variants={itemVariants} className="text-center py-16">
          <Calendar className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
          <p className="font-medium text-muted-foreground">No appointments found</p>
          <p className="text-sm text-muted-foreground/70 mt-1">Try adjusting your search or filters.</p>
        </motion.div>
      ) : (
        <motion.div variants={containerVariants} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredAppointments.map((apt) => {
            const statusInfo = statusConfig[apt.status]
            const StatusIcon = statusInfo.icon
            const TypeIcon = typeIcons[apt.type]

            return (
              <motion.div
                key={apt.id}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Stethoscope className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{apt.doctor}</p>
                      <p className="text-xs text-muted-foreground">{apt.specialty}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Reschedule</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Badge className={statusInfo.className + " gap-1 text-[10px] font-medium"}>
                    <StatusIcon className="h-3 w-3" /> {statusInfo.label}
                  </Badge>
                  <Badge variant="outline" className="gap-1 text-[10px] font-medium">
                    <TypeIcon className="h-3 w-3" /> {apt.type.charAt(0).toUpperCase() + apt.type.slice(1)}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{apt.notes}</p>

                <div className="space-y-1.5 pt-3 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 text-primary shrink-0" />
                    <span>{apt.date} at {apt.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 text-primary shrink-0" />
                    <span className="truncate">{apt.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                  <span className="text-sm font-semibold">{apt.fee}</span>
                  {(apt.status === "confirmed" || apt.status === "pending") && (
                    <Button size="sm" variant="outline" className="text-xs h-8">
                      {apt.type === "video" ? "Join Call" : "Get Directions"}
                    </Button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      )}
    </motion.div>
  )
}
