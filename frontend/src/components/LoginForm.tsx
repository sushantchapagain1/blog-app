import { Link, useNavigate } from 'react-router-dom';
import { postLogin } from '../services/auth.service';
import { useForm, Resolver } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useAuth } from '../Context/AuthContext';
import { useEffect } from 'react';
import Loading from './Loader';

type FormValues = {
  email: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  const errors: {
    [key: string]: { type: string; message: string; value?: number };
  } = {};

  if (!values.email) {
    errors['email'] = {
      type: 'required',
      message: 'Email is required.',
    };
  }

  if (!values.password) {
    errors['password'] = {
      type: 'required',
      message: 'Password is required.',
    };
  }

  return {
    values: values.email ? values : {},
    errors: errors,
  };
};

const LoginForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isSuccess } = useAuth();

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const {
    mutate: create,
    isLoading,
    isError,
    error,
  } = useMutation<FormValues, any, any, any>(postLogin, {
    onSuccess() {
      queryClient.invalidateQueries('auth');
    },
  });

  const onSubmit = handleSubmit((data) => {
    try {
      create(data);
    } catch (error) {
      console.error(error);
    }
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-light-green flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl mb-5 text-[teal] font-bold">Login</h1>

      <form
        className="flex flex-col gap-3 p-9 bg-white rounded-lg"
        onSubmit={onSubmit}
      >
        {isSuccess && (
          <p className="text-[teal] text-center">Login Successfull !</p>
        )}

        {isError && (
          <p className="text-red-500 text-center">
            {error?.response?.data?.message || 'Something went wrong'}
          </p>
        )}
        <input
          type="email"
          placeholder="email"
          {...register('email')}
          className={`border border-gray p-3 outline-none ${
            errors?.email && 'border-red-500'
          }`}
        />
        {errors?.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}
        <input
          type="password"
          placeholder="password"
          {...register('password')}
          className={`border border-gray p-3 outline-none ${
            errors?.password && 'border-red-500'
          }`}
        />
        {errors?.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}
        <button type="submit" className="bg-[teal] p-3 text-white">
          Login
        </button>

        <span className="text-center text-sm">
          Don't you have an account?
          <Link to="/register" className="text-[teal]">
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default LoginForm;
