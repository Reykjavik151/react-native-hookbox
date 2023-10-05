import { isEqual } from 'lodash';
import { type DependencyList, useEffect, useRef } from 'react';

type EffectCallback = () => void;

/**
 * Allows a component to run an effect only when the dependencies have changed using a deep comparison instead of a shallow comparison
 * @param callback function that must be called when the deps change
 * @param dependencies deep comparison dependencies that will be used to trigger the callback
 */
export const useDeepCompareEffect = (callback: EffectCallback, dependencies: DependencyList): void => {
  const currentDependenciesRef = useRef<DependencyList | null>(null);

  if (!isEqual(currentDependenciesRef.current, dependencies)) {
    currentDependenciesRef.current = dependencies;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, [currentDependenciesRef.current]);
};
