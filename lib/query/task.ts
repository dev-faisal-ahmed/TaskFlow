import { gql } from '@apollo/client';

// query
export const GET_TASKS = gql`
  query GetTasks($whereQuery: task_bool_exp, $sortOrder: order_by!) {
    task(where: $whereQuery, order_by: { date: $sortOrder }) {
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

// soft soft deletion
export const DELETE_TASK = gql`
  mutation SoftDelete($id: uuid!) {
    update_task_by_pk(pk_columns: { id: $id }, _set: { isDeleted: true }) {
      id
    }
  }
`;

export const RESTORE_TASK = gql`
  mutation RestoreTask($id: uuid!) {
    update_task_by_pk(pk_columns: { id: $id }, _set: { isDeleted: false }) {
      id
    }
  }
`;

export const PERMANENTLY_DELETE_TASK = gql`
  mutation PermanentlyDelete($id: uuid!) {
    delete_task_by_pk(id: $id) {
      id
    }
  }
`;

// subscription
export const GET_DELETED_TASKS = gql`
  subscription GetTaskByEmail($userEmail: String!) {
    task(where: { userEmail: { _eq: $userEmail }, isDeleted: { _eq: true } }) {
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
