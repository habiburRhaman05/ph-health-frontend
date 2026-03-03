export const API_ENDPOINTS = {
  // Auth
  AUTH_SIGNUP: '/auth/signup',
  AUTH_LOGIN: '/auth/login',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_REFRESH: '/auth/refresh',

  // Doctors
  DOCTORS_LIST: '/doctors',
  DOCTORS_DETAIL: (id: string) => `/doctors/${id}`,
  DOCTORS_AVAILABILITY: (id: string) => `/doctors/${id}/availability`,

  // Appointments
  APPOINTMENTS_CREATE: '/appointments',
  APPOINTMENTS_LIST: '/appointments',
  APPOINTMENTS_DETAIL: (id: string) => `/appointments/${id}`,
  APPOINTMENTS_CANCEL: (id: string) => `/appointments/${id}/cancel`,

  // User
  USER_PROFILE: '/user/profile',
  USER_UPDATE: '/user/profile',
}

export const SPECIALTIES = [
  'Cardiology',
  'Dermatology',
  'ENT',
  'Gastroenterology',
  'General Practice',
  'Neurology',
  'Oncology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry',
  'Pulmonology',
  'Urology',
  'Ophthalmology',
  'Dentistry',
]

export const GENDERS = ['Male', 'Female', 'Other']

export const CONSULTATION_FEES = {
  MIN: 500,
  MAX: 5000,
  STEP: 100,
}

export const TIME_SLOTS = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
]
