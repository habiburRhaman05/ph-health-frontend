"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ApiError, ErrorType } from "./error";
import { isRedirectError } from "next/dist/client/components/redirect-error";

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(cookieString: string): Promise<string | null> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const res = await fetch(`${process.env.API_URL}/auth/refresh-token`, {
        method: "POST",
        headers: { cookie: cookieString },
        cache: "no-store",
      });

      if (!res.ok) return null;
      const { data } = await res.json();
      return data?.accessToken ?? null;
    } catch (error) {
      console.error("[Auth] Token refresh failed:", error);
      return null;
    } finally {
      refreshPromise = null;
    }
  })();
  
  return refreshPromise;
}

export async function serverApi<T = unknown>(path: string, options: RequestInit = {}): Promise<T> {
  const cookieStore = await cookies();
  const initialCookies = cookieStore.toString();

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (initialCookies) headers.set("cookie", initialCookies);

  const fetchOptions: RequestInit = {
    ...options,
    headers,
    body: options.body && typeof options.body === "object" 
      ? JSON.stringify(options.body) 
      : options.body as BodyInit,
  };

  try {
    let res = await fetch(`${process.env.API_URL}${path}`, fetchOptions);

    if (res.status === 401) {
      const newAccess = await refreshAccessToken(initialCookies);
      if (!newAccess) redirect("/sign-in");

      const updatedCookies = await cookies();
      headers.set("cookie", updatedCookies.toString());
      res = await fetch(`${process.env.API_URL}${path}`, { ...fetchOptions, headers });
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const typeMap: Record<number, ErrorType> = {
        400: "VALIDATION",
        401: "UNAUTHORIZED",
        403: "FORBIDDEN",
        404: "NOT_FOUND",
      };
      throw new ApiError(
        data.message || "An unexpected error occurred",
        res.status,
        typeMap[res.status] || "SERVER_ERROR",
        data
      );
    }

    return data as T;
  } catch (error: any) {
    if (isRedirectError(error)) throw error;
    if (error instanceof ApiError) throw error;
    throw new ApiError("Network connection failure", 0, "NETWORK_ERROR");
  }
}