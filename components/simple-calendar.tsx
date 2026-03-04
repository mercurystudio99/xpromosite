"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
}

export function SimpleCalendar({
  selected,
  onSelect,
  className,
}: CalendarProps) {
  const [viewDate, setViewDate] = React.useState(selected || new Date());

  // Get current month and year
  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();

  // Get days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Get first day of month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Day names
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Previous month
  const goToPreviousMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  // Next month
  const goToNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Check if a date is selected
  const isSelected = (date: Date) => {
    if (!selected) return false;
    return (
      date.getDate() === selected.getDate() &&
      date.getMonth() === selected.getMonth() &&
      date.getFullYear() === selected.getFullYear()
    );
  };

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Generate calendar days
  const calendarDays = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-9 w-9" />);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    calendarDays.push(
      <Button
        key={`day-${day}`}
        variant="ghost"
        className={cn(
          "h-9 w-9 p-0 font-normal",
          isSelected(date) &&
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
          isToday(date) &&
            !isSelected(date) &&
            "bg-accent text-accent-foreground"
        )}
        onClick={() => onSelect && onSelect(date)}
      >
        {day}
      </Button>
    );
  }

  return (
    <div className={cn("p-3", className)}>
      <div className="flex items-center justify-between pb-4">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 bg-transparent p-0"
          onClick={goToPreviousMonth}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm font-medium">
          {monthNames[currentMonth]} {currentYear}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 bg-transparent p-0"
          onClick={goToNextMonth}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {dayNames.map((day) => (
          <div key={day} className="text-muted-foreground text-xs mb-1">
            {day}
          </div>
        ))}
        {calendarDays}
      </div>
    </div>
  );
}
