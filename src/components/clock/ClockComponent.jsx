import React, { useState, useEffect, useRef } from 'react';
import { motion as Motion } from 'framer-motion';
import { gsap } from 'gsap';
import SpotlightCard from "../SpotlightCard"; 

// List of available Timezones
const TIMEZONES = [
    { value: 'Asia/Dhaka', label: 'Dhaka (GMT+6)' },
    { value: 'Asia/Kolkata', label: 'Kolkata (GMT+5:30)' },
    { value: 'Europe/London', label: 'London (GMT+0)' },
    { value: 'America/New_York', label: 'New York (GMT-5)' },
    { value: 'Asia/Dubai', label: 'Dubai (GMT+4)' },
];


// --- 1. Digit Unit Component (GSAP Animation) ---
const formatTime = (value) => String(value).padStart(2, '0');

const DigitUnit = ({ value }) => {
    const digitRef = useRef(null);
    useEffect(() => {
    gsap.fromTo(digitRef.current, 
        { y: 20, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' });}, [value]);
    return (
    <span ref={digitRef} className="inline-block overflow-hidden text-white text-[4rem] md:text-[6rem] lg:text-[8rem] 
                 font-extrabold font-mono leading-none transition-colors duration-500"
        style={{ textShadow: '0 0 3px rgba(255, 165, 0, 0.7), 0 0 10px rgba(255, 140, 0, 0.5)',}}>
        {value}
    </span>
);
};

// --- 2. Custom Toggle Switch Component ---
const CustomToggle = ({ checked, onChange, label }) => (
    <div className="space-y-2 ">
        <label className="text-sm font-medium text-gray-300 block">{label}</label>
        <div className="flex items-center justify-between bg-gray-800 p-2 rounded-lg border border-orange-500/50">
            <span className="text-base text-gray-300">24-Hour Format</span>
            <button
                onClick={() => onChange(!checked)}
                className={`
                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300
                    ${checked ? 'bg-orange-600' : 'bg-gray-700'}
                `}
                aria-checked={checked}
                role="switch"
            >
                <span className="sr-only">Toggle {label}</span>
                <span
                    className={`
                        inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300
                        ${checked ? 'translate-x-6' : 'translate-x-1'}
                    `}
                />
            </button>
        </div>
    </div>
);


// --- 3. Main Clock Component ---
const ClockComponent = () => {
    const [time, setTime] = useState(new Date());
    const [timezone, setTimezone] = useState(TIMEZONES[0].value); // Default to Dhaka/GMT+6
    const [is24HourFormat, setIs24HourFormat] = useState(false);

    useEffect(() => {
    const timer = setInterval(() => {
    // Update time based on selected timezone
      setTime(new Date(new Date().toLocaleString("en-US", { timeZone: timezone })));
    }, 1000);
    return () => clearInterval(timer);
    }, [timezone]); 

  // Calculate time components
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

  // Handle 12/24 hour format display
  let displayHours;
  let ampm = '';

  if (is24HourFormat) {
    displayHours = hours;
  } else {
    displayHours = hours % 12 || 12;
    ampm = hours >= 12 ? 'PM' : 'AM';
  }

  // Get timezone label for display
  const timezoneDisplay = TIMEZONES.find(tz => tz.value === timezone)?.label || timezone;


    // Framer Motion variants for the main card entry
    const cardVariants = {hidden: { y: 50, opacity: 0 },visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 70, damping: 15, delay: 0.2 } }};

    return (
    <Motion.div variants={cardVariants} initial="hidden" animate="visible" className="max-w-5xl mt-32 overflow-hidden w-full pb-24 mx-auto">
     <SpotlightCard 
        spotlightColor="rgba(249, 115, 22, 0.4)" 
        className="bg-gray-950 p-6 md:p-12 border-2 mx-4 border-orange-500/50 rounded-2xl shadow-2xl shadow-orange-900/50"
      >
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 w-full">

            {/* A. Left Section: The Clock Display */}
            <div className="flex-1 min-w-0 flex flex-col items-center">
                <div className="flex justify-center items-center">
                    
                    {/* Hours */}
                    <div className="flex overflow-hidden">
                        <DigitUnit value={formatTime(displayHours)[0]} />
                        <DigitUnit value={formatTime(displayHours)[1]} />
                    </div>

                    {/* Separator (Blinking) */}
                    <Motion.div
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="text-[4rem] md:text-[6rem] lg:text-[8rem] font-extrabold overflow-hidden mx-4 text-orange-500 leading-none"
                        style={{ textShadow: '0 0 3px #FF8C00' }}
                    >
                        :
                    </Motion.div>
                    
                    {/* Minutes */}
                    <div className="flex overflow-hidden">
                        <DigitUnit value={formatTime(minutes)[0]} />
                        <DigitUnit value={formatTime(minutes)[1]} />
                    </div>
                    
                    {/* Separator */}
                    <Motion.div
                        animate={{ opacity: [1, 0, 1] }} 
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="text-[4rem] md:text-[6rem] lg:text-[8rem] font-extrabold mx-4 overflow-hidden text-orange-500 leading-none hidden sm:block"
                        style={{ textShadow: '0 0 3px #FF8C00' }}
                    >
                        :
                    </Motion.div>
                    
                    {/* Seconds */}
                    <div className="hidden sm:flex overflow-hidden">
                        <DigitUnit value={formatTime(seconds)[0]} />
                        <DigitUnit value={formatTime(seconds)[1]} />
                    </div>

                </div>
                
                {/* AM/PM Indicator and Timezone */}
                <div className="text-center mt-4">
                    {!is24HourFormat && (
                        <div className="text-3xl overflow-hidden md:text-4xl font-semibold text-orange-400 tracking-widest">
                            {ampm}
                        </div>
                    )}
                    <div className="text-base font-medium text-gray-400 mt-2 tracking-wider">
                        {timezoneDisplay}
                    </div>
                </div>
            </div>

            {/* B. Right Section: Controls Panel (Custom Tailwind UI) */}
            <div className="lg:w-72 w-full pt-8 lg:pt-0 border-t lg:border-t-0 lg:border-l border-gray-800 lg:pl-8 flex flex-col space-y-6">
                
                <h3 className="text-lg font-bold text-white mb-2 border-b border-orange-500 pb-2">
                    Clock Settings
                </h3>
                
                {/* Custom Timezone Select */}
                <div className="space-y-2">
                    <label htmlFor="timezone-select" className="text-sm font-medium text-gray-300">Change Timezone</label>
                    <div className="relative">
                        <select 
                            id="timezone-select"
                            value={timezone} 
                            onChange={(e) => setTimezone(e.target.value)}
                            className="w-full appearance-none bg-gray-800 text-white py-2 px-3 rounded-lg border border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors cursor-pointer"
                        >
                            {TIMEZONES.map((tz) => (
                                <option key={tz.value} value={tz.value}>
                                    {tz.label}
                                </option>
                            ))}
                        </select>
                        {/* Custom Arrow Icon */}
                        <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>
                
                {/* Custom 12/24 Hour Format Toggle */}
                <CustomToggle
                    checked={is24HourFormat}
                    onChange={setIs24HourFormat}
                    label="Toggle Format"
                />
                
            </div>
            
        </div>
        </SpotlightCard>
    </Motion.div>
 );
};

export default ClockComponent;