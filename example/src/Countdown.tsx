import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { useCountdown } from 'react-native-hookbox';

import { styles } from './styles';

export const Countdown = () => {
  const {
    timeLeft,
    isPaused,
    resetCountdown,
    pauseCountdown,
    resumeCountdown,
    setNewRemainingTime,
  } = useCountdown({
    initialRemainingTimeMs: 60000,
    countdownStepMs: 20,
    onEnd: () => {
      // eslint-disable-next-line no-console
      console.log('Countdown ended!');
    },
  });

  return (
    <View>
      <Text style={styles.sectionTitle}>Countdown</Text>
      <Text>{timeLeft / 1000}</Text>
      <Text>On pause: {String(isPaused)}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setNewRemainingTime(60000);
        }}
      >
        <Text style={styles.buttonTitle}>Set 1 minute again</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={resetCountdown}>
        <Text style={styles.buttonTitle}>Reset countdown</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={pauseCountdown}>
        <Text style={styles.buttonTitle}>Pause</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={resumeCountdown}>
        <Text style={styles.buttonTitle}>Resume</Text>
      </TouchableOpacity>
    </View>
  );
};
