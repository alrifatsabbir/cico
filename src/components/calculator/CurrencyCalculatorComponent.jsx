// CurrencyCalculatorComponent.jsx (Final Version: CORS-Friendly)

import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

// NOTE: Please replace YOUR_API_KEY_HERE with your actual key.
// We use the same API but adjust the URL structure slightly.
const API_KEY = "58fcaf630819b10990685388"; 
// Using the Free Tier public endpoint for better CORS compatibility
const RATES_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`; 
const CODES_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/codes`; 

const CurrencyCalculatorComponent = () => {
    // [STATE LOGIC REMAINS UNCHANGED]
    const [currencyRates, setCurrencyRates] = useState(null);
    const [currencyNames, setCurrencyNames] = useState({});
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('BDT');
    const [result, setResult] = useState(null);
    
    const availableCurrencyCodes = Object.keys(currencyNames).sort();

    // --- Data Fetching Logic (API) ---
    
    // 1. Fetch the full list of currency codes and names
    const fetchCodes = useCallback(async () => {
        try {
            // *** CORS-Friendly URL structure (Attempt 1: Standard Fetch) ***
            const response = await fetch(CODES_URL);
            
            // If fetch fails due to network/CORS, the Promise rejects (caught below)
            if (!response.ok) {
                // If status is 4xx or 5xx (e.g., 403 Forbidden, 404 Not Found)
                throw new Error(`Failed to fetch currency list. Status: ${response.status}`);
            }
            
            const data = await response.json();

            if (data.result !== 'success' || !data.supported_codes) {
                throw new Error("Invalid response structure or API key is restricted.");
            }

            const namesMap = data.supported_codes.reduce((acc, [code, name]) => {
                acc[code] = name;
                return acc;
            }, {});

            setCurrencyNames(namesMap);
            setError(null);
            
        } catch (err) {
            console.error("Code Fetch Error (CORS likely):", err.message || err);
            // Fallback for better user experience if API fetch fails
            setError("Could not load currency list. Check API Key or try 'USD' as base.");
            setLoading(false); 
        }
    }, []);

    // 2. Fetch the conversion rates based on the selected base currency
    const fetchRates = useCallback(async (baseCurrency) => {
        setLoading(true);
        setError(null);
        
        if (Object.keys(currencyNames).length === 0) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${RATES_URL}${baseCurrency}`);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch rates: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.result !== 'success' || !data.conversion_rates) {
                 throw new Error(data['error-type'] || "API Error during rate fetch.");
            }
            
            setCurrencyRates({
                base: data.base_code,
                rates: data.conversion_rates
            });

        } catch (err) {
            console.error("Rate Fetch Error:", err.message || err);
            setError("Could not fetch rates. Conversion might be outdated.");
        } finally {
            setLoading(false);
        }
    }, [currencyNames]);

    // [EFFECTS AND HANDLERS REMAIN UNCHANGED]
    useEffect(() => {
        fetchCodes();
    }, [fetchCodes]);
    
    useEffect(() => {
        if (Object.keys(currencyNames).length > 0) {
             fetchRates(fromCurrency);
        }
    }, [fromCurrency, fetchRates, currencyNames]);
    
    const handleConvert = useCallback(() => { /* logic */
        const inputAmount = parseFloat(amount);
        if (isNaN(inputAmount) || inputAmount <= 0) {
            setError("Please enter a valid amount.");
            setResult(null);
            return;
        }
        if (!currencyRates || !currencyRates.rates[toCurrency]) {
             setError("Currency data not available. Please refresh.");
             setResult(null);
             return;
        }
        const rate = currencyRates.rates[toCurrency];
        const convertedResult = inputAmount * rate;
        setResult(Math.round(convertedResult * 10000) / 10000);
        setError(null);
    }, [amount, toCurrency, currencyRates]);

    const handleAmountChange = (e) => { /* logic */
        const value = e.target.value;
        if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
            setAmount(value);
        }
    };
    
    const handleSwap = useCallback(() => { /* logic */
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setResult(null);
    }, [fromCurrency, toCurrency]);

    const formatOption = (code) => {
        return `${code} - ${currencyNames[code] || ''}`;
    };

    // [UI REMAINS UNCHANGED]

    return (
        <div className="flex flex-col h-full bg-gray-800 rounded-xl p-6 shadow-2xl">
            {/* Input Fields */}
            <div className="space-y-5 mb-6">
                {/* Amount Input */}
                {/* ... (Amount Input UI) ... */}
                <div className="flex flex-col">
                    <label htmlFor="amount" className="text-sm font-medium text-gray-300 flex items-center mb-1">
                        Amount
                    </label>
                    <input
                        id="amount"
                        type="text"
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="e.g., 100"
                        className="p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-lg"
                        inputMode="decimal"
                    />
                </div>
                
                {/* FROM Currency Dropdown */}
                <div className="relative">
                    <label htmlFor="fromCurrency" className="text-sm font-medium text-gray-300 block mb-1">
                        From
                    </label>
                    <select
                        id="fromCurrency"
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-yellow-500 focus:border-yellow-500 appearance-none pr-10 cursor-pointer"
                        disabled={loading || availableCurrencyCodes.length === 0}
                    >
                         {availableCurrencyCodes.map(code => (
                            <option key={code} value={code}>{formatOption(code)}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-gray-400">
                        <TrendingUp className="w-5 h-5"/>
                    </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center py-1">
                    <button 
                        onClick={handleSwap} 
                        className="p-2 bg-gray-600 hover:bg-yellow-600 rounded-full text-white transition-all duration-150 active:scale-90"
                        title="Swap Currencies"
                        disabled={loading || availableCurrencyCodes.length === 0}
                    >
                        <RefreshCw className="w-5 h-5"/>
                    </button>
                </div>
                
                {/* TO Currency Dropdown */}
                <div className="relative">
                    <label htmlFor="toCurrency" className="text-sm font-medium text-gray-300 block mb-1">
                        To
                    </label>
                    <select
                        id="toCurrency"
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-yellow-500 focus:border-yellow-500 appearance-none pr-10 cursor-pointer"
                        disabled={loading || availableCurrencyCodes.length === 0}
                    >
                        {availableCurrencyCodes
                            .filter(code => code !== fromCurrency) 
                            .map(code => (
                                <option key={code} value={code}>{formatOption(code)}</option>
                            ))
                        }
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-gray-400">
                        <TrendingDown className="w-5 h-5"/>
                    </div>
                </div>
            </div>

            {/* Convert Button */}
            <button
                onClick={handleConvert}
                disabled={loading || error || availableCurrencyCodes.length === 0}
                className={`py-3 mb-6 font-bold rounded-lg shadow-md transition-all duration-150 active:scale-95 
                    ${loading ? 'bg-gray-500' : 'bg-yellow-600 hover:bg-yellow-500 text-white'}
                `}
            >
                {loading ? 'Fetching Rates...' : 'Convert'}
            </button>
            
            {/* Result Display */}
            <div className="flex-grow bg-gray-900/50 p-4 rounded-xl shadow-inner flex flex-col justify-center text-center">
                {loading && !error && (
                    <div className="flex items-center justify-center text-yellow-500">
                        <DollarSign className="w-6 h-6 animate-spin mr-2"/>
                        <p>Loading currencies...</p>
                    </div>
                )}

                {error && (
                    <p className="text-red-400 font-semibold mb-2">{error}</p>
                )}
                
                {result !== null && (
                    <>
                        <p className="text-lg text-gray-300 mb-1 overflow-hidden">
                            {amount} {fromCurrency} equals:
                        </p>
                        <p className={`text-5xl font-extrabold text-yellow-400 overflow-hidden`}>
                            {result} <span className="text-3xl text-white">{toCurrency}</span>
                        </p>
                    </>
                )}
                
                {result === null && !error && !loading && (
                    <p className="text-gray-500 text-lg">Select currencies and press Convert.</p>
                )}
                
                 {currencyRates && currencyRates.rates[toCurrency] && (
                    <p className="text-xs text-gray-400 mt-2">
                        1 {fromCurrency} = {currencyRates.rates[toCurrency].toFixed(4)} {toCurrency}
                    </p>
                )}
            </div>
        </div>
    );
};

export default CurrencyCalculatorComponent;