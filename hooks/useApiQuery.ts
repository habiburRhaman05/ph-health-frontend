
import httpClient from "@/lib/axios-client";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { toast } from "sonner";


export function useApiQuery<T>(
  queryKey: string[],
  endpoint: string,
  options?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">
) {


  return useQuery<T, Error>({
    queryKey,
    queryFn: async () => {
      try {
        const { data } = await httpClient.get(endpoint);
        return data;
      } catch (error: any) {
        toast.error(
          "Fetch Error");
        throw error;
      }
    },
    
    ...options,
  });
}


