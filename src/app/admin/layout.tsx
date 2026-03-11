import Header from '@/components/Header';
import { AppSidebar } from '@/components/Sidebar';
import React from 'react';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {

 
  return (
      <main className="min-h-screen bg-background w-full">
      <Header />
      <div className="flex">
     
        <AppSidebar  />
        <div className="flex-1 min-h-[calc(100vh-64px)] w-full">
          <div className=" w-full">
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}
