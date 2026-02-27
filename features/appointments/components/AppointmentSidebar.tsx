import { useEffect, useState } from "react";
import { Timer, Calendar, Clock, Video, Download, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { AppointmentStatus } from "@/interfaces/enum";

const AppointmentSidebar = ({ appointment, onCancelClick }: any) => {
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0, isLive: false });
  const isCompleted = appointment?.status === AppointmentStatus.COMPLETED;
  const isCancelled = appointment?.status === AppointmentStatus.CANCELLED;
  const isPending = appointment?.status === AppointmentStatus.PENDING;

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

  return (
    <div className="lg:col-span-4 space-y-6">
      <Card className="bg-slate-900 dark:bg-card border-none text-white shadow-xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4 opacity-70">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Session Starts In</span>
            <Timer className="h-4 w-4" />
          </div>

          {!isCompleted && !isCancelled? (
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
          ) : isCancelled ? <div className="text-red-600">Your Appointment is Already Cancelled</div> : isPending ? <div className="text-blue-500">Your Appointment is Watting For Doctor Approval</div> : <div className="text-center py-2 text-emerald-400 font-bold ">Appointment Completed</div>}

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

      <div className="space-y-3">
        {isCompleted || isCancelled ? (
          <Button disabled className="w-full h-12 rounded-2xl font-bold bg-gray-300 text-gray-700 cursor-not-allowed uppercase text-[11px]">
            Consultation Completed
          </Button>
        ) : (
          <>
            <Button disabled={!countdown.isLive} className="w-full h-12 rounded-2xl font-bold uppercase text-[11px] tracking-widest">
              <Video className="mr-2 h-4 w-4" /> Start Consultation
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" asChild className="h-11 rounded-xl text-xs font-semibold">
                <Link href={appointment.payment.invoiceUrl}>
                  <Download className="mr-2 h-3.5 w-3.5" /> Invoice
                </Link>
              </Button>
             {isCancelled &&  <Button onClick={onCancelClick} variant="destructive" className="h-11 rounded-xl text-xs font-semibold">
                <XCircle className="mr-2 h-3.5 w-3.5" /> Cancel
              </Button>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CompactTime = ({ val, unit }: { val: number, unit: string }) => (
  <div className="text-center px-2">
    <p className="text-xl font-black">{val.toString().padStart(2, '0')}</p>
    <p className="text-[8px] font-bold opacity-50 uppercase">{unit}</p>
  </div>
);

export default AppointmentSidebar;