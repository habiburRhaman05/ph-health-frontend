'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SPECIALTIES, GENDERS, CONSULTATION_FEES } from '@/features/shared/constants'
import { X } from 'lucide-react'

interface DoctorFiltersProps {
  onSpecialtyChange: (specialty: string) => void
  onGenderChange: (gender: string) => void
  onPriceChange: (minPrice: number, maxPrice: number) => void
  onVerifiedChange: (verified: boolean) => void
  onReset: () => void
  selectedSpecialty?: string
  selectedGender?: string
  selectedPrice?: [number, number]
  selectedVerified?: boolean
}

export function DoctorFilters({
  onSpecialtyChange,
  onGenderChange,
  onPriceChange,
  onVerifiedChange,
  onReset,
  selectedSpecialty,
  selectedGender,
  selectedPrice = [CONSULTATION_FEES.MIN, CONSULTATION_FEES.MAX],
  selectedVerified = false,
}: DoctorFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6 rounded-lg border border-border bg-card p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {(selectedSpecialty || selectedGender || selectedVerified) && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <X className="h-4 w-4" />
            Reset
          </button>
        )}
      </div>

      {/* Specialty Filter */}
      <div className="space-y-3">
        <Label className="font-semibold">Specialty</Label>
        <Select value={selectedSpecialty || ''} onValueChange={onSpecialtyChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select specialty" />
          </SelectTrigger>
          <SelectContent>
            {SPECIALTIES.map((specialty) => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Gender Filter */}
      <div className="space-y-3">
        <Label className="font-semibold">Doctor Gender</Label>
        <Select value={selectedGender || ''} onValueChange={onGenderChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            {GENDERS.map((gender) => (
              <SelectItem key={gender} value={gender.toLowerCase()}>
                {gender}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <Label className="font-semibold">
          Consultation Fee Range
        </Label>
        <div className="space-y-2">
          <Slider
            value={selectedPrice}
            onValueChange={([min, max]) => onPriceChange(min, max)}
            min={CONSULTATION_FEES.MIN}
            max={CONSULTATION_FEES.MAX}
            step={CONSULTATION_FEES.STEP}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Rs. {selectedPrice[0]}</span>
            <span>Rs. {selectedPrice[1]}</span>
          </div>
        </div>
      </div>

      {/* Verified Filter */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Checkbox
            id="verified"
            checked={selectedVerified}
            onCheckedChange={(checked) => onVerifiedChange(checked as boolean)}
          />
          <Label htmlFor="verified" className="font-semibold cursor-pointer">
            Verified Doctors Only
          </Label>
        </div>
      </div>

      {/* Apply Button */}
      <Button className="w-full" variant="outline">
        Apply Filters
      </Button>
    </motion.div>
  )
}
