
import { useState, useEffect } from 'react';

export const useGetAppointment = (id: string) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData({
        success: true,
        data: {
          id: "019c6c43-6136-7363-b4a8-f5b05a198af6",
          status: "SCHEDULED",
          paymentStatus: "PENDING",
          patient: { name: "Habibur Rhaman", email: "thisishabib2005@gmail.com" },
          doctor: {
            name: "Dr. Marcus Thorne",
            designation: "Orthopedic Surgeon",
            qualification: "MD, Orthopedic Surgery",
            experience: 18,
            contactNumber: "+1-555-0987",
            registrationNumber: "REG-22109",
            appointmentFee: 220,
            specialtys: [
              { specialty: { title: "Neurology" } },
              { specialty: { title: "Cardiology" } }
            ]
          },
          schedule: {
            startDate: "2026-03-20T00:00:00.000Z",
            startTime: "09:00 AM",
            endTime: "10:00 AM"
          }
        }
      });
      setIsLoading(false);
    }, 2000); // 2 second delay for skeleton demo
    return () => clearTimeout(timer);
  }, [id]);

  return { data, isLoading };
};