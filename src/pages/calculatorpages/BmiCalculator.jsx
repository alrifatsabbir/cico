// BmiCalculator.jsx

import React from 'react';
import BmiCalculatorComponent from '../../components/calculator/BmiCalculatorComponent';
import { HeartPulse } from 'lucide-react';

const BmiCalculator = () => {
    return (
        <div className="min-h-screen w-full bg-black relative">
            <div className="absolute inset-0 z-0" style={{background: "#000000",backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)`,backgroundSize: "30px 30px",backgroundPosition: "0 0",}}/>
                <div className="p-4 rounded-xl shadow-2xl backdrop-blur-sm h-full flex flex-col mt-30 mx-5 md:mx-60 lg:mx-75">
                    <div className="flex items-center text-3xl font-extrabold text-white mb-6 border-b border-gray-700 pb-2">
                        <HeartPulse className="w-7 h-7 mr-3 text-red-500"/>
                        <h2 className="overflow-hidden">BMI Calculator</h2>
                    </div>
                    <div className="flex-grow"> 
                        <BmiCalculatorComponent />
                    </div>
                </div>
        </div>
    );
};

export default BmiCalculator;
