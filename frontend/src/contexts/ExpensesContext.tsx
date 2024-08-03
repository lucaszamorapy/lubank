import React, { createContext, useState, useContext } from "react";

interface IExpense {
  expense_id: number;
  user_id: number;
  month_name: string;
  amount: string;
  description: string;
}

interface IExpenseContext {
  expenses: IExpense[];
  setExpenses: React.Dispatch<React.SetStateAction<IExpense[]>>;
}

interface IChildren {
  children: JSX.Element;
}

const ExpenseContext = createContext<IExpenseContext | undefined>(undefined);

export const ExpenseProvider = ({ children }: IChildren) => {
  const [expenses, setExpenses] = useState<IExpense[]>([]);

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpense must be used within an ExpenseProvider");
  }
  return context;
};