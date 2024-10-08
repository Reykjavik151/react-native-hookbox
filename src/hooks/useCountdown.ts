import { useEffect, useRef, useState } from 'react';

export const useCountdown = (seconds: number, onEnd: () => void) => {
  const [timeLeft, setTimeLeft] = useState<number>(seconds);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start the countdown if there's time left and no interval is running
    if (timeLeft > 0 && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current); // Clear interval when timeLeft hits 0
            timerRef.current = null;
            onEnd?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Clean up on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [timeLeft, onEnd]);

  const resetCountdown = (newTime: number) => {
    setTimeLeft(newTime);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  return {
    timeLeft,
    resetCountdown,
  };
};
