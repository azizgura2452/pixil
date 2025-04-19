// components/layout/AppLayout.tsx
'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useMemo } from 'react';
import useLanguage from '@/hooks/useLanguage';
import LanguageToggleButton from './LanguageToggleButton';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { language, direction, setHtmlAttributes } = useLanguage();

  useEffect(() => {
    setHtmlAttributes();
  }, [language, direction, setHtmlAttributes]);

  const theme = useMemo(() =>
    createTheme({
      palette: {
        primary: { main: '#6D1F5C' },
      },
      direction: direction as 'ltr' | 'rtl',
      typography: {
        fontFamily: direction === 'rtl' ? 'Cairo, sans-serif' : 'Roboto, sans-serif',
      },
    }), [direction]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
      <LanguageToggleButton />
    </ThemeProvider>
  );
}
