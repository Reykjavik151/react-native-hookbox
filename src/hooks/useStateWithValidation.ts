import React, { type SetStateAction, useState } from 'react';

import { useUpdateEffect } from './useUpdateEffect';

/**
 * Extends React.useState with a validator function (second parameter) that validates the state and returns a boolean as a third value of the output array.
 * @param initialValue initial value of the state
 * @param validator function-validator that validates the state after each state update
 * @returns [state, setState, isValid] - state is the current state, setState is the setter for the state, isValid is a boolean that indicates if the state passes the validation
 */
export const useStateWithValidation = <T>(
  initialValue: T,
  validator: (value: T) => boolean,
): [T, React.Dispatch<SetStateAction<T>>, boolean] => {
  const [state, setState] = useState<T>(initialValue);
  const [isValid, setIsValid] = useState(validator(state));

  useUpdateEffect(() => {
    setIsValid(validator(state));
  }, [state, validator]);

  return [state, setState, isValid];
};
