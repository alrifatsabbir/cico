import ClockComponent from '@/components/clock/ClockComponent';
import React from 'react';

const Clock = () => {
    return (
<div className="min-h-screen w-full bg-black relative">
    {/* Ember Glow Background */}
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 100%, rgba(255, 69, 0, 0.6) 0%, transparent 60%),
          radial-gradient(circle at 50% 100%, rgba(255, 140, 0, 0.4) 0%, transparent 70%),
          radial-gradient(circle at 50% 100%, rgba(255, 215, 0, 0.3) 0%, transparent 80%)
        `,
      }}
    />
        <ClockComponent />
  </div>
    );
};

export default Clock;