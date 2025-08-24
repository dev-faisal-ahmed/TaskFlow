import { gql } from '@apollo/client';

// query
export const GET_CATEGORY = gql`
  query GetCategory($userEmail: String!) {
    categories(
      where: { userEmail: { _eq: $userEmail } }
      order_by: { createdAt: desc }
    ) {
      id
      name
    }
  }
`;

// mutation
export const INSERT_CATEGORY = gql`
  mutation InsertCategory($name: String!, $userEmail: String!) {
    insert_categories_one(object: { name: $name, userEmail: $userEmail }) {
      id
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($name: String!, $id: uuid!) {
    update_categories_by_pk(pk_columns: { id: $id }, _set: { name: $name }) {
      id
      name
    }
  }
`;
