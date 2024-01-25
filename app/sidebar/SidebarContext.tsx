'use client';

import { createContext, useState } from 'react';

const initialValue = { isCollapsed: true };

const SidebarContext = createContext(initialValue);

const SidebarProvider = ({ children }) => {
  const [isCollapsed, setCollapse] = useState(true);

  const toggleSidebarcollapse = () => {
    setCollapse((prevState) => !prevState);
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebarcollapse }}>
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarProvider };
