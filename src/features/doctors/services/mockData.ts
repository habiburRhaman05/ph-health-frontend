import type { Doctor, DoctorReview } from '@/features/shared/types'

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Ahmed Hassan',
    specialty: 'Cardiology',
    gender: 'Male',
    image: 'https://images.unsplash.com/photo-1612349317150-e88e6ff1fba4?w=400&h=400&fit=crop',
    rating: 4.9,
    reviewsCount: 235,
    consultationFee: 1500,
    experience: 15,
    verified: true,
    bio: 'Board-certified cardiologist with 15 years of experience in diagnosing and treating heart conditions.',
    qualifications: ['MBBS', 'MD Cardiology'],
    availableSlots: ['09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM'],
    currentWorkplace: 'Shifa International Hospital, Islamabad',
    licenseNumber: 'PMC-12345',
  },
  {
    id: '2',
    name: 'Dr. Fatima Khan',
    specialty: 'Dermatology',
    gender: 'Female',
    image: 'https://images.unsplash.com/photo-1594824476967-48c00b7a8f79?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewsCount: 180,
    consultationFee: 1200,
    experience: 12,
    verified: true,
    bio: 'Expert dermatologist specializing in acne, eczema, and cosmetic dermatology.',
    qualifications: ['MBBS', 'MD Dermatology'],
    availableSlots: ['10:30 AM', '11:00 AM', '02:30 PM', '04:00 PM'],
    currentWorkplace: 'Aga Khan University Hospital, Karachi',
    licenseNumber: 'PMC-12346',
  },
  {
    id: '3',
    name: 'Dr. Ali Raza',
    specialty: 'ENT',
    gender: 'Male',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewsCount: 152,
    consultationFee: 1000,
    experience: 10,
    verified: true,
    bio: 'Experienced ENT specialist with expertise in ear infections, hearing loss, and sinusitis.',
    qualifications: ['MBBS', 'MS ENT'],
    availableSlots: ['09:30 AM', '11:00 AM', '03:00 PM', '04:30 PM'],
    currentWorkplace: 'Patel Hospital, Lahore',
    licenseNumber: 'PMC-12347',
  },
  {
    id: '4',
    name: 'Dr. Rana Malik',
    specialty: 'General Practice',
    gender: 'Female',
    image: 'https://images.unsplash.com/photo-1559839734945-a7dd189ce218?w=400&h=400&fit=crop',
    rating: 4.9,
    reviewsCount: 342,
    consultationFee: 800,
    experience: 8,
    verified: true,
    bio: 'Compassionate general practitioner providing comprehensive healthcare services.',
    qualifications: ['MBBS', 'FCPS'],
    availableSlots: ['09:00 AM', '10:00 AM', '02:00 PM', '03:30 PM', '04:30 PM'],
    currentWorkplace: 'Jinnah Medical Center, Rawalpindi',
    licenseNumber: 'PMC-12348',
  },
  {
    id: '5',
    name: 'Dr. Hassan Saeed',
    specialty: 'Neurology',
    gender: 'Male',
    image: 'https://images.unsplash.com/photo-1537368610025-700d6a44434e?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewsCount: 198,
    consultationFee: 1800,
    experience: 18,
    verified: true,
    bio: 'Neurologist with specialized experience in migraine, epilepsy, and neurological disorders.',
    qualifications: ['MBBS', 'MD Neurology'],
    availableSlots: ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM'],
    currentWorkplace: 'Combined Military Hospital, Rawalpindi',
    licenseNumber: 'PMC-12349',
  },
  {
    id: '6',
    name: 'Dr. Sara Khan',
    specialty: 'Pediatrics',
    gender: 'Female',
    image: 'https://images.unsplash.com/photo-1638499881562-a3b8b6f87f90?w=400&h=400&fit=crop',
    rating: 4.9,
    reviewsCount: 267,
    consultationFee: 1000,
    experience: 11,
    verified: true,
    bio: 'Child specialist dedicated to providing compassionate care for infants and children.',
    qualifications: ['MBBS', 'FCPS Pediatrics'],
    availableSlots: ['09:00 AM', '10:30 AM', '02:30 PM', '04:00 PM'],
    currentWorkplace: 'Children\'s Hospital, Lahore',
    licenseNumber: 'PMC-12350',
  },
  {
    id: '7',
    name: 'Dr. Muhammad Tariq',
    specialty: 'Orthopedics',
    gender: 'Male',
    image: 'https://images.unsplash.com/photo-1612349317150-e88e6ff1fba4?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewsCount: 214,
    consultationFee: 1600,
    experience: 14,
    verified: true,
    bio: 'Orthopedic surgeon specializing in joint replacement and sports medicine.',
    qualifications: ['MBBS', 'MS Orthopedics'],
    availableSlots: ['09:30 AM', '11:00 AM', '02:30 PM', '04:00 PM'],
    currentWorkplace: 'Ali Medical Center, Karachi',
    licenseNumber: 'PMC-12351',
  },
  {
    id: '8',
    name: 'Dr. Zainab Ahmed',
    specialty: 'Gastroenterology',
    gender: 'Female',
    image: 'https://images.unsplash.com/photo-1594824476967-48c00b7a8f79?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewsCount: 176,
    consultationFee: 1400,
    experience: 13,
    verified: true,
    bio: 'Gastroenterologist with expertise in digestive disorders and endoscopy.',
    qualifications: ['MBBS', 'MD Gastroenterology'],
    availableSlots: ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM'],
    currentWorkplace: 'Emirates Hospital, Dubai',
    licenseNumber: 'PMC-12352',
  },
  {
    id: '9',
    name: 'Dr. Khalid Abbas',
    specialty: 'Psychiatry',
    gender: 'Male',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
    rating: 4.9,
    reviewsCount: 189,
    consultationFee: 1300,
    experience: 9,
    verified: true,
    bio: 'Psychiatrist providing compassionate mental health care and counseling.',
    qualifications: ['MBBS', 'MD Psychiatry'],
    availableSlots: ['09:00 AM', '10:30 AM', '03:00 PM', '04:30 PM'],
    currentWorkplace: 'Mental Health Institute, Islamabad',
    licenseNumber: 'PMC-12353',
  },
  {
    id: '10',
    name: 'Dr. Hana Sheikh',
    specialty: 'Ophthalmology',
    gender: 'Female',
    image: 'https://images.unsplash.com/photo-1559839734945-a7dd189ce218?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewsCount: 201,
    consultationFee: 1100,
    experience: 10,
    verified: true,
    bio: 'Ophthalmologist specializing in cataract surgery and refractive corrections.',
    qualifications: ['MBBS', 'MS Ophthalmology'],
    availableSlots: ['09:30 AM', '10:30 AM', '02:30 PM', '04:00 PM'],
    currentWorkplace: 'Eye Care Center, Faisalabad',
    licenseNumber: 'PMC-12354',
  },
  {
    id: '11',
    name: 'Dr. Omar Khan',
    specialty: 'Pulmonology',
    gender: 'Male',
    image: 'https://images.unsplash.com/photo-1637368610025-700d6a44434e?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewsCount: 143,
    consultationFee: 1400,
    experience: 12,
    verified: true,
    bio: 'Lung specialist with expertise in asthma, COPD, and respiratory infections.',
    qualifications: ['MBBS', 'MD Pulmonology'],
    availableSlots: ['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'],
    currentWorkplace: 'Chest & TB Hospital, Lahore',
    licenseNumber: 'PMC-12355',
  },
  {
    id: '12',
    name: 'Dr. Amira Hassan',
    specialty: 'Dentistry',
    gender: 'Female',
    image: 'https://images.unsplash.com/photo-1638499881562-a3b8b6f87f90?w=400&h=400&fit=crop',
    rating: 4.9,
    reviewsCount: 256,
    consultationFee: 900,
    experience: 7,
    verified: true,
    bio: 'Dentist providing comprehensive dental care including preventive and cosmetic services.',
    qualifications: ['BDS', 'FCPS Dentistry'],
    availableSlots: ['09:00 AM', '10:00 AM', '02:00 PM', '03:30 PM', '04:30 PM'],
    currentWorkplace: 'Smile Dental Clinic, Multan',
    licenseNumber: 'PMC-12356',
  },
]

