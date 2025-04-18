import React, { createContext, useContext, useState } from 'react';

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('userToken') || '');

  const updateToken = (newToken) => {
    localStorage.setItem('userToken', newToken);
    setToken(newToken);
  };

  return (
    <TokenContext.Provider value={{ token, updateToken }}>
      {children}
    </TokenContext.Provider>
  );
};


export const useToken = () => useContext(TokenContext);