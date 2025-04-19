// components/layout/LanguageToggleButton.tsx
'use client';

import { Box, Fab, Typography } from '@mui/material';
import useLanguage from '@/hooks/useLanguage';

export default function LanguageToggleButton() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 1000,
      }}
    >
      <Fab color="primary" onClick={toggleLanguage}>
        <Typography variant="h6" color="white">
          {language === 'en' ? 'عربي' : 'EN'}
        </Typography>
      </Fab>
    </Box>
  );
}
