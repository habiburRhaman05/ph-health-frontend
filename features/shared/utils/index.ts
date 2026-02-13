import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date, formatStr: string = 'MMM dd, yyyy') {
  try {
    return format(new Date(date), formatStr)
  } catch {
    return 'Invalid date'
  }
}

export function formatTime(date: string | Date, formatStr: string = 'HH:mm') {
  try {
    return format(new Date(date), formatStr)
  } catch {
    return 'Invalid time'
  }
}

export function getInitials(firstName: string, lastName: string = '') {
  const first = firstName.charAt(0) || ''
  const last = lastName.charAt(0) || ''
  return `${first}${last}`.toUpperCase() || 'U'
}

export function formatCurrency(amount: number, currency: string = 'PKR') {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function truncateText(text: string, length: number = 100) {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function generateRandomId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getQueryParams(searchParams: Record<string, string | string[] | undefined>) {
  const params = new URLSearchParams()
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v))
      } else {
        params.set(key, value)
      }
    }
  })
  return params.toString()
}
