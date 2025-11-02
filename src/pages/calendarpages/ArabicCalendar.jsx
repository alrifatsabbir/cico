import ArabicCalendarComponent from '../../components/calendar/ArabicCalendarComponent';
import React from 'react';

const ArabicCalendar = () => {
  return (
    <div className="min-h-screen overflow-hidden w-full relative bg-black flex flex-col items-center justify-center px-4 py-16">
      <div 
        className="absolute inset-0 z-0" 
        style={{
          background:"radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249, 115, 22, 0.25), transparent 70%), #000000",
        }}>
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(249, 115, 22, 0.25) 1px, transparent 1px),linear-gradient(to bottom, rgba(249, 115, 22, 0.25) 1px, transparent 1px)`,
            backgroundSize: "35px 35px",
            WebkitMaskImage:"radial-gradient(ellipse 70% 60% at 40% 120%, #000 60%, transparent 100%)",
            maskImage:"radial-gradient(ellipse 70% 60% at 40% 120%, #000 60%, transparent 100%)",
          }}
        />
      </div>
      <div className="z-10 w-full  overflow-hidden pb-16 flex justify-center">
        <ArabicCalendarComponent/>
      </div>

    </div>
  );
};

export default ArabicCalendar;