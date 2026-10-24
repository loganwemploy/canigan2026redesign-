import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Buttons use the Emberleaf kit button (`.btn` in app/ember.css): an ink pill
 * that fills with leaf green from below on hover, with the arrow nudging
 * right. Variants only switch the kit modifiers (`ghost`, `sm`, `lg`, `icon`),
 * so every button on the site shares one look.
 */
const buttonVariants = cva(
  "btn [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "",
        destructive: "[--bg:var(--alert)] border-[var(--alert)]",
        outline: "ghost",
        secondary: "ghost",
        ghost: "ghost border-transparent bg-transparent",
        link: "h-auto border-0 bg-transparent p-0 text-[var(--leaf)] underline-offset-4 hover:underline [&::before]:hidden",
      },
      size: {
        default: "",
        xs: "sm",
        sm: "sm",
        lg: "lg",
        icon: "icon",
        "icon-xs": "icon sm",
        "icon-sm": "icon",
        "icon-lg": "icon lg",
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
  const Comp = asChild ? Slot.Root : "button"

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
