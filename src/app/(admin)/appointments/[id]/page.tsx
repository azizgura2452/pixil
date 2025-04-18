'use client';

import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Chip,
    CircularProgress,
    Stack,
    Divider,
    Paper,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InfoIcon from '@mui/icons-material/Info';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getToken } from '@/services/authService';
import { getAppointments } from '@/services/appointmentService';
import { useTranslation } from 'react-i18next';

interface IAppointment {
    datetime: string;
    name: string;
    status: string | null;
    statusColor: string | null;
    imageUrl: string | null;
}

export default function AppointmentDetails() {
    const router = useRouter();
    const params = useParams();
    const { t } = useTranslation();
    const { id } = params;

    const [appointment, setAppointment] = useState<IAppointment | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push('/login');
            return;
        }

        if (id) {
            const decodedId = decodeURIComponent(id as string);
            getAppointments()
                .then((appointments) => {
                    const appt = appointments.find((record: IAppointment) => record.name === decodedId);
                    setAppointment(appt || null);
                })
                .catch(() => router.push('/login'))
                .finally(() => setLoading(false));
        }
    }, [id, router]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!appointment) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography variant="h6">Appointment not found</Typography>
            </Box>
        );
    }

    return (
        <Box p={4} maxWidth="700px" mx="auto">
            <Typography variant="h4" gutterBottom fontWeight={600}>
                {t('appointmentDetail')}
            </Typography>

            <Card sx={{ overflow: 'hidden', borderRadius: 4 }}>
                <CardMedia
                    component="img"
                    height="280"
                    image={appointment.imageUrl ?? 'https://via.placeholder.com/600x280?text=No+Image'}
                    alt={appointment.name}
                    sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                    <Stack spacing={2}>
                        <Typography variant="h5" fontWeight={600}>
                            {appointment.name}
                        </Typography>

                        <Divider />

                        <Paper variant="outlined" sx={{ p: 2 }}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <CalendarMonthIcon color="primary" />
                                <Box>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        {t('appointmentDateTime')}
                                    </Typography>
                                    <Typography variant="body1">{appointment.datetime}</Typography>
                                </Box>
                            </Stack>
                        </Paper>

                        {appointment.status && (
                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <InfoIcon color="primary" />
                                    <Box>
                                        <Typography variant="subtitle2" color="textSecondary">
                                        {t('status')}
                                        </Typography>
                                        <Chip
                                            label={t(appointment.status)}
                                            sx={{
                                                backgroundColor: appointment.statusColor || '#ccc',
                                                color: '#fff',
                                                mt: 0.5,
                                                fontWeight: 600,
                                            }}
                                        />
                                    </Box>
                                </Stack>
                            </Paper>
                        )}

                        {/* Add more fields like Notes, Contact, Location etc if available */}
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
