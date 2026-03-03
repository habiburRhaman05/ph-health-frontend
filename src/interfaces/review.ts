import { IAppointment } from "./appointment";
import { IDoctor } from "./doctor";
import { IPatient } from "./patient";

export interface IReview {
  id: string;
  appointmentId: string;
  doctorId: string;
  patientId: string;
  rating: number; // DOUBLE PRECISION (0.0 to 5.0)
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  // Optional Relations
  appointment?: IAppointment;
  patient?: IPatient;
  doctor?: IDoctor;
}