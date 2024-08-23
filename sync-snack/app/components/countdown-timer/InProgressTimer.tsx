import React, { useState, useEffect } from 'react';
import { EventEvent } from '@/app/interfaces';
import { Badge } from '@chakra-ui/react';

const InProgressTimer = ({ event }: { event: EventEvent }) => {
  const [timeElapsed, setTimeElapsed] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const pendingUntil = new Date(event.pendingUntil).getTime();
      
      const elapsed = now - pendingUntil;

      if (elapsed <= 0) {
        setTimeElapsed({ minutes: 0, seconds: 0 });
      } else {
        const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
        setTimeElapsed({ minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [event]);

  return (
    <div className="inline-flex items-center justify-center space-x-1 bg-gradient-to-r from-orange-500 to-red-600 p-2 rounded-lg shadow-lg">
      
      <div className="flex flex-col items-center">
        <div className="w-14 text-center text-3xl font-bold text-white font-mono">
          {String(timeElapsed.minutes).padStart(2, '0')}
        </div>
        <div className="text-[10px] uppercase text-white">Min</div>
      </div>
      <div className="text-2xl font-bold text-white">:</div>
      <div className="flex flex-col items-center">
        <div className="w-14 text-center text-3xl font-bold text-white font-mono">
          {String(timeElapsed.seconds).padStart(2, '0')}
        </div>
        <div className="text-[10px] uppercase text-white">Sec</div>
      </div>
    </div>
  );
};

export default InProgressTimer;