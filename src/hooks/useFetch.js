import {useState, useEffect} from 'react';
import Axios from 'axios';

export default (url) => {
  const baseUrl = 'https://conduit.productionready.io/api';
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  const doFetch = (options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    Axios(baseUrl + url, options)
      .then(res => {
        console.log('success', res);
        setIsLoading(false);
        setResponse(res.data);
      })
      .catch(err => {
        console.log('error', err);
        setIsLoading(false);
        setError(err.response.data);
      });
  }, [isLoading]);
  
  return [{isLoading, response, error}, doFetch];
}