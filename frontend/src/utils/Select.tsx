type IMonth = {
  month_id: number;
  month_name: string;
};

type SelectProps = React.ComponentProps<"select"> & {
  item: IMonth[];
  value: number;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  style: string;
};

const Select = ({ item, value, onChange, style, disabled }: SelectProps) => {
  return (
    <div>
      <select
        className={`text-purpleLubank text-center text-md py-3 rounded-md border-2 border-gray-200 outline-none ${style}`}
        value={value}
        onChange={onChange} // Mantém a função onChange recebida
        disabled={disabled}
      >
        <option className="text-black" disabled value="0">
          Selecione uma opção
        </option>

        {item.map((month) => (
          <option
            key={month.month_id}
            value={month.month_id}
            className="text-black"
          >
            {month.month_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
