import WorldClockComponent from '../../components/clock/WorldClockComponent';
import React from 'react';

const Clock = () => {
    return (
<div className="min-h-screen w-full bg-black relative">
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 100%, rgba(70, 85, 110, 0.5) 0%, transparent 60%),
          radial-gradient(circle at 50% 100%, rgba(99, 102, 241, 0.4) 0%, transparent 70%),
          radial-gradient(circle at 50% 100%, rgba(181, 184, 208, 0.3) 0%, transparent 80%)
        `,
      }}
    />
      <WorldClockComponent/>
  </div>
    );
};

export default Clock;