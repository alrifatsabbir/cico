// AdvCalculator.jsx

import React from 'react';
import AdvCalculatorComponent from '../../components/calculator/AdvCalculatorComponent';
import { Sparkles } from 'lucide-react';

const AdvCalculator = () => {
    return (
        <div className="min-h-screen w-full relative bg-black">
            <div className="absolute inset-0 z-0" style={{background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249, 115, 22, 0.25), transparent 70%), #000000",}}/>
                <div className="px-4 py-6 mt-30 rounded-xl shadow-2xl backdrop-blur-sm h-full flex flex-col mx-5 md:mx-30 lg:mx-60 xl:mx-80">
                    <div className="flex items-center text-3xl font-extrabold text-white mb-6 border-b border-gray-700 pb-2">
                        <Sparkles className="w-7 h-7 mr-3 text-yellow-500"/>
                            <h2 className="overflow-hidden">Scientific Calculator</h2>
                    </div>
                    <div className="flex-grow min-h-[500px] lg:mx-30"> 
                        <AdvCalculatorComponent />
                    </div>
                </div>
        </div>
    );
};

export default AdvCalculator;