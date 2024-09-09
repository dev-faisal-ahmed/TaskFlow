'use server';

import bcrypt from 'bcrypt';

import { apolloClient, gql } from '@/lib/graphQlClient';
import { TRegisterSchema } from './registerSchema';
import { SALT } from '@/lib/config';

// register user query
const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    insert_user_one(
      object: { name: $name, email: $email, password: $password }
    ) {
      email
    }
  }
`;

export const registerAction = async (formData: TRegisterSchema) => {
  const { name, email, password } = formData;
  console.log(name, email, password);

  try {
    // encrypting password
    const hashedPassword = await bcrypt.hash(password, SALT);

    await apolloClient.mutate({
      mutation: REGISTER_USER,
      variables: { name, email, password: hashedPassword },
    });

    return { success: 'User Registration Successful' };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { error: error?.message || 'Something went wrong' };
  }
};
