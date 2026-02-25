"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import { SidebarTrigger } from "@/components/ui/sidebar";

const navLinks = [
  { id: 1, name: "Find Doctors", path: "/doctors" },
  { id: 2, name: "Explore Tests", path: "/sign-up" },
  { id: 3, name: "About Us", path: "/about-us" },
];

export default function Header() {
  const currentPath = usePathname();
    const isSideTrgiggerShow =   currentPath.includes("/dashboard") || currentPath.includes("/tutor/dashboard") || currentPath.includes("/admin")
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/70 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-slate-950/70">
      <div className=" flex h-16 items-center justify-between px-4 w-full ">
        
          {isSideTrgiggerShow && (
            <SidebarTrigger className="h-9 w-9 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900" />
          )}
          nav links
          
          <div className="md:hidden">
            menu
          </div>
  
      </div>
    </header>
  );
}