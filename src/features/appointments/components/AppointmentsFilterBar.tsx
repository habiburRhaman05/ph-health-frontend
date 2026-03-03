"use client";

import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentStatus } from "@/interfaces/enum";
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

  const status = searchParams.get("status") || AppointmentStatus.SCHEDULED;

  const handleSearch = (e:React.KeyboardEvent) =>{
     if(e.key === "Enter"){
          if (searchQuery) {
        params.set("q", searchQuery);
      } else {
        params.delete("q");
      }
      router.push(`${pathname}?${params.toString()}`);
    //    setTimeout(() => {
    //    queryClient.resetQueries()
    // }, 200);

     }
  }


  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search doctor name..."
          className="pl-10 h-10 bg-card"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e)=>{
            handleSearch(e)
          }}
        />
      </div>

      <Tabs
      
        value={status}
        onValueChange={(value) => {
          params.set("status", value);
          router.push(`${pathname}?${params.toString()}`);
        }}
      >
  <TabsList className="bg-muted/50 h-10 p-1 border border-border/50">
  <TabsTrigger 
  
    value={AppointmentStatus.SCHEDULED}
    className="rounded-md px-4 transition-all
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground 
               data-[state=active]:shadow-sm"
  >
    Upcoming
  </TabsTrigger>

  <TabsTrigger 
    value={AppointmentStatus.COMPLETED}
    className="rounded-md px-4 transition-all
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground 
               data-[state=active]:shadow-sm"
  >
    Completed
  </TabsTrigger>

  <TabsTrigger 
    value={AppointmentStatus.CANCELLED}
    className="rounded-md px-4 transition-all
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground 
               data-[state=active]:shadow-sm"
  >
    Cancelled
  </TabsTrigger>
</TabsList>
      </Tabs>
    </div>
  );
};

export default AppointmentsFilterBar;