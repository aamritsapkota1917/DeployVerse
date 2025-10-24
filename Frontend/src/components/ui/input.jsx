import * as React from "react"

import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority";


const inputVariants = cva(
  "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input file:bg-transparent file:text-sm file:font-medium",
        error: "border-red-500 placeholder:text-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);


const Input = React.forwardRef(({ className, type, variant, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(inputVariants({ variant }), className)}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };