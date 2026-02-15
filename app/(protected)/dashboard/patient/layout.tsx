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


  const userData =await getProfile();
console.log(userData);

  if(!userData?.user.data){
    redirect("/sign-in")
  }


  return <main>
  <Header/>
  <div className="flex items-start">
    <AppSidebar userRole={userData.user.data.role} userName={userData.user.data.name}/>
    {children}
  </div>

 
  
  </main>
}
