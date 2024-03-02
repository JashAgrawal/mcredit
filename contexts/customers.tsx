import * as React from "react";
import { nanoid } from "nanoid";
import { useKhata } from "./data";
export const CustomerContext = React.createContext<any>(null);

interface CustomerProviderProps {
  children: React.ReactNode;
}

const CustomerProvider: React.FC<CustomerProviderProps> = ({ children }) => {
  const [customer, setCustomer] = React.useState<any[]>([]);
  const { setKhata, khata } = useKhata();
  const addCustomer = (name: string, number: string) => {
    const newCustomer = {
      id: Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000,
      name,
      number,
    };
    setKhata({ ...khata, [newCustomer.id]: [] });
    setCustomer([...customer, newCustomer]);
  };

  return (
    <CustomerContext.Provider value={{ customer, setCustomer, addCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const { customer, setCustomer, addCustomer } =
    React.useContext(CustomerContext);
  return { customer, setCustomer, addCustomer };
};
export default CustomerProvider;
