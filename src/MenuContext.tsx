import React, { createContext, useState } from 'react';

export const MenuContext = createContext({});

export const MenuProvider = ({ children }:any) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <MenuContext.Provider value={{ openMenu, setOpenMenu }}>
      {children}
    </MenuContext.Provider>
  );
};