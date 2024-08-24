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
