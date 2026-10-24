import * as React from "react"

import { cn } from "@/lib/utils"

/** Multi-line input. Styled by `[data-slot="textarea"]` in app/sections.css. */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn("selection:bg-[var(--leaf)] selection:text-white", className)}
      {...props}
    />
  )
}

export { Textarea }
