import React, { createContext, useState } from 'react';

export const AdvancedSearchContext = createContext({});

export const AdvancedSearchProvider = ({ children }:any) => {


  return (
    <AdvancedSearchContext.Provider value={{ }}>
      {children}
    </AdvancedSearchContext.Provider>
  );
};