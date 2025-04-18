'use client';

import { ReactNode } from 'react';
import { Box } from '@mui/material';
import AdminNavbar from '@/components/AdminNavbar';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Box>
      <AdminNavbar />
      <Box mt={8} px={3}>
        {children}
      </Box>
    </Box>
  );
}
