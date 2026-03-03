import { IDoctor } from "./doctor";
import { IPatient } from "./patient";
import { IPayment } from "./payment";
import { ISchedule } from "./schedule";

export type AppointmentResponse = {
  success: boolean;
  data: any; 
};

export interface IAppointment {
  id: string;
  videoCallingId: string;
  status: 'PENDING' | 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  paymentStatus: 'PENDING' | 'COMPLETE';
  patientId: string;
  doctorId: string;
  scheduleId: string;
  createdAt: Date;
  updatedAt: Date;
  // Optional Relations
  patient?: IPatient;
  doctor?: IDoctor;
  schedule?: ISchedule;
  payment?: IPayment;
}