import { gql } from '@apollo/client';

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
