'use client'

import React from 'react'

export function DoctorCardSkeleton() {
  return (
    <div className="h-full rounded-lg border border-border bg-card p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex gap-4">
          <div className="h-16 w-16 rounded-full bg-muted animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-3/4 bg-muted animate-pulse rounded" />
            <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-md bg-muted/50 p-2 space-y-1">
            <div className="h-3 w-16 bg-muted animate-pulse rounded" />
            <div className="h-4 w-12 bg-muted animate-pulse rounded" />
          </div>
          <div className="rounded-md bg-muted/50 p-2 space-y-1">
            <div className="h-3 w-12 bg-muted animate-pulse rounded" />
            <div className="h-4 w-12 bg-muted animate-pulse rounded" />
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-1">
          <div className="h-3 bg-muted animate-pulse rounded" />
          <div className="h-3 w-5/6 bg-muted animate-pulse rounded" />
        </div>

        {/* Details */}
        <div className="space-y-2">
          <div className="h-3 w-32 bg-muted animate-pulse rounded" />
          <div className="h-3 w-24 bg-muted animate-pulse rounded" />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <div className="flex-1 h-9 bg-muted animate-pulse rounded" />
          <div className="flex-1 h-9 bg-muted animate-pulse rounded" />
        </div>
      </div>
    </div>
  )
}

export function DoctorGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, idx) => (
        <DoctorCardSkeleton key={idx} />
      ))}
    </div>
  )
}

export function DoctorProfileSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-lg bg-card p-6 space-y-4">
        <div className="flex gap-4">
          <div className="h-32 w-32 rounded-lg bg-muted animate-pulse" />
          <div className="flex-1 space-y-3">
            <div className="h-8 w-3/4 bg-muted animate-pulse rounded" />
            <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
            <div className="flex gap-2">
              <div className="h-6 w-20 bg-muted animate-pulse rounded" />
              <div className="h-6 w-20 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="rounded-lg bg-card p-4 space-y-2">
            <div className="h-4 w-20 bg-muted animate-pulse rounded" />
            <div className="h-6 w-16 bg-muted animate-pulse rounded" />
          </div>
        ))}
      </div>

      {/* Reviews */}
      <div className="rounded-lg bg-card p-6 space-y-4">
        <div className="h-6 w-32 bg-muted animate-pulse rounded" />
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              <div className="h-4 w-16 bg-muted animate-pulse rounded" />
            </div>
            <div className="h-3 w-1/2 bg-muted animate-pulse rounded" />
            <div className="space-y-1">
              <div className="h-3 bg-muted animate-pulse rounded" />
              <div className="h-3 w-5/6 bg-muted animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
