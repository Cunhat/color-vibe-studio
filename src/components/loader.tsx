import { cn } from "@/lib/utils";
import React from "react";

type LoaderProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const dotSizeClasses = {
  sm: "w-1 h-1",
  md: "w-2 h-2",
  lg: "w-3 h-3",
};

export function Loader({ className, size = "md" }: LoaderProps) {
  return (
    <div className={cn("flex space-x-1", className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "bg-primary animate-pulse rounded-full",
            dotSizeClasses[size],
          )}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: "1s",
          }}
        />
      ))}
    </div>
  );
}
