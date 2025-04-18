import { Box } from '@mui/material';
import Image from 'next/image';

export default function Logo() {
  return (
    <Box sx={{ mb: 2, textAlign: 'center' }}>
      <Image src="/assets/logo.png" alt="Logo" width={180} height={140} />
    </Box>
  );
}
