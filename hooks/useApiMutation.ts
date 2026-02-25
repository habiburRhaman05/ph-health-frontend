import httpClient from "@/lib/axios-client";
import { queryClient } from "@/lib/react-query";
import { useMutation, useQueryClient, UseMutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";

type MutationMethod = "POST" | "PUT" | "PATCH" | "DELETE";

interface MutationConfig {
  method: MutationMethod;
  endpoint: string;
  invalidateKeys?: string[];
  successMessage?: string;
}

export function useApiMutation<TData = any, TVariables = any, TContext = unknown>(
  config: MutationConfig,
  options?: UseMutationOptions<TData, Error, TVariables, TContext> | any
) {
 
  const { method, endpoint, invalidateKeys, successMessage } = config;

 const response =  useMutation<TData, Error, TVariables, TContext>({
    mutationFn: async (payload) => {
      const response = await httpClient({
        url: endpoint,
        method,
        data: payload,
      });
      return response.data;
    },
    onSuccess: (data:any, variables, context) => {
      toast.success(successMessage || data.message || "Action completed successfully");
      if (invalidateKeys) {
        invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey:[key] });
        });
      }
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error: any, variables, context) => {
  console.log(error);
  
      const message =error.response?.data?.error.message || error.response?.data?.message || "Something went wrong. Please try again.";
      console.log(message);
      
      
      toast.error(message, {
        description: "Error Code: " + (error.response?.status || "Unknown"),
      });

      options?.onError?.(error, variables, context);
    },
    ...options,
  });
  return response
}