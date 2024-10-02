import React from "react";
import { Button as RadixButton } from "@radix-ui/themes";
import styled, { css } from "styled-components";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
  variant?: "default" | "neon";
}

const neonStyles = css`
  background: transparent;
  color: var(--color-neon-cyan);
  border: 2px solid var(--color-neon-cyan);
  box-shadow: 0 0 5px var(--color-neon-cyan), 0 0 10px var(--color-neon-cyan);
  text-shadow: 0 0 5px var(--color-neon-cyan);

  &:hover {
    background: var(--color-neon-cyan);
    color: black;
    box-shadow: 0 0 10px var(--color-neon-cyan), 0 0 20px var(--color-neon-cyan);
  }
`;

const defaultStyles = css`
  background: linear-gradient(145deg, #1e2a4d, #1a2442);
  box-shadow: 5px 5px 10px #131b32, -5px -5px 10px #25335e;
  border: none;
  color: #fff;

  &:hover {
    background: linear-gradient(145deg, #1a2442, #1e2a4d);
    transform: translateY(-2px);
    box-shadow: 6px 6px 12px #131b32, -6px -6px 12px #25335e;
  }

  &:active {
    background: linear-gradient(145deg, #1a2442, #1e2a4d);
    transform: translateY(1px);
    box-shadow: inset 4px 4px 8px #131b32, inset -4px -4px 8px #25335e;
  }
`;

const StyledButton = styled(RadixButton)<{
  $disabled?: boolean;
  $variant?: "default" | "neon";
}>`
  border-radius: 10px;
  padding: 10px 20px;
  font-weight: bold;
  transition: all 0.3s ease;

  ${({ $variant }) => ($variant === "default" ? defaultStyles : neonStyles)}

  ${({ $disabled }) =>
    $disabled &&
    `
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  `}
`;

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  disabled,
  type = "button",
  style,
  variant = "neon", // Changed default to "neon"
}) => (
  <StyledButton
    onClick={onClick}
    disabled={disabled}
    $disabled={disabled}
    type={type}
    style={style}
    $variant={variant}
  >
    {children}
  </StyledButton>
);

export default Button;
