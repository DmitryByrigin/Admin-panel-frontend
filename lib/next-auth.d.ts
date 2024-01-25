declare module 'next-auth' {
  interface Session {
    user: {
      image: string | undefined;
      id: number;
      email: string;
      name: string;
      surname: string;
      role: string;
    };

    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      image: string | undefined;
      id: number;
      email: string;
      name: string;
      role: string;
    };

    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}
