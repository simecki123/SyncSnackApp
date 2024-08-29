import React, { useState, useEffect, useCallback } from 'react';
import { EventEvent } from '@/app/interfaces';

const InProgressTimer = ({ event, handleEventDone }: { event: EventEvent, handleEventDone: () => Promise<void> }) => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 1, seconds: 0 });
  const [progress, setProgress] = useState(100);
  const [isCountingDown, setIsCountingDown] = useState(false);

  const updateEventStatus = useCallback(async () => {
    console.log("Countdown ended. Updating event status...");
    try {
      await handleEventDone();
      console.log("Event status updated successfully.");
    } catch (error) {
      console.error("Failed to update event status:", error);
    }
  }, [handleEventDone]);

  useEffect(() => {
    const now = new Date().getTime();
    const pendingUntil = new Date(event.pendingUntil).getTime();
    const elapsedSincePending = now - pendingUntil;
    const countdownDuration = 1 * 60 * 1000; 

    if (elapsedSincePending >= 0) {
      setIsCountingDown(true);

      if (elapsedSincePending >= countdownDuration) {
        setTimeLeft({ minutes: 0, seconds: 0 });
        setProgress(0);
        updateEventStatus();
      } else {
        const remaining = countdownDuration - elapsedSincePending;
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        setTimeLeft({ minutes, seconds });
        setProgress((remaining / countdownDuration) * 100);

        const countdownInterval = setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime.minutes === 0 && prevTime.seconds === 0) {
              clearInterval(countdownInterval);
              updateEventStatus();
              return prevTime;
            }

            const totalSeconds = prevTime.minutes * 60 + prevTime.seconds - 1;
            const newMinutes = Math.floor(totalSeconds / 60);
            const newSeconds = totalSeconds % 60;
            
            setProgress((totalSeconds / (20 * 60)) * 100);
            
            return { minutes: newMinutes, seconds: newSeconds };
          });
        }, 1000);

        return () => clearInterval(countdownInterval);
      }
    }
  }, [event, updateEventStatus]);

  const circumference = 2 * Math.PI * 35;

  if (!isCountingDown) {
    return null;
  }

  return (
    <div className="relative w-24 h-24">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
        <circle
          className="text-orange-200"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r="35"
          cx="40"
          cy="40"
        />
        <circle
          className="text-orange-500 transition-all duration-300 ease-in-out"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (progress / 100) * circumference}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="35"
          cx="40"
          cy="40"
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-lg font-bold text-orange-600">
          {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default InProgressTimer;