'use client'

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DoctorCard } from '@/features/doctors/components/DoctorCard'
import { DoctorFilters } from '@/features/doctors/components/DoctorFilters'
import { DoctorGridSkeleton } from '@/features/doctors/components/DoctorsSkelections'

import type { DoctorFilter } from '@/features/shared/types'
import { CONSULTATION_FEES } from '@/features/shared/constants'
import { useApiQuery } from '@/hooks/useApiQuery'
import { queryKeys } from '@/lib/react-query-keys'
import { IDoctor } from '@/interfaces/doctor'

export default function DoctorsPage() {
  const [filters, setFilters] = useState<DoctorFilter>({
    page: 1,
    limit: 12,
  })

  const {data:doctorsList,isLoading,isError} = useApiQuery<{data:{
    meta:{
      limit:number;
      page:number;
      total:number;
      totalPage:number;
    },
    data:IDoctor[]
  }}>([queryKeys.FETCH_DOCTOR_LIST],"/api/v1/doctors")
 
  const doctors = doctorsList?.data
  

  const handleSpecialtyChange = useCallback((specialty: string) => {
    setFilters((prev) => ({
      ...prev,
      specialty: specialty || undefined,
      page: 1,
    }))
  }, [])

  const handleGenderChange = useCallback((gender: string) => {
    setFilters((prev) => ({
      ...prev,
      gender: gender || undefined,
      page: 1,
    }))
  }, [])

  const handlePriceChange = useCallback((min: number, max: number) => {
    setFilters((prev) => ({
      ...prev,
      minFee: min > CONSULTATION_FEES.MIN ? min : undefined,
      maxFee: max < CONSULTATION_FEES.MAX ? max : undefined,
      page: 1,
    }))
  }, [])

  const handleVerifiedChange = useCallback((verified: boolean) => {
    setFilters((prev) => ({
      ...prev,
      verified: verified || undefined,
      page: 1,
    }))
  }, [])

  const handleReset = useCallback(() => {
    setFilters({
      page: 1,
      limit: 12,
    })
  }, [])

  const handleBookAppointment = (doctorId: string) => {
    // Navigate to booking page or open booking modal
    console.log('Book appointment for doctor:', doctorId)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/30 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold">Find Doctors</h1>
            <p className="text-muted-foreground mt-2">
              Browse and book appointments with verified healthcare professionals
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <DoctorFilters
              onSpecialtyChange={handleSpecialtyChange}
              onGenderChange={handleGenderChange}
              onPriceChange={handlePriceChange}
              onVerifiedChange={handleVerifiedChange}
              onReset={handleReset}
              selectedSpecialty={filters.specialty}
              selectedGender={filters.gender}
              selectedVerified={filters.verified}
            />
          </div>

          {/* Doctors Grid */}
          <div className="lg:col-span-3">
            {/* Loading State */}
            {isLoading && <DoctorGridSkeleton count={12} />}

            {/* Doctors Grid */}
            {!isLoading && doctors && doctors?.data.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {doctors.data.map((doctor, idx) => (
                    <motion.div
                      key={doctor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <DoctorCard doctor={doctor} />
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {(filters.page! - 1) * filters.limit! + 1} to{' '}
                    {Math.min(filters.page! * filters.limit!, doctors.meta.total)} of {doctors.meta.total} doctors
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          page: Math.max(1, (prev.page || 1) - 1),
                        }))
                      }
                      disabled={(filters.page || 1) === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        Page {filters.page || 1} of{' '}
                        {Math.ceil((doctors.meta.total || 1) / (filters.limit || 12))}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          page: (prev.page || 1) + 1,
                        }))
                      }
                      disabled={
                        (filters.page || 1) >=
                        Math.ceil((doctors.meta.total || 1) / (filters.limit || 12))
                      }
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Empty State */}
            {!isLoading && doctors && doctors.data.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-lg border border-border bg-card p-12 text-center"
              >
                <p className="text-lg font-semibold text-foreground mb-2">No doctors found</p>
                <p className="text-muted-foreground">
                  Try adjusting your filters to find more doctors
                </p>
              </motion.div>
            )}

            {/* Error State */}
            {isError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-lg border border-destructive/50 bg-destructive/10 p-4"
              >
                <p className="text-sm text-destructive">
                  Error loading doctors. Please try again later.
                </p>
              </motion.div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  )
}
