"use client";

import httpClient from "@/lib/axios-client";
import { useRouter } from "next/navigation";
import { useState } from "react";


const LogoutButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
  const res = await httpClient.get('/api/v1/auth/logout')

  if (res.status === 200) router.push("/sign-in");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={handleLogout} disabled={loading}>
        {loading ? "Logging out..." : "Logout"}
      </button>

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </div>
  );
};

export default LogoutButton;
