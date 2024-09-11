import { toast } from 'sonner';

// this function will be used all the mutation
export const catchAsync = async (fn: () => void, id: string | number) => {
  return Promise.resolve(fn()).catch((error) => {
    toast.error(error.message, { id });
  });
};
