import { IAppointment } from "./appointment";
import { IPrescription } from "./prescription";
import { IReview } from "./review";
import { IUser } from "./user";

export interface IPatient {
  id: string;
  userId: string;
  name: string;
  email: string;
  contactNumber?: string | null;
  profilePhoto?: string | null;
  address?: string | null;
  isDeleted: boolean;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  // Optional Relations
  user?: IUser;
  healthData?: IPatientHealthData;
  medicalReports?: IMedicalReport[];
  appointments?: IAppointment[];
  prescriptions?: IPrescription[];
  reviews?: IReview[];
}

export interface IPatientHealthData {
  id: string;
  patientId: string;
  dateOfBirth: Date;
  gender: 'MALE' | 'FEMALE';
  bloodGroup: 'A_POSITIVE' | 'A_NEGATIVE' | 'B_POSITIVE' | 'B_NEGATIVE' | 'AB_POSITIVE' | 'AB_NEGATIVE' | 'O_POSITIVE' | 'O_NEGATIVE';
  hasAllergies: boolean;
  hasDiabetes: boolean;
  height?: number | null; 
  weight?: number | null; 
  smokingStatus: boolean;
  dietaryPreference?: string | null;
  pregnancyStatus: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Optional Relation
  patient?: IPatient;
}

export interface IMedicalReport {
  id: string;
  patientId: string;
  reportName: string;
  reportLink: string;
  createdAt: Date;
  updatedAt: Date;
  // Optional Relation
  patient?: IPatient;
}