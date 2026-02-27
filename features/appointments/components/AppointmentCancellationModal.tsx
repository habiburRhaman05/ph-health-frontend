import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/useApiMutation";
import { toast } from "sonner";
import { AppointmentStatus } from "@/interfaces/enum";

const CancellationModal = ({ isOpen, onClose, appointmentId,appointmentStatus }: any) => {
  const [wantsRefund, setWantsRefund] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const cancelMutation = useApiMutation({
    method:"PATCH",
    endpoint:`/appointments/${appointmentId}/cancel`
  })

  const handleConfirm = async() => {
    if (wantsRefund && cancelReason.trim().length < 10) {
      alert("Please provide a valid reason (minimum 10 characters).");
      return;
    }
    console.log("Cancelling:", { appointmentId, wantsRefund, cancelReason });
   const result = await cancelMutation.mutateAsync({ wantsRefund, cancelReason});
   if(result.success){
    toast.success(result.message)
    onClose();
   }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-md bg-card border border-border rounded-[2rem] shadow-2xl p-6 md:p-8"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-14 w-14 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                <AlertCircle size={28} />
              </div>
              <h2 className="text-xl font-bold">Cancel Appointment?</h2>
            </div>

           {appointmentStatus === AppointmentStatus.SCHEDULED && <div className="mt-8 space-y-5">
              <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-muted/30">
                <p className="text-xs font-bold">Request Money Back</p>
                <input 
                  type="checkbox" 
                  checked={wantsRefund} 
                  onChange={(e) => setWantsRefund(e.target.checked)}
                  className="h-5 w-5 accent-primary cursor-pointer"
                />
              </div>

              {wantsRefund && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }}>
                  <textarea 
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder="Why do you need a refund? (min. 10 chars)..."
                    className="w-full p-4 rounded-2xl bg-muted/50 border border-border text-sm outline-none min-h-[100px]"
                  />
                </motion.div>
              )}
            </div>}

            <div className="flex gap-3 mt-8">
              <Button variant="ghost" onClick={onClose} className="flex-1">Close</Button>
              <Button
              disabled={cancelMutation.isPending}
              onClick={handleConfirm} className="flex-1 bg-destructive text-white hover:bg-destructive/90">Confirm{
cancelMutation.isPending && <Loader2 className="animate-spin ml-3"/>
 

              }</Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CancellationModal;