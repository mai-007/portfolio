'use client'

import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DateFilterSelectProps {
  dates: string[]
  selectedDate: string
  onDateChange: (date: string) => void
}

export const DateFilterSelect = ({
  dates,
  selectedDate,
  onDateChange,
}: DateFilterSelectProps) => {
  return (
    <Select value={selectedDate} onValueChange={onDateChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="制作年で絞り込み" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>制作日</SelectLabel>
          <SelectItem value="ALL">制作年で絞り込み</SelectItem>
          {dates.map((date) => (
            <SelectItem key={date} value={date}>
              {date}年
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
