import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { doctorService } from '../services/doctorService'
import type { DoctorFilter } from '@/features/shared/types'

export function useDoctorList(filters: DoctorFilter) {
  return useQuery({
    queryKey: ['doctors', filters],
    queryFn: () => doctorService.getDoctors(filters),
    enabled: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useDoctorsInfinite(filters: Omit<DoctorFilter, 'page' | 'limit'>) {
  return useInfiniteQuery({
    queryKey: ['doctors-infinite', filters],
    queryFn: ({ pageParam = 1 }) =>
      doctorService.getDoctors({
        ...filters,
        page: pageParam,
        limit: 10,
      }),
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.length * 10
      return lastPage.data?.total && totalFetched < lastPage.data.total ? pages.length + 1 : undefined
    },
    enabled: true,
    staleTime: 5 * 60 * 1000,
  })
}

export function useDoctorById(id: string) {
  return useQuery({
    queryKey: ['doctor', id],
    queryFn: () => doctorService.getDoctorById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  })
}

export function useDoctorAvailability(doctorId: string, date: string) {
  return useQuery({
    queryKey: ['doctor-availability', doctorId, date],
    queryFn: () => doctorService.getDoctorAvailability(doctorId, date),
    enabled: !!doctorId && !!date,
    staleTime: 5 * 60 * 1000,
  })
}

export function useFeaturedDoctors() {
  return useQuery({
    queryKey: ['featured-doctors'],
    queryFn: () => doctorService.getFeaturedDoctors(),
    staleTime: 10 * 60 * 1000,
  })
}
