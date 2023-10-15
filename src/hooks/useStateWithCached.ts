import React, { type SetStateAction, useState } from 'react';

import { useCached } from './useCached';

/**
 * Extends React.useState with a cached non-empty state as a third output value of array
 * @param initialValue initial value as the third value of the state and prevState
 * @returns [state, setState, cachedState] - state is the current state (including undefined and null), setState is the setter for the state, cachedState is the latest non-empty state
 */
export const useStateWithCached = <T>(initialValue: T): [T, React.Dispatch<SetStateAction<T>>, T | undefined] => {
  const [state, setState] = useState<T>(initialValue);
  const cachedState = useCached(state);

  return [state, setState, cachedState];
};
