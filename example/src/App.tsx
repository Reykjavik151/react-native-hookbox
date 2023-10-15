import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  useAppState,
  useDebouncedValue,
  useMount,
  useStateWithPrevious,
  useStateWithValidation,
  // eslint-disable-next-line import/no-unresolved
} from 'react-native-hookbox';

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
    padding: 30,
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
  redText: {
    color: 'red',
  },
  separator: {
    height: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
});

// eslint-disable-next-line import/no-default-export
export default function App() {
  const [counter, setCounter, prevCounter] = useStateWithPrevious(0);
  const [validatedCounter, setValidatedCounter, isValidValidatedCounter] = useStateWithValidation(
    0,
    value => value >= 5,
  );

  useMount(() => {
    setCounter(10);
  });

  const appState = useAppState();

  const debouncedCounter = useDebouncedValue(counter, 2000);

  const increment = useCallback(() => {
    setCounter(prev => prev + 1);
  }, [setCounter]);

  const incrementValidatedCounter = useCallback(() => {
    setValidatedCounter(prev => prev + 1);
  }, [setValidatedCounter]);

  const reset = useCallback(() => {
    setCounter(0);
  }, [setCounter]);

  const resetValidatedCounter = useCallback(() => {
    setValidatedCounter(0);
  }, [setValidatedCounter]);

  return (
    <View style={styles.container}>
      <View style={styles.hooksInfoContainer}>
        <Text style={styles.sectionTitle}>APP STATE</Text>
        <Text>current: {appState}</Text>

        <Text />

        <Text style={styles.sectionTitle}>COUNTER</Text>
        <Text>Counter value: {counter}</Text>
        <Text>Cached: {prevCounter}</Text>
        <Text>Debounced: {debouncedCounter}</Text>

        <Text />
        <Text style={styles.sectionTitle}>VALIDATED COUNTER</Text>
        <Text>Validated counter: {validatedCounter}</Text>
        <Text style={!isValidValidatedCounter && styles.redText}>
          Validated counter {'>'}= 5: {isValidValidatedCounter.toString()}
        </Text>
      </View>

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

      <View style={styles.separator} />

      <TouchableOpacity
        style={styles.button}
        onPress={incrementValidatedCounter}
      >
        <Text style={styles.buttonTitle}>Increment validated counter value</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={resetValidatedCounter}
      >
        <Text style={styles.buttonTitle}>Reset validated counter value</Text>
      </TouchableOpacity>
    </View>
  );
}
