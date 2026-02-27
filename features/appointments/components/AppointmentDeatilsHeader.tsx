import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AppointmentHeaderProps {
  appointment: {
    id: string;
    status: string;
    paymentStatus: string;
  };
}

const AppointmentDeatilsHeader = ({ appointment }: AppointmentHeaderProps) => {
  const isPaid = appointment.paymentStatus === "COMPLETE";

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
        <Badge variant="secondary" className="bg-primary/10 text-primary border-none px-3 py-1 font-bold">
          {appointment.status}
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