import { gql } from '@apollo/client';

export const GET_CATEGORY_BY_EMAIL = gql`
  query GetCategoryByEmail($userEmail: String!) {
    category(where: { userEmail: { _eq: $userEmail } }) {
      id
      name
    }
  }
`;
