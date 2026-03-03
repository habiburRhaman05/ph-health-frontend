import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AppointmentStatus } from "@/interfaces/enum";
import { cn } from "@/lib/utils";

interface AppointmentHeaderProps {
  appointment: {
    id: string;
    status: AppointmentStatus;
    paymentStatus: string;
  };
}

const AppointmentDeatilsHeader = ({ appointment }: AppointmentHeaderProps) => {
  const isPaid = appointment.paymentStatus === "COMPLETE";
 const statusStyles = {
  "CANCELLED": "bg-red-500 text-white hover:bg-red-400 dark:bg-red-600 dark:hover:bg-red-500",
  "COMPLETED": "bg-emerald-500 text-white hover:bg-emerald-400 dark:bg-emerald-600 dark:hover:bg-emerald-500",
  "PENDING": "bg-amber-500 text-white hover:bg-amber-400 dark:bg-amber-600 dark:hover:bg-amber-500",
  "SCHEDULED": "bg-blue-500 text-white hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-500",
};

const statusColor = statusStyles[appointment.status] || "bg-zinc-500 text-white";
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/appointments">
          <Button variant="outline" size="sm" className="rounded-full shadow-sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </Link>
        <div className="h-8 w-[1px] bg-border hidden sm:block" />
        <div>
          <h1 className="text-lg font-bold tracking-tight">Appointment Details</h1>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Ref: {appointment.id.slice(0, 8)}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Badge 
  variant="secondary" 
  className={cn(
    "border-none px-3 py-1 font-bold capitalize", 
    statusColor
  )}
>
  {appointment.status.toLowerCase()}
</Badge>
        {isPaid && (
          <Badge className="bg-emerald-500/10 text-emerald-500 border-none px-3 py-1 font-bold">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Paid
          </Badge>
        )}
      </div>
    </div>
  );
};

export default AppointmentDeatilsHeader;