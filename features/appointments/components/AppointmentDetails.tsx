"use client";

import React, { useEffect, useState } from "react";
import { useApiQuery } from "@/hooks/useApiQuery";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, Video, ArrowLeft, ShieldCheck, 
  Receipt, Calendar, CheckCircle2, 
  Download, Timer, MapPin, XCircle, AlertCircle
} from "lucide-react";
import Link from "next/link";

const AppointmentDetails = ({ id }: { id: string }) => {
  const { data: appointmentData, isLoading, isError } = useApiQuery<any>(
    [`appointment-details-${id}`],
    `/appointments/${id}`,
    "fetch",
    { staleTime: 2000 }
  );

  const appointment = appointmentData?.data;
  
  // Check if appointment is completed
  const isCompleted = appointment?.status === "COMPLETED";

  // States
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0, isLive: false });
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [wantsRefund, setWantsRefund] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    if (!appointment?.schedule?.startDate) return;
    const start = new Date(appointment.schedule.startDate).getTime();

    const interval = setInterval(() => {
      const diff = start - Date.now();
      if (diff <= 0) {
        setCountdown(prev => ({ ...prev, isLive: true }));
        clearInterval(interval);
      } else {
        setCountdown({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / (1000 * 60)) % 60),
          s: Math.floor((diff / 1000) % 60),
          isLive: false
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [appointment?.schedule?.startDate]);

  const handleConfirmCancellation = () => {
    if (wantsRefund && cancelReason.trim().length < 10) {
      alert("Please provide a valid reason (minimum 10 characters) for the refund.");
      return;
    }
    
    console.log("Cancelling appointment:", { id, wantsRefund, cancelReason });
    setIsCancelModalOpen(false);
    alert("Appointment cancellation request submitted.");
  };

  if (isLoading) return <AppointmentLoadingSkeleton />;
  if (isError || !appointment) return <ErrorState />;

  const isPaid = appointment.paymentStatus === "COMPLETE";

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        {/* --- HEADER --- */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/appointments">
              <Button variant="outline" size="sm" className="rounded-full shadow-sm">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            </Link>
            <div className="h-8 w-[1px] bg-border hidden sm:block" />
            <div>
              <h1 className="text-lg font-bold tracking-tight">Appointment Details</h1>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Ref: {appointment.id.slice(0, 8)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <Badge variant="secondary" className="bg-primary/10 text-primary border-none px-3 py-1 font-bold">
                {appointment.status}
             </Badge>
             {isPaid && (
               <Badge className="bg-emerald-500/10 text-emerald-500 border-none px-3 py-1 font-bold">
                 <CheckCircle2 className="mr-1 h-3 w-3" /> Paid
               </Badge>
             )}
          </div>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 1. PARTICIPANTS */}
          <Card className="lg:col-span-8 border-border bg-card shadow-sm overflow-hidden">
            <div className="bg-muted/30 border-b border-border px-6 py-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Consultation Connection</span>
            </div>
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative max-w-2xl mx-auto">
                
                {/* Patient Profile */}
                <div className="flex flex-col items-center text-center w-full md:w-40 space-y-3 z-10 shrink-0">
                  <div className="h-20 w-20 rounded-2xl overflow-hidden border-2 border-border shadow-sm bg-muted">
                    <img src={appointment.patient.profilePhoto} className="h-full w-full object-cover" alt="Patient" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-primary uppercase">Patient</p>
                    <h3 className="text-sm font-bold truncate w-full">{appointment.patient.name}</h3>
                  </div>
                </div>

                {/* Animated Bridge Line */}
                <div className="flex md:flex-col items-center gap-2 flex-1 w-full md:w-auto">
                   <div className="h-[1px] w-full bg-border md:w-[1px] md:h-10" />
                   <div className="h-9 w-9 rounded-full bg-background border border-border flex items-center justify-center shadow-inner">
                      <Video className="h-4 w-4 text-primary" />
                   </div>
                   <div className="h-[1px] w-full bg-border md:w-[1px] md:h-10" />
                </div>

                {/* Doctor Profile */}
                <div className="flex flex-col items-center text-center w-full md:w-40 space-y-3 z-10 shrink-0">
                  <div className="h-20 w-20 rounded-2xl overflow-hidden border-2 border-border shadow-sm bg-muted">
                    <img src={appointment.doctor.profilePhoto} className="h-full w-full object-cover" alt="Doctor" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-emerald-500 uppercase">Doctor</p>
                    <h3 className="text-sm font-bold truncate w-full">{appointment.doctor.name}</h3>
                  </div>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-border">
                <InfoItem label="Experience" value={`${appointment.doctor.experience} Years`} />
                <InfoItem label="Qualification" value={appointment.doctor.qualification} />
                <InfoItem label="Reg. No" value={appointment.doctor.registrationNumber} />
                <InfoItem label="Specialty" value={appointment.doctor.specialtys[0]?.specialty.title || "General"} />
              </div>
            </CardContent>
          </Card>

          {/* 2. SIDEBAR */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="bg-slate-900 dark:bg-card border-none text-white shadow-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4 opacity-70">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Session Starts In</span>
                  <Timer className="h-4 w-4" />
                </div>

                {!isCompleted ? (
                  !countdown.isLive ? (
                    <div className="flex justify-between items-center bg-white/10 dark:bg-primary/10 rounded-xl p-4 border border-white/5 tabular-nums">
                      <CompactTime val={countdown.d} unit="D" />
                      <CompactTime val={countdown.h} unit="H" />
                      <CompactTime val={countdown.m} unit="M" />
                      <CompactTime val={countdown.s} unit="S" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 py-2 text-emerald-400">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-sm font-black uppercase italic">Room Is Now Live</span>
                    </div>
                  )
                ) : (
                  <div className="text-center py-2 text-emerald-400 font-bold uppercase">
                    Appointment Completed
                  </div>
                )}

                <div className="mt-6 space-y-3">
                   <div className="flex items-center gap-3 text-xs opacity-80">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{new Date(appointment.schedule.startDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric'})}</span>
                   </div>
                   <div className="flex items-center gap-3 text-xs opacity-80">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{appointment.schedule.startTime} - {appointment.schedule.endTime}</span>
                   </div>
                </div>
              </CardContent>
            </Card>

            {/* ACTION BUTTONS */}
            <div className="space-y-3">
              {isCompleted ? (
                <Button 
                  disabled
                  className="w-full h-12 rounded-2xl font-bold shadow-lg shadow-gray-400/20 uppercase text-[11px] tracking-widest bg-gray-300 text-gray-700 cursor-not-allowed"
                >
                  Consultation Completed
                </Button>
              ) : (
                <>
                  <Button 
                    disabled={!countdown.isLive} 
                    className="w-full h-12 rounded-2xl font-bold shadow-lg shadow-primary/20 uppercase text-[11px] tracking-widest"
                  >
                    <Video className="mr-2 h-4 w-4" /> Start Consultation
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" asChild className="h-11 rounded-xl text-xs font-semibold border-border">
                      <Link href={appointment.payment.invoiceUrl} download={appointment.payment.invoiceUrl}>
                        <Download className="mr-2 h-3.5 w-3.5" /> Invoice
                      </Link>
                    </Button>
                    <Button 
                      onClick={() => setIsCancelModalOpen(true)}
                      variant="destructive" 
                      className="h-11 rounded-xl text-xs font-semibold text-white border-destructive/20 hover:bg-destructive/80"
                    >
                      <XCircle className="mr-2 h-3.5 w-3.5" /> Cancel Appointment
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* --- CANCELLATION MODAL --- */}
      <AnimatePresence>
        {isCancelModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCancelModalOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-card border border-border rounded-[2rem] shadow-2xl p-6 md:p-8 overflow-hidden"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-14 w-14 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                  <AlertCircle size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Cancel Appointment?</h2>
                  <p className="text-sm text-muted-foreground px-4 mt-1">Please confirm if you would like to proceed with the cancellation.</p>
                </div>
              </div>

              <div className="mt-8 space-y-5">
                <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-muted/30">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold">Request Money Back</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-medium">Original payment method</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={wantsRefund} 
                    onChange={(e) => setWantsRefund(e.target.checked)}
                    className="h-5 w-5 rounded-md border-border text-primary focus:ring-primary accent-primary cursor-pointer"
                  />
                </div>

                <AnimatePresence>
                  {wantsRefund && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase ml-1 mb-1.5 block">Validation Reason</label>
                      <textarea 
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                        placeholder="Please describe why you need a refund (min. 10 chars)..."
                        className="w-full p-4 rounded-2xl bg-muted/50 border border-border text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all min-h-[100px]"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex gap-3 mt-8">
                <Button variant="ghost" onClick={() => setIsCancelModalOpen(false)} className="flex-1 h-12 rounded-xl font-bold">Close</Button>
                <Button 
                  onClick={handleConfirmCancellation}
                  className="flex-1 h-12 rounded-xl font-bold bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Confirm
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* --- MINI COMPONENTS --- */
const InfoItem = ({ label, value }: { label: string, value: string }) => (
  <div className="flex flex-col gap-1 overflow-hidden">
    <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{label}</span>
    <span className="text-xs font-bold truncate leading-none">{value}</span>
  </div>
);

const CompactTime = ({ val, unit }: { val: number, unit: string }) => (
  <div className="text-center px-2">
    <p className="text-xl font-black leading-none">{val.toString().padStart(2, '0')}</p>
    <p className="text-[8px] font-bold opacity-50 mt-1 uppercase">{unit}</p>
  </div>
);

function AppointmentLoadingSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-6">
      <Skeleton className="h-14 w-1/3 rounded-xl" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Skeleton className="lg:col-span-8 h-80 rounded-2xl" />
        <Skeleton className="lg:col-span-4 h-80 rounded-2xl" />
      </div>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <XCircle size={48} className="text-destructive mb-4" />
      <h2 className="text-lg font-bold">Appointment Details Unavailable</h2>
      <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>Try Again</Button>
    </div>
  );
}

export default AppointmentDetails;