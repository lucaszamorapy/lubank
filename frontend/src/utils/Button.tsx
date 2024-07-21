import React from "react";

type ButtonProps = React.ComponentProps<"button"> & {
  buttonText: React.ReactNode;
  onClick?: () => void; // Torna onClick opcional
  style: string;
};

const Button = ({ buttonText, onClick, style }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-purpleContabilize rounded-md px-5 py-3 text-md font-semibold ${style}`}
    >
      {buttonText}
    </button>
  );
};

export default Button;
