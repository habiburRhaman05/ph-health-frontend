"use client";

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
      // 1. Using standard fetch pointing to your Next.js API route
      const res = await fetch('/api/logout', {
        method: 'GET', // Matches the POST method in your route.ts
        headers: {
          'Content-Type': 'application/json',
        },
        // Ensures cookies are sent and received
        credentials: 'include', 
      });

      // 2. Manual status check (Fetch doesn't throw on 4xx/5xx)
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to logout");
      }

      // 3. Successful logout
      router.push("/sign-in");
      router.refresh(); // Clears any cached server-side data
      
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <button 
        onClick={handleLogout} 
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 transition-colors rounded-md hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-red-600 rounded-full animate-spin border-t-transparent"></span>
            Logging out...
          </>
        ) : (
          "Logout"
        )}
      </button>

      {error && (
        <p className="mt-2 text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default LogoutButton;