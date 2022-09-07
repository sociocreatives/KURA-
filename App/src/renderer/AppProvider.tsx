import { createContext, useState, FC } from 'react';

export type AppContextType = {
  readings: Array<number>;
  addReading: (reading: number) => void;
};
const contextDefaultValues: AppContextType = {
  readings: [],
  addReading: () => {},
};

export const AppContext = createContext<AppContextType>(contextDefaultValues);

const AppProvider: FC = ({ children }) => {
  const [readings, setTReadngs] = useState<number[]>(
    contextDefaultValues.readings
  );

  const addReading = (reading: number) =>
    setTReadngs((readings) => [...readings, reading]);

  return (
    <AppContext.Provider
      value={{
        readings,
        addReading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
