import { cn } from "@/lib/utils"
import { ElementType, ComponentPropsWithoutRef } from "react"

interface StarBorderProps<T extends ElementType> {
  as?: T
  color?: string
  speed?: string
  className?: string
  children: React.ReactNode
}

export function StarBorder<T extends ElementType = "button">({
  as,
  className,
  color,
  speed = "6s",
  children,
  ...props
}: StarBorderProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof StarBorderProps<T>>) {
  const Component = as || "button"
  const defaultColor = color || "hsl(var(--foreground))"

  return (
    <Component 
      className={cn(
        "relative inline-block py-[1px] overflow-hidden rounded-[20px]",
        className
      )} 
      {...props}
    >
      {/* Animated border gradient */}
      <div
        className="absolute inset-0 rounded-[20px] opacity-75"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, ${defaultColor} 25%, transparent 50%, ${defaultColor} 75%, transparent 100%)`,
          animation: `spin ${speed} linear infinite`,
        }}
      />
      
      {/* Inner background mask */}
      <div className="absolute inset-[2px] rounded-[18px] bg-white dark:bg-[#060606] transition-all duration-500" />
      
      {/* Subtle default border */}
      <div className="absolute inset-[1px] rounded-[19px] border border-gray-200 dark:border-gray-700 transition-all duration-500" />
      
      <div className={cn(
        "relative z-10 text-center text-base py-3 px-6 rounded-[20px] h-12 flex items-center justify-center",
        "bg-transparent transition-all duration-500 ease-out",
        "hover:bg-brand-primary hover:text-white hover:shadow-lg hover:shadow-brand-accent/25 hover:-translate-y-0.5",
        "dark:hover:bg-brand-primary dark:hover:text-white"
      )}>
        {children}
      </div>
    </Component>
  )
}