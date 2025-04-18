'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, 
  Button, 
  TextField, 
  Paper, 
  Alert,
  CircularProgress 
} from '@mui/material';
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
  const [isLoggingIn, setIsLoggingIn] = useState(false); // New state for loading
  const router = useRouter();

  const handleLogin = async () => {
    setErrorMsg('');
    setIsLoggingIn(true); // Start loading

    if (!email || !password) {
      setErrorMsg(t('requiredCredentials'));
      setIsLoggingIn(false);
      return;
    }

    try {
      const result = await login(email, password);
      if (result.success) {
        router.push('/appointments');
      } else {
        setErrorMsg(t('invalidLogin'));
      }
    } catch (error) {
      setErrorMsg(t('loginError'));
    } finally {
      setIsLoggingIn(false); // Stop loading in all cases
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
          disabled={isLoggingIn} // Disable during loading
        />

        <TextField
          label={t('password')}
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          sx={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoggingIn} // Disable during loading
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton 
                  onClick={() => setShowPassword((prev) => !prev)} 
                  edge="end"
                  disabled={isLoggingIn} // Disable during loading
                >
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
          disabled={isLoggingIn} // Disable during loading
        >
          {isLoggingIn ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            t('login')
          )}
        </Button>
      </Paper>
    </Box>
  );
}