import React from "react";

const variants = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "border border-gray-300 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800",
  ghost: "text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export function Button({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) {
  const variantClasses = variants[variant] || variants.default;
  const sizeClasses = sizes[size] || sizes.md;

  return (
    <button
      {...props}
      className={`rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${variantClasses} ${sizeClasses} ${className}`}
    >
      {children}
    </button>
  );
}