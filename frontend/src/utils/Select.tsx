import React from "react";

type IItem = {
  id: number;
  role_name: string;
};

type SelectProps = React.ComponentProps<"select"> & {
  item: IItem[];
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  style: string;
};

const Select = ({ item, value, onChange, style }: SelectProps) => {
  return (
    <div>
      <select
        className={`text-purpleContabilize text-center text-md py-3 rounded-md  border-b-2 border-purpleContabilize outline-none w-full ${style}`}
        value={value}
        onChange={onChange}
      >
        <option className="text-black" disabled value="">
          Selecione uma opção
        </option>

        {item.map((role) => (
          <option key={role.id} value={role.role_name} className="text-black">
            {role.role_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
