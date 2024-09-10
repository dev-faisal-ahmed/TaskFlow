import { gql } from '@apollo/client';

// query
export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    user(where: { email: { _eq: $email } }) {
      email
      name
      password
    }
  }
`;

export const GET_CATEGORY_BY_EMAIL = gql`
  query GetCategoryByEmail($userEmail: String!) {
    category(where: { userEmail: { _eq: $userEmail } }) {
      id
      name
    }
  }
`;

// mutation
export const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    insert_user_one(
      object: { name: $name, email: $email, password: $password }
    ) {
      email
    }
  }
`;

export const INSERT_CATEGORY = gql`
  mutation InsertCategory($name: String!, $userEmail: String!) {
    insert_category_one(object: { name: $name, userEmail: $userEmail }) {
      id
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($name: String!, $id: uuid!) {
    update_category_by_pk(pk_columns: { id: $id }, _set: { name: $name }) {
      id
      name
    }
  }
`;
