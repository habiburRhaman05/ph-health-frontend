"use server"
import { serverApi } from "@/lib/serverApi"

export const handleBookingLatar = async (payload)=>{
    console.log(payload);
    
    const response = await serverApi("/appointments/book-with-pay-later",{
        body:JSON.stringify(payload),
        method:"POST"
    });
   console.log("response",response);
   
  return response
   
}