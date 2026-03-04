
"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { isTokenExpiring } from "./jwt"

let refreshPromise: Promise<string | null> | null = null

async function refreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const res = await fetch(`${process.env.API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        cache: "no-store",
      })
      if (!res.ok) {
        refreshPromise = null
        return null
      }
      const json = await res.json().catch(() => null)
      refreshPromise = null
      return json?.accessToken ?? null
    })()
  }
  return refreshPromise
}

/**
 * serverApi: for Server Actions (POST/PUT/DELETE)
 * central 401 handling + proactive refresh
 */
export async function serverApi(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies()
  let accessToken = cookieStore.get("accessToken")?.value ?? null

  if (isTokenExpiring(accessToken, 30)) {
    const newAccess = await refreshAccessToken()
    if (!newAccess) redirect("/login")
    accessToken = newAccess
  }

  let res = await fetch(`${process.env.API_URL}${path}`, {
    ...options,
    headers: {
      ...((options && options.headers) || {}),
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
    credentials: "include",
  })

  if (res.status === 401) {
    const newAccess = await refreshAccessToken()
    if (!newAccess) redirect("/login")

    res = await fetch(`${process.env.API_URL}${path}`, {
      ...options,
      headers: {
        ...((options && options.headers) || {}),
        Authorization: `Bearer ${newAccess}` || "",
      },
      credentials: "include",
    })
  }

  return res
}