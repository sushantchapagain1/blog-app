import { postRegister } from '../../services/auth.service';
import { useMutation } from 'react-query';

export type FormValues = {
  name: string;
  email: string;
  password: string;
};

export function useCreateUser() {
  const {
    mutate: create,
    isLoading: isCreating,
    isError,
    error,
    isSuccess,
  } = useMutation<FormValues, any, any, any>({ mutationFn: postRegister });

  return { create, isCreating, isSuccess, error, isError };
}
