// StopWatch.jsx

import React from 'react';
import StopWatchComponent from '../../components/clock/StopWatchComponent';
import { Timer } from 'lucide-react';

const StopWatch = () => {
    return (
        <div className="min-h-screen w-full bg-black relative">
            <div className="absolute inset-0 z-0"style={{background: `
                radial-gradient(ellipse 110% 70% at 25% 80%, rgba(147, 51, 234, 0.12), transparent 55%),
                radial-gradient(ellipse 130% 60% at 75% 15%, rgba(59, 130, 246, 0.10), transparent 65%),
                radial-gradient(ellipse 80% 90% at 20% 30%, rgba(236, 72, 153, 0.14), transparent 50%),
                radial-gradient(ellipse 100% 40% at 60% 70%, rgba(16, 185, 129, 0.08), transparent 45%),
                #000000`,}}/>
            <div className="p-4 rounded-xl bg-gray-900/50 shadow-2xl backdrop-blur-sm h-full flex flex-col mt-30 mx-5 mb-8 lg:mx-30">
                <div className="flex items-center text-3xl font-extrabold text-white mb-6 border-b border-gray-700 pb-2">
                    <Timer className="w-7 h-7 mr-3 text-yellow-500"/>
                <h2 className="overflow-hidden">Stopwatch</h2>
                </div>
                <div className="flex-grow">
                    <StopWatchComponent />
                </div>
            </div>
        </div>
    );
};

export default StopWatch;