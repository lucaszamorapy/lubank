import { useState } from "react";

interface TypeObject {
  regex: RegExp;
  message: string;
}

const types: Record<string, TypeObject> = {
  name: {
    regex: /^[A-Za-zÀ-ú0-9\s]{3,}$/,
    message: "O usuário deve conter no mínimo 3 caracteres.",
  },
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha um email válido",
  },
  number: {
    regex: /^-?\d*\.?\d*$/,
    message: "Preencha apenas com números.",
  },
};

type UseFormType = keyof typeof types | "checkbox" | false;

interface ValidationResult {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  validate: () => boolean;
  onBlur: () => boolean;
}

const useForm = (type: UseFormType): ValidationResult => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  function validate(value: string): boolean {
    if (type === false) return true;
    if (value.length === 0) {
      setError("Preencha um valor.");
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError("");
      return true;
    }
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    let formattedValue = event.target.value;
    // Aplica a máscara para celular (exemplo para celular brasileiro)
    if (type === "number") {
      formattedValue = formatPhoneNumber(event.target.value);
    }

    setValue(formattedValue);
    validate(formattedValue);
  }

  function formatPhoneNumber(value: string): string {
    // Remove todos os caracteres não numéricos
    const cleaned = value.replace(/\D/g, "");
    // Limita o número de caracteres para 13 (como (XX) XXXXX-XXXX)
    const maxLength = 11;
    const maskedValue = cleaned.slice(0, maxLength);
    // Aplica a máscara (XX) XXXXX-XXXX
    const match = maskedValue.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (match) {
      const formattedValue = !match[2]
        ? match[1]
        : `(${match[1]}) ${match[2]}` + (match[3] ? `-${match[3]}` : "");
      return formattedValue.trim();
    }

    return maskedValue;
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
