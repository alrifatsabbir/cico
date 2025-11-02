/* eslint-disable no-irregular-whitespace */
// CalculatorComponent.jsx

import React, { useState, useCallback, useEffect } from 'react'; // useEffect import kora holo
import { Delete } from 'lucide-react'; 

const CalculatorComponent = () => {
    // State to hold the current input/result displayed on the screen
    const [display, setDisplay] = useState('0');
    // State to hold the number waiting for the next operation (e.g., after pressing '+')
    const [previousValue, setPreviousValue] = useState(null);
    // State to hold the current operation (+, -, *, /)
    const [operation, setOperation] = useState(null);
    // State to track if the last button pressed was an operation or equals, 
    // indicating the next number should clear the display.
    const [shouldClearDisplay, setShouldClearDisplay] = useState(false);


    // --- Calculator Logic (অপরিবর্তিত) ---

    // Function to handle number input
    const handleNumber = useCallback((number) => {
        if (shouldClearDisplay) {
            setDisplay(String(number));
            setShouldClearDisplay(false);
        } else if (display === '0') {
            setDisplay(String(number));
        } else {
            // Display length limit kora holo
            if (display.length < 15) { 
                setDisplay(prev => prev + number);
            }
        }
    }, [display, shouldClearDisplay]);

    // Function to handle decimal point
    const handleDecimal = useCallback(() => {
        if (shouldClearDisplay) {
             setDisplay('0.');
             setShouldClearDisplay(false);
        } else if (!display.includes('.')) {
            setDisplay(prev => prev + '.');
        }
    }, [display, shouldClearDisplay]);

    // Function to reset all states (All Clear - AC)
    const handleClear = useCallback(() => {
        setDisplay('0');
        setPreviousValue(null);
        setOperation(null);
        setShouldClearDisplay(false);
    }, []);

    // Function to delete the last digit (Backspace)
    const handleBackspace = useCallback(() => {
        if (display === 'Error') {
            setDisplay('0');
        } else if (display.length === 1) {
            setDisplay('0');
        } else {
            setDisplay(prev => prev.slice(0, -1));
        }
        setShouldClearDisplay(false);
    }, [display]);

    // Core function to calculate the result
    const calculate = useCallback((first, second, op) => {
        const num1 = parseFloat(first);
        const num2 = parseFloat(second);

        if (isNaN(num1) || isNaN(num2)) return second;

        let result;
        switch (op) {
            case '+':
            case 'Add':
                result = num1 + num2;
                break;
            case '-':
            case 'Subtract':
                result = num1 - num2;
                break;
            case '*':
            case 'Multiply':
                result = num1 * num2;
                break;
            case '/':
            case 'Divide':
                if (num2 === 0) return 'Error';
                result = num1 / num2;
                break;
            default:
                return num2;
        }

        // Limit decimal places for cleaner display
        return String(Math.round(result * 100000) / 100000); 
    }, []);

    // Function to handle operation buttons (+, -, *, /)
    const handleOperation = useCallback((nextOperation) => {
        const currentValue = parseFloat(display);

        if (previousValue === null) {
            // First operation, store current value
            setPreviousValue(currentValue);
            setOperation(nextOperation);
        } else if (operation) {
            // Consecutive operation, calculate previous result and store new operation
            const result = calculate(previousValue, currentValue, operation);
            setPreviousValue(parseFloat(result));
            setDisplay(result);
            setOperation(nextOperation);
        }
        
        setShouldClearDisplay(true);

    }, [display, previousValue, operation, calculate]);

    // Function to handle equals button
    const handleEquals = useCallback(() => {
        if (previousValue !== null && operation !== null) {
            const currentValue = parseFloat(display);
            const result = calculate(previousValue, currentValue, operation);

            setDisplay(result);
            setPreviousValue(null);
            setOperation(null);
            setShouldClearDisplay(true); // Next button press should start a new calculation

            // If the result is 'Error', reset everything after a short delay for display
            if (result === 'Error') {
                setTimeout(handleClear, 1500); 
            }
        }
    }, [display, previousValue, operation, calculate, handleClear]);
    
    // --- KEYBOARD HANDLING LOGIC ---
    const handleKeyDown = useCallback((event) => {
        const { key } = event;
        
        // Number keys (0-9)
        if (!isNaN(parseInt(key))) {
            handleNumber(parseInt(key));
        // Operations keys (+, -, *, /)
        } else if (['+', '-', '*', '/'].includes(key)) {
            handleOperation(key);
        // Enter, Equal or NumpadEnter
        } else if (key === 'Enter' || key === '=' || key === 'NumpadEnter') {
            event.preventDefault(); // Default form submit bondho korar jonno
            handleEquals();
        // Decimal point
        } else if (key === '.' || key === 'Decimal') {
            handleDecimal();
        // Backspace or Delete
        } else if (key === 'Backspace' || key === 'Delete') {
            handleBackspace();
        // Escape for All Clear (AC)
        } else if (key === 'Escape') {
            handleClear();
        }
    }, [handleNumber, handleOperation, handleEquals, handleDecimal, handleBackspace, handleClear]);

    // Effect to attach and detach the event listener
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup: component unmount hole event listener soriye dewa
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);


    // --- Button Layout (অপরিবর্তিত) ---
    const buttons = [
        { label: 'AC', style: 'bg-gray-600 hover:bg-gray-500 text-white', action: handleClear },
        { label: 'DEL', style: 'bg-gray-600 hover:bg-gray-500 text-white', action: handleBackspace, icon: <Delete className="w-6 h-6" /> }, 
        { label: '/', style: 'bg-yellow-600 hover:bg-yellow-700 text-white', action: () => handleOperation('/') },
        { label: '*', style: 'bg-yellow-600 hover:bg-yellow-700 text-white', action: () => handleOperation('*') },
        { label: '7', style: 'bg-gray-700 hover:bg-gray-600 text-white', action: () => handleNumber(7) },
        { label: '8', style: 'bg-gray-700 hover:bg-gray-600 text-white', action: () => handleNumber(8) },
        { label: '9', style: 'bg-gray-700 hover:bg-gray-600 text-white', action: () => handleNumber(9) },
        { label: '-', style: 'bg-yellow-600 hover:bg-yellow-700 text-white', action: () => handleOperation('-') },
        { label: '4', style: 'bg-gray-700 hover:bg-gray-600 text-white', action: () => handleNumber(4) },
        { label: '5', style: 'bg-gray-700 hover:bg-gray-600 text-white', action: () => handleNumber(5) },
        { label: '6', style: 'bg-gray-700 hover:bg-gray-600 text-white', action: () => handleNumber(6) },
        { label: '+', style: 'bg-yellow-600 hover:bg-yellow-700 text-white', action: () => handleOperation('+') },
        { label: '1', style: 'bg-gray-700 hover:bg-gray-600 text-white', action: () => handleNumber(1) },
        { label: '2', style: 'bg-gray-700 hover:bg-gray-600 text-white', action: () => handleNumber(2) },
        { label: '3', style: 'bg-gray-700 hover:bg-gray-600 text-white', action: () => handleNumber(3) },
        { label: '=', style: 'bg-yellow-600 hover:bg-yellow-700 text-white row-span-2', action: handleEquals }, // This button spans two rows
        { label: '0', style: 'bg-gray-700 hover:bg-gray-600 text-white col-span-2', action: () => handleNumber(0) }, // This button spans two columns
        { label: '.', style: 'bg-gray-700 hover:bg-gray-600 text-white', action: handleDecimal },
    ];

    return (
        <div className="flex flex-col h-full bg-gray-800 rounded-xl px-4 py-8 shadow-2xl sm:mx-56 mx-20 lg:mx-94 md:mx-60 xl:mx-130 2xl:mx-140">
            {/* Display Screen */}
            <div className="bg-gray-900 h-24 p-4 mb-4 rounded-lg flex flex-col justify-around shadow-inner">
                {/* Previous operation indicator */}
                <div className="text-right text-sm text-gray-400 font-mono h-4 overflow-hidden">
                    {previousValue !== null && operation !== null 
                        ? `${previousValue} ${operation}` 
                        : ''}
                </div>
                {/* Current Display/Result */}
                <div className="text-right text-4xl font-mono text-white overflow-hidden whitespace-nowrap">
                    {display.length > 10 ? display.slice(0, 10) + '...' : display}
                </div>
            </div>

            {/* Buttons Grid */}
            <div className="grid grid-cols-4 grid-rows-5 gap-3 flex-grow">
                {buttons.map((btn, index) => (
                    <button
                        key={index}
                        onClick={btn.action}
                        className={`
                            ${btn.style} 
                            ${btn.colSpan || ''} 
                            ${btn.rowSpan || ''}
                            text-xl font-semibold 
                            rounded-xl 
                            transition-all 
                            active:scale-95
                            flex items-center justify-center
                        `}
                    >
                        {btn.icon || btn.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CalculatorComponent;