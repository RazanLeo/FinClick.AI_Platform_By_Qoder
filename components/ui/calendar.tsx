// Simplified Calendar Component
import * as React from "react"

export interface CalendarProps {
  className?: string;
  [key: string]: any;
}

export function Calendar({ className, ...props }: CalendarProps) {
  return (
    <div className={className}>
      <p>Calendar component - simplified version</p>
    </div>
  );
}