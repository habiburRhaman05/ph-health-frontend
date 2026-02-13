import { getCookie } from '@/features/doctors/services/server';
import React from 'react'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
   const cookie = await getCookie()
 
 console.log("cookie",cookie);
 
  return <>
 cooke =  {cookie}
  
  {children}</>
}