export function getMockDoctors(filters?: {
  specialty?: string
  gender?: string
  minRating?: number
  minFee?: number
  maxFee?: number
  verified?: boolean
  page?: number
  limit?: number
}): { doctors: Doctor[]; total: number } {
  let filtered = [...mockDoctors]

  if (filters?.specialty) {
    filtered = filtered.filter((d) => d.specialty === filters.specialty)
  }
  if (filters?.gender) {
    filtered = filtered.filter((d) => d.gender === filters.gender)
  }
  if (filters?.minRating) {
    filtered = filtered.filter((d) => d.rating >= filters.minRating)
  }
  if (filters?.minFee) {
    filtered = filtered.filter((d) => d.consultationFee >= filters.minFee)
  }
  if (filters?.maxFee) {
    filtered = filtered.filter((d) => d.consultationFee <= filters.maxFee)
  }
  if (filters?.verified !== undefined) {
    filtered = filtered.filter((d) => d.verified === filters.verified)
  }

  const page = filters?.page || 1
  const limit = filters?.limit || 10
  const start = (page - 1) * limit
  const end = start + limit

  return {
    doctors: filtered.slice(start, end),
    total: filtered.length,
  }
}

export function getMockFeaturedDoctors(): Doctor[] {
  return mockDoctors.slice(0, 6)
}

const mockReviews: DoctorReview[] = [
  {
    id: '1',
    doctorId: '1',
    patientName: 'Hassan Ali',
    rating: 5,
    title: 'Excellent cardiologist!',
    comment: 'Dr. Ahmed provided exceptional care. Very professional and thorough in his examination. Highly recommended!',
    date: '2024-01-15',
  },
  {
    id: '2',
    doctorId: '1',
    patientName: 'Ayesha Khan',
    rating: 4.5,
    title: 'Great experience',
    comment: 'Very knowledgeable doctor. The consultation was comprehensive and he explained everything clearly.',
    date: '2024-01-10',
  },
  {
    id: '3',
    doctorId: '1',
    patientName: 'Muhammad Hasan',
    rating: 5,
    title: 'Best cardiologist in town',
    comment: 'After visiting multiple doctors, finally found the right one. His expertise is unmatched.',
    date: '2024-01-05',
  },
  {
    id: '4',
    doctorId: '2',
    patientName: 'Rana Ahmed',
    rating: 5,
    title: 'Solved my skin issues!',
    comment: 'Dr. Fatima is amazing. My skin condition improved significantly after her treatment.',
    date: '2024-01-12',
  },
  {
    id: '5',
    doctorId: '2',
    patientName: 'Sara Khan',
    rating: 4,
    title: 'Professional and caring',
    comment: 'Very professional approach. The office staff is also very cooperative.',
    date: '2024-01-08',
  },
  {
    id: '6',
    doctorId: '3',
    patientName: 'Ali Raza',
    rating: 5,
    title: 'Outstanding ENT specialist',
    comment: 'My ear infection was treated perfectly. No more problems!',
    date: '2024-01-18',
  },
]

export function getMockReviewsForDoctor(doctorId: string): DoctorReview[] {
  return mockReviews.filter((review) => review.doctorId === doctorId)
}

export function generateVideoCallId(): string {
  const timestamp = Date.now().toString(36)
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `PHC-${randomPart}-${timestamp}`
}
