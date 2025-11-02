// StopWatchComponent.jsx

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

const StopWatchComponent = () => {
    // State for the main timer value (in milliseconds)
    const [time, setTime] = useState(0);
    // State to track if the stopwatch is running
    const [isRunning, setIsRunning] = useState(false);
    // State to store lap times
    const [laps, setLaps] = useState([]);

    // useRef for the interval ID to manage it outside the render cycle
    const intervalRef = useRef(null);
    // useRef for the time when the stopwatch was last started (for lap calculation)
    const lastLapTimeRef = useRef(0);

    // --- Main Timer Logic (useEffect) ---
    useEffect(() => {
        if (isRunning) {
            // Start the interval
            intervalRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 10); // Update every 10 milliseconds
            }, 10);
        } else if (intervalRef.current) {
            // Clear the interval if running is false
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        // Cleanup function: ensures the interval is cleared when the component unmounts
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);

    // --- Time Formatting Function ---
    const formatTime = (totalMilliseconds) => {
        const cs = Math.floor(totalMilliseconds / 10) % 100; // Centiseconds (0-99)
        const totalSeconds = Math.floor(totalMilliseconds / 1000);
        const s = totalSeconds % 60; // Seconds (0-59)
        const m = Math.floor(totalSeconds / 60) % 60; // Minutes (0-59)
        const h = Math.floor(totalSeconds / 3600); // Hours

        // Pad with zeros
        const pad = (num, length = 2) => String(num).padStart(length, '0');

        return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(cs)}`;
    };

    // --- Handlers ---

    const handleStartStop = useCallback(() => {
        setIsRunning(prev => !prev);
    }, []);

    const handleReset = useCallback(() => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
        lastLapTimeRef.current = 0;
    }, []);

    const handleLap = useCallback(() => {
        if (!isRunning) return;

        const currentLapTime = time - lastLapTimeRef.current;
        lastLapTimeRef.current = time;

        const newLap = {
            id: Date.now(),
            lapNumber: laps.length + 1,
            lapTime: formatTime(currentLapTime),
            totalTime: formatTime(time)
        };

        setLaps(prevLaps => [newLap, ...prevLaps]); // Add new lap to the top
    }, [isRunning, time, laps.length]);


    // --- Render ---
    return (
        <div className="flex flex-col h-full">
            <div className="text-center py-6 bg-gray-800 rounded-lg mb-6 shadow-xl">
                <p className="text-5xl md:text-6xl font-mono font-light text-white tracking-wider overflow-hidden">
                    {formatTime(time)}
                </p>
            </div>
            <div className="flex justify-center space-x-4 mb-6">
                <button
                    onClick={isRunning ? handleLap : handleReset}
                    disabled={time === 0 && !isRunning}
                    className={`p-4 rounded-full transition-colors duration-200 shadow-lg ${
                        isRunning 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50'
                            : 'bg-gray-700 hover:bg-gray-600 text-white disabled:opacity-50'
                    }`}
                >
                    {isRunning ? <Flag className="w-6 h-6" /> : <RotateCcw className="w-6 h-6" />}
                </button>
                <button
                    onClick={handleStartStop}
                    className={`p-4 rounded-full transition-colors duration-200 shadow-lg ${
                        isRunning 
                            ? 'bg-red-600 hover:bg-red-700 text-white' 
                            : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                >
                    {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
            </div>
            <div className="flex-grow overflow-y-auto custom-scrollbar p-2 -mx-2">
                {laps.length > 0 && (
                    <div className="bg-gray-800 rounded-lg shadow-inner">
                        <div className="flex justify-between font-semibold text-gray-400 border-b border-gray-700 p-3 sticky top-0 bg-gray-800">
                            <span>LAP</span>
                            <span>LAP TIME</span>
                            <span>TOTAL TIME</span>
                        </div>
                        {laps.map((lap, index) => (
                            <div
                                key={lap.id}
                                className={`flex justify-between p-3 border-b border-gray-700 font-mono text-sm ${
                                    index === 0 ? 'text-yellow-400 font-bold' : 'text-gray-300'
                                }`}
                            >
                                <span className="w-1/6">#{lap.lapNumber}</span>
                                <span className="w-2/5 text-right">{lap.lapTime}</span>
                                <span className="w-2/5 text-right">{lap.totalTime}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StopWatchComponent;