import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth';
import { Header } from '@/components/shared/Header';
import { Toaster } from '@/components/ui/toaster';

type Props = {
  children: React.ReactNode;
};

export default async function ProtectedLayout({ children }: Props) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <Header />
      <main className='container my-5'>{children}</main>

      <Toaster />
    </SessionProvider>
  );
}
