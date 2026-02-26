"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"
import {
    AlertCircle,
    Calendar,
    CheckCircle2,
    CreditCard,
    MapPin,
    MoreHorizontal,
    Video,
    XCircle
} from "lucide-react"
import Link from "next/link"


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

const AppointmentCard = ({apt}:{apt:any}) => {

  console.log(".....card.tsx");

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
}

export default AppointmentCard