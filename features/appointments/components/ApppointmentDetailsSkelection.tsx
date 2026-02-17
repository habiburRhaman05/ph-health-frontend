import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const ApppointmentDetailsSkelection = () => {
 return (
    <div className="min-h-screen bg-background p-4 md:p-8 animate-pulse">
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-24 w-full rounded-[2rem]" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Skeleton className="h-64 w-full rounded-[2.5rem]" />
            <Skeleton className="h-24 w-full rounded-[2rem]" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-48 w-full rounded-[2.5rem]" />
            <Skeleton className="h-56 w-full rounded-[2.5rem]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApppointmentDetailsSkelection

