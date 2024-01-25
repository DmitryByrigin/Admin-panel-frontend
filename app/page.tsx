import { auth } from '@/auth/auth';
import { SessionProvider } from 'next-auth/react';
import { SidebarProvider } from '@/app/sidebar/SidebarContext';
import LoginPage from '@/app/authorization/login/page';

export default async function Home() {
  const session = await auth();
  return (
    <SidebarProvider>
      <SessionProvider session={session}>
        <LoginPage />
      </SessionProvider>
    </SidebarProvider>
  );
}
