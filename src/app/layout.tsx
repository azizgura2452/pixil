'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import { Box, Fab } from '@mui/material';
import i18n from '@/lib/i18n';
import { Typography } from '@mui/material';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState(i18n.language || 'en');
  const [direction, setDirection] = useState<'ltr' | 'rtl'>(language === 'ar' ? 'rtl' : 'ltr');

  useEffect(() => {
    i18n.changeLanguage(language);
    setDirection(language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#6D1F5C',
      },
    },
    direction,
    typography: {
      fontFamily: direction === 'rtl' ? 'Cairo, sans-serif' : 'Roboto, sans-serif',
    },
  });

  return (
    <html lang={language} dir={direction}>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}

          {/* Floating Language Selector */}
          <Box
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              zIndex: 1000,
            }}
          >
            <Fab
              color="primary"
              aria-label="language selector"
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            >
              {language === 'en' ? (
                <Typography variant="h6" color="white">عربي</Typography> // Show "AR" if language is "en"
              ) : (
                <Typography variant="h6" color="white">EN</Typography> // Show "EN" if language is "ar"
              )}
            </Fab>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
