import { SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarContent, SidebarFooter } from "@/components/ui/sidebar"

export function SidebarSkeleton() {
  return (
    <div className="flex flex-col w-full h-full">
      <SidebarContent>
        <SidebarGroup>
          {/* Label Skeleton */}
          <div className="px-6 mb-4 mt-2">
            <div className="h-2 w-20 bg-muted animate-pulse rounded" />
          </div>
          
          <SidebarMenu className="px-3 gap-1">
            {[...Array(5)].map((_, i) => (
              <SidebarMenuItem key={i}>
                <div className="flex items-center gap-3 h-11 w-full px-4">
                  {/* Icon Skeleton */}
                  <div className="h-4 w-4 rounded bg-muted animate-pulse" />
                  {/* Text Skeleton */}
                  <div className="h-4 w-24 rounded bg-muted animate-pulse" />
                </div>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3">
          {/* Avatar Skeleton */}
          <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
          <div className="flex flex-col gap-2">
            {/* Name Skeleton */}
            <div className="h-3 w-20 rounded bg-muted animate-pulse" />
            {/* Role Skeleton */}
            <div className="h-2 w-12 rounded bg-muted animate-pulse" />
          </div>
        </div>
      </SidebarFooter>
    </div>
  )
}