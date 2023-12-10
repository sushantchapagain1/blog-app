import { Link } from 'react-router-dom';
import { useForm, Resolver } from 'react-hook-form';

import Loader from './Loader';

import { FormValues, useCreateUser } from '../hooks/user/useCreateUser';

const resolver: Resolver<FormValues> = async (values) => {
  const errors: {
    [key: string]: { type: string; message: string; value?: number };
  } = {};

  if (!values.name) {
    errors['name'] = {
      type: 'required',
      message: 'Full name is required.',
    };
  } else if (values.name.length < 4) {
    errors['name'] = {
      type: 'minLength',
      message: 'Full name must be at least 6 characters.',
    };
  }

  if (!values.email) {
    errors['email'] = {
      type: 'required',
      message: 'Email is required.',
    };
  } else if (values.email.length < 6) {
    errors['email'] = {
      type: 'minLength',
      message: 'Email must be at least 6 characters.',
    };
  }

  if (!values.password) {
    errors['password'] = {
      type: 'required',
      message: 'Password is required.',
    };
  } else if (values.password.length < 6) {
    errors['password'] = {
      type: 'minLength',
      message: 'Password must be at least 6 characters.',
      value: 6,
    };
  }

  return {
    values: values.name ? values : {},
    errors: errors,
  };
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const { create, error, isCreating, isError, isSuccess } = useCreateUser();

  const onSubmit = handleSubmit((data) => {
    try {
      create(data);
    } catch (error) {
      console.error(error);
    }
  });

  if (isCreating) {
    return <Loader />;
  }

  return (
    <div className="bg-light-green flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl mb-5 text-[teal] font-bold">Register</h1>

      <form
        className="flex flex-col gap-3 p-9 w-[400px] bg-white rounded-lg"
        onSubmit={onSubmit}
      >
        {isSuccess && (
          <p className="text-[teal] text-center">Registration Successfull !</p>
        )}

        {isError && (
          <p className="text-red-500 text-center">
            {error?.response?.data?.message || 'Something went wrong'}
          </p>
        )}

        <input
          type="text"
          placeholder="Full Name"
          className={`border border-gray p-3 outline-none ${
            errors?.name && 'border-red-500'
          }`}
          {...register('name')}
        />
        {errors?.name && (
          <p className="text-red-500 text-xs">{errors.name.message}</p>
        )}
        <input
          type="email"
          placeholder="email"
          className={`border border-gray p-3 outline-none ${
            errors?.email && 'border-red-500'
          }`}
          {...register('email')}
        />
        {errors?.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}
        <input
          type="password"
          placeholder="password"
          className={`border border-gray p-3 outline-none ${
            errors?.password && 'border-red-500'
          }`}
          {...register('password')}
        />
        {errors?.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}
        <button
          className="bg-[teal] p-3 text-white"
          type="submit"
          disabled={isCreating}
        >
          Regsiter
        </button>

        <span className="text-center text-sm">
          Do you have an account?{' '}
          <Link to="/login" className="text-[teal]">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default RegisterForm;
