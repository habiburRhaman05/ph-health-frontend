"use server"
import { envVeriables } from "@/config/envVariables";
import httpClient from "@/lib/axios-client";
import { setTokenInCookies } from "@/lib/token";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signInPayloadType } from "../types";
import { deleteCookie } from "@/lib/cookie";

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


export const handleLogin = async (loginPayload:signInPayloadType) =>{
    try {
        const res = await httpClient.post("/auth/login",loginPayload);
        console.log(res.data);
        
        const {accessToken, refreshToken, sessionToken,user,message} = res.data.data;

         await setTokenInCookies("accessToken", accessToken);
        await setTokenInCookies("refreshToken", refreshToken);
        await setTokenInCookies("better-auth.session_token", sessionToken, 24 * 60 * 60); 
      //  redirect("/dashboard")
      return {
          success:true,
          message:message,
          user
      }
    } catch (error:any) {
        console.log(error.message);
        return {
          success:false,
          message:error.response.data.message || error.message || "Failed to Login"
        }
        
    }
}
export const handleLogout = async () =>{
    try {
      const cookieStore = await cookies()
        const res = await httpClient.get("/auth/logout",{
          headers:{
            "cookie":cookieStore.toString()
          }
        });
       if(res.data.success){
         await deleteCookie("accessToken")
        await deleteCookie("refreshToken")
        await deleteCookie("better-auth.session_token") 
  
      return {
          success:true,
          message:res.data.message,
       
      }
       }
    } catch (error:any) {
        // console.log(error.response);
        return {
          success:false,
          message:error.response.data.message || error.message || "Failed to Login"
        }
        
    }
}



