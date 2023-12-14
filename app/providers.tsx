'use client';

import * as React from 'react';
import { NextUIProvider } from '@nextui-org/system';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { SessionProvider, useSession } from 'next-auth/react';
import { auth } from '@/auth';
import { usePathname, useRouter } from 'next/navigation';
import { initialBlogFormData } from '@/lib';
import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { Blog, BlogFormData } from '@/lib/types';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

// type ContextType = {
//   loading: boolean;
//   setLoading: Dispatch<SetStateAction<boolean>>;
//   formData: BlogFormData;
//   setFormData: Dispatch<SetStateAction<BlogFormData>>;
//   searchQuery: string;
//   setSearchQuery: Dispatch<SetStateAction<string>>;
//   searchResults: Blog[];
//   setSearchResults: Dispatch<SetStateAction<Blog[]>>;
// };

// const initialState = {
//   loading: false,
//   setLoading: () => {},
//   formData: initialBlogFormData,
//   setFormData: () => {},
//   searchQuery: '',
//   setSearchQuery: () => {},
//   searchResults: [],
//   setSearchResults: () => {},
// };

// export const GlobalContext = createContext<ContextType>(initialState);

export function Providers({ children, themeProps }: ProvidersProps) {
  // const [loading, setLoading] = useState(false);
  // const [formData, setFormData] = useState(initialBlogFormData);
  // const [searchQuery, setSearchQuery] = useState('');
  // const [searchResults, setSearchResults] = useState<Blog[]>([]);

  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        {/* <GlobalContext.Provider
          value={{
            loading,
            setLoading,
            formData,
            setFormData,
            searchQuery,
            setSearchQuery,
            searchResults,
            setSearchResults,
          }}> */}
        {children}
        {/* </GlobalContext.Provider> */}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
