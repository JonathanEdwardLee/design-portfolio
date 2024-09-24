import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-1 text-sm font-medium text-copper-100">
          {label}
        </label>
      )}
      <input
        className={`w-full border-none ring-0 bg-transparent text-copper-100 placeholder-copper-300/70 px-4 py-2 focus:outline-none ${className}`}
        {...props}
      />
    </div>
  );
};
