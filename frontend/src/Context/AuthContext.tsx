import { useQuery } from 'react-query';
import React, { createContext, useContext } from 'react';
import { isLoggedIn } from '../services/auth.service';

type PropType = {
  children: React.ReactNode;
};

type User = {
  id: string;
  name: string;
  email: string;
};

export interface AuthContextType {
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  user: User;
}

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: PropType) => {
  const { data, isLoading, isSuccess, isError } = useQuery('auth', isLoggedIn);

  return (
    <AuthContext.Provider
      value={{ isSuccess, isError, isLoading, user: data?.data }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext) as AuthContextType;
};
