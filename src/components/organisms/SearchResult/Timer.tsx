import React, { useState, useEffect } from 'react';
import { IInterval } from '@@types';
import Helper from '@helpers';

interface ITimerProps {
  date: string;
  customClass?: string;
}

export const Timer: React.FC<ITimerProps> = ({ date, customClass }): JSX.Element => {
  const [currentInterval, setCurrentInterval] = useState<IInterval>();

  useEffect(() => {
    setCurrentInterval(Helper.computeElapsedTime(new Date(date)));

    const interval = setInterval(() => {
      setCurrentInterval(Helper.computeElapsedTime(new Date(date)));
    }, 1000);

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div data-testid="time-elapsed" aria-live="polite" tabIndex={16} className={customClass}>
      {currentInterval?.hours}:{currentInterval?.minutes}:{currentInterval?.seconds}
    </div>
  );
};
