import { useEffect, useState } from 'react';

/**
 * Get value after a delay. If value changes within the delay period, the timeout gets cleared and restarted.
 * @param value current value to debounce
 * @param delay time to wait before updating the debounced value
 * @returns debounced value
 */
export const useDebouncedValue = <TValue>(value: TValue, delay: number) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay], // Only re-call effect if value or delay changes
  );

  return debouncedValue;
};
