import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';

type Orientation = 'portrait' | 'landscape';

/**
 * A custom React hook for determining the device orientation.
 *
 * @returns {string} The current device orientation, either 'portrait' or 'landscape'.
 *
 * @example
 * // Import the hook
 * import { useDeviceOrientation } from './path-to-your-hook';
 *
 * // Use the hook in a component
 * const OrientationComponent = () => {
 *   const orientation = useDeviceOrientation();
 *
 *   useEffect(() => {
 *     console.log('Device Orientation:', orientation);
 *   }, [orientation]);
 *
 *   return (
 *     <View>
 *       <Text>Current Orientation: {orientation}</Text>
 *     </View>
 *   );
 * };
 */
export const useDeviceOrientation = (): Orientation => {
  const { width, height } = useWindowDimensions();

  const [orientation, setOrientation] = useState<Orientation>(height > width ? 'portrait' : 'landscape');

  useEffect(() => {
    setOrientation(height > width ? 'portrait' : 'landscape');
  }, [width, height]);

  return orientation;
};
