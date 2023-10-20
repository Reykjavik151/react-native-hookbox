import { useAsync } from './useAsync';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

/**
 * Hook to fetch data from an API
 * @param url fetch url
 * @param options fetch options
 * @returns Promise with the response body
 */
export const useFetch = (url: string, options: RequestInit = {}) =>
  useAsync(() =>
    fetch(url, {
      ...options,
      headers: { ...DEFAULT_HEADERS, ...(options.headers ?? {}) },
    }).then(res => {
      if (res.ok) {
        return res.json();
      }

      return res.json().then(json => {
        throw new Error(json);
      });
    }),
  );
