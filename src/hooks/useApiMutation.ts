"use client"

import httpClient from "@/lib/axios-client";
import { queryClient } from "@/lib/react-query";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";

type MutationMethod = "POST" | "PUT" | "PATCH" | "DELETE";

type VariableWithMeta<T> = T & {
  meta?: {
    successMessage?: string;
    errorMessage?: string;
  }
};

interface MutationConfig {
  method: MutationMethod;
  endpoint: string;
  customFn?: (payload: any) => Promise<any>;
  invalidateKeys?: string[];
  successMessage?: string;
  errorMessage?: string;
}

export function useApiMutation<TData = any, TVariables = any, TContext = unknown>(
  config: MutationConfig,
  hookOptions?: UseMutationOptions<TData, Error, VariableWithMeta<TVariables>, TContext>
) {
  const { method, endpoint, customFn, invalidateKeys, successMessage: configSuccess, errorMessage: configError } = config;

  return useMutation<TData, Error, VariableWithMeta<TVariables>, TContext>({
    mutationFn: async (variables) => {
      const { meta, ...payload } = (variables || {}) as any;
      if (customFn) return await customFn(payload);
      
      const response = await httpClient({
        url: endpoint,
        method,
        data: payload,
      });
      return response.data;
    },

    onSuccess: (data, variables, context) => {
      // 1. Resolve Success Message
      const finalSuccessMessage = 
        variables?.meta?.successMessage || 
        configSuccess || 
        (data as any)?.message || 
        "Action completed successfully";

      toast.success(finalSuccessMessage);

      // 2. Invalidate Queries
      if (invalidateKeys) {
        invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: [key] });
        });
      }

      // 3. FIX: Execute hook-level options using 'apply' or spreading to ignore argument count
      if (hookOptions?.onSuccess) {
        (hookOptions.onSuccess as Function)(data, variables, context);
      }
    },

    onError: (error: any, variables, context) => {
      // 1. Resolve Error Message
      const apiErrorMessage = error.response?.data?.error?.message || error.response?.data?.message;
      const finalErrorMessage = 
        variables?.meta?.errorMessage || 
        configError || 
        apiErrorMessage || 
        "Something went wrong.";

      toast.error(finalErrorMessage, {
        description: `Error Code: ${error.response?.status || "Unknown"}`,
      });

      // 2. FIX: Execute hook-level error callback
      if (hookOptions?.onError) {
        (hookOptions.onError as Function)(error, variables, context);
      }
    },
    
    // Spread other options like onMutate or retry
    ...hookOptions,
  });
}