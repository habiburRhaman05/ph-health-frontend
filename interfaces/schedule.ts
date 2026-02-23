import { IAppointment } from "./appointment";
import { IDoctorSchedule } from "./doctor";

export interface ISchedule {
  id: string;
  startDate: string;
  endDate: Date;
  startTime: string; // Stored as "09:00" etc.
  endTime: string;
  isBooked?: true;

  createdAt: Date;
  updatedAt: Date;
  // Optional Relations
  appointments?: IAppointment[];
  doctorSchedules?: IDoctorSchedule[];
}