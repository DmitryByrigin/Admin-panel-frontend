import { Backend_URL } from '@/lib/Contants';
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(Backend_URL + '/auth/refresh', {
    method: 'POST',
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Username',
          type: 'text',
          placeholder: 'jsmith',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;

        let res;

        if (credentials.password == '') {
          res = await fetch(Backend_URL + '/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: email, password }),
          });
        } else {
          res = await fetch(Backend_URL + '/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username: email, password }),
            headers: { 'Content-Type': 'application/json' },
          });
        }

        if (res.status == 401) {
          console.log(res.statusText);
          return null;
        }
        const user = await res.json();

        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        if (user.image) {
          const res = await fetch(Backend_URL + '/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
          });
          const user1 = await res.json();
          return { ...token, ...user1 };
        } else {
          return { ...token, ...user };
        }
      }

      if (token.backendTokens && 'expiresIn' in token.backendTokens) {
        if (new Date().getTime() < token.backendTokens.expiresIn) return token;

        return await refreshToken(token);
      }
    },

    async session({ token, session }) {
      if (token && 'user' in token) {
        session.user = token.user;
        session.backendTokens = token.backendTokens;
        return session;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
