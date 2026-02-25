import React from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { getProfile } from '@/features/auth/services/auth.services';
import UserContextProvider from '@/context/UserContext';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {



  return (


    <div className="flex mx-auto flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>


  )
}
