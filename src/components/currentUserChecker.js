import React, { useEffect, useContext } from 'react';

import useFetch from '../hooks/useFetch';
import { CurrentUserContext } from '../contexts/currentUser';
import useLocalStorage from '../hooks/useLocalStorage';

const CurrentUserChecker = ({ children }) => {
  const [{ response }, doFetch] = useFetch('/user');
  const [, setCurruntUserState] = useContext(CurrentUserContext);
  const [token] = useLocalStorage('token');

  useEffect(() => {
    if (!token) {
      setCurruntUserState(state => ({
        ...state,
        isLoggedIn: false,
      }));
      return;
    }

    doFetch();
    setCurruntUserState(state => ({
      ...state,
      isLoading: true,
    }));
  }, []);

  useEffect(() => {
    if (!response) {
      return;
    }

    setCurruntUserState(state => ({
      ...state,
      isLoggedIn: true,
      isLoading: false,
      currentUser: response.user,
    }));
  }, [response, setCurruntUserState]);

  return children;
};

export default CurrentUserChecker;
