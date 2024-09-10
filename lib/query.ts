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

export const GET_TASK_BY_EMAIL = gql`
  query GetTaskByEmail($userEmail: String!) {
    task(where: { userEmail: { _eq: $userEmail }, isDeleted: { _eq: false } }) {
      id
      title
      description
      status
      date
      category {
        id
        name
      }
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

export const ADD_TASK = gql`
  mutation AddTask(
    $title: String!
    $description: String!
    $categoryId: uuid!
    $userEmail: String!
  ) {
    insert_task_one(
      object: {
        title: $title
        description: $description
        categoryId: $categoryId
        userEmail: $userEmail
      }
    ) {
      id
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: uuid!, $title: String, $description: String) {
    update_task_by_pk(
      pk_columns: { id: $id }
      _set: { title: $title, description: $description }
    ) {
      id
    }
  }
`;

export const UPDATE_TASK_STATUS = gql`
  mutation UpdateTask($id: uuid!, $status: status_enum!) {
    update_task_by_pk(pk_columns: { id: $id }, _set: { status: $status }) {
      id
    }
  }
`;

export const DELETE_TASK = gql`
  mutation SoftDelete($id: uuid!) {
    update_task_by_pk(pk_columns: { id: $id }, _set: { isDeleted: true }) {
      id
    }
  }
`;
