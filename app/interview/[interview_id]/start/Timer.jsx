// Timer.jsx
// 'use client';

// import { useState, useEffect } from 'react';

// export default function Timer({ initialSeconds = 60 }) {
//   const [seconds, setSeconds] = useState(initialSeconds);

//   useEffect(() => {
//     if (seconds === 0) return;
//     const interval = setInterval(() => setSeconds(s => s - 1), 1000);
//     return () => clearInterval(interval);
//   }, [seconds]);

//   return (
//     <div>
//       <span>Time left: {seconds} seconds</span>
//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';

export default function Timer({ initialSeconds = 60 }) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // mark as mounted on client
  }, []);

  useEffect(() => {
    if (!mounted) return; // do not start timer until mounted
    if (seconds === 0) return;
    const interval = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(interval);
  }, [seconds, mounted]);

  if (!mounted) {
    // render placeholder on server and first client render
    return <div>Loading timer...</div>;
  }

  return (
    <div>
      <span>Time left: {seconds} seconds</span>
    </div>
  );
}
