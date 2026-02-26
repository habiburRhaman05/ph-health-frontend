"use server"
import { envVeriables } from "@/config/envVariables"
import { IUser } from "@/interfaces/user";
import httpClient from "@/lib/axios-client"
import { cookies } from "next/headers"

export const getProfile = async ():Promise<{user:{data:any}} | null> => {
     const cookieStore = await cookies();
  const res = await fetch(`${envVeriables.NEXT_PUBLIC_API_URL}/auth/me`, {
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


