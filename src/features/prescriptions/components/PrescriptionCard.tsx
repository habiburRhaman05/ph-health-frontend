// src/components/prescriptions/PrescriptionCard.tsx
import React from 'react';
import { Calendar, User, FileText, ExternalLink, Clock } from 'lucide-react';

interface PrescriptionProps {
  data: any;
}

export const PrescriptionCard = ({ data }: PrescriptionProps) => {
  return (
    <div className="group relative bg-card text-card-foreground border rounded-lg p-5 transition-all hover:shadow-md hover:border-primary/50">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        {/* Doctor Info Section */}
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary/20 bg-muted">
            <img 
              src={data.doctor.profilePhoto} 
              alt={data.doctor.name} 
              className="h-full w-full object-cover" 
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
              {data.doctor.name}
            </h3>
            <p className="text-sm text-muted-foreground">{data.doctor.qualification}</p>
          </div>
        </div>

        {/* Date / Status Tag */}
        <div className="flex flex-col md:items-end gap-1">
          <div className="flex items-center text-xs font-medium text-muted-foreground">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(data.createdAt).toLocaleDateString()}
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {data.appointment.status}
          </span>
        </div>
      </div>

      <hr className="my-4 border-dashed" />

      {/* Instructions Preview */}
      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <FileText className="w-4 h-4 mt-1 text-muted-foreground shrink-0" />
          <p className="text-sm line-clamp-2 text-foreground/80 italic">
            "{data.instructions.split('\n')[0]}..."
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
          <Clock className="w-4 h-4" />
          <span className="font-medium">Follow-up: {new Date(data.followUpDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <a 
          href={data.prescriptionPdfUrl} 
          target="_blank" 
          className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium text-sm transition-opacity hover:opacity-90"
        >
          View PDF <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};