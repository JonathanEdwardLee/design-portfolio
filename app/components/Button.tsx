import React from "react";
import { Button as RadixButton } from "@radix-ui/themes";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => (
  <RadixButton
    onClick={onClick}
    className="transition-all duration-300 ease-in-out hover:scale-105 hover:brightness-110"
  >
    {children}
  </RadixButton>
);

export default Button;
