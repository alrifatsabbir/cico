// AdvCalculatorComponent.jsx (Final version with Brackets and full expression tracking)

import React, { useState, useCallback, useEffect } from 'react';
import { Delete, Command } from 'lucide-react'; 

const AdvCalculatorComponent = () => {
    // Single state to hold the full expression (Display)
    const [display, setDisplay] = useState('0');
    
    // State to track if the last action requires clearing the display for new input
    const [shouldClearDisplay, setShouldClearDisplay] = useState(false);
    
    // State for Shift function
    const [isShiftActive, setIsShiftActive] = useState(false);
    
    // State to store the last calculated result for 'Ans' button
    const [lastAnswer, setLastAnswer] = useState(null);

    // Helper: Factorial function (n!)
    const factorial = (n) => {
        if (n < 0 || n % 1 !== 0 || n > 20) return NaN;
        if (n === 0) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    };

    // Helper: Safely calculate the final expression string
    const evaluateExpression = (expression) => {
        try {
            // Step 1: Replace scientific functions and constants with Math equivalents
            let exp = expression
                .replace(/π/g, 'Math.PI')
                .replace(/e/g, 'Math.E')
                .replace(/Ans/g, lastAnswer !== null ? `(${lastAnswer})` : '0') // Replace Ans with last result
                .replace(/(\d+)%/g, '($1/100)') // Basic percentage
                .replace(/\^/g, '**'); // JavaScript power operator

            // Step 2: Handle Trigonometry (assuming degrees input)
            // Example: sin(30) => Math.sin(30 * Math.PI / 180)
            const trigFunctions = ['sin', 'cos', 'tan'];
            trigFunctions.forEach(func => {
                const regex = new RegExp(`${func}\\(([^)]+)\\)`, 'g');
                exp = exp.replace(regex, (match, p1) => 
                    `Math.${func}((${p1}) * Math.PI / 180)`
                );
            });

            // Step 3: Handle Logs, Roots, and Factorial
            exp = exp
                .replace(/log\(([^)]+)\)/g, 'Math.log10($1)')
                .replace(/ln\(([^)]+)\)/g, 'Math.log($1)')
                .replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)')
                .replace(/cbrt\(([^)]+)\)/g, 'Math.cbrt($1)');

            // Factorial (needs custom logic as it's not standard JS)
            // Find numbers followed by '!' and replace them with the calculation.
            // This is simple and safe for integers.
            let factorialMatch;
            while ((factorialMatch = /([0-9]+)!/g.exec(exp)) !== null) {
                const num = parseInt(factorialMatch[1]);
                if (num > 20 || num < 0 || num % 1 !== 0) throw new Error("Math Error");
                const factResult = factorial(num);
                exp = exp.replace(factorialMatch[0], factResult);
            }

            // Step 4: Final safe evaluation
            // NOTE: Using new Function() is generally safer than eval() but still powerful.
            // For a true production calculator, use a library like mathjs or an expression parser.
            const result = new Function(`return ${exp}`)();
            
            if (!isFinite(result)) throw new Error("Math Error");

            return String(Math.round(result * 10000000000) / 10000000000);

        } catch (e) {
            console.error("Evaluation Error:", e);
            return 'Error';
        }
    };


    // --- Handlers ---
    const handleError = useCallback((msg = 'Error') => {
        setDisplay(msg);
        setIsShiftActive(false);
        setShouldClearDisplay(true);
    }, []);

    const handleInput = useCallback((value) => {
        setIsShiftActive(false);
        
        if (display === 'Error') {
            setDisplay(String(value));
            setShouldClearDisplay(false);
            return;
        }

        if (value === 'Ans') {
            if (lastAnswer === null) return;
            setDisplay(prev => shouldClearDisplay || prev === '0' ? String(lastAnswer) : prev + String(lastAnswer));
            setShouldClearDisplay(false);
            return;
        }

        if (shouldClearDisplay) {
            setDisplay(String(value));
            setShouldClearDisplay(false);
        } else if (display === '0' && !['.', '+', '-', '*', '/', '^', '%', '('].includes(value)) {
            setDisplay(String(value));
        } else {
            // Prevent double operators, multiple decimals in a number
            const lastChar = display.slice(-1);
            if (['+', '-', '*', '/', '^', '%', '.'].includes(lastChar) && ['+', '-', '*', '/', '^', '%', '.'].includes(value)) {
                 setDisplay(prev => prev.slice(0, -1) + value);
            } else if (display.length < 50) {
                 setDisplay(prev => prev + value);
            }
        }
    }, [display, shouldClearDisplay, lastAnswer]);
    
    // --- Specific Button Handlers ---

    const handleClear = useCallback(() => {
        setDisplay('0');
        setIsShiftActive(false);
        setShouldClearDisplay(false);
    }, []);

    const handleBackspace = useCallback(() => {
        if (display === 'Error' || shouldClearDisplay || display.length === 1) {
            setDisplay('0');
        } else {
            setDisplay(prev => prev.slice(0, -1));
        }
        setIsShiftActive(false);
        setShouldClearDisplay(false);
    }, [display, shouldClearDisplay]);

    const handleScientificFunction = useCallback((func) => {
        setIsShiftActive(false);
        setShouldClearDisplay(false);
        
        // Functions that wrap input (e.g., sin( or log( )
        const wrappingFunctions = ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'cbrt'];

        if (wrappingFunctions.includes(func)) {
             // If the display is not '0' and we press a function, assume we want to wrap the current value
             if (display !== '0' && !shouldClearDisplay) {
                 setDisplay(prev => `${func}(${prev})`);
             } else {
                 setDisplay(prev => shouldClearDisplay || prev === '0' ? `${func}(` : prev + `${func}(`);
             }
        }
        // Functions that are single-value operations (e.g., x!, x^2)
        else {
            let num;
            try {
                // Try to evaluate the current display value if it's a number/simple expression
                num = new Function(`return ${display}`)();
                if (isNaN(num)) throw new Error();
            } catch {
                handleError("Syntax Error");
                return;
            }

            let result;
            try {
                switch (func) {
                    case 'pow2': result = Math.pow(num, 2); break;
                    case 'inverse': result = 1 / num; break;
                    case 'neg': result = -1 * num; break;
                    case 'fact': result = factorial(num); break;
                    case 'pow3': result = Math.pow(num, 3); break;
                    case 'pow10': result = Math.pow(10, num); break;
                    case 'powE': result = Math.pow(Math.E, num); break;
                    default: return;
                }
                if (!isFinite(result)) throw new Error();
                
                setDisplay(String(Math.round(result * 10000000000) / 10000000000));
                setShouldClearDisplay(true);
            // eslint-disable-next-line no-unused-vars
            } catch (e) {
                handleError("Math Error");
            }
        }
    }, [display, shouldClearDisplay, handleError]);

    const handleConstant = useCallback((constant) => {
        setIsShiftActive(false);
        const value = constant === 'pi' ? 'π' : 'e';
        setDisplay(prev => shouldClearDisplay || prev === '0' ? value : prev + value);
        setShouldClearDisplay(false);
    }, [shouldClearDisplay]);

    const handleShiftToggle = useCallback(() => {
        setIsShiftActive(prev => !prev);
    }, []);

    const handleEquals = useCallback(() => {
        setIsShiftActive(false);
        setShouldClearDisplay(true);
        
        // Final evaluation
        const result = evaluateExpression(display);

        if (result === 'Error') {
            handleError();
            setLastAnswer(null);
            return;
        }

        setDisplay(result);
        setLastAnswer(result); // Store the result for 'Ans'
        
    }, [display, handleError, lastAnswer]);

    // --- Keyboard Handling (Simplified for Advanced Calculator) ---

    const handleKeyDown = useCallback((event) => {
        const { key } = event;
        
        if (!isNaN(parseInt(key))) { handleInput(key); } 
        else if (['+', '-', '*', '/', '%', '(', ')', '.'].includes(key)) { handleInput(key); } 
        else if (key === '^') { handleInput('^'); } // Power
        else if (key === 'Enter' || key === '=') { event.preventDefault(); handleEquals(); } 
        else if (key === 'Backspace' || key === 'Delete') { handleBackspace(); } 
        else if (key === 'Escape') { handleClear(); }
    }, [handleInput, handleEquals, handleBackspace, handleClear]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);


    // --- Button Layout (5 columns, 7 rows - Final Aesthetic) ---
    const numberStyle = 'bg-gray-700 hover:bg-gray-600';
    const operatorStyle = 'bg-gray-600 hover:bg-gray-500 text-yellow-500 text-xl'; 
    const funcStyle = 'bg-gray-700/50 hover:bg-gray-600/70 text-yellow-400 text-sm';
    const accentStyle = 'text-white font-bold text-lg';

    // The grid is 5 columns wide. Total rows needed: 7
    const scientificButtons = [
        // Row 1: Shift, DEL, AC, Brackets, Power/Mod
        { label: isShiftActive ? 'SHIFT' : 'SHIFT', action: handleShiftToggle, style: `text-xs ${isShiftActive ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-gray-600 hover:bg-gray-500'} ${accentStyle}` },
        { label: 'DEL', action: handleBackspace, icon: <Delete className="w-5 h-5"/>, style: 'bg-gray-600 hover:bg-gray-500' },
        { label: 'AC', action: handleClear, style: 'bg-red-700 hover:bg-red-600 font-bold' },
        { label: '(', action: () => handleInput('('), style: operatorStyle },
        { label: ')', action: () => handleInput(')'), style: operatorStyle },

        // Row 2: Scientific Functions
        { label: isShiftActive ? 'asin' : 'sin', action: () => handleInput(isShiftActive ? 'asin(' : 'sin('), style: funcStyle },
        { label: isShiftActive ? 'acos' : 'cos', action: () => handleInput(isShiftActive ? 'acos(' : 'cos('), style: funcStyle },
        { label: isShiftActive ? 'atan' : 'tan', action: () => handleInput(isShiftActive ? 'atan(' : 'tan('), style: funcStyle },
        { label: isShiftActive ? '10^' : 'log', action: () => handleInput(isShiftActive ? '10^' : 'log('), style: funcStyle },
        { label: isShiftActive ? 'e^' : 'ln', action: () => handleInput(isShiftActive ? 'e^' : 'ln('), style: funcStyle },

        // Row 3: Utility Functions (x!, roots, powers)
        { label: isShiftActive ? 'x³' : 'x²', action: () => handleScientificFunction(isShiftActive ? 'pow3' : 'pow2'), style: funcStyle },
        { label: isShiftActive ? 'cbrt' : 'sqrt', action: () => handleInput(isShiftActive ? 'cbrt(' : 'sqrt('), style: funcStyle },
        { label: '^', action: () => handleInput('^'), style: operatorStyle }, // x^y
        { label: 'x!', action: () => handleScientificFunction('fact'), style: funcStyle },
        { label: '/', action: () => handleInput('/'), style: operatorStyle },

        // Row 4: Numbers 7, 8, 9, *
        { label: '7', action: () => handleInput('7'), style: numberStyle },
        { label: '8', action: () => handleInput('8'), style: numberStyle },
        { label: '9', action: () => handleInput('9'), style: numberStyle },
        { label: 'π', action: () => handleConstant('pi'), style: funcStyle },
        { label: '*', action: () => handleInput('*'), style: operatorStyle },

        // Row 5: Numbers 4, 5, 6, -
        { label: '4', action: () => handleInput('4'), style: numberStyle },
        { label: '5', action: () => handleInput('5'), style: numberStyle },
        { label: '6', action: () => handleInput('6'), style: numberStyle },
        { label: '1/x', action: () => handleScientificFunction('inverse'), style: funcStyle },
        { label: '-', action: () => handleInput('-'), style: operatorStyle },

        // Row 6: Numbers 1, 2, 3, +
        { label: '1', action: () => handleInput('1'), style: numberStyle },
        { label: '2', action: () => handleInput('2'), style: numberStyle },
        { label: '3', action: () => handleInput('3'), style: numberStyle },
        { label: 'e', action: () => handleConstant('e'), style: funcStyle },
        { label: '+', action: () => handleInput('+'), style: operatorStyle },

        // Row 7: 0, ., +/-, Ans, =
        { label: '0', action: () => handleInput('0'), style: 'col-span-2 ' + numberStyle },
        { label: '.', action: () => handleInput('.'), style: numberStyle },
        { label: '+/-', action: () => handleScientificFunction('neg'), style: numberStyle },
        { label: 'Ans', action: () => handleInput('Ans'), style: funcStyle },
        { label: '=', action: handleEquals, style: 'bg-yellow-600 hover:bg-yellow-500 row-span-2 text-3xl' }, // = spans 2 rows
    ];

    // Button rendering helper
    const renderButton = (btn, index) => {
        const isWide = btn.label === '0';
        const isTall = btn.label === '=';
        
        // Final position of the '=' button is index 34. Grid total size is 5*7=35.
        // It occupies slots 34 and 39 (which is outside the list, but handled by row-span).

        // Style adjustments for readability
        let labelClasses = 'text-xl';
        if (['SHIFT', 'DEL', 'AC'].includes(btn.label)) {
            labelClasses = 'text-base font-bold';
        } else if (btn.style.includes('text-sm')) {
             labelClasses = 'text-sm';
        } else if (btn.style.includes('text-xs')) {
             labelClasses = 'text-xs';
        }
        
        return (
            <button
                key={index}
                onClick={btn.action}
                className={`
                    ${btn.style} 
                    ${isWide ? 'col-span-2' : ''} 
                    ${isTall ? 'row-span-2' : ''}
                    text-white font-semibold transition-all duration-150 active:scale-95 
                    flex items-center justify-center rounded-lg 
                    h-12 md:h-14 
                    ${labelClasses}
                `}
                style={isTall ? { gridRowEnd: 'span 2' } : {}}
            >
                {btn.icon || btn.label}
            </button>
        );
    };

    return (
        <div className="flex flex-col h-full bg-gray-900/50 rounded-xl p-4 shadow-2xl">
            {/* Display Screen */}
            <div className="bg-gray-800 h-20 p-3 mb-4 rounded-lg flex flex-col justify-between shadow-inner font-mono border-b-2 border-yellow-600/50">
                {/* Status/Input line */}
                <div className="flex justify-between text-xs text-gray-400">
                    <span className={`font-bold transition-colors ${isShiftActive ? 'text-yellow-400' : 'text-gray-700'}`}>
                        {isShiftActive ? 'SHIFT' : ''}
                    </span>
                    <span className="text-right overflow-hidden text-sm text-gray-400">
                        {/* Display the Answer value if it exists */}
                        {lastAnswer !== null ? `Ans=${lastAnswer}` : ''}
                    </span>
                </div>
                {/* Result/Main line - Use an input field for better mobile scroll/focus */}
                <div className="text-right overflow-hidden text-3xl font-light text-white overflow-x-auto whitespace-nowrap">
                    {display}
                </div>
            </div>

            {/* Buttons Grid: 7 rows x 5 columns */}
            <div className="grid grid-cols-5 grid-rows-[repeat(7,minmax(0,1fr))] gap-2 flex-grow">
                {scientificButtons.map(renderButton)}
            </div>
        </div>
    );
};

export default AdvCalculatorComponent;