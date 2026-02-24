"use client";

import { IUser } from '@/interfaces/user';
import React, { createContext, useContext } from 'react';

type UserType = IUser | null;

interface IUserContext {
  user: UserType;
  isLoading: boolean;
}


export const UserContext = createContext<IUserContext | undefined>(undefined);

interface IProps {
  children: React.ReactNode;
  userData: IUserContext; 
}

const UserContextProvider = ({ children, userData }: IProps) => {

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
};

// add custom hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserContextProvider');
  }
  return context;
};

export default UserContextProvider;