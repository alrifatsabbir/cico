// BmiCalculatorComponent.jsx

import React, { useState, useCallback } from 'react';
import { Ruler, Scale } from 'lucide-react';

// Function to determine the BMI category
const getBmiCategory = (bmi) => {
    if (bmi < 18.5) {
        return { label: 'Underweight', color: 'text-blue-400', range: 'Below 18.5' };
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return { label: 'Normal Weight', color: 'text-green-500', range: '18.5 - 24.9' };
    } else if (bmi >= 25 && bmi <= 29.9) {
        return { label: 'Overweight', color: 'text-yellow-500', range: '25.0 - 29.9' };
    } else {
        return { label: 'Obesity', color: 'text-red-500', range: '30.0 and above' };
    }
};

const BmiCalculatorComponent = () => {
    // State for inputs (using strings for flexible input)
    const [weight, setWeight] = useState(''); // in kg
    const [height, setHeight] = useState(''); // in cm

    // State for result
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState(null);
    const [error, setError] = useState('');

    // Function to calculate BMI (BMI = weight / (height_in_meters)^2)
    const calculateBmi = useCallback(() => {
        setError('');
        setBmi(null);
        setCategory(null);

        const w = parseFloat(weight);
        const h_cm = parseFloat(height);

        // Input validation
        if (isNaN(w) || isNaN(h_cm) || w <= 0 || h_cm <= 0) {
            setError("Please enter valid weight (kg) and height (cm) values.");
            return;
        }

        // Convert height from cm to meters
        const h_m = h_cm / 100;
        
        // Calculate BMI
        const calculatedBmi = w / (h_m * h_m);
        
        // Round to 2 decimal places
        const finalBmi = Math.round(calculatedBmi * 100) / 100;
        
        setBmi(finalBmi);
        setCategory(getBmiCategory(finalBmi));
    }, [weight, height]);

    // Handle input change for text fields
    const handleInputChange = (e, setter) => {
        // Allow numbers and decimal point only, and limit length
        const value = e.target.value;
        if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
            if (value.length < 7) {
                 setter(value);
            }
        }
    };
    
    // Clear function
    const handleClear = useCallback(() => {
        setWeight('');
        setHeight('');
        setBmi(null);
        setCategory(null);
        setError('');
    }, []);

    return (
        <div className="flex flex-col h-full bg-gray-800 rounded-xl p-6 shadow-2xl">
            {/* Input Fields */}
            <div className="space-y-6 mb-8">
                {/* Weight Input */}
                <div className="flex flex-col">
                    <label htmlFor="weight" className="text-sm font-medium text-gray-300 flex items-center mb-1">
                        <Scale className="w-4 h-4 mr-2 text-yellow-500"/> Weight (kg)
                    </label>
                    <input
                        id="weight"
                        type="text"
                        value={weight}
                        onChange={(e) => handleInputChange(e, setWeight)}
                        placeholder="e.g., 75.5"
                        className="p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                        inputMode="decimal"
                    />
                </div>

                {/* Height Input */}
                <div className="flex flex-col">
                    <label htmlFor="height" className="text-sm font-medium text-gray-300 flex items-center mb-1">
                        <Ruler className="w-4 h-4 mr-2 text-yellow-500"/> Height (cm)
                    </label>
                    <input
                        id="height"
                        type="text"
                        value={height}
                        onChange={(e) => handleInputChange(e, setHeight)}
                        placeholder="e.g., 175"
                        className="p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                        inputMode="numeric"
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-8">
                <button
                    onClick={calculateBmi}
                    className="flex-1 py-3 bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded-lg shadow-md transition-transform duration-150 active:scale-95"
                >
                    Calculate BMI
                </button>
                <button
                    onClick={handleClear}
                    className="py-3 px-6 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded-lg shadow-md transition-transform duration-150 active:scale-95"
                >
                    Clear
                </button>
            </div>

            {/* Result Display */}
            <div className="flex-grow bg-gray-900/50 p-4 rounded-xl shadow-inner flex flex-col justify-center items-center text-center">
                {error && (
                    <p className="text-red-400 font-semibold mb-2">{error}</p>
                )}
                
                {bmi !== null && category !== null && (
                    <>
                        <p className="text-lg text-gray-300 mb-1">Your BMI is:</p>
                        <p className={`text-6xl font-extrabold mb-4 overflow-hidden ${category.color}`}>
                            {bmi.toFixed(2)}
                        </p>
                        <p className="text-xl font-bold text-white mb-4">
                            Category: <span className={category.color}>{category.label}</span>
                        </p>
                        <p className="text-sm text-gray-400">
                            Normal BMI Range: <span className="text-green-500">18.5 - 24.9</span>
                        </p>
                    </>
                )}
                
                {bmi === null && !error && (
                    <p className="text-gray-500 text-lg">Enter your measurements to calculate BMI.</p>
                )}
            </div>
        </div>
    );
};

export default BmiCalculatorComponent;