'use client'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type Props = {
  control: any
  name: string
  label: string
  type?: string
  placeholder?: string
  disabled?: boolean
}

export function FormInput({
  control,
  name,
  label,
  type = 'text',
  placeholder,
  disabled,
}: Props) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              {...field} 
            />
          </FormControl>


          <FormMessage />
        </FormItem>
      )}
    />
  )
}