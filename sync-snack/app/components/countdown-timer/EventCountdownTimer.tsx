import React, { useState, useEffect } from 'react';
import { EventEvent } from '@/app/interfaces';
import useNotificationIfEventExpiredStore from '@/app/store/notificationIfEventExpired';

const CircularTimer = ({ event, setEventStatus }: { event: EventEvent, setEventStatus: (newStatus: string) => void }) => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });
  const { setHasNewNotificationIfEventExpiredStore } = useNotificationIfEventExpiredStore();
  const [hasExpired, setHasExpired] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const pendingUntil = new Date(event.pendingUntil).getTime();
      const remaining = pendingUntil - now;
      const totalDuration = pendingUntil - new Date(event.createdAt).getTime();

      if (remaining <= 0) {
        clearInterval(interval);
        setTimeLeft({ minutes: 0, seconds: 0 });
        setProgress(0);
        if (!hasExpired) {
          console.log("Event has expired");
          setEventStatus("IN_PROGRESS");
          setHasNewNotificationIfEventExpiredStore(event.eventId);
          setHasExpired(true);
        }
      } else {
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        setTimeLeft({ minutes, seconds });
        setProgress((remaining / totalDuration) * 100);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [event, hasExpired, setHasNewNotificationIfEventExpiredStore]);

  const circumference = 2 * Math.PI * 35; // Reduced radius to 35

  return (
    <div className="relative w-24 h-24"> {/* Reduced size to 6rem (96px) */}
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80"> {/* Adjusted viewBox */}
        <circle
          className="text-blue-100"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r="35"
          cx="40"
          cy="40"
        />
        <circle
          className="text-blue-2 transition-all duration-300 ease-in-out"
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
        <div className="text-lg font-bold text-blue-1">
          {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default CircularTimer;
