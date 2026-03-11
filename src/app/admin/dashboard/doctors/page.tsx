import DoctorsListWrapper from '@/features/admins/components/DoctorsListWrapper';
import { queryKeys } from '@/lib/react-query-keys';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'

const page = async() => {

  const client = new QueryClient();

  await client.prefetchQuery({
    queryKey:[queryKeys.FETCH_DOCTOR_LIST_BY_ADMIN]})

  return (
      <HydrationBoundary state={dehydrate(client)}>
        <DoctorsListWrapper/>
      </HydrationBoundary>
  )
}

export default page