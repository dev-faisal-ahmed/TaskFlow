import { gql } from '@apollo/client';

// query
export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    users(where: { email: { _eq: $email } }) {
      email
      name
      password
    }
  }
`;

// mutation
export const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    insert_users_one(
      object: { name: $name, email: $email, password: $password }
    ) {
      email
    }
  }
`;
