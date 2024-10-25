import { useState } from 'react';
import type { KeyboardEvent } from 'react-native';
import { Keyboard } from 'react-native';

import { useMount } from './useMount';

/**
 * Hook to get the keyboard height
 * @returns {number} Current keyboard height in pixels. Returns 0 if the keyboard is hidden.
 */
export const useKeyboardHeight = (): number => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useMount(() => {
    const onKeyboardShow = (event: KeyboardEvent) => {
      setKeyboardHeight(event.endCoordinates.height);
    };

    const onKeyboardHide = () => {
      setKeyboardHeight(0);
    };

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', onKeyboardShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', onKeyboardHide);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  });

  return keyboardHeight;
};
