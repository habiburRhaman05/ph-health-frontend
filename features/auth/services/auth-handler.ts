"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { signInPayloadType, signUpPayloadType } from "@/features/auth/types";
import { useApiMutation } from "@/hooks/useApiMutation";
import { envVeriables } from "@/config/envVariables";



export const useAuthHandlers = () => {
  const router = useRouter();
  const [status,setStatus] = useState("none")
  const [userData,setUserData] = useState({})

  

  const signupMutation = useApiMutation({
    endpoint:"/api/auth/register",
    method:"POST",
  })
  const signinMutation = useApiMutation({
    endpoint:"/api/auth/login",
    method:"POST",
  })
  // --- Sign In ---
  const signIn = async (data: signInPayloadType) => {
    // const userData =  await signinMutation.mutateAsync(data);
   const res = fetch(`${envVeriables.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
  credentials: "include", // 🔥 REQUIRED
});
const userData = (await res).json()
return userData
  };
  // --- Sign Up ---
  const signUp = async (data: signUpPayloadType) => {
    await signupMutation.mutateAsync(data);
  };
  // --- Get user profile ---
  const getCurrentUser = async () => {
 
  // setStatus("get-profile")
  //  const userData = await getProfile();
  //  if(!userData){
  //    setStatus("none")
  //    setUserData({})
  //  }
  //  setUserData(userData?.user.data)
   
  };

  // --- Get user profile ---
  const logoutCurrentUser = async () => {
 
  // setStatus("logout-user")
  //    const res  = await logoutUser();

   
  
   
   
  };


  // -- handle google login 



// useEffect(()=>{
//  getCurrentUser()
// },[])
useEffect(()=>{
    if(signupMutation.isSuccess){
      router.push("/sign-in")
     }
 
},[signupMutation.isSuccess])

  return {
    signIn,
    signUp,
    isSigningIn: signinMutation.isPending,
    isSigningUp: signupMutation.isPending,
getCurrentUser,
logoutCurrentUser,
userData,userLoading:status === "get-profile",
logoutLoading:status === "logout-user"
  };
};