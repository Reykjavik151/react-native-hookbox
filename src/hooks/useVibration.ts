import { useCallback } from 'react';
import { Vibration } from 'react-native';

/**
 * A custom React hook for handling device vibration.
 *
 * @returns {object} An object containing functions for vibration control. { vibrate, cancelVibration }
 * @property {Function} vibrate - Function to trigger vibration with a specific pattern.
 * @property {Function} cancelVibration - Function to cancel the ongoing vibration.
 *
 * * @example
 * // Import the hook
 * import { useVibration } from './path-to-your-hook';
 *
 * // Use the hook in a component
 * const MyComponent = () => {
 *   const { vibrate, cancelVibration } = useVibration();
 *
 *   const onVibratePress = () => {
 *     // Vibrate for 500 milliseconds
 *     vibrate(500);
 *   };
 *
 *   return (
 *     <View>
 *       <TouchableOpacity onPress={onVibratePress}>
 *         <Text>Vibrate Now</Text>
 *       </TouchableOpacity>
 *       <TouchableOpacity onPress={cancelVibration}>
 *         <Text>Cancel Vibration</Text>
 *       </TouchableOpacity>
 *     </View>
 *   );
 * };
 */
export const useVibration = () => {
  const vibrate = useCallback((pattern: number | number[]) => {
    Vibration.vibrate(pattern);
  }, []);

  const cancelVibration = useCallback(() => {
    Vibration.cancel();
  }, []);

  return { vibrate, cancelVibration };
};
