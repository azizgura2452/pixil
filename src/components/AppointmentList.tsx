'use client';

import { Box, Card, CardContent, CardMedia, Grid, Typography, Chip } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

interface IAppointment {
  datetime: string;
  name: string;
  status: string | null;
  statusColor: string | null;
  imageUrl: string | null;
}

interface AppointmentListProps {
  appointments: IAppointment[];
}

export default function AppointmentList({ appointments }: AppointmentListProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const handleCardClick = (id: string) => {
    // Redirect to the appointment details page (use the appointment ID in the URL)
    router.push(`/appointments/${id}`);
  };

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        {t('appointments')}
      </Typography>
      <Grid container spacing={3}>
        {appointments.map((appt, index) => (
          <Grid key={index}>
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
