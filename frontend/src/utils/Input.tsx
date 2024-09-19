type InputProps = React.ComponentProps<"input"> & {
  error?: string;
  style?: string;
  value?: string | number;
  label?: string;
  id?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  type,
  value = "",
  placeholder,
  name,
  style,
  onChange,
  onBlur,
  disabled,
  error,
  label,
  id,
}: InputProps) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-purpleLubank mb-2">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`rounded-md py-3 border-2 border-gray-200 outline-none ${style}`}
        type={type}
        // Não define o valor para input type=file
        value={type === "file" ? undefined : value}
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
