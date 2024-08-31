type IRole = {
  role_id: number;
  role_name: string;
};

type IMonth = {
  month_id: number;
  month_name: string;
};

type SelectProps = React.ComponentProps<"select"> & {
  item: IRole[] | IMonth[];
  value: number;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  style: string;
};

const Select = ({ item, value, onChange, style, disabled }: SelectProps) => {
  const isRole = (item: IRole[] | IMonth[]): item is IRole[] => {
    return (item as IRole[])[0]?.role_name !== undefined;
  };

  return (
    <div>
      <select
        className={`text-purpleContabilize text-center text-md py-3 rounded-md border-b-2 border-purpleContabilize outline-none ${style}`}
        value={value}
        onChange={onChange} // Mantém a função onChange recebida
        disabled={disabled}
      >
        <option className="text-black" disabled value="0">
          Selecione uma opção
        </option>

        {isRole(item)
          ? item.map((role) => (
              <option
                key={role.role_id}
                value={role.role_id} // Aqui envia o ID do role
                className="text-black"
              >
                {role.role_name}
              </option>
            ))
          : item.map((month) => (
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
