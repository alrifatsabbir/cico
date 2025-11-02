// src/pages/CnCalendar.jsx

import CnCalendarComponent from '../../components/calendar/CnCalendarComponent';
import React from 'react';


const CnCalendar = () => {
  return (
    <div className="min-h-screen overflow-hidden w-full relative bg-black flex flex-col items-center justify-center px-4 py-16">
      <div 
        className="absolute inset-0 z-0" 
        style={{
          // Spotlight color changed to blue for Chinese Calendar
          background:"radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0, 150, 255, 0.25), transparent 70%), #000000",
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            // Grid color changed to blue
            backgroundImage: `linear-gradient(to right, rgba(100, 150, 255, 0.25) 1px, transparent 1px),linear-gradient(to bottom, rgba(100, 150, 255, 0.25) 1px, transparent 1px)`,
            backgroundSize: "35px 35px",
            WebkitMaskImage:"radial-gradient(ellipse 70% 60% at 40% 120%, #000 60%, transparent 100%)",
            maskImage:"radial-gradient(ellipse 70% 60% at 40% 120%, #000 60%, transparent 100%)",
          }}
        />
      </div>
      <div className="z-10 overflow-hidden pb-16 w-full flex justify-center">
        <CnCalendarComponent/>
      </div>
    </div>
  );
};

export default CnCalendar;