// pages/api/refresh-token.ts (or app/api/refresh-token/route.ts)
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // forward refresh token request to Express backend
    const response = await fetch(`${process.env.API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        cookie: req.headers.cookie || "",
      },
      credentials: "include",
    });

    if (!response.ok) {
      return res.status(401).json({ message: "Refresh token invalid" });
    }

    // get new cookies from Express response
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      // set the cookie in Next.js runtime response
      res.setHeader("Set-Cookie", setCookieHeader);
    }

    return res.status(200).json({ message: "Token refreshed" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}