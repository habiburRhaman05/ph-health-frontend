import { envVeriables } from "@/config/envVariables";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    // 1. Get the session cookie from the current request to pass to the backend
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();

    // 2. Call backend logout API
    const backendRes = await fetch(
      `${envVeriables.NEXT_PUBLIC_API_URL}/api/v1/auth/logout`,
      {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "Cookie": allCookies // Pass current cookies so backend knows which session to kill
        },
      }
    );

    const backendData = await backendRes.json();

    // 3. Prepare response
    const res = NextResponse.json(backendData, { status: backendRes.status });

    // 4. Forward the Set-Cookie header from backend (which usually clears the token)
    const setCookie = backendRes.headers.get("set-cookie");
    if (setCookie) {
      res.headers.set("set-cookie", setCookie);
    } else {
      // Fallback: Manually clear the common 'accessToken' or 'session' cookie if backend doesn't
      res.cookies.set("accessToken", "", { expires: new Date(0), path: "/" });
      res.cookies.set("better-auth.session_token", "", { expires: new Date(0), path: "/" });
    }

    return res;
  } catch (err: any) {
    console.error("Logout API error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}