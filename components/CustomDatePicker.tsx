"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SimpleCalendar } from "./simple-calendar";
import Image from "next/image";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
}

export function CustomDatePicker({
  date,
  setDate,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  // Format date as MM/DD/YYYY without external libraries
  const formatDate = (date: Date | undefined) => {
    if (!date) return "--/--/----";

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          // variant="ghost"
          className={cn(
            "flex w-full items-center justify-start gap-2 p-2 text-left font-normal",
            className
          )}
        >
          {/* <CalendarIcon className="h-6 w-6 text-slate-800" /> */}
          <Image
            src={"/home/callender.png"}
            className=" h-5 w-5"
            alt="callender"
            height={50}
            width={50}
          />
          <div className="text-sm font-bold  italic text-newprimary">
            {formatDate(date)}
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <SimpleCalendar
          selected={date}
          onSelect={(newDate) => {
            setDate(newDate);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
