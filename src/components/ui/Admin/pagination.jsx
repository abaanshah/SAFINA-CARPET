import React, { forwardRef } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const Pagination = ({ className = "", ...props }) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={`mx-auto flex w-full justify-center ${className}`}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = forwardRef(({ className = "", ...props }, ref) => (
  <ul
    ref={ref}
    className={`flex flex-row items-center gap-1 ${className}`}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = forwardRef(({ className = "", ...props }, ref) => (
  <li ref={ref} className={`${className}`} {...props} />
));
PaginationItem.displayName = "PaginationItem";

const PaginationLink = ({ className = "", isActive, size = "icon", ...props }) => {
  const baseClasses = `inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`;

  const variantClasses = isActive
    ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
    : "bg-transparent hover:bg-accent hover:text-accent-foreground";

  const sizeClasses =
    size === "default"
      ? "h-9 px-3"
      : size === "sm"
      ? "h-8 px-2"
      : size === "lg"
      ? "h-10 px-4"
      : "h-9 w-9"; // icon

  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    />
  );
};
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({ className = "", ...props }) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={`gap-1 pl-2.5 ${className}`}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className = "", ...props }) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={`gap-1 pr-2.5 ${className}`}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ className = "", ...props }) => (
  <span
    aria-hidden
    className={`flex h-9 w-9 items-center justify-center ${className}`}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
