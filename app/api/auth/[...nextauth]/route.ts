import bcrypt from 'bcrypt';
import NextAuth, { NextAuthOptions } from 'next-auth';

import { gql, apolloClient } from '@/lib/graphQlClient';
import CredentialsProvider from 'next-auth/providers/credentials';

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
            query: gql`
            query GetUserByEmail {
              user_by_pk(email: ${email}) {
                name
                email
                password
              }
            }
          `,
          });

          // return null is no user found
          if (!data.user_by_pk) throw new Error('User not found!');

          const user = data.user_by_pk;
          // comparing password
          const isPasswordMatch = await bcrypt.compare(password, user.password);
          if (!isPasswordMatch) throw new Error('Password does not match');

          return { id: email, email, name: user.name };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOption);
