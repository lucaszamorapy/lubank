import React from "react";

type IRole = {
  id: number;
  role_name: string;
};

type IMonth = {
  id: number;
  month_name: string;
};

type SelectProps = React.ComponentProps<"select"> & {
  item: IRole[] | IMonth[];
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  style: string;
};

const Select = ({ item, value, onChange, style }: SelectProps) => {
  const isRole = (item: IRole[] | IMonth[]): item is IRole[] => {
    return (item as IRole[])[0]?.role_name !== undefined;
  };

  return (
    <div>
      <select
        className={`text-purpleContabilize text-center text-md py-3 rounded-md border-b-2 border-purpleContabilize outline-none ${style}`}
        value={value}
        onChange={onChange}
      >
        <option className="text-black" disabled value="">
          Selecione uma opção
        </option>

        {isRole(item)
          ? item.map((role) => (
              <option
                key={role.id}
                value={role.role_name}
                className="text-black"
              >
                {role.role_name}
              </option>
            ))
          : item.map((month) => (
              <option
                key={month.id}
                value={month.month_name}
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
