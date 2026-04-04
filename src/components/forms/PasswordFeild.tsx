'use client'

import { useState } from 'react'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'

type Props = {
  control: any
  name: string
  label: string
  disabled?: boolean
}

export function FormPassword({
  control,
  name,
  label,
  disabled,
}: Props) {
  const [show, setShow] = useState(false)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <div className="relative">
              <Input
                type={show ? 'text' : 'password'}
                disabled={disabled}
                {...field} 
              />

              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </FormControl>


          <FormMessage />
        </FormItem>
      )}
    />
  )
}