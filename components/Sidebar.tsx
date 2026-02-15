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

interface AppSidebarProps {
  userRole: keyof typeof SIDEBAR_LINKS
  userName: string
}

export function AppSidebar({ userRole, userName }: AppSidebarProps) {
  const pathname = usePathname()
  const links = SIDEBAR_LINKS[userRole]

  return (
    <Sidebar 
          collapsible="offcanvas"
      className="top-16 hidden h-[calc(100vh-64px)] border-r border-border lg:block"

    >
    
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
            Navigation
          </SidebarGroupLabel>
          <SidebarMenu className="px-3 gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={link.title}
                    isActive={isActive}
                    className={`h-11 rounded-xl px-4 transition-all duration-200 ${
                      isActive 
                      ? "bg-primary/10 text-primary font-bold shadow-sm" 
                      : "hover:bg-muted/80 text-muted-foreground"
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
        <div className="flex items-center justify-between group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-4">
           <div className="flex items-center gap-3 group-data-[collapsible=icon]:hidden">
              <div className="h-8 w-8 rounded-full bg-muted border border-border flex items-center justify-center text-xs font-bold">
                {userName.charAt(0)}
              </div>
              <div className="flex flex-col">
                <p className="text-xs font-bold truncate max-w-[100px]">{userName}</p>
                <p className="text-[10px] text-primary font-bold uppercase">{userRole.replace('_', ' ')}</p>
              </div>
           </div>
           <LogoutButton />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}