"use client"

import Link from "next/link"
import { ShieldAlert, ArrowLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-background p-4 text-center">
      {/* Icon with subtle pulse effect */}
      <div className="relative mb-6">
        <div className="absolute inset-0 animate-ping rounded-full bg-destructive/10" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <ShieldAlert size={40} />
        </div>
      </div>

      {/* Text Content */}
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Access Denied
      </h1>
      <p className="mb-8 max-w-[450px] text-muted-foreground">
        Oops! You don't have the required permissions to view this page. 
        If you believe this is an error, please contact your administrator.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button 
          variant="outline" 
          onClick={() => window.history.back()}
          className="gap-2"
        >
          <ArrowLeft size={16} />
          Go Back
        </Button>
        
        <Button asChild className="gap-2">
          <Link href="/dashboard">
            <Home size={16} />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      {/* Decorative background element */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] left-[50%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>
    </div>
  )
}