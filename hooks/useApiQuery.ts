import { envVeriables } from "@/config/envVariables";
import { ApiResponse } from "@/features/shared/types";
import httpClient from "@/lib/axios-client";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { toast } from "sonner";

export function useApiQuery<T>(
  queryKey: string[],
  endpoint: string,
  fetchMethod: "axios" | "fetch",
  options?: Omit<UseQueryOptions<ApiResponse<T>, Error>, "queryKey" | "queryFn">
) {
  return useQuery<ApiResponse<T>, Error>({
    queryKey,
    queryFn: async () => {
      try {
        if (fetchMethod === "axios") {
          // Client-side Axios
          const { data } = await httpClient.get(endpoint);
          return data;
        } else {
          // Server-side fetch with ISR support
          const res = await fetch(
            `${envVeriables.NEXT_PUBLIC_API_URL}${endpoint}`,
            {
              credentials: "include",
              next: {
                revalidate: 60, // ISR: cache for 60s
              },
            }
          );

          if (!res.ok) throw new Error("Fetch failed");

          return res.json();
        }
      } catch (error: any) {
        toast.error("Fetch Error");
        throw error;
      }
    },
    ...options,
  });
}