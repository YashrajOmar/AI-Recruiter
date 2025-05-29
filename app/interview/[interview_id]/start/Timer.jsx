// Timer.jsx
'use client';

import { useState, useEffect } from 'react';

export default function Timer({ initialSeconds = 60 }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds === 0) return;
    const interval = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div>
      <span>Time left: {seconds} seconds</span>
    </div>
  );
}
