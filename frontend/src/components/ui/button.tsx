import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-black tracking-tight ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "luxe-button-primary",
        destructive:
          "bg-rose-500 text-white shadow-xl shadow-rose-100 hover:bg-rose-600 hover:shadow-rose-200",
        outline: "luxe-button-white",
        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-200",
        ghost: "hover:bg-slate-50 text-slate-500 hover:text-slate-900",
        link: "text-indigo-600 underline-offset-4 hover:underline",
        premium: "bg-gradient-to-br from-indigo-600 via-indigo-500 to-indigo-700 text-white shadow-2xl shadow-indigo-200/50 hover:scale-[1.02] hover:shadow-indigo-300/60",
      },
      size: {
        default: "h-14 px-8",
        sm: "h-10 px-6 text-xs",
        lg: "h-16 px-12 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
