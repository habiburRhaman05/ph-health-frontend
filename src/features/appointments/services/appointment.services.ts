"use server"
import { serverApi } from "@/lib/serverApi"

export const handleBookingPayNow = async (payload:any,config:{url:string,method:string})=>{
    console.log(payload);
    
    const response = await serverApi(config.url,{
        body:JSON.stringify(payload),
        method:config.method
    });
  return response
}
export const handleBookingLatar = async (payload:any,config:{url:string,method:string})=>{
    console.log(payload);
    
    const response = await serverApi(config.url,{
        body:JSON.stringify(payload),
        method:config.method
    });
  return response
   
}
export const handleBookingPayLatar = async (payload:{appointmentId:string},config:{url:string,method:string})=>{
    const response = await serverApi(config.url,{
        body:JSON.stringify(payload),
        method:config.method
    });
  return response
   
}
export const handleBookingCancelPayLatar = async (payload:any,config:{url:string,method:string})=>{

    const response = await serverApi(config.url,{
        body:JSON.stringify(payload),
        method:config.method
    });
  return response
   
}