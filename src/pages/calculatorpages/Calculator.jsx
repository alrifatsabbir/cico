import React from 'react';
import CalculatorComponent from '../../components/calculator/CalculatorComponent';
import { Sigma } from 'lucide-react';

const Calculator = () => {
    return (
<div className="min-h-screen w-full relative bg-black">
    <div
      className="absolute inset-0 z-0"
      style={{background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6, 182, 212, 0.25), transparent 70%), #000000",}}/>
        <div className="p-4 mt-30 rounded-xl shadow-2xl backdrop-blur-sm h-full flex flex-col">
            <div className="flex mx-10 items-center text-3xl font-extrabold text-white mb-6 border-b border-gray-700 pb-2">
                <Sigma className="w-7 h-7 mr-3 text-yellow-500"/>
                <h2 className="overflow-hidden">Calculator</h2>
            </div>
            <div className="flex-grow min-h-[400px]"> {/* min-height ensure proper sizing */}
                <CalculatorComponent />
            </div>
        </div>

  </div>
    );
};
export default Calculator;