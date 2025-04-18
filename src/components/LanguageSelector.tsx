// components/LanguageSelector.tsx
'use client';

import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';
import i18n from '@/lib/i18n';
import { useState } from 'react';

const LanguageSelector = () => {
  const { t } = useTranslation('common');
  const [language, setLanguage] = useState(i18n.language || 'en');

  const handleLanguageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newLanguage = event.target.value as string;
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
    document.documentElement.lang = newLanguage;
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <FormControl size="small">
      <InputLabel>{t('language')}</InputLabel>
      <Select value={language} label={t('language')} onChange={handleLanguageChange}>
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="ar">العربية</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
