'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Card, CardContent, CardMedia, Grid, Typography, Chip, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { getToken } from '@/services/authService';
import { getAppointments } from '@/services/appointmentService';

interface IAppointment {
  datetime: string;
  name: string;
  status: string | null;
  statusColor: string | null;
  imageUrl: string | null;
}

export default function AppointmentList() {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    getAppointments()
      .then((data) => setAppointments(data))
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  const handleCardClick = (id: string) => {
    router.push(`/appointments/${id}`);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        {t('appointments')}
      </Typography>
      <Grid container spacing={3}>
        {appointments.map((appt, index) => (
          <Grid  key={index}>
            <Card onClick={() => handleCardClick(appt.name)} sx={{ cursor: 'pointer' }}>
              {appt.imageUrl ? (
                <CardMedia
                  component="img"
                  height="140"
                  image={appt.imageUrl}
                  alt={appt.name}
                />
              ) : (
                <Box
                  height={140}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bgcolor="#f0f0f0"
                >
                  <Typography variant="body2">{t('noImage')}</Typography>
                </Box>
              )}
              <CardContent>
                <Typography variant="h6">{appt.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {appt.datetime}
                </Typography>
                {appt.status && (
                  <Chip
                    label={t(appt.status)}
                    sx={{
                      backgroundColor: appt.statusColor || '#ccc',
                      color: '#fff',
                      mt: 1,
                    }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}