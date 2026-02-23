// 'use client'

// import React, { useEffect, useState } from 'react'
// import { motion } from 'framer-motion'
// import { ChevronLeft, ChevronRight } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { DoctorCard } from './DoctorCard'
// import { useFeaturedDoctors } from '../hooks/useDoctorList'

// export function FeaturedDoctorsCarousel() {
//   const { data, isLoading } = useFeaturedDoctors()
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [itemsPerPage, setItemsPerPage] = useState(3)

//   // Responsive items per page
//   useEffect(() => {
//     const updateItemsPerPage = () => {
//       if (window.innerWidth < 768) {
//         setItemsPerPage(1)
//       } else if (window.innerWidth < 1024) {
//         setItemsPerPage(2)
//       } else {
//         setItemsPerPage(3)
//       }
//     }

//     updateItemsPerPage()
//     window.addEventListener('resize', updateItemsPerPage)
//     return () => window.removeEventListener('resize', updateItemsPerPage)
//   }, [])

//   const doctors = data?.data || []
//   const maxIndex = Math.max(0, doctors.length - itemsPerPage)

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
//   }

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
//   }

//   if (isLoading) {
//     return (
//       <div className="space-y-6">
//         <div className="h-32 bg-muted animate-pulse rounded-lg" />
//       </div>
//     )
//   }

//   if (doctors.length === 0) {
//     return null
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h3 className="text-2xl font-bold">Featured Doctors</h3>
//           <p className="text-sm text-muted-foreground mt-1">
//             Our most trusted and highly-rated healthcare professionals
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <Button
//             variant="outline"
//             size="icon"
//             onClick={handlePrev}
//             className="h-10 w-10"
//           >
//             <ChevronLeft className="h-4 w-4" />
//           </Button>
//           <Button
//             variant="outline"
//             size="icon"
//             onClick={handleNext}
//             className="h-10 w-10"
//           >
//             <ChevronRight className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>

//       {/* Carousel */}
//       <div className="overflow-hidden">
//         <motion.div
//           className="grid gap-6"
//           style={{
//             gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))`,
//           }}
//           animate={{
//             x: -currentIndex * (100 / itemsPerPage) + '%',
//           }}
//           transition={{ duration: 0.5, ease: 'easeInOut' }}
//         >
//           {doctors.map((doctor) => (
//             <div key={doctor.id} className="min-w-0">
//               <DoctorCard doctor={doctor} onBook={() => {}} />
//             </div>
//           ))}
//         </motion.div>
//       </div>

//       {/* Indicators */}
//       <div className="flex justify-center gap-2">
//         {Array.from({ length: maxIndex + 1 }).map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`h-2 rounded-full transition-all ${
//               index === currentIndex
//                 ? 'w-8 bg-primary'
//                 : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }
import React from 'react'

const FeaturedDoctorsCarousel = () => {
  return (
    <div>FeaturedDoctorsCarousel</div>
  )
}

export default FeaturedDoctorsCarousel