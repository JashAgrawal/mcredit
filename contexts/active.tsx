import * as React from "react";

export const ActiveCustomerContext = React.createContext<any>(null);

interface ActiveCustomerProviderProps {
  children: React.ReactNode;
}

const ActiveCustomerProvider: React.FC<ActiveCustomerProviderProps> = ({
  children,
}) => {
  const [activeCustomer, setActiveCustomer] = React.useState("");

  return (
    <ActiveCustomerContext.Provider
      value={{ activeCustomer, setActiveCustomer }}
    >
      {children}
    </ActiveCustomerContext.Provider>
  );
};

export const useActiveCustomer = () => {
  const { activeCustomer, setActiveCustomer } = React.useContext(
    ActiveCustomerContext
  );
  return { activeCustomer, setActiveCustomer };
};
export default ActiveCustomerProvider;
