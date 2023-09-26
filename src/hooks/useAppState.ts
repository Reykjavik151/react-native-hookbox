import { useEffect, useState } from 'react';
import { type AppStateStatus, AppState } from 'react-native';

/**
 * Get the current app state
 * @returns the current app state - "active" | "background" | "inactive" | "unknown" | "extension"
 */
export const useAppState = () => {
  const { currentState } = AppState;
  const [appState, setAppState] = useState(currentState);

  useEffect(() => {
    const onChange = (newState: AppStateStatus) => {
      setAppState(newState);
    };
    const subscription = AppState.addEventListener('change', onChange);
    return () => {
      subscription.remove();
    };
  }, []);

  return appState;
};
