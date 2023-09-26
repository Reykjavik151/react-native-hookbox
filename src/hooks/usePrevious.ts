import { useEffect, useRef } from 'react';

/**
 * Saves the previous state of the value
 * @param value the current value from the useState (usually) to save its prev value
 * @param valuesToIgnore an array of values to ignore when saving the previous value
 * @returns the previous saved value
 */
export const usePrevious = <T>(value: T, valuesToIgnore: Array<T> = []): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    if (valuesToIgnore.includes(value)) return;
    ref.current = value;
  }, [value, valuesToIgnore]);
  return ref.current;
};
