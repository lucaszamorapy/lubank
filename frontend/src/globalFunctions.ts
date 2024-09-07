import moment from "moment";

export const formatCurrency = (value: number): string => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const formatarData = (value: string) => {
  const dataValida = moment(value, "DD/MM/YYYY");
  return dataValida;
};

export const handleChangeDate = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  let input = event.target.value;
  input = input.replace(/\D/g, "");

  if (input.length > 4) {
    input = input.substring(0, 4);
  }
  return input;
};

export const convertToNumber = (value: string): number => {
  const cleanedValue = value.replace(",", ".").replace("R$", "");
  const parsedValue = parseFloat(cleanedValue);
  if (isNaN(parsedValue)) {
    return 0;
  }
  return Math.round(parsedValue * 100) / 100;
};
