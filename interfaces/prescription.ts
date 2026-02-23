import { IAppointment } from "./appointment";
import { IDoctor } from "./doctor";
import { IPatient } from "./patient";

export interface IPrescription {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  instructions: string;
  followUpDate: Date;
  createdAt: Date;
  updatedAt: Date;
  // Optional Relations
  appointment?: IAppointment;
  patient?: IPatient;
  doctor?: IDoctor;
}