import React, { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

const buttonVariantStyles = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-gray-300 bg-white hover:bg-gray-100 text-black",
  secondary: "bg-gray-200 text-black hover:bg-gray-300",
  ghost: "hover:bg-gray-100 text-black",
  link: "text-blue-600 underline hover:no-underline",
};

const buttonSizeStyles = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const Button = forwardRef(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const variantClass = buttonVariantStyles[variant] || "";
    const sizeClass = buttonSizeStyles[size] || "";

    return (
      <Comp
        ref={ref}
        className={`${baseStyles} ${variantClass} ${sizeClass} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
