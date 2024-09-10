import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseClasses = "px-4 py-2 rounded transition-colors";
  const variantClasses =
    variant === "primary"
      ? "bg-copper-300 text-black hover:bg-copper-100"
      : "bg-gray-200 text-black hover:bg-gray-300";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
