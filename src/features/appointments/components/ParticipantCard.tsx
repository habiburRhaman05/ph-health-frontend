import { Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ParticipantCard = ({ appointment }: { appointment: any }) => {
  return (
    <Card className="lg:col-span-8 border-border bg-card shadow-sm overflow-hidden">
      <div className="bg-muted/30 border-b border-border px-6 py-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Consultation Connection</span>
      </div>
      <CardContent className="p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative max-w-2xl mx-auto">
          {/* Patient */}
          <ProfileSection 
            image={appointment.patient.profilePhoto} 
            role="Patient" 
            name={appointment.patient.name} 
            colorClass="text-primary"
          />

          {/* Connection UI */}
          <div className="flex md:flex-col items-center gap-2 flex-1 w-full md:w-auto">
            <div className="h-[1px] w-full bg-border md:w-[1px] md:h-10" />
            <div className="h-9 w-9 rounded-full bg-background border border-border flex items-center justify-center shadow-inner">
              <Video className="h-4 w-4 text-primary" />
            </div>
            <div className="h-[1px] w-full bg-border md:w-[1px] md:h-10" />
          </div>

          {/* Doctor */}
          <ProfileSection 
            image={appointment.doctor.profilePhoto} 
            role="Doctor" 
            name={appointment.doctor.name} 
            colorClass="text-emerald-500"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-border">
          <InfoItem label="Experience" value={`${appointment.doctor.experience} Years`} />
          <InfoItem label="Qualification" value={appointment.doctor.qualification} />
          <InfoItem label="Reg. No" value={appointment.doctor.registrationNumber} />
          <InfoItem label="Specialty" value={appointment.doctor.specialtys[0]?.specialty.title || "General"} />
        </div>
      </CardContent>
    </Card>
  );
};

const ProfileSection = ({ image, role, name, colorClass }: any) => (
  <div className="flex flex-col items-center text-center w-full md:w-40 space-y-3 z-10 shrink-0">
    <div className="h-20 w-20 rounded-2xl overflow-hidden border-2 border-border shadow-sm bg-muted">
      <img src={image} className="h-full w-full object-cover" alt={role} />
    </div>
    <div>
      <p className={`text-[10px] font-black uppercase ${colorClass}`}>{role}</p>
      <h3 className="text-sm font-bold truncate w-full">{name}</h3>
    </div>
  </div>
);

const InfoItem = ({ label, value }: { label: string, value: string }) => (
  <div className="flex flex-col gap-1 overflow-hidden">
    <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{label}</span>
    <span className="text-xs font-bold truncate leading-none">{value}</span>
  </div>
);

export default ParticipantCard;