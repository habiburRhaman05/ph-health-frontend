"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  MapPin,
  Search,
  Video,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Stethoscope,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import AppointmentGridSkeleton from "@/features/appointments/components/AppointmentGridSkelection"
import { useApiQuery } from "@/hooks/useApiQuery"
import { queryKeys } from "@/lib/react-query-keys"

// 1. Configuration for Status Styles
const statusConfig: Record<string, { label: string; icon: React.ElementType; className: string }> = {
  SCHEDULED: { label: "Confirmed", icon: CheckCircle2, className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none" },
  PENDING: { label: "Pending", icon: AlertCircle, className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-none" },
  COMPLETED: { label: "Completed", icon: CheckCircle2, className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-none" },
  CANCELED: { label: "Cancelled", icon: XCircle, className: "bg-red-500/10 text-red-600 dark:text-red-400 border-none" },
}

const paymentStatusConfig: Record<string, { label: string; className: string }> = {
  PAID: { label: "Paid", className: "bg-green-500/10 text-green-700 dark:text-green-400 border-none" },
  PENDING: { label: "Unpaid", className: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-none" },
  FAILED: { label: "Payment Failed", className: "bg-red-500/10 text-red-600 border-none" },
}

// 2. Interface based on your API output
interface APIRESPONSE {
  success: boolean;
  message: string;
  data: any[]; // The array of appointments
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export default function MyAppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("upcoming")
  const [currentPage, setCurrentPage] = useState(1)

  // Fetch data - including currentPage in query keys ensures re-fetch on page change
  const { data, isLoading } = useApiQuery<APIRESPONSE>(
    [queryKeys.FETCH_PATIENT_APPOINTMENT_LIST],
    `/api/v1/appointments/patient/my-appointments?page=${currentPage}&limit=6`
  )

  if (isLoading) return <AppointmentGridSkeleton />

  const appointments = data?.data || []
  const meta = data?.meta

  // Filter logic
  const filteredAppointments = appointments.filter((apt: any) => {
    const matchesSearch =
      apt.doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctor.designation.toLowerCase().includes(searchQuery.toLowerCase())

    const status = apt.status
    if (activeTab === "upcoming") return matchesSearch && (status === "SCHEDULED" || status === "PENDING")
    if (activeTab === "completed") return matchesSearch && status === "COMPLETED"
    if (activeTab === "cancelled") return matchesSearch && status === "CANCELED"
    return matchesSearch
  })

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="p-6 lg:p-8 space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Appointments</h1>
          <p className="text-sm text-muted-foreground">Manage and track your medical consultations.</p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/doctors">
            <Stethoscope className="h-4 w-4" />
            Book New Appointment
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search doctor or designation..." 
            className="pl-10 h-10 bg-card" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>
        <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
          <TabsList className="bg-muted/50 h-10">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Appointments Grid */}
      {filteredAppointments.length === 0 ? (
        <div className="text-center py-20 border rounded-xl bg-muted/10">
          <Calendar className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground font-medium">No appointments found</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredAppointments.map((apt: any) => {
            const status = statusConfig[apt.status] || statusConfig.PENDING
            const payment = paymentStatusConfig[apt.paymentStatus] || paymentStatusConfig.PENDING
            const StatusIcon = status.icon

            return (
              <motion.div
                key={apt.id}
                layout
                className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg overflow-hidden bg-primary/10">
                      <img 
                        src={apt.doctor.profilePhoto || "/api/placeholder/40/40"} 
                        alt={apt.doctor.name} 
                        className="object-cover h-full w-full" 
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{apt.doctor.name}</p>
                      <p className="text-xs text-muted-foreground">{apt.doctor.designation}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/patient/dashboard/appointments/${apt.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Cancel Appointment</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={`${status.className} gap-1 text-[10px]`}>
                    <StatusIcon className="h-3 w-3" /> {status.label}
                  </Badge>
                  <Badge className={`${payment.className} gap-1 text-[10px]`}>
                    <CreditCard className="h-3 w-3" /> {payment.label}
                  </Badge>
                  <Badge variant="outline" className="gap-1 text-[10px] uppercase">
                    <Video className="h-3 w-3" /> Video Call
                  </Badge>
                </div>

                <div className="space-y-2 pt-3 border-t text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <span>{new Date(apt.schedule.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {apt.schedule.startTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span className="truncate">{apt.doctor.currentWorkingPlace || "Virtual Consultation"}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase font-medium">Fee</span>
                    <span className="text-sm font-bold text-primary">${apt.doctor.appointmentFee}</span>
                  </div>
                  <div className="flex gap-2">
                    {apt.paymentStatus === "PENDING" ? (
                      <Button size="sm" className="h-8 text-xs bg-blue-600 hover:bg-blue-700">Pay Now</Button>
                    ) : (
                      apt.status === "SCHEDULED" && (
                        <Button size="sm" variant="outline" className="h-8 text-xs border-primary text-primary hover:bg-primary/5">
                          Join Call
                        </Button>
                      )
                    )}
                    <Button asChild size="sm" variant="secondary" className="h-8 text-xs">
                       <Link href={`/patient/dashboard/appointments/${apt.id}`}>Details</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {meta && meta.totalPage > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-6 mt-4">
          <p className="text-sm text-muted-foreground">
            Showing Page <span className="font-medium text-foreground">{meta.page}</span> of{" "}
            <span className="font-medium text-foreground">{meta.totalPage}</span>
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCurrentPage((prev) => Math.max(prev - 1, 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={currentPage === 1}
              className="h-9"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            
            <div className="hidden md:flex gap-1">
              {Array.from({ length: meta.totalPage }, (_, i) => i + 1).map((pageNum) => (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  className="w-9 h-9 p-0"
                  onClick={() => {
                    setCurrentPage(pageNum);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {pageNum}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCurrentPage((prev) => Math.min(prev + 1, meta.totalPage));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={currentPage === meta.totalPage}
              className="h-9"
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  )
}