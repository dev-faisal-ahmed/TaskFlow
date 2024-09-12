import { useFilterContext } from '@/context/useFilterContext';
import { generateTaskFilterQuery } from '@/helpers/queryHelper';
import { GET_TASKS } from '@/lib/query';
import { ITask } from '@/lib/types';
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const limit = 6;
export const useGetTasks = () => {
  const { data: userInfo } = useSession();
  const { filters } = useFilterContext();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { data, loading } = useQuery(GET_TASKS, {
    variables: {
      whereQuery: generateTaskFilterQuery(
        filters,
        userInfo?.user?.email as string,
      ),
      sortOrder: filters.sortOrder,
      offset: (page - 1) * limit,
      limit,
    },
  });

  useEffect(() => {
    setTotalPages(
      Math.ceil((data?.task_aggregate?.aggregate?.count || 0) / limit),
    );
  }, [data]);

  const jumpPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return { tasks: data?.task as ITask[], loading, jumpPage, totalPages, page };
};
