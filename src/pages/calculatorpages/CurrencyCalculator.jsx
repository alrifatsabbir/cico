// CurrencyCalculator.jsx

import React from 'react';
import CurrencyCalculatorComponent from '../../components/calculator/CurrencyCalculatorComponent';
import { DollarSign } from 'lucide-react';

const CurrencyCalculator = () => {
    return (
        <div className="min-h-screen w-full relative bg-black">
            <div className="absolute inset-0 z-0" style={{background: `radial-gradient(ellipse 70% 55% at 50% 50%, rgba(255, 20, 147, 0.15), transparent 50%),radial-gradient(ellipse 160% 130% at 10% 10%, rgba(0, 255, 255, 0.12), transparent 60%),radial-gradient(ellipse 160% 130% at 90% 90%, rgba(138, 43, 226, 0.18), transparent 65%),radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),#000000`,}}/>
                <div className="p-4 rounded-xl shadow-2xl backdrop-blur-sm h-full flex flex-col mt-30 mx-5 lg:mx-60">
                    <div className="flex items-center text-3xl font-extrabold text-white mb-6 border-b border-gray-700 pb-2">
                        <DollarSign className="w-7 h-7 mr-3 text-green-500"/>
                        <h2 className="overflow-hidden">Real-time Currency Converter</h2>
                    </div>
                    <div className="flex-grow"> 
                        <CurrencyCalculatorComponent />
                    </div>
        </div>
        </div>
    );
};

export default CurrencyCalculator;
