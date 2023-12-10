import api from '../utils/api';

type FormValues = {
  name: string;
  email: string;
  password: string;
};

export const isLoggedIn = async function () {
  try {
    return await api?.get('/auth/me');
  } catch (error) {
    throw new Error('Failed to fetch user');
  }
};

export const postRegister = async function (formData: FormValues) {
  const response = await api?.post('/auth/register', formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response?.data;
};

export const postLogin = async function (formData: FormValues) {
  const response = await api?.post('/auth/login', formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response?.data;
};

export const logout = async function () {
  try {
    return await api?.get('/auth/logout');
  } catch (error) {
    throw new Error('Failed to logout');
  }
};
