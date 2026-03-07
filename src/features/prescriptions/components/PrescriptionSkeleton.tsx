// src/components/prescriptions/PrescriptionSkeleton.tsx
export const PrescriptionSkeleton = () => {
  return (
    <div className="bg-card border rounded-lg p-5 animate-pulse">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-muted"></div>
          <div className="space-y-2">
            <div className="h-4 w-32 bg-muted rounded"></div>
            <div className="h-3 w-20 bg-muted rounded"></div>
          </div>
        </div>
        <div className="h-4 w-16 bg-muted rounded"></div>
      </div>
      <div className="h-16 w-full bg-muted/50 rounded mb-4"></div>
      <div className="h-10 w-full bg-muted rounded"></div>
    </div>
  );
};