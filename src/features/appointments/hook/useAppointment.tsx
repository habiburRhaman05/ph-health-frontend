import { useApiQuery } from "@/hooks/useApiQuery"

interface AppointmentFilters {
  page?: number
  appointmentDeatils?:boolean
  appointmentsList?:boolean
  status?: string

  q?: string
}

export function useAppointments(filters: AppointmentFilters) {
  // Build query string
  const queryParams = new URLSearchParams()
  if (filters.page) queryParams.append("page", filters.page.toString())
  if (filters.status) queryParams.append("status", filters.status)
  if (filters.q) queryParams.append("q", filters.q)

 const queryKey = queryParams.toString();
  const {data,isLoading,isError} = useApiQuery<any[]>(
    [queryKey],
    `appointments/patient/my-appointments?${queryParams.toString()}`,
    "axios",
    { staleTime: 60 * 1000,enabled:filters.appointmentsList}
  );

  return {
    appointments:data?.data || [],
    appointmentsFetching:isLoading,
    appointmentsFetchingError:isError,
    paginationData:data?.meta
  }
}