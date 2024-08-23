import React, { useState, useEffect } from 'react';
import { EventEvent } from '@/app/interfaces';
import useNotificationIfEventExpiredStore from '@/app/store/notificationIfEventExpired';

const EventCountdownTimer = ({ event }: {event: EventEvent}) => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });
  const { setHasNewNotificationIfEventExpiredStore } = useNotificationIfEventExpiredStore();
  const [hasExpired, setHasExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const pendingUntil = new Date(event.pendingUntil).getTime();
      
      const remaining = pendingUntil - now;
      
      if (remaining <= 0) {
        clearInterval(interval);
        setTimeLeft({ minutes: 0, seconds: 0 });
        if (!hasExpired) {
          console.log("Event has expired");
          setHasNewNotificationIfEventExpiredStore(event.eventId);
          setHasExpired(true);
        }
      } else {
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        setTimeLeft({ minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [event, hasExpired, setHasNewNotificationIfEventExpiredStore]);


  return (
    
    <div className="inline-flex items-center justify-center space-x-1 bg-gradient-to-r from-orange-500 to-red-600 p-2 rounded-lg shadow-lg">
      
      <div className="flex flex-col items-center">
        <div className="w-14 text-center text-3xl font-bold text-white font-mono">
          {String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <div className="text-[10px] uppercase text-white">Min</div>
      </div>
      <div className="text-2xl font-bold text-white">:</div>
      <div className="flex flex-col items-center">
        <div className="w-14 text-center text-3xl font-bold text-white font-mono">
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
        <div className="text-[10px] uppercase text-white">Sec</div>
      </div>
    </div>
  );
};

export default EventCountdownTimer;