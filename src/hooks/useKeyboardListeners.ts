import { Keyboard } from 'react-native';

import { useMount } from './useMount';

/**
 * Connect your functions to correct keyboard events (show/hide)
 * @param onKeyboardShow
 * @param onKeyboardHide
 * @returns
 */
export const useKeyboardListeners = (onKeyboardShow: () => void, onKeyboardHide: () => void) =>
  useMount(() => {
    const didShow = Keyboard.addListener('keyboardDidShow', onKeyboardShow);
    const didHide = Keyboard.addListener('keyboardDidHide', onKeyboardHide);

    return () => {
      didShow.remove();
      didHide.remove();
    };
  });
