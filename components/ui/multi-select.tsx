"use client";

import * as React from "react";
import { X, Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type Option = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options",
  className,
  disabled = false,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (value: string) => {
    onChange(selected.filter((item) => item !== value));
  };

  const handleSelect = (value: string) => {
    const isSelected = selected.includes(value);
    if (isSelected) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  // Create a map of selected values for faster lookup
  const selectedMap = selected.reduce((acc, value) => {
    acc[value] = true;
    return acc;
  }, {} as Record<string, boolean>);

  // Get the display labels for the selected values
  const selectedLabels = options
    .filter(option => selectedMap[option.value])
    .map(option => option.label);

  const displayValue = selectedLabels.length > 0 
    ? selectedLabels.join(", ")
    : "";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between h-9 px-3 py-2 text-sm text-left font-normal",
            className
          )}
          onClick={() => setOpen(!open)}
          disabled={disabled}
        >
          {displayValue || <span className="text-muted-foreground">{placeholder}</span>}
          <div className="ml-2 shrink-0 opacity-50">
            {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <div className="max-h-[300px] overflow-y-auto">
          {options.map((option) => {
            const isSelected = selected.includes(option.value);
            return (
              <div
                key={option.value}
                className="flex items-center gap-2 p-2 hover:bg-muted cursor-pointer"
                onClick={() => handleSelect(option.value)}
              >
                <div
                  className={cn(
                    "flex h-4 w-4 items-center justify-center border border-primary rounded",
                    isSelected ? "bg-primary text-primary-foreground" : "bg-background"
                  )}
                >
                  {isSelected && <Check className="h-3 w-3" />}
                </div>
                <span className="text-sm">{option.label}</span>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}