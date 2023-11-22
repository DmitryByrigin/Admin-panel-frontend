// import NextLink from 'next/link';
// import { Link } from '@nextui-org/link';
// import { Snippet } from '@nextui-org/snippet';
// import { Code } from '@nextui-org/code';
// import { button as buttonStyles } from '@nextui-org/theme';
// import { siteConfig } from '@/config/site';
// import { title, subtitle } from '@/components/primitives';
// import { GithubIcon } from '@/components/icons';
// import DashboardPage from './dashboard/page';
// import DashBoardLayout from './dashboard/layout';
// import { useSession } from 'next-auth/react';
// import { redirect, useRouter } from 'next/navigation';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import RegisterPage from './authorization/register/page';
import RootLayout from '@/app/layout';
import { SidebarProvider } from '@/app/sidebar/SidebarContext';
import LoginPage from '@/app/authorization/login/page';

export default async function Home() {
  const session = await auth();
  // if (session?.user) {
  //   session.user = session.user;
  // }
  return (
    <SidebarProvider>
      <SessionProvider session={session}>
        <LoginPage />
      </SessionProvider>
    </SidebarProvider>
  );
}
