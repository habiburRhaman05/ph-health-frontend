"use server";

import { cookies } from "next/headers";

export const getCookie = async ()=>{
    const cookieStore = await cookies();
    console.log(cookieStore.toString());
    
    return cookieStore.toString()
}