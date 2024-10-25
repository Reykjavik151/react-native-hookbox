import { useCallback, useEffect, useRef, useState } from 'react';

type UseCountdownOptions = {
  initialRemainingTimeMs: number;
  onEnd?: () => void;
  onTick?: (timeLeft: number) => void;
  countdownStepMs?: number;
}

/**
 * Hook to manage a countdown timer
 * 
 * @param options initialRemainingTimeMs: number; onEnd?: () => void; onTick?: (timeLeft: number) => void; countdownStepMs?: number;
 * @returns set of functions and values to manage a countdown, including pause, resume, reset, and setting a new time
 * 
 * @example
 * const {
 *   timeLeft,
 *   isPaused,
 *   resetCountdown,
 *   pauseCountdown,
 *   resumeCountdown,
 *   setNewRemainingTime,
 * } = useCountdown({
 *   initialRemainingTimeMs: 60000,
 *   countdownStepMs: 400,
 *   onTick: (currentTimeLeft) => { console.log('Countdown tick:', currentTimeLeft); },
 *   onEnd: () => { console.log('Countdown ended!'); },
 * });
 */
export const useCountdown = ({ initialRemainingTimeMs, onEnd, onTick, countdownStepMs = 1000 }: UseCountdownOptions) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialRemainingTimeMs);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= countdownStepMs) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            clearInterval(timerRef.current!);
            timerRef.current = null;
            onEnd?.();
            return 0;
          }
          
          const newTime = prev - countdownStepMs;
          onTick?.(newTime);
          return newTime;
        });
      }, countdownStepMs);
    }
  }, [countdownStepMs, onEnd, onTick]);
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Launch countdown if there's time left and no interval is running
    if (timeLeft > 0 && !isPaused && !timerRef.current) {
      startTimer();
    }

    // Clean up on unmount
    return () => {
      stopTimer();
    }
  }, [timeLeft, isPaused, startTimer, stopTimer]);

  const pauseCountdown = useCallback(() => {
    setIsPaused(true);
    stopTimer();
  }, [stopTimer]);
  const resumeCountdown = useCallback(() => {
    setIsPaused(false);
    startTimer();
  }, [startTimer]);

  const setNewRemainingTime = useCallback((newTimeMs: number) => {
    setTimeLeft(newTimeMs);
  }, []);
  const resetCountdown = useCallback(() => {
    setTimeLeft(0);
    pauseCountdown();
  }, [pauseCountdown]);

  return {
    isPaused,
    timeLeft,
    setNewRemainingTime,
    resetCountdown,
    pauseCountdown,
    resumeCountdown,
  }
};
