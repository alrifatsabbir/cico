import React, { useState, useEffect, useRef } from 'react';
import { motion as Motion } from 'framer-motion';
import { gsap } from 'gsap';
import SpotlightCard from "../SpotlightCard"; 
import Globe from './Globe';
import TIMEZONE_DATA from './timezoneData'; 


// --- UTILITIES & GSAP Digit Component ---
const formatTime = (value) => String(value).padStart(2, '0');

const DigitUnit = React.memo(({ value }) => {
    const digitRef = useRef(null);
    useEffect(() => {
        gsap.fromTo(digitRef.current,
            { y: 20, opacity: 0, scale: 0.8 },
            { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }
        );
    }, [value]);

    return (
        <span
            ref={digitRef}
            className="inline-block overflow-hidden text-white text-[4rem] md:text-[6rem] lg:text-[7rem] 
                       font-extrabold font-mono leading-none transition-colors duration-500"
            style={{
                textShadow: '0 0 1px rgba(255, 165, 0, 0.7), 0 0 1px rgba(255, 140, 0, 0.7)', // Neon Glow
                color: 'transparent' // Darker Orange Base Color
            }}
        >
            {value}
        </span>
    );
});


// --- Custom Toggle Switch Component ---
const CustomToggle = ({ checked, onChange }) => (
    <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300 block">Time Format</label>
        <div className="flex items-center justify-between bg-gray-800 p-2 rounded-lg border border-orange-500/50">
            <span className="text-base text-gray-300">24-Hour Clock</span>
            <button
                onClick={() => onChange(!checked)}
                className={`
                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300
                    ${checked ? 'bg-orange-600' : 'bg-gray-700'}
                `}
                aria-checked={checked}
                role="switch"
            >
                <span className="sr-only">Toggle Format</span>
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


// --- Main World Clock Component ---
const WorldClockComponent = () => {
    // Initial state set to the first city in the large data list
    const initialCity = TIMEZONE_DATA[0];

    const [time, setTime] = useState(new Date());
    const [selectedCity, setSelectedCity] = useState(initialCity);
    const [is24HourFormat, setIs24HourFormat] = useState(false);

    const timezone = selectedCity.timezone;

    // Effect to update the clock based on the selected timezone
    useEffect(() => {
        const timer = setInterval(() => {
            // Fetch time based on the active timezone
            setTime(new Date(new Date().toLocaleString("en-US", { timeZone: timezone })));
        }, 1000);
        return () => clearInterval(timer);
    }, [timezone]);


    // Time calculations and display logic
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    
    let displayHours;
    let ampm = '';

    if (is24HourFormat) {
        displayHours = hours;
    } else {
        displayHours = hours % 12 || 12;
        ampm = hours >= 12 ? 'PM' : 'AM';
    }

    // Date formatting (Today's Date in the selected timezone)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: timezone };
    const todayDate = time.toLocaleDateString('en-US', options);
    
    // GMT/Timezone String
    const gmtString = time.toLocaleTimeString('en-us', { timeZone: timezone, timeZoneName: 'shortOffset' })
                          .match(/(GMT[+-]\d+:\d+|GMT[+-]\d+)/)?.[0] || 'GMT Offset';


    // Framer Motion variants
    const cardVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1, 
            transition: { 
                type: 'spring', 
                stiffness: 70, 
                damping: 15, 
                delay: 0.2 
            } 
        }
    };

    // Handler for the City Select dropdown
    const handleCityChange = (e) => {
        const value = e.target.value;
        // Find the full city object based on the selected timezone value
        const newCity = TIMEZONE_DATA.find(c => c.timezone === value);
        if (newCity) {
            setSelectedCity(newCity);
        }
    };

    return (
        <Motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl w-full mx-auto mt-30"
        >
            <h2 className="text-3xl font-bold text-white mb-6 border-b border-orange-500/50 ml-3 pb-3">
                Global Time Dashboard
            </h2>

            {/* 3D Globe Section (Drives the selection) */}
            <SpotlightCard 
                spotlightColor="rgba(249, 115, 22, 0.4)" 
                className="bg-gray-950 p-6 md:p-10 border-2 border-orange-500/50 rounded-2xl shadow-2xl shadow-orange-900/50 mb-8 mr-5 ml-5"
            >
                <div className="text-lg font-semibold text-gray-300 mb-4 text-center">
                    Current Location: <span className="text-orange-400 font-bold">{selectedCity.name}, {selectedCity.country}</span>
                </div>
                {/* Globe component is controlled by the selectedCity state */}
                <Globe selectedCityName={selectedCity.name} />
            </SpotlightCard>

            {/* Clock and Settings Section (Left/Right Layout) */}
            <div className="flex flex-col lg:flex-row gap-8 my-16 py-16 ml-5 mr-5">
                
                {/* Clock Display (Left Side) */}
                <SpotlightCard 
                    spotlightColor="rgba(249, 115, 22, 0.4)" 
                    className="flex-1 bg-gray-950 p-6 md:p-12 border-2 border-orange-500/50 rounded-2xl shadow-2xl shadow-orange-900/50 order-2 lg:order-1"
                >
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
                            className="text-[4rem] overflow-hidden md:text-[6rem] lg:text-[7rem] font-extrabold mx-4 text-orange-500 leading-none"
                            style={{ textShadow: '0 0 1px #FF8C00' }}
                        >
                            :
                        </Motion.div>
                        
                        {/* Minutes */}
                        <div className="flex">
                            <DigitUnit value={formatTime(minutes)[0]} />
                            <DigitUnit value={formatTime(minutes)[1]} />
                        </div>
                        
                        {/* Seconds */}
                        <span className="text-3xl font-mono text-gray-400 ml-4 pt-8 hidden sm:block">
                            {formatTime(seconds)}
                        </span>
                    </div>
                    
                    {/* AM/PM, City, and Date Indicator */}
                    <div className="text-center mt-6">
                        <div className="text-xl font-medium text-white tracking-widest mb-1">
                            {selectedCity.name}, {selectedCity.country} ({gmtString})
                        </div>
                        {!is24HourFormat && (
                            <div className="text-3xl overflow-hidden font-semibold text-orange-400 tracking-widest mb-2">
                                {ampm}
                            </div>
                        )}
                        <div className="text-sm font-medium text-gray-400 mt-2 tracking-wider">
                            Date: {todayDate}
                        </div>
                    </div>
                </SpotlightCard>

                {/* Settings Panel (Right Side) */}
                <div className="lg:w-72 w-full pt-0 flex flex-col space-y-6 order-1 lg:order-2 mt-10">
                    <div className="bg-gray-950 p-6 rounded-2xl border-2 border-orange-500/50 shadow-xl">
                        <h3 className="text-lg font-bold text-white mb-4 border-b border-orange-500 pb-2">
                            Clock Controls
                        </h3>
                        
                        {/* City/Timezone Select Dropdown (Handles 197+ entries via scroll) */}
                        <div className="space-y-2 mb-6">
                            <label htmlFor="city-select" className="text-sm font-medium text-gray-300">Select City</label>
                            <div className="relative">
                                <select 
                                    id="city-select"
                                    value={selectedCity.timezone} 
                                    onChange={handleCityChange}
                                    className="w-full appearance-none bg-gray-800 text-white py-2 px-3 rounded-lg border border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors cursor-pointer"
                                >
                                    {TIMEZONE_DATA.map((city) => (
                                        <option key={city.timezone} value={city.timezone}>
                                            {city.name}, {city.country}
                                        </option>
                                    ))}
                                </select>
                                {/* Custom Arrow Icon */}
                                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>

                        {/* 12/24 Hour Format Toggle */}
                        <CustomToggle
                            checked={is24HourFormat}
                            onChange={setIs24HourFormat}
                        />

                        <div className="mt-6 pt-4 border-t border-gray-800">
                             <p className="text-xs text-gray-500">
                                The 3D Globe above rotates to focus on the selected city. Use the dropdown for the full list of {TIMEZONE_DATA.length} cities.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Motion.div>
    );
};

export default WorldClockComponent;