'use client';

import { createContext, useState } from 'react';
import clsx from 'clsx';
import { fontSans } from '@/config/fonts';
import { Providers } from '../providers';

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
