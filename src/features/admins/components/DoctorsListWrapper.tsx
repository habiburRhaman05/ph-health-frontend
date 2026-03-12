"use client"
import { useApiQuery } from '@/hooks/useApiQuery'
import { queryKeys } from '@/lib/react-query-keys'
import React from 'react'
import ManageDoctorsTable from './DoctorsTable'
import { useParams, useSearchParams } from 'next/navigation'

const DoctorsListWrapper = () => {


  const params =useSearchParams()

  const {data,isLoading,isError} = useApiQuery<any[]>(
    [queryKeys.FETCH_DOCTOR_LIST_BY_ADMIN,params.toString()],
    `/doctors?page=${params.get("page")}`,
    "axios",
    { staleTime: 60 * 1000}
  );
 
  return (
    <div className='p-6'>
 <ManageDoctorsTable 
 doctors={data?.data.data}
 isLoading={isLoading}
 pagination={data?.data.meta}
 />

    </div>
  )
}

export default DoctorsListWrapper