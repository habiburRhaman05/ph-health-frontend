"use client"

import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";
import { ApiError } from "@/lib/error";
import { toast } from "sonner";
import { useEffect } from "react";

export function useApiQuery<TData>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, ApiError>, "queryKey" | "queryFn"> & {
    showErrorToast?: boolean;
  }
) {
  const query = useQuery({
    queryKey,
    queryFn,
    staleTime: 1000 * 60 * 5, // 5 minutes default stale time
    ...options,
  });

  // Global Error Tracking for Queries
  useEffect(() => {
    if (query.error && options?.showErrorToast !== false) {
      toast.error("Failed to fetch data", {
        description: query.error.message,
      });
    }
  }, [query.error, options?.showErrorToast]);

  return query;
}