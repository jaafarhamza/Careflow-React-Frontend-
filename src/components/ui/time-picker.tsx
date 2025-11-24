import * as React from 'react'
import { Clock } from 'lucide-react'
import { Input } from '@/components/ui/input'

export interface TimePickerProps {
  value?: string
  onChange?: (value: string) => void
  error?: boolean
  disabled?: boolean
  placeholder?: string
  className?: string
}

export function TimePicker({
  value,
  onChange,
  error,
  disabled,
  placeholder,
  className,
}: TimePickerProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <Input
      type="time"
      value={value}
      onChange={handleChange}
      prefixIcon={<Clock className="h-4 w-4" />}
      error={error}
      disabled={disabled}
      placeholder={placeholder}
      className={className}
    />
  )
}
