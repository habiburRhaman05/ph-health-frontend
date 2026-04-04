"use client"

import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "@/lib/error";

interface MutationExtras<TData, TVariables> {
  invalidateKeys?: string[] | string[][];
  successMessage?: string | ((data: TData) => string);
  errorMessage?: string;
}

export function useApiMutation<TData = any, TVariables = void>(
  mutationFn: (vars: TVariables) => Promise<TData>,
  options: MutationExtras<TData, TVariables> & UseMutationOptions<TData, ApiError, TVariables> = {}
) {

  const queryClient = useQueryClient();
  const { invalidateKeys, successMessage, errorMessage, ...mutationOptions } = options;

  return useMutation({
    mutationFn,
    ...mutationOptions,
    onSuccess: async (data, vars, context) => {
      // 1. Success Notification
      const msg = typeof successMessage === "function" ? successMessage(data) : successMessage;
      toast.success(msg || (data as any)?.message || "Action successful");

      // 2. Cache Invalidation
      if (invalidateKeys) {
        await Promise.all(
          invalidateKeys.map(key => queryClient.invalidateQueries({ queryKey: Array.isArray(key) ? key : [key] }))
        );
      }

      options.onSuccess?.(data, vars, context);
    },

    onError: (error, vars, context) => {
      console.log(error);
      
      const { type, message, status } = error;

      // 3. Categorized Error Toasts
      const toastConfigs = {
        VALIDATION: { title: "Validation Error", func: toast.warning },
        UNAUTHORIZED: { title: "Session Expired", func: toast.error },
        NETWORK_ERROR: { title: "No Connection", func: toast.error },
        FORBIDDEN: { title: "Access Denied", func: toast.error },
        NOT_FOUND: { title: "Not Found", func: toast.info },
        SERVER_ERROR: { title: "Server Error", func: toast.error },
      };

      const config = toastConfigs[type] || toastConfigs.SERVER_ERROR;
      config.func(config.title, {
        description: errorMessage || message,
      });

      options.onError?.(error, vars, context);
    },
  });
}