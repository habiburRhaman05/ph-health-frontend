import { IDoctor } from "./doctor";
import { IPatient } from "./patient";

export interface IUser {
  id: string;
  name: string;
  email: string;
  image: string;
  role: 'DOCTOR' | 'PATIENT' | 'ADMIN' | 'SUPER_ADMIN';
  status: 'ACTIVE' | 'BANNED' | 'DELETED';
  needPasswordChange: boolean;
  emailVerified: boolean;
  isDeleted: boolean;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  // Optional Relations
  doctor?: IDoctor;
  patient?: IPatient;
  admin?: IAdmin;
  sessions?: any[];
  accounts?: any[];
}

export interface IAdmin {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string | null;
  contactNumber?: string | null;
  isDeleted: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  // Optional Relation
  user?: IUser;
}