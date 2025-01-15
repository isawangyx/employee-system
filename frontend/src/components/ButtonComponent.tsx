import React from "react";
import { Button } from "@mui/material";

type ButtonProps = {
  label: string;
  onClick: () => void;
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "error";
  disabled?: boolean;
};

const ButtonComponent: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "contained",
  color = "primary",
  disabled = false,
}) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      disabled={disabled}
      sx={{
        textTransform: "none",
        "&:hover": {
          opacity: 0.9,
        },
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;
