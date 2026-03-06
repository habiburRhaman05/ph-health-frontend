
import AppointmentDetails from '@/features/appointments/components/AppointmentDetails'
import { queryKeys } from '@/lib/react-query-keys'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

export default async function AppointmentDetailsPage({ params }: { params: { id: string } }) {

   const {id} = await params
  const queryClient = new QueryClient();


  await queryClient.prefetchQuery({queryKey:[queryKeys.FETCH_PATIENT_APPOINTMENT_LIST]})



  // if (isLoading) return <ApppointmentDetailsSkelection />

  return <HydrationBoundary state={dehydrate(queryClient)}>
   <AppointmentDetails id={id}/>
  </HydrationBoundary>
 
  
}