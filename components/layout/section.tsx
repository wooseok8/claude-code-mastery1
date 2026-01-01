import { cn } from "@/lib/utils"

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  variant?: "default" | "muted" | "gradient"
}

const variantClasses = {
  default: "bg-background",
  muted: "bg-muted/30",
  gradient: "bg-gradient-to-b from-background via-muted/20 to-background",
}

export function Section({ children, className, id, variant = "default" }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24 lg:py-32",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </section>
  )
}
