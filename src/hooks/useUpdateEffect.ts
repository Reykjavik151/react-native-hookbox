import { useEffect, useRef } from 'react';

/**
 * Extended useEffect - skip first function call on mount and leave only update calls
 * @param callback function that must be called when the deps change and skip first time as main purpose
 * @param deps dependencies that will be used to trigger the callback
 */
export const useUpdateEffect = (callback: () => void, deps: React.DependencyList) => {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    // eslint-disable-next-line consistent-return
    return callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
