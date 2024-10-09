import useSWR from 'swr';
import axios from 'axios';
import { getUsername } from '../helpers/helper.js';

axios.defaults.baseURL = 'http://localhost:5000';

// Fetcher function
const fetcher = (url) => axios.get(url).then((res) => res.data);

export const useFetch = (query) => {
  const {
    data: usernameData,
    isLoading: usernameLoading,
    error: usernameError,
  } = useSWR('getUsername', getUsername);

  const username = usernameData?.username;

  const shouldFetch =
    username && !query ? `/api/user/${username}` : `/api/${query}`;

  const { data, error, isLoading } = useSWR(
    shouldFetch ? shouldFetch : null,
    fetcher
  );

  return {
    apiData: data,
    isLoading: isLoading || usernameLoading,
    error: error || usernameError,
  };
};
