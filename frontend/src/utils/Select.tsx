import React from "react";

type IItem = {
  id: number;
  role_name: string;
};

type SelectProps = React.ComponentProps<"select"> & {
  item: IItem[];
  value: string;
  onChange: () => void;
};

const Select = ({ item, value, onChange }: SelectProps) => {
  return (
    <div>
      <select
        className="text-[#979DAA] text-center text-md py-3 rounded-md  bg-opacity-10 outline-none w-full lg:w-[250px]"
        value={value}
        onChange={onChange}
      >
        <option className="text-black" disabled value="">
          Selecione uma opção
        </option>

        {item.map((role) => (
          <option key={role.id} value={role.id} className="text-black">
            {role.role_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
