'use client'

import { useState, useEffect } from 'react'
import { format, subYears } from 'date-fns'
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface BirthDatePickerProps {
  value: Date | null
  onChange: (date: Date | null) => void
}

export function BirthDatePicker({ value, onChange }: BirthDatePickerProps) {
  const [calendarDate, setCalendarDate] = useState<Date>(value || new Date())

  // Calculate the minimum allowed date (120 years ago)
  const minDate = subYears(new Date(), 120)
  
  // Calculate the maximum allowed date (today)
  const maxDate = new Date()

  // Generate an array of years from 120 years ago to the current year
  const years = Array.from({ length: 121 }, (_, i) => maxDate.getFullYear() - i)

  const handleYearChange = (year: string) => {
    const newDate = new Date(calendarDate)
    newDate.setFullYear(parseInt(year))
    setCalendarDate(newDate)
  }

  const handleMonthChange = (increment: number) => {
    const newDate = new Date(calendarDate)
    newDate.setMonth(newDate.getMonth() + increment)
    setCalendarDate(newDate)
  }

  useEffect(() => {
    if (value) {
      setCalendarDate(value)
    }
  }, [value])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button" // Explicitly set type to "button"
          variant={'outline'}
          className={cn(
            'w-[240px] pl-3 text-left font-normal',
            !value && 'text-muted-foreground'
          )}
        >
          {value ? (
            format(value, 'PPP')
          ) : (
            <span>Pick a date</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex items-center justify-between px-3 pt-2">
          <Select
            value={calendarDate.getFullYear().toString()}
            onValueChange={(year) => {
              handleYearChange(year)
              // Prevent the change event from bubbling up to the form
              event?.preventDefault()
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="space-x-1">
            <Button
              type="button" // Explicitly set type to "button"
              variant="outline"
              className="h-7 w-7 p-0"
              onClick={(e) => {
                e.preventDefault() // Prevent form submission
                handleMonthChange(-1)
              }}
              disabled={
                new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1) <=
                new Date(minDate.getFullYear(), minDate.getMonth(), 1)
              }
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button" // Explicitly set type to "button"
              variant="outline"
              className="h-7 w-7 p-0"
              onClick={(e) => {
                e.preventDefault() // Prevent form submission
                handleMonthChange(1)
              }}
              disabled={
                new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0) >=
                new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0)
              }
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Calendar
          mode="single"
          selected={value}
          onSelect={(newValue) => {
            onChange(newValue)
            // Prevent the change event from bubbling up to the form
            event?.preventDefault()
          }}
          month={calendarDate}
          onMonthChange={setCalendarDate}
          fromDate={minDate}
          toDate={maxDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

