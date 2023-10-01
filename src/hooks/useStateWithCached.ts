import { type SetStateAction, useState } from 'react';

import { useCached } from './useCached';

type ObjectFn<T, R = void> = (arg: T) => R;

/**
 * Extends React.useState with a cached non-empty state as a third output value of array
 * @param initialValue initial value as the third value of the state and prevState
 * @returns [state, setState, cachedState] - cachedState is the non-empty state, state is the current state (including undefined and null), setState is the setter for the state
 */
export const useStateWithCached = <T>(initialValue: T): [T, ObjectFn<SetStateAction<T>>, T | undefined] => {
  const [state, setState] = useState<T>(initialValue);
  const cachedState = useCached(state);

  return [state, setState, cachedState];
};
