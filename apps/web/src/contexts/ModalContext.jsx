import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalActive, setIsModalActive] = useState(false);

  return (
    <ModalContext.Provider value={{ isModalActive, setIsModalActive }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext); 