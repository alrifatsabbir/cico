/* eslint-disable no-irregular-whitespace */
// Alarm.jsx

import React, { useState, useEffect, useRef } from 'react';
import AlarmComponent from '../../components/clock/AlarmComponent';
import { PlusCircle } from 'lucide-react';
import { toast } from 'react-hot-toast'; 

const ALARMS_STORAGE_KEY = 'worldClockAlarms';
const ALARM_SOUND_PATH = '/alarm_sound.wav'; // 'public' ফোল্ডারের নাম বাদ দেওয়া হয়েছে

const Alarm = () => {
    // State to hold the list of alarms
    const [alarms, setAlarms] = useState(() => {
        const storedAlarms = localStorage.getItem(ALARMS_STORAGE_KEY);
        // নিশ্চিত করা হচ্ছে যে লোড হওয়া অ্যালার্মগুলোতে isRinging এবং notified ফ্ল্যাগগুলো আছে
        const loadedAlarms = storedAlarms ? JSON.parse(storedAlarms) : [];
        return loadedAlarms.map(a => ({
            ...a,
            notified: false,
            isRinging: false
        }));
    });

    // Audio Element পরিচালনার জন্য useRef ব্যবহার করা হলো
    const audioRef = useRef(null); 

    // State for the new alarm creation form
    const [newAlarmTime, setNewAlarmTime] = useState('10:00');
    const [newAlarmName, setNewAlarmName] = useState('');

    // --- INITIAL SETUP: Load Audio Element ---
    useEffect(() => {
        audioRef.current = new Audio(ALARM_SOUND_PATH);
        audioRef.current.loop = true; 
        audioRef.current.volume = 0.8; 
    }, []);
    useEffect(() => {
        const alarmsToSave = alarms.map(({ ...rest }) => rest); 
        localStorage.setItem(ALARMS_STORAGE_KEY, JSON.stringify(alarmsToSave));
    }, [alarms]);

    // --- Side Effect: Alarm Checking Logic and Sound Playing ---
    useEffect(() => {
        const checkAlarm = () => {
            const now = new Date();
            const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            
            let shouldAudioPlay = false;

            const updatedAlarms = alarms.map(alarm => {
                if (alarm.active && alarm.time === currentTime && !alarm.notified) {
                    
                    // Toast Notification
                    toast.success(`⏰ ALARM: ${alarm.name || 'It\'s time!'}`, {
                        duration: 10000,
                        position: 'top-right',
                    });
                    
                    // রিং হচ্ছে হিসেবে চিহ্নিত করা হলো
                    shouldAudioPlay = true;
                    return { ...alarm, notified: true, isRinging: true };
                }
                
                // যদি অ্যালার্ম বাজতে থাকে কিন্তু সময় পেরিয়ে যায় বা নিষ্ক্রিয় থাকে
                if (alarm.isRinging && (alarm.time !== currentTime || !alarm.active)) {
                    return { ...alarm, isRinging: false };
                }

                if (alarm.isRinging) {
                    shouldAudioPlay = true;
                }

                return alarm;
            });

            setAlarms(updatedAlarms);

            // অডিও প্লে বা পজ করার সিদ্ধান্ত
            if (audioRef.current) {
                if (shouldAudioPlay) {
                    // যদি কোনো অ্যালার্ম রিং করার কথা থাকে, তাহলে প্লে করো
                    if (audioRef.current.paused) {
                        try {
                            // Play attempt
                            audioRef.current.play();
// eslint-disable-next-line no-unused-vars
                        } catch (error) {
                            console.warn("Audio autoplay blocked by browser. User interaction required.");
                        }
                    }
                } else {
                    // যদি কোনো অ্যালার্ম রিং করার কথা না থাকে, তাহলে বন্ধ করো
                    if (!audioRef.current.paused) {
                        audioRef.current.pause();
                        audioRef.current.currentTime = 0;
                    }
                }
            }
            
            // পরের মিনিটের জন্য notified ফ্ল্যাগ রিসেট
            if (now.getSeconds() === 0 && now.getMilliseconds() < 500) {
                setAlarms(prevAlarms => 
                    prevAlarms.map(a => ({ ...a, notified: false }))
                );
            }
        };

        const intervalId = setInterval(checkAlarm, 500); 

        return () => clearInterval(intervalId);
    }, [alarms]); 


    // --- Handlers ---

    const addAlarm = (e) => {
        e.preventDefault();
        
        if (!newAlarmTime) {
            toast.error("Please set a valid time.");
            return;
        }

        const newAlarm = {
            id: Date.now(),
            time: newAlarmTime,
            name: newAlarmName,
            active: true,
            notified: false, // Flag to ensure alarm only fires once per minute
            isRinging: false // New flag to track if sound should be playing
        };

        setAlarms([...alarms, newAlarm]);
        setNewAlarmTime('08:00'); 
        setNewAlarmName('');
        toast.success(`New alarm set for ${newAlarmTime}.`);
    };

    const toggleAlarm = (id) => {
        setAlarms(
            alarms.map(alarm => {
                if (alarm.id === id) {
                    // যখন ইউজার toggle করবে, তখন isRinging স্টেটও আপডেট করা হবে
                    const newActiveState = !alarm.active;
                    if (!newActiveState && alarm.isRinging && audioRef.current) {
                        // যদি সক্রিয় থেকে নিষ্ক্রিয় করা হয় এবং সেটি বাজছিল, তাহলে শব্দ বন্ধ করো
                        audioRef.current.pause();
                        audioRef.current.currentTime = 0;
                    }
                    return { 
                        ...alarm, 
                        active: newActiveState,
                        isRinging: newActiveState ? alarm.isRinging : false // নিষ্ক্রিয় হলে রিং বন্ধ
                    };
                }
                return alarm;
            })
        );
    };

    const deleteAlarm = (id) => {
        // ডিলিট করার সময় যদি অ্যালার্মটি বাজে, তবে অডিও বন্ধ করতে হবে
        const alarmToDelete = alarms.find(a => a.id === id);
        if (alarmToDelete && alarmToDelete.isRinging && audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        
        setAlarms(alarms.filter(alarm => alarm.id !== id));
        toast.error("Alarm deleted.");
    };

    return (
        <div className="min-h-screen pb-50 w-full relative overflow-hidden">
            <div className="absolute inset-0 z-0" style={{background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #072607 100%)"}}/>
                <div className="z-10 relative top-30 ">

            <h2 className="text-3xl font-extrabold text-white mb-6 border-b border-gray-700 pb-2 lg:mx-30 mx-5">
                Set Your Alarms
            </h2>

            {/* Alarm Creation Form */}
            <form onSubmit={addAlarm} className="flex flex-col md:flex-row gap-3 mb-8 p-4 bg-gray-800 rounded-lg shadow-inner mx-5 lg:mx-30">
                <input
                    type="time"
                    value={newAlarmTime}
                    onChange={(e) => setNewAlarmTime(e.target.value)}
                    required
                    className="p-3 cursor-pointer text-lg font-mono text-white bg-gray-700 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 appearance-none"
                    style={{minWidth: '120px'}}
                />
                <input
                    type="text"
                    value={newAlarmName}
                    onChange={(e) => setNewAlarmName(e.target.value)}
                    placeholder="Alarm Name (e.g., Morning Meeting)"
                    className="flex-grow p-3 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:ring-yellow-500 focus:border-yellow-500"
                    maxLength="30"
                />
                <button
                    type="submit"
                    className="flex items-center justify-center p-3 text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors duration-200 font-semibold shadow-md"
                >
                    <PlusCircle className="w-10 mr-2" />
                    Add Alarm
                </button>
            </form>

            {/* Alarm List */}
            <div className="space-y-3 mx-5 lg:mx-30">
                {alarms.length > 0 ? (
                    alarms
                        .slice() 
                        .sort((a, b) => a.time.localeCompare(b.time)) 
                        .map(alarm => (
                            <AlarmComponent
                                key={alarm.id}
                                alarm={alarm}
                                toggleAlarm={toggleAlarm}
                                deleteAlarm={deleteAlarm}
                            />
                        ))
                ) : (
                    <p className="text-gray-500 text-center py-8">No alarms set yet. Set your first alarm!</p>
                )}
            </div>
        </div>
        </div>
    );
};

export default Alarm;