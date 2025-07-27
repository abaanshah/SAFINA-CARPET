import React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

const ContextMenu = ContextMenuPrimitive.Root
const ContextMenuTrigger = ContextMenuPrimitive.Trigger
const ContextMenuGroup = ContextMenuPrimitive.Group
const ContextMenuPortal = ContextMenuPrimitive.Portal
const ContextMenuSub = ContextMenuPrimitive.Sub
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = React.forwardRef(({ inset, children, className = "", ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={`flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground ${inset ? "pl-8" : ""} ${className}`}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
))

const ContextMenuSubContent = React.forwardRef(({ className = "", ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={`z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md ${className}`}
    {...props}
  />
))

const ContextMenuContent = React.forwardRef(({ className = "", ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={`z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md ${className}`}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
))

const ContextMenuItem = React.forwardRef(({ inset, className = "", ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${inset ? "pl-8" : ""} ${className}`}
    {...props}
  />
))

const ContextMenuCheckboxItem = React.forwardRef(({ children, checked, className = "", ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    checked={checked}
    className={`relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
))

const ContextMenuRadioItem = React.forwardRef(({ children, className = "", ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={`relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
))

const ContextMenuLabel = React.forwardRef(({ inset, className = "", ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={`px-2 py-1.5 text-sm font-semibold text-foreground ${inset ? "pl-8" : ""} ${className}`}
    {...props}
  />
))

const ContextMenuSeparator = React.forwardRef(({ className = "", ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={`-mx-1 my-1 h-px bg-border ${className}`}
    {...props}
  />
))

const ContextMenuShortcut = ({ className = "", ...props }) => (
  <span
    className={`ml-auto text-xs tracking-widest text-muted-foreground ${className}`}
    {...props}
  />
)

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
