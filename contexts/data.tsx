import * as React from "react";

export const KhataContext = React.createContext<any>(null);

interface KhataProviderProps {
  children: React.ReactNode;
}

const KhataProvider: React.FC<KhataProviderProps> = ({ children }) => {
  const [khata, setKhata] = React.useState<any>({});

  const addAmount = (
    customerId: string,
    amount: number,
    note: string,
    date: string
  ) => {
    const localKhata = khata;
    if (localKhata[customerId]) {
      localKhata[customerId] = [
        ...localKhata[customerId],
        { amount, note, date },
      ];
    } else {
      localKhata[customerId] = [{ amount, note, date }];
    }
    setKhata(localKhata);
  };

  return (
    <KhataContext.Provider value={{ khata, setKhata, addAmount }}>
      {children}
    </KhataContext.Provider>
  );
};

export const useKhata = () => {
  const { khata, setKhata, addAmount } = React.useContext(KhataContext);
  return { khata, setKhata, addAmount };
};
export default KhataProvider;
