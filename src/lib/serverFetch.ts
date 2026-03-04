"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { isTokenExpiring } from "./jwt"
import { envVeriables } from "@/config/envVariables"
import { setTokenInCookies } from "./token"

let refreshPromise: Promise<string | null> | null = null

async function refreshAccessToken(cookies: string): Promise<string | null> {
    // single refresh in-flight across calls
    if (!refreshPromise) {
        refreshPromise = (async () => {
            try {
                console.log("refresh call");
                console.log(cookies);
                console.log(envVeriables.API_URL);

                const res = await fetch(`${envVeriables.API_URL}/auth/refresh-token`, {
                    method: "POST",
                    headers: {
                        cookie: cookies
                    },
                    credentials: "include",
                    cache: "no-store",
                })

                // Prefer backend to return JSON { accessToken: "..." } in response body


                const data = await res.json().catch(() => null)

                const { accessToken, refreshToken, sessionToken, user, message } = data.data;

                await setTokenInCookies("accessToken", accessToken, 10 * 60);
                await setTokenInCookies("better-auth.session_token", sessionToken, 10 * 60);
                await setTokenInCookies("refreshToken", refreshToken, 30 * 60);

                refreshPromise = null
                return data?.data.accessToken ?? null
            } catch (error) {
                console.log(error);

                return null
            }
        })()
    }
    return refreshPromise
}

/**
 * serverFetch: centrally used in Server Components / SSR
 * - pre-check access expiry
 * - one refresh attempt (locked)
 * - fallback on 401
 */
export async function serverFetch(path: string, options: RequestInit = {}) {
    const cookieStore = await cookies()
    // read access token cookie if backend placed it there
    let accessToken = cookieStore.get("accessToken")?.value ?? null

    // pre-check expiry and refresh proactively if needed
    if (isTokenExpiring(accessToken, 30)) {
        const newAccess = await refreshAccessToken(cookieStore.toString())
    

        if (!newAccess) {
            // refresh failed → force login
            redirect("/sign-in")
        }
        accessToken = newAccess
    }


    // perform request with current access token
    let res = await fetch(`${envVeriables.API_URL}${path}`, {
        ...options,
        headers: {
            ...((options && options.headers) || {}),
            cookie: cookieStore.toString()
        },
        credentials: "include",
        cache: "no-store",
    })



    // fallback: if 401, try refresh once and retry
    if (res.status === 401) {
        const newAccess = await refreshAccessToken(cookieStore.toString())
        if (!newAccess) redirect("/sign-in")

        res = await fetch(`${envVeriables.API_URL}${path}`, {
            ...options,
            headers: {
                ...((options && options.headers) || {}),
                cookie: cookieStore.toString()
            },
            credentials: "include",
            cache: "no-store",
        })
    }

    const data = await res.json()

    return JSON.parse(JSON.stringify(data));
}