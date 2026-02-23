import { IAppointment } from "./appointment";
import { Gender } from "./enum";
import { IPrescription } from "./prescription";
import { IReview } from "./review";
import { ISchedule } from "./schedule";
import { ISpecialty } from "./speciality";
import { IUser } from "./user";

export interface IDoctor {
  id: string;
  userId: string;
  name: string;
  email: string;
  profilePhoto?: string | null;
  address?: string | null;
  registrationNumber: string;
  contactNumber?: string | null;
  experience: number;
  averageRating: number;
  gender: Gender;
  appointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  isDeleted: boolean;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
   reviews?: IReview[];
   schedule?: ISchedule[];
  specialtys?: {
    doctorId:string;
    specialty:ISpecialty
  }[]
  user:{
    emailVerified:boolean
  }
}



/**
 * Extended interface for use with Prisma / TypeORM 
 * includes relations defined in the schema
 */
// export interface IDoctorExtended extends IDoctor {
//   user?: IUser;
//   appointments?: IAppointment[];
//   prescriptions?: IPrescription[];
//   reviews?: IReview[];
//   doctorSpecialties?: IDoctorSpecialty[];
//   doctorSchedules?: IDoctorSchedule[];
// }

export interface IDoctorSchedule {
  doctorId: string;
  scheduleId: string;
  isBooked: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Optional Relations
  doctor?: IDoctor;
  schedule?: ISchedule;
}


export interface IDoctorSpecialty {
  id: string;
  doctorId: string;
  specialtyId: string;
  // Optional Relations
  doctor?: IDoctor;
  specialty?: ISpecialty;
}