import { Button } from "@/components/ui/button";
import AppointmentGridWrapper from "@/features/appointments/components/AppointmentGridWrapper";
import AppointmentsFilterBar from "@/features/appointments/components/AppointmentsFilterBar";
import { queryKeys } from "@/lib/react-query-keys";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Stethoscope } from "lucide-react";
import Link from "next/link";




export default async function MyAppointmentsPage() {


  const queryClient = new QueryClient();


  await queryClient.prefetchQuery({queryKey:[queryKeys.FETCH_PATIENT_APPOINTMENT_LIST]})

  return (
    <div 
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
<AppointmentsFilterBar />

 {/* Appointments grid with pagination */}

 <HydrationBoundary state={dehydrate(queryClient)}>
      <AppointmentGridWrapper />
    </HydrationBoundary>
  
    </div>
  )
}