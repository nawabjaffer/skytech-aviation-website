import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingStateContextType {
  isLoadingComplete: boolean;
  setLoadingComplete: (complete: boolean) => void;
}

const LoadingStateContext = createContext<LoadingStateContextType | undefined>(undefined);

export const LoadingStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const setLoadingComplete = (complete: boolean) => {
    setIsLoadingComplete(complete);
  };

  return (
    <LoadingStateContext.Provider value={{ isLoadingComplete, setLoadingComplete }}>
      {children}
    </LoadingStateContext.Provider>
  );
};

export const useLoadingState = () => {
  const context = useContext(LoadingStateContext);
  if (context === undefined) {
    throw new Error('useLoadingState must be used within a LoadingStateProvider');
  }
  return context;
};

export default LoadingStateContext;
