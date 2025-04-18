'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, Typography, Paper, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import { styles } from '@/styles/login.styles';
import Logo from './Logo';
import { login } from '@/services/authService';
import { useTranslation } from 'react-i18next';

export default function LoginForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please fill in both fields');
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      router.push('/appointments'); // ✅ redirect on success
    } else {
      setErrorMsg(result.message || 'Invalid credentials');
    }
  };

  return (
    <Box sx={styles.wrapper}>
      <Paper elevation={3} sx={styles.formContainer}>
        <Logo />

        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}

        <TextField
          label={t('email')}
          variant="outlined"
          fullWidth
          sx={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label={t('password')}
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          sx={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={styles.button}
          onClick={handleLogin}
        >
          {t('login')}
        </Button>
      </Paper>
    </Box>
  );
}
