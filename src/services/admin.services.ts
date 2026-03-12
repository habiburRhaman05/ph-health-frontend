import { IDoctor } from "@/interfaces/doctor";
import { ApiResponse } from "@/interfaces/response";
import httpClient from "@/lib/axios-client";

export const getDoctors = async (page:number): Promise<ApiResponse<IDoctor[]>> => {
  const { data } = await httpClient.get(`/doctors?page=${page}`)
  return data
}