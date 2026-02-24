import { useApiMutation } from '@/hooks/useApiMutation'
import React from 'react'

const useAppointment = () => {

    const bookAppointmentMutation = useApiMutation({
        endpoint:"/api/v1/appointments",
        method:"POST",
        
    });

  return {
    bookAppointmentMutation
  }
}

export default useAppointment