"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { id: 1, name: "Find Tutors", path: "/tutors" },
  { id: 2, name: "Become a Tutor", path: "/sign-up" },
  { id: 3, name: "About Us", path: "/about-us" },
];

export default function Header() {
  const currentPath = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);




 
    
    const isSideTrgiggerShow =   currentPath.includes("/dashboard") || currentPath.includes("/tutor/dashboard") || currentPath.includes("/admin")
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/70 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-950/70">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        
          {isSideTrgiggerShow && (
            <SidebarTrigger className="h-9 w-9 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900" />
          )}
          
       

      </div>
    </header>
  );
}