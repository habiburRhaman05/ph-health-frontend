"use client";

import React, { useState } from "react";
import { useApiQuery } from "@/hooks/useApiQuery";
import { motion } from "framer-motion";


import ParticipantCard from "./ParticipantCard";
import AppointmentSidebar from "./AppointmentSidebar";
import AppointmentDeatilsHeader from "./AppointmentDeatilsHeader";
import { AppointmentLoadingSkeleton, ErrorState } from "./ApppointmentDetailsSkelection";
import CancellationModal from "./AppointmentCancellationModal";

const AppointmentDetails = ({ id }: { id: string }) => {
  const { data: appointmentData, isLoading, isError } = useApiQuery<any>(
    [`appointment-details-${id}`],
    `/appointments/${id}`,
    "fetch",
    { staleTime: 2000 }
  );

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const appointment = appointmentData?.data;

  if (isLoading) return <AppointmentLoadingSkeleton />;
  if (isError || !appointment) return <ErrorState />;

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        {appointment.payment.status !== "COMPLETE" && <p className="text-center font-bold text-red-700 text-lg ">Please Pay-Now First</p>}
        <AppointmentDeatilsHeader appointment={appointment} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <ParticipantCard appointment={appointment} />
          
          <AppointmentSidebar 
            appointment={appointment} 
            onCancelClick={() => setIsCancelModalOpen(true)} 
          />
        </div>
      </motion.div>

      <CancellationModal 
        isOpen={isCancelModalOpen} 
        onClose={() => setIsCancelModalOpen(false)} 
        appointmentId={id}
      />
    </div>
  );
};

export default AppointmentDetails;