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
    <div className="flex flex-col">
      {label && (
        <label className="mb-1 text-sm font-medium text-copper-100">
          {label}
        </label>
      )}
      <input
        className={`px-3 py-2 bg-black bg-opacity-30 border border-copper-300 rounded-md text-copper-100 placeholder-copper-300/50 focus:outline-none focus:ring-2 focus:ring-neon-cyan transition-all duration-300 ${className}`}
        {...props}
      />
    </div>
  );
};
