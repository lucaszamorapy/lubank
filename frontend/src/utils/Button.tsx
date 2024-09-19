import React from "react";

type ButtonProps = React.ComponentProps<"button"> & {
  buttonText: React.ReactNode;
  onClick?: () => void; // Torna onClick opcional
  style: string;
  disabled?: boolean;
  type?: string;
};

const Button = ({
  buttonText,
  onClick,
  style,
  type,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-purpleLubank rounded-md py-3 text-md font-semibold hover:bg-purple-950 duration-300 ${style}`}
    >
      {buttonText}
    </button>
  );
};

export default Button;
