import Header from '@/components/Header';
import { AppSidebar } from '@/components/Sidebar';
import { getProfile } from '@/features/auth/services/auth.services';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userData = await getProfile();

  if (!userData?.user.data) {
    redirect("/sign-in")
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <AppSidebar userRole={userData.user.data.role} userName={userData.user.data.name} />
        <div className="flex-1 min-h-[calc(100vh-64px)] w-full">
          <div className="mx-auto max-w-7xl w-full">
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}
