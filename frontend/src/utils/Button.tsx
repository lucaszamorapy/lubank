import React from "react";

type ButtonProps = React.ComponentProps<"button"> & {
  buttonText: React.ReactNode;
  onClick?: () => void; // Torna onClick opcional
  style: string;
  disabled?: boolean;
};

const Button = ({ buttonText, onClick, style, disabled }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-purpleContabilize rounded-md px-5 py-3 text-md font-semibold hover:bg-[#310E46] duration-300 ${style}`}
    >
      {buttonText}
    </button>
  );
};

export default Button;
