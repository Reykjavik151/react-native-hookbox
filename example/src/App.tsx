import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { useAppState, useCachedState, useDebouncedValue, useMount } from 'react-native-hookbox';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  hooksInfoContainer: {
    borderWidth: 1,
    padding: 70,
    marginVertical: 20,
  },
  button: {
    width: '75%',
    alignItems: 'center',
    marginVertical: 4,
    padding: 16,
    backgroundColor: '#333',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
  },
});

// eslint-disable-next-line import/no-default-export
export default function App() {
  const [prevCounter, counter, setCounter] = useCachedState(0);

  useMount(() => {
    setCounter(10);
  });

  const appState = useAppState();

  const debouncedCounter = useDebouncedValue(counter, 2000);

  const increment = useCallback(() => {
    setCounter(prev => prev + 1);
  }, [setCounter]);

  const reset = useCallback(() => {
    setCounter(0);
  }, [setCounter]);

  return (
    <View style={styles.container}>
      <View style={styles.hooksInfoContainer}>
        <Text>AppState: {appState}</Text>
        <Text>CachedState, prev: {prevCounter}</Text>
        <Text>Debounced: {debouncedCounter}</Text>
      </View>

      <Text>COUNTER VALUE: {counter}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={increment}
      >
        <Text style={styles.buttonTitle}>Increment counter value</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={reset}
      >
        <Text style={styles.buttonTitle}>Reset counter value</Text>
      </TouchableOpacity>
    </View>
  );
}
