import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"

const variantClasses = {
  default: "bg-transparent",
  outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
}

const sizeClasses = {
  default: "h-10 px-3",
  sm: "h-9 px-2.5",
  lg: "h-11 px-5",
}

// Context for variant and size with default values
const ToggleGroupContext = React.createContext({
  size: "default",
  variant: "default",
})

const ToggleGroup = React.forwardRef(
  ({ className = "", variant = "default", size = "default", children, ...props }, ref) => {
    const baseClass = "flex items-center justify-center gap-1"
    const combinedClass = className ? baseClass + " " + className : baseClass

    return (
      <ToggleGroupPrimitive.Root ref={ref} className={combinedClass} {...props}>
        <ToggleGroupContext.Provider value={{ variant, size }}>
          {children}
        </ToggleGroupContext.Provider>
      </ToggleGroupPrimitive.Root>
    )
  }
)

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef(
  ({ className = "", children, variant, size, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext)

    const appliedVariant = context.variant || variant || "default"
    const appliedSize = context.size || size || "default"

    const classes = [
      variantClasses[appliedVariant],
      sizeClasses[appliedSize],
      "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
      className,
    ]
      .filter(Boolean)
      .join(" ")

    return (
      <ToggleGroupPrimitive.Item ref={ref} className={classes} {...props}>
        {children}
      </ToggleGroupPrimitive.Item>
    )
  }
)

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
