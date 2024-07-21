import { useEffect } from "react";
import { toast } from "react-toastify";

type InputProps = React.ComponentProps<"input"> & {
  error?: string;
  style?: string;
};

const Input = ({
  type,
  value,
  placeholder,
  name,
  style,
  onChange,
  onBlur,
  error,
}: InputProps) => {
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div>
      <input
        className={`rounded-md py-3 outline-none ${style}`}
        type={type}
        value={value}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
