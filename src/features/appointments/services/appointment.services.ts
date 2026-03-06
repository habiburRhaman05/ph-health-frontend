"use server"
import { serverApi } from "@/lib/serverApi"

export const handleBookingPayNow = async (payload:any)=>{
    console.log(payload);
    
    const response = await serverApi("/appointments",{
        body:JSON.stringify(payload),
        method:"POST"
    });
  return response
   
}
export const handleBookingLatar = async (payload:any)=>{
    console.log(payload);
    
    const response = await serverApi("/appointments/book-with-pay-later",{
        body:JSON.stringify(payload),
        method:"POST"
    });
  return response
   
}
export const handleBookingPayLatar = async (payload:{appointmentId:string})=>{

    const response = await serverApi(`/appointments/pay-later/${payload.appointmentId}`,{
        method:"POST"
    });
   console.log("handleBookingPayLatar-response",response);
   
  return response
   
}