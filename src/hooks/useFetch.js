import { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';

import useLocalStorage from '../hooks/useLocalStorage';

export default url => {
  const baseUrl = 'https://conduit.productionready.io/api';
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage('token');

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : '',
        },
      },
    };

    if (!isLoading) {
      return;
    }

    Axios(baseUrl + url, requestOptions)
      .then(res => {
        setIsLoading(false);
        setResponse(res.data);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err.response.data);
      });
  }, [isLoading, options, url, token]);

  return [{ isLoading, response, error }, doFetch];
};
