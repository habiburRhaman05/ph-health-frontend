"use server"
import { envVeriables } from "@/config/envVariables"
import httpClient from "@/lib/axios-client"
import { cookies } from "next/headers"

export const getProfile = async ():Promise<{user:{data:any}} | null> => {
     const cookieStore = await cookies();
  const res = await fetch(`${envVeriables.NEXT_PUBLIC_API_URL}/api/v1/auth/me`, {
    headers: {
      cookie: cookieStore.toString(),
    },
    cache: "no-store",
      credentials: "include",
  });

  console.log("cookies",cookieStore.toString());
  
  if (!res.ok) return null;
  const user = await res.json()

 
  return {user}
};


