export const dynamic = 'force-dynamic'; // Add this to prevent static generation

import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/login');
}
