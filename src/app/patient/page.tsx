import { getProfile } from '@/features/auth/services/auth.services';
import React from 'react'

const page = async () => {
     const user =await getProfile();
    
     
  return (
    <div className='bg-success'>
        welcome {user?.user.data.name}
    </div>
  )
}

export default page