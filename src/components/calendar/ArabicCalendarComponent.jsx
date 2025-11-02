// src/components/calendar/ArabicCalendarComponent.jsx - (File content is the same as previous)

import React, { useState, useMemo } from 'react';
import SpotlightCard from '../SpotlightCard'; 
import { useArabicCalendar, ARABIC_MONTHS, ARABIC_DAYS_OF_WEEK, toEnglishNumber } from '../logic/useArabicCalendar'; 

const GR_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const ArabicCalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { 
    days, 
    startOfMonthDayIndex,
    currentGrYear, 
    currentGrMonthIndex,
    currentHijriMonthIndex,
    currentHijriYear,
    todayHijriInfo,
  } = useArabicCalendar(currentDate);

  const YEAR_RANGE = 5;
  
  const monthOptions = ARABIC_MONTHS;
  
  const hijriYearOptions = useMemo(() => {
    const years = [];
    const hijriYearStart = currentHijriYear - YEAR_RANGE;
    const hijriYearEnd = currentHijriYear + YEAR_RANGE;
    for (let i = hijriYearStart; i <= hijriYearEnd; i++) {
      years.push(i);
    }
    return years;
  }, [currentHijriYear]); 

  const handleDropdownChange = (type, value) => {
    const newDate = new Date(currentDate);
    
    if (type === 'month') {
        const selectedHijriMonthIndex = parseInt(value); 
        newDate.setMonth(newDate.getMonth() + (selectedHijriMonthIndex - currentHijriMonthIndex));

    } else if (type === 'year') {
      const newHijriYear = parseInt(value);
      const yearDiff = newHijriYear - currentHijriYear;
      newDate.setFullYear(currentGrYear + Math.round(yearDiff * (354/365)));
    }
    
    setCurrentDate(newDate);
  };
  
  const handleNavClick = (direction) => {
      const newDate = new Date(currentDate);
      if (direction === 'prev') {
          newDate.setMonth(newDate.getMonth() - 1);
      } else {
          newDate.setMonth(newDate.getMonth() + 1);
      }
      setCurrentDate(newDate);
  }

  const today = new Date();
  const todayDayName = ARABIC_DAYS_OF_WEEK[today.getDay()];
  
  const todayDateStr = toEnglishNumber(todayHijriInfo.day); 
  const todayHijriYearDisplay = toEnglishNumber(todayHijriInfo.year); 
  const todayHijriMonthName = ARABIC_MONTHS[todayHijriInfo.month - 1];

  const firstDayClass = `col-start-${startOfMonthDayIndex + 1}`; 

  return (
    <SpotlightCard 
      className="custom-spotlight-card max-w-lg md:max-w-4xl mx-auto" 
      spotlightColor="rgba(249, 115, 22, 0.25)">
      
      <div className="flex flex-col lg:flex-row w-full bg-transparent p-4 md:p-6 lg:p-8 ltr">
        <div className="w-full lg:w-3/4 pr-0 lg:pr-6 border-b lg:border-b-0 lg:border-r border-gray-700/50 pb-6 lg:pb-0">
          
          
          <div className="flex justify-between items-center mb-5 gap-2">
            
            <div className='flex items-center min-w-[30%]'>
                <button onClick={() => handleNavClick('prev')} className="text-gray-400 hover:text-white p-2 text-xl">{'<'}</button>
                <div className='flex flex-col items-start'> 
                    <p className='text-xs text-gray-500 mb-1'>Gregorian</p>
                    <p className='text-lg font-semibold text-white'>{GR_MONTHS[currentGrMonthIndex]} {currentGrYear}</p>
                </div>
                <button onClick={() => handleNavClick('next')} className="text-gray-400 hover:text-white p-2 text-xl">{'>'}</button>
            </div>

            <select
              value={currentHijriMonthIndex}
              onChange={(e) => handleDropdownChange('month', e.target.value)}
              className="bg-gray-800 text-white p-2 rounded-lg text-base sm:text-xl font-semibold border-none focus:ring-2 focus:ring-orange-500 cursor-pointer flex-grow text-left"
            >
              {monthOptions.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
            
            <select
              value={currentHijriYear} 
              onChange={(e) => handleDropdownChange('year', e.target.value)}
              className="bg-gray-800 text-white p-2 rounded-lg text-base sm:text-xl font-semibold border-none focus:ring-2 focus:ring-orange-500 cursor-pointer flex-grow text-left"
            >
              {hijriYearOptions.map(year => (
                <option key={year} value={year}>
                  {toEnglishNumber(year)} H 
                </option>
              ))}
            </select>
          </div>
          
          
          <div className="grid grid-cols-7 text-center border-b pb-2 mb-2 text-xs md:text-sm font-medium text-orange-400">
            {ARABIC_DAYS_OF_WEEK.map(day => ( 
              <div key={day} className="h-6 flex items-center justify-center">
                {day}
              </div>
            ))}
          </div>

          
          <div className="grid grid-cols-7 gap-1 text-center">
            {days.map((dayInfo, index) => (
              <div 
                key={dayInfo.key} 
                className={`
                  p-1 md:p-2 rounded-lg cursor-pointer transition-colors duration-200 
                  flex flex-col justify-center items-center h-14 md:h-16 text-sm 
                  ${index === 0 ? firstDayClass : ''}
                  ${dayInfo.isToday ? 'bg-orange-500 text-white font-bold hover:bg-orange-600 shadow-md' : (dayInfo.grDay ? 'text-gray-200 hover:bg-gray-700 hover:text-gray-50' : '')}
                `}
              >
                
                <span className='text-lg font-bold leading-tight'>
                    {dayInfo.grDay ? toEnglishNumber(dayInfo.grDay) : ''}
                </span>
                
                <span className='text-xs overflow-hidden text-gray-400 leading-none mt-1'>
                    {dayInfo.hijriDay ? toEnglishNumber(dayInfo.hijriDay) : ''}
                </span>
              </div>
            ))}
          </div>

        </div>

        
        <div className="w-full lg:w-1/4 pt-6 lg:pt-0 lg:pl-6 flex flex-col justify-center items-center text-center overflow-visible">
            <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-1">
                TODAY'S DATE
            </p>
            <h3 className="text-xl font-semibold text-orange-400 mb-4">
                {todayDayName}
            </h3>
            
            <p className="text-4xl overflow-hidden sm:text-7xl lg:text-7xl font-bold text-white leading-none px-4">
                {todayDateStr}
            </p>
            
            <p className="text-lg text-gray-400 mt-2 px-2">
                {todayHijriMonthName}, {todayHijriYearDisplay} H
            </p>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default ArabicCalendarComponent;