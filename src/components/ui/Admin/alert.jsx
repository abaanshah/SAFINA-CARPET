import * as React from "react"

const Alert = React.forwardRef(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const baseClasses = "relative w-full rounded-lg border p-4"
    const svgClasses = "[&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground"

    const variantClasses = {
      default: "bg-white text-black",
      destructive: "border-red-500 text-red-600 [&>svg]:text-red-600"
    }

    return (
      <div
        ref={ref}
        role="alert"
        className={`${baseClasses} ${svgClasses} ${variantClasses[variant] || ''} ${className}`.trim()}
        {...props}
      />
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef(
  ({ className = '', ...props }, ref) => (
    <h5
      ref={ref}
      className={`mb-1 font-medium leading-none tracking-tight ${className}`.trim()}
      {...props}
    />
  )
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`text-sm [&_p]:leading-relaxed ${className}`.trim()}
      {...props}
    />
  )
)
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
