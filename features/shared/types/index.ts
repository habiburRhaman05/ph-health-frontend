export type UserRole = 'patient' | 'doctor' | 'admin'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  avatar?: string
  createdAt: string
  updatedAt: string
}



export interface DoctorReview {
  id: string
  doctorId: string
  patientName: string
  patientImage?: string
  rating: number
  title: string
  comment: string
  date: string
}

export interface AppointmentFormData {
  appointmentType: 'online' | 'local'
  selectedDate: string
  selectedTime: string
  place?: string
  videoCallId?: string
  notes?: string
}

export interface Patient extends User {
  role: 'patient'
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
  phone?: string
  address?: string
  medicalHistory?: string
}

export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  dateTime: string
  duration: number // in minutes
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
  notes?: string
  prescription?: string
  createdAt: string
  updatedAt: string
}

export interface DoctorFilter {
  specialty?: string
  gender?: string
  minRating?: number
  minFee?: number
  maxFee?: number
  verified?: boolean
  search?: string
  page?: number
  limit?: number
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
  meta?: {
    page?: number;
    limit?: number;
    total: number;
    totalPage: number;
  };
}
