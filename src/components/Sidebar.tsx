"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { SIDEBAR_LINKS } from "@/constants/navigation"
import LogoutButton from "@/features/auth/components/LogoutButton"
import { Activity } from "lucide-react"
import { useUser } from "@/context/UserContext"
import { UserRole } from "@/interfaces/enum"
import { SidebarSkeleton } from "./SidebarSkelection"

interface AppSidebarProps {
  userRole: keyof typeof SIDEBAR_LINKS
  userName: string
}

export function AppSidebar() {
  const pathname = usePathname()
  const { user, isLoading } = useUser();
  
  // Guard against undefined user while loading
  const userRole = user?.role as "ADMIN" | "DOCTOR" | "PATIENT" | "SUPER_ADMIN"
  const links = userRole ? SIDEBAR_LINKS[userRole] : []

  return (
    <Sidebar 
      collapsible="offcanvas"
      className="top-16 hidden h-[calc(100vh-64px)] border-r border-border bg-sidebar lg:block"
    >
      {isLoading ? (
        <SidebarSkeleton />
      ) : (
        <>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="px-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
                Navigation
              </SidebarGroupLabel>
              <SidebarMenu className="px-3 gap-1">
                {links.map((link:any) => {
                  const isActive = pathname === link.href
                  return (
                    <SidebarMenuItem key={link.href}>
                      <SidebarMenuButton 
                        asChild 
                        tooltip={link.title}
                        isActive={isActive}
                        className={`h-11 rounded-lg px-4 transition-all duration-200 ${
                          isActive 
                          ? "bg-primary/10 text-primary font-semibold" 
                          : "hover:bg-accent text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Link href={link.href} className="flex items-center gap-3">
                          <link.icon className={`h-4 w-4 ${isActive ? "text-primary" : ""}`} />
                          <span className="text-sm">{link.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-border/50">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted border border-border flex items-center justify-center text-xs font-bold">
                    {user?.name?.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs font-bold truncate max-w-[100px]">{user?.name}</p>
                    <p className="text-[10px] text-primary font-bold uppercase">
                        {userRole?.replace('_', ' ')}
                    </p>
                  </div>
               </div>
               <LogoutButton />
            </div>
          </SidebarFooter>
        </>
      )}
    </Sidebar>
  )
}