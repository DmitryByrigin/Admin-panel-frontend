import '@/styles/globals.css';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';
import { Providers } from './providers';
import Navbar from '@/components/navbar/navbar';
import clsx from 'clsx';
import { auth } from '@/auth';
import Sidebar from '@/components/sidebar/Sidebar';
import { SidebarProvider } from './sidebar/SidebarContext';
import { SessionProvider } from 'next-auth/react';
// import Sidebar from "@/components/sidebar/Sidebar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={clsx(
          'bg-background font-sans antialiased',
          fontSans.variable,
          !session && 'flex justify-center align-center items-center h-screen',
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          <SidebarProvider>
            <SessionProvider session={session}>
              <div className="flex">
                {session && <Sidebar />}
                <div className="flex flex-col flex-grow">
                  {session && <Navbar />}
                  <main className="flex-grow">{children}</main>
                </div>
              </div>
            </SessionProvider>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
