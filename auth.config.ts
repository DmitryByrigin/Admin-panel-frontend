import { NextAuthConfig } from 'next-auth';
import { auth } from './auth';

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/authorization/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL(`/dashboard`, nextUrl));
      }
      console.log(auth?.user);
      return true;
    },
  },
} satisfies NextAuthConfig;
