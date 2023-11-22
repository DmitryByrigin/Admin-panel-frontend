import Google from 'next-auth/providers/google';
import NextAuth, { DefaultSession } from 'next-auth';
import { Backend_URL } from './lib/Contants';
import { JWT } from 'next-auth/jwt';
import { authConfig } from '@/auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

declare module '@auth/core' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      sub: string;
      role: string;
    } & DefaultSession['user'];
  }

  interface Token {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      sub: string;
      role: string;
    } & DefaultSession['user'];
    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}

interface User {
  id: number;
  name: string;
  email: string;
  image: string;
  role: string;
  backendTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}
async function getUser(email: string, password: string): Promise<User | null> {
  // console.log('getUser', email, password)
  const res = await fetch(Backend_URL + '/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  if (res.status == 401) {
    console.log(res.statusText);
    return null;
  }
  return await res.json();
}
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

//TODO fix change username to email
async function getToken(username: string, password: string) {
  const res = await fetch(Backend_URL + '/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: username, password: password }),
  });

  const token = await res.json();

  return token;
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        console.log('authorize');
        console.log(credentials);
        const parsedCredentials = z
          .object({
            //TODO fix validation
            email: z.string().email(),
            password: z.string(),
          })
          .safeParse(credentials);

        // console.log('parsedCred', parsedCredentials)
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email, password);
          if (!user) return null;
          // console.log('credentials-user', user)
          return user;
        }
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;

        let res;

        if (!credentials.password) {
          res = await fetch(Backend_URL + '/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: email, password }),
          });
          // const data = await res;
        } else {
          res = await fetch(Backend_URL + '/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username: email, password }),
            headers: { 'Content-Type': 'application/json' },
          });
        }

        if (res.status == 401) {
          // console.log(res.statusText);
          return null;
        }
        return await res.json();
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // console.log('jwt-token', token)
      // console.log('jwt-user', user)
      // console.log('jwt-account', account)
      if (account?.provider === 'google') {
        const res = await fetch(Backend_URL + '/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
        const data = await res.json();
        token.backendTokens = data.backendTokens;
        token.user = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          image: data.user.image,
        };
      }
      if (account?.provider === 'credentials') {
        token.backendTokens = user.backendTokens;
        token.user = {
          id: user.user.id,
          name: user.user.name,
          email: user.user.email,
          sub: user.user.id,
          role: user.user.role,
        };
        // console.log('jwt-token-c', token)
      }
      //return token;
      if (token.backendTokens && 'expiresIn' in token.backendTokens) {
        if (new Date().getTime() < token.backendTokens.expiresIn) return token;

        return await refreshToken(token);
      }
      return token;
    },

    async session({ session, token, user }) {
      // console.log('session', session)
      // console.log('token', token)
      // console.log('user', user)
      if (token) {
        session.user = token.user;
        session.backendTokens = token.backendTokens;
        // console.log('sessionnn', session);
        return session;
      }

      return session;
    },
  },
});
