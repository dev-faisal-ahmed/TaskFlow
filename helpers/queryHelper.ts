/* eslint-disable @typescript-eslint/no-explicit-any */
export const generateTaskFilterQuery = (
  query: Record<string, any>,
  userEmail: string,
) => {
  const whereQuery: Record<string, any> = {
    userEmail: { _eq: userEmail },
    isDeleted: { _eq: false },
  };
  const { categoryId, status, key } = query;

  // when key
  if (key)
    whereQuery['_or'] = [
      { title: { _iregex: key } },
      { description: { _iregex: key } },
    ];

  if (status) whereQuery['status'] = { _eq: status };
  if (categoryId) whereQuery['categoryId'] = { _eq: categoryId };

  return whereQuery;
};
