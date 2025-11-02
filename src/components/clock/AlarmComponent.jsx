// AlarmComponent.jsx

import React from 'react';
import { Trash2, Clock, Volume2, BellOff } from 'lucide-react';

const AlarmComponent = ({ alarm, toggleAlarm, deleteAlarm }) => {
    // 24-ঘন্টার ফরম্যাটকে 12-ঘন্টার AM/PM ফরম্যাটে পরিবর্তন করে
    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        const h = parseInt(hours);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const formattedH = h % 12 || 12; // 0 becomes 12
        return `${formattedH}:${minutes} ${ampm}`;
    };

    return (
        <div 
            className={`
                flex items-center justify-between p-4 my-2 rounded-lg transition-all duration-300
                ${alarm.active 
                    ? 'bg-yellow-900/50 border border-yellow-700 shadow-xl' 
                    : 'bg-gray-800/50 border border-gray-700 opacity-60'
                }
            `}
        >
            {/* Time and Name */}
            <div className="flex flex-col">
                <div className="flex items-center text-3xl font-bold">
                    <Clock className="w-5 h-5 mr-3 text-yellow-500" />
                    <span className={alarm.active ? 'text-white overflow-hidden' : 'text-gray-400 overflow-hidden'}>
                        {formatTime(alarm.time)}
                    </span>
                </div>
                <p className={`ml-8 text-sm ${alarm.active ? 'text-yellow-300' : 'text-gray-500'}`}>
                    {alarm.name || 'Alarm'}
                </p>
            </div>

            {/* Controls (Toggle and Delete) */}
            <div className="flex items-center space-x-4">
                {/* Toggle Button */}
                <button
                    onClick={() => toggleAlarm(alarm.id)}
                    className={`
                        p-3 rounded-full transition-colors duration-200
                        ${alarm.active 
                            ? 'bg-green-600 hover:bg-green-700 text-white shadow-md' 
                            : 'bg-red-600 hover:bg-red-700 text-white shadow-md'
                        }
                    `}
                    title={alarm.active ? "Deactivate" : "Activate"}
                >
                    {alarm.active ? <Volume2 className="w-6 h-6" /> : <BellOff className="w-6 h-6" />}
                </button>

                {/* Delete Button */}
                <button
                    onClick={() => deleteAlarm(alarm.id)}
                    className="p-3 text-red-400 bg-gray-700 rounded-full hover:bg-red-900/50 transition-colors duration-200 shadow-md"
                    title="Delete Alarm"
                >
                    <Trash2 className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default AlarmComponent;