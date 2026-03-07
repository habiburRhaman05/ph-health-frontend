// src/app/my-prescriptions/page.tsx
"use client"
import { PrescriptionCard } from '@/features/prescriptions/components/PrescriptionCard';
import { PrescriptionSkeleton } from '@/features/prescriptions/components/PrescriptionSkeleton';
import React, { useState, useEffect } from 'react';

// Your API Output Mocked
const DUMMY_DATA = [
  {
    "id": "019cc398-07c4-701a-b0c1-8c227eac41b0",
    "followUpDate": "2026-03-01T10:00:00.000Z",
    "instructions": "1. Tab. Napa Extend (665mg) - 1 tablet after breakfast and dinner for 5 days.\n2. Syr. Adryl - 2 teaspoons three times daily for 3 days.\n3. Complete rest for 48 hours.",
    "createdAt": "2026-03-06T14:40:46.231Z",
    "prescriptionPdfUrl": "https://res.cloudinary.com/...",
    "doctor": {
      "name": "Dr. Marcus Thorne",
      "profilePhoto": "https://avatars.githubusercontent.com/u/112610735?v=4",
      "qualification": "MD, Orthopedic Surgery",
    },
    "appointment": { "status": "SCHEDULED" }
  },
  // Add more copies here to see the grid in action
];

export default function MyPrescriptionsPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-background p-6 md:p-10 transition-colors">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">My Prescriptions</h1>
          <p className="text-muted-foreground mt-2">Manage and view all your medical records and doctor instructions.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Show 3 skeletons during loading
            Array.from({ length: 3 }).map((_, i) => <PrescriptionSkeleton key={i} />)
          ) : (
            DUMMY_DATA.map((prescription) => (
              <PrescriptionCard key={prescription.id} data={prescription} />
            ))
          )}
        </div>

        {!isLoading && DUMMY_DATA.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed rounded-xl">
            <p className="text-muted-foreground">No prescriptions found.</p>
          </div>
        )}
      </div>
    </main>
  );
}