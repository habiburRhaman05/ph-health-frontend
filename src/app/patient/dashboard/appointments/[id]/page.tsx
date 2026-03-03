
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import AppointmentDetails from '@/features/appointments/components/AppointmentDetails'
import ApppointmentDetailsSkelection from '@/features/appointments/components/ApppointmentDetailsSkelection'
import { useGetAppointment } from '@/hooks/appointments/useGetAppointment'
import { useApiQuery } from '@/hooks/useApiQuery'
import { queryKeys } from '@/lib/react-query-keys'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import {
    Activity,
    ArrowLeft,
    Clock,
    Phone,
    User,
    Video
} from 'lucide-react'

export default async function AppointmentDetailsPage({ params }: { params: { id: string } }) {

   const {id} = await params
  const queryClient = new QueryClient();


  await queryClient.prefetchQuery({queryKey:[queryKeys.FETCH_PATIENT_APPOINTMENT_LIST]})



  // if (isLoading) return <ApppointmentDetailsSkelection />

  return <HydrationBoundary state={dehydrate(queryClient)}>
   <AppointmentDetails id={id}/>
  </HydrationBoundary>
 
  
}