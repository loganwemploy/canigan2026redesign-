import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Text input. The kit finish (paper fill, 14px radius, leaf focus ring) lives
 * on `[data-slot="input"]` in app/sections.css, so the field looks the same
 * wherever it is used.
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn("selection:bg-[var(--leaf)] selection:text-white", className)}
      {...props}
    />
  )
}

export { Input }
