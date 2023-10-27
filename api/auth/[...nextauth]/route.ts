import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentinalsProviders from 'next-auth/providers/credentials';
import { Backend_URL } from '@/lib/Contants';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentinalsProviders({
      name: 'Credentinals',
      credentials: {
        username: {
          label: 'username',
          type: 'text',
          placeholder: 'jsmith',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;
        const res = await fetch(Backend_URL + '/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            username,
            password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (res.status == 401) {
          console.log(res.statusText);

          return null;
        }
        const user = await res.json();
        return user;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
