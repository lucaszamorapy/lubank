import React, { createContext, useState, useContext } from "react";

interface IModalContext {
  isOpen: boolean | undefined;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IChildren {
  children: JSX.Element;
}

const ModalOpenContext = createContext<IModalContext | undefined>(undefined);

export const ModalOpenProvider = ({ children }: IChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalOpenContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalOpenContext.Provider>
  );
};

export const useModalOpen = () => {
  const context = useContext(ModalOpenContext);
  if (!context) {
    throw new Error("useExpense must be used within an ExpenseProvider");
  }
  return context;
};
