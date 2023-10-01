import { isEmpty, isNull, isUndefined } from 'lodash';
import { useEffect, useRef } from 'react';

/**
 * Saves only not empty, not undefined and not null values
 * @param value any value to save
 * @returns the previous saved non-empty value
 */
export const useCached = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    // Save only value, not empty / undefined / null
    // Check all of these cases, because we may have `false` value to work with
    if (!(isEmpty(value) || isUndefined(value) || isNull(value))) {
      ref.current = value;
    }
  }, [value]);
  return ref.current;
};
