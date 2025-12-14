import { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [rechargeData, setRechargeData] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    // Initialize user from localStorage
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, rechargeData, setRechargeData, selectedPlan, setSelectedPlan }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
