// hooks/useLanguage.ts
'use client';

import { useState, useCallback } from 'react';
import i18n from '@/lib/i18n';

const useLanguage = () => {
  const [language, setLanguage] = useState(i18n.language || 'en');
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const setHtmlAttributes = useCallback(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);

  return { language, direction, toggleLanguage, setHtmlAttributes };
};

export default useLanguage;
