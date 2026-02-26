"use client";

import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const AppointmentsFilterBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient =  useQueryClient()

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const params = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  );

  const status = searchParams.get("status") || "upcoming";

  // Debounced search
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchQuery) {
        params.set("q", searchQuery);
      } else {
        params.delete("q");
      }
      router.push(`${pathname}?${params.toString()}`);
       setTimeout(() => {
       queryClient.resetQueries()
    }, 200);

    }, 400);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search doctor name..."
          className="pl-10 h-10 bg-card"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs
        value={status}
        onValueChange={(value) => {
          params.set("status", value);
          router.push(`${pathname}?${params.toString()}`);
      setTimeout(() => {
       queryClient.resetQueries()
    }, 200);

        }}
      >
        <TabsList className="bg-muted/50 h-10">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default AppointmentsFilterBar;