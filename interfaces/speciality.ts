import { IDoctorSpecialty } from "./doctor";

export interface ISpecialty {
  id: string;
  title: string;
  description?: string | null;
  icon?: string | null;
  isDeleted: boolean;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  // Optional Relations
  doctorSpecialties?: IDoctorSpecialty[];
}