type InputProps = React.ComponentProps<"input"> & {
  error?: string;
  style?: string;
  value?: string | number; // Permitir apenas string ou number para inputs normais
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Tornar onChange obrigatório
};

const Input = ({
  type,
  value,
  placeholder,
  name,
  style,
  onChange,
  onBlur,
  disabled,
  error,
}: InputProps) => {
  return (
    <div>
      <input
        className={`rounded-md py-3 border-2 border-gray-200 outline-none ${style}`}
        type={type}
        value={type === "file" ? undefined : value} // Não define o valor para input type=file
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
