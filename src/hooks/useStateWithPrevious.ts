import React, { type SetStateAction, useState } from 'react';

import { usePrevious } from './usePrevious';

/**
 * Extends React.useState with a previous state as a first output value of array
 * @param initialValue initial value as the third value of the state and prevState
 * @returns [state, setState, prevState] - state is the current state, setState is the setter for the state, prevState is the previous state,
 */
export const useStateWithPrevious = <T>(initialValue: T): [T, React.Dispatch<SetStateAction<T>>, T | undefined] => {
  const [state, setState] = useState<T>(initialValue);
  const prevState = usePrevious(state);

  return [state, setState, prevState];
};
