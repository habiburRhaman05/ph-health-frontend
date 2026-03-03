import { z } from 'zod'

export const PatientSignupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().min(10, 'Invalid phone number'),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export const DoctorSignupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().min(10, 'Invalid phone number'),
  specialty: z.string().min(1, 'Please select a specialty'),
  qualification: z.string().min(1, 'Please enter your qualification'),
  yearsOfExperience: z.coerce.number().min(1, 'Years of experience must be at least 1'),
  licenseNumber: z.string().min(1, 'Please enter your license number'),
  consultationFee: z.coerce.number().min(100, 'Consultation fee must be at least 100'),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export type PatientSignupFormData = z.infer<typeof PatientSignupSchema>
export type DoctorSignupFormData = z.infer<typeof DoctorSignupSchema>
export type LoginFormData = z.infer<typeof LoginSchema>
