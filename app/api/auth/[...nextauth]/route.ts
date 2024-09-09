import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, { NextAuthOptions } from 'next-auth';

import { apolloClient } from '@/lib/graphQlClient';
import { GET_USER_BY_EMAIL } from '@/lib/query';

interface ICredentials {
  email: string;
  password: string;
}

const authOption: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        const { email, password } = credentials as ICredentials;

        try {
          // getting user info
          const { data } = await apolloClient.query({
            query: GET_USER_BY_EMAIL,
            variables: { email },
          });

          const [user] = data.user;
          if (!user) throw new Error('User not found');

          const { name } = user;
          const isPasswordMatch = await bcrypt.compare(password, user.password);

          if (!isPasswordMatch) throw new Error('Wrong password');

          return { id: email, email, name };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
