import { useCallback, useEffect, useRef, useState } from 'react';

type UseCountdownProps = {
  initialRemainingTimeMs: number;
  onEnd?: () => void;
  countdownStepMs?: number;
}

export const useCountdown = ({ initialRemainingTimeMs, onEnd, countdownStepMs = 1000 }: UseCountdownProps) => {
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
          
          return prev - countdownStepMs;
        });
      }, countdownStepMs);
    }
  }, [countdownStepMs, onEnd]);
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
