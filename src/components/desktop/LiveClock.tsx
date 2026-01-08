import { useState, useEffect } from 'react';

const LiveClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <span className="font-pixel tabular-nums">
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </span>
  );
};

export default LiveClock;
