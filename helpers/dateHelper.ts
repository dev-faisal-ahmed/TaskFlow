export const getAfterTime = (date: Date, timeSpan: number) => {
  const dateAsTime = date.getTime() + timeSpan * 60000;
  return new Date(dateAsTime);
};
