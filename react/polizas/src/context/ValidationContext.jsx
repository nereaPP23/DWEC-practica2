import { createContext, useContext } from "react";

const ValidationContext = createContext();

export const ValidationProvider = ({ children }) => {
  const regexs = {
    idPoliza: /^ID\d{5}$/,
    matricula: /^\d{4}[BCDFGHJKLMNPRSTVWXYZ]{3}$/,
  };

  return (
    <ValidationContext.Provider value={regexs}>
      {children}
    </ValidationContext.Provider>
  );
};

export const useValidation = () => {
  return useContext(ValidationContext);
};
