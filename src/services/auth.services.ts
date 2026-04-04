"use server"
import { serverApi } from "@/lib/serverApi";

export const signupUser = async (payload) =>{
     return serverApi(`/auth/register`,{
    method: "POST",
    body: payload
  });
}

