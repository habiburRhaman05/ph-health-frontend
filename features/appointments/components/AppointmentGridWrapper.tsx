'use client'

import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react'
import AppointmentCard from './AppointmentCard';
import { Button } from '@/components/ui/button';
import { useAppointments } from '../hook/useAppointment';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import AppointmentGridSkeleton from './AppointmentGridSkelection';
import { useApiQuery } from '@/hooks/useApiQuery';
import { useQueryClient } from '@tanstack/react-query';

const AppointmentGridWrapper = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
 const path= usePathname();

  // Parse URL params
  const pageFromUrl = Number(searchParams.get('page') || 1);
  const status = searchParams.get('status') || "";
  const q = searchParams.get('q') || "";

  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const queryClient =  useQueryClient()

  // Fetch appointments
  const { appointments, appointmentsFetching, paginationData } = useAppointments({
    page: currentPage,
    status,
    q
  });

  
  

  // Pagination handler
  const handlePagination = (value: number, type: "next" | "prev" | "specific") => {
    if (!paginationData) return;

    let newPage = currentPage;
    if (type === "prev") newPage = Math.max(currentPage - 1, 1);
    else if (type === "next") newPage = Math.min(currentPage + 1, paginationData.totalPage);
    else if (type === "specific") newPage = value;

    if (newPage !== currentPage) setCurrentPage(newPage);

    router.push(`${path}?page=${newPage}`);

    setTimeout(() => {
       queryClient.resetQueries()
    }, 200);

    window.scrollTo({ top: 0, behavior: 'smooth' });
   
  }

  if (appointmentsFetching) {
    return <AppointmentGridSkeleton />
  }

  return (
    <div>
      {/* Appointments Grid */}
      {appointments?.length === 0 ? (
        <div className="text-center py-20 border rounded-xl bg-muted/10">
          <Calendar className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground font-medium">No appointments found</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {appointments?.map((apt: any) => <AppointmentCard apt={apt} key={apt.id} />)}
        </div>
      )}

      {/* Pagination */}
      {paginationData  && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4  pt-6 mt-4">
          <p className="text-sm text-muted-foreground">
            Showing Page <span className="font-medium text-foreground">{paginationData.page}</span> of{" "}
            <span className="font-medium text-foreground">{paginationData.totalPage}</span>
          </p>

          <div className="flex items-center gap-2">
            {/* Previous */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePagination(0, "prev")}
              disabled={currentPage === 1}
              className="h-9"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>

            {/* Page Numbers */}
            <div className="hidden md:flex gap-1">
              {Array.from({ length: paginationData.totalPage }, (_, i) => i + 1).map(pageNum => (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  className="w-9 h-9 p-0"
                  onClick={() => handlePagination(pageNum, "specific")}
                >
                  {pageNum}
                </Button>
              ))}
            </div>

            {/* Next */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePagination(0, "next")}
              disabled={currentPage === paginationData.totalPage}
              className="h-9"
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AppointmentGridWrapper;