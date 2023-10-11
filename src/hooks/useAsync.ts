import { useEffect, useState } from 'react';

export const useAsync = <TExpectedData>(asyncFn: () => Promise<TExpectedData>) => {
  const [data, setData] = useState<TExpectedData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await asyncFn();
        setData(result);
      } catch (err: unknown) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [asyncFn]);

  return { data, error, loading: isLoading };
};
