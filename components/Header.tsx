"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import UserProfile from "@/features/auth/components/UserProfilePopup";
import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils"; // Assuming you have a shadcn utility
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const currentPath = usePathname();
    const { theme, setTheme } = useTheme()
  
  const { user, isLoading } = useUser();
console.log(user);

  // Logic for showing sidebar trigger
  const isSideTriggerShow =
    currentPath.includes("/dashboard") ||
    currentPath.includes("/tutor/dashboard") ||
    currentPath.includes("/admin");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/80 backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-950/80">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Left Section: Trigger & Logo */}
        <div className="flex items-center gap-4">
          {isSideTriggerShow && (
            <SidebarTrigger className="h-9 w-9 text-zinc-600 transition-all hover:bg-zinc-100 active:scale-95 dark:text-zinc-400 dark:hover:bg-zinc-900" />
          )}
          
          <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-90">
            {/* Modern Text-Based Logo */}
            <div className="flex items-center font-bold tracking-tighter text-xl">
              <span className="text-zinc-900 dark:text-white">H&H</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-md bg-blue-600 text-white text-[10px] uppercase tracking-widest self-center mb-1">
                Medical
              </span>
            </div>
          </Link>
        </div>

        
        {/* Right Section: Profile & Actions */}
        <div className="flex items-center gap-3">
        <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-9 w-9 rounded-full border border-border/50 bg-background/50 transition-all hover:bg-accent"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-slate-700" />}
            </Button>

       {user && <UserProfile user={user}/>}
        
        </div>

      </div>
    </header>
  );
}