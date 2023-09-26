import { type SetStateAction, useState } from 'react';

import { usePrevious } from './usePrevious';

type ObjectFn<T, R = void> = (arg: T) => R;

/**
 * Extends React.useState with a previous state as a first output value of array
 * @param initialValue initial value as the first value of the state and prevState
 * @returns [prevState, state, setState] - prevState is the previous state, state is the current state, setState is the setter for the state
 */
export const useCachedState = <T>(initialValue: T): [T | undefined, T, ObjectFn<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(initialValue);
  const prevState = usePrevious(state);

  return [prevState, state, setState];
};
