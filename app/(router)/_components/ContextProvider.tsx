// context.ts
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  HandleOpen: () => void;
}

const MyContext = createContext<ContextProps | undefined>(undefined);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const HandleOpen = () => {
    return setIsOpen(prev => !prev)
  }
  


  return (
    <MyContext.Provider value={{ isOpen, setIsOpen, HandleOpen, }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = (): ContextProps => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
