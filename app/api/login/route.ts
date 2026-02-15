import { envVeriables } from "@/config/envVariables";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Call backend API
    const backendRes = await fetch(
      `${envVeriables.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    // Parse JSON safely
    const backendData = await backendRes.json();

    // Prepare NextResponse with same status
    const res = NextResponse.json(backendData, { status: backendRes.status });

    // Forward Set-Cookie if exists
    const setCookie = backendRes.headers.get("set-cookie");
    if (setCookie) {
      res.headers.set("set-cookie", setCookie);
    }
  
    

    return res;
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}