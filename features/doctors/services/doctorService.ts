import type { Doctor, DoctorFilter, ApiResponse } from '@/features/shared/types'
import { getMockDoctors, getMockFeaturedDoctors } from './mockData'

export const doctorService = {
  async getDoctors(
    filters: DoctorFilter
  ): Promise<ApiResponse<{ doctors: Doctor[]; total: number }>> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    const result = getMockDoctors(filters)
    return {
      success: true,
      data: result,
      message: 'Doctors fetched successfully',
    }
  },

  async getDoctorById(id: string): Promise<ApiResponse<Doctor>> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    
    // Mock implementation - find doctor by ID from mock data
    const allDoctors = getMockDoctors({ limit: 100 })
    const doctor = allDoctors.doctors.find((d) => d.id === id)
    
    return {
      success: !!doctor,
      data: doctor,
      message: doctor ? 'Doctor found' : 'Doctor not found',
    }
  },

  async getDoctorAvailability(id: string, date: string): Promise<ApiResponse<string[]>> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    
    // Return mock time slots
    const allDoctors = getMockDoctors({ limit: 100 })
    const doctor = allDoctors.doctors.find((d) => d.id === id)
    
    return {
      success: !!doctor,
      data: doctor?.availableSlots || [],
      message: 'Availability fetched',
    }
  },

  async getFeaturedDoctors(): Promise<ApiResponse<Doctor[]>> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    const featured = getMockFeaturedDoctors()
    return {
      success: true,
      data: featured,
      message: 'Featured doctors fetched successfully',
    }
  },
}
