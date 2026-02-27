import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Link from "next/link";

export function AppointmentLoadingSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-48 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-8">
          <Skeleton className="h-[400px] w-full rounded-2xl" />
        </div>
        
        {/* Sidebar Skeleton */}
        <div className="lg:col-span-4 space-y-4">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-11 rounded-xl" />
            <Skeleton className="h-11 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ErrorState() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-background text-foreground p-6 text-center">
      <div className="h-16 w-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
        <XCircle size={32} className="text-destructive" />
      </div>
      <h2 className="text-xl font-bold">Appointment Unavailable</h2>
      <p className="text-muted-foreground max-w-xs mt-2">
        We couldn't find the details for this appointment. It may have been removed or there's a connection issue.
      </p>
      <div className="flex gap-3 mt-6">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Try Again
        </Button>
        <Link href="/dashboard/appointments">
          <Button>Return to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}