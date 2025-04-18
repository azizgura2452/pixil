'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';
import { getToken } from '@/services/authService';
import AppointmentList from '@/components/AppointmentList';
import { getAppointments } from '@/services/appointmentService';

interface IAppointment {
  datetime: string;
  name: string;
  status: string | null;
  statusColor: string | null;
  imageUrl: string | null;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    getAppointments()
      .then((data: IAppointment[]) => setAppointments(data))
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return <AppointmentList appointments={appointments} />;
}
