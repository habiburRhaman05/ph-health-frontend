'use client'

import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Clock, Heart, Stethoscope, ChevronLeft, ShieldCheck, Star } from 'lucide-react'
import Link from 'next/link'

const AuthLayout = ({ children }: { children: ReactNode }) => {


  return (
   <div>

    {children}
   
   </div>
  )
}

export default AuthLayout