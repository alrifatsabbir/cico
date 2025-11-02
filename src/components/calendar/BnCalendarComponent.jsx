// src/components/calendar/BnCalendarComponent.jsx

import React, { useState, useMemo } from 'react';
import SpotlightCard from '../SpotlightCard'; 
import { useBanglaCalendar, toBengaliNumber, BANGLA_MONTHS } from '../logic/useBanglaDate'; 

const BnCalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const DAYS_OF_WEEK = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'];
  
  const { 
    days, 
    currentGrYear, 
    currentBnMonthIndex,
    todayBnInfo
  } = useBanglaCalendar(currentDate);

  // Dropdown Logic (গ্রেগরিয়ান বছর ব্যবহার করা হয়েছে)
  const YEAR_OFFSET = 593;
  const YEAR_RANGE = 5;
  const yearOptions = useMemo(() => {
    const years = [];
    for (let i = currentGrYear - YEAR_RANGE; i <= currentGrYear + YEAR_RANGE; i++) {
      years.push(i);
    }
    return years;
  }, [currentGrYear]);

  // হ্যান্ডেলারগুলো গ্রেগরিয়ান মাস/বছর পরিবর্তন করবে
  const handleDropdownChange = (type, value) => {
    const newDate = new Date(currentDate);
    if (type === 'month') {
      const selectedBnMonthIndex = parseInt(value);
      
      // Attempt to navigate to the correct Gregorian month for the start of the Bengali month
      // This is a rough estimate and might need further refinement for perfect alignment
      let grMonthIndex = (selectedBnMonthIndex + 3) % 12; // Baishakh (0) maps to April (3)
      
      // Simple year adjustment for boundary crossing (Dec to Jan)
      if(newDate.getMonth() === 11 && grMonthIndex === 0) {
        newDate.setFullYear(newDate.getFullYear() + 1);
      } else if (newDate.getMonth() === 0 && grMonthIndex === 11) {
        newDate.setFullYear(newDate.getFullYear() - 1);
      }
      
      newDate.setMonth(grMonthIndex);
      newDate.setDate(15); 

    } else if (type === 'year') {
      newDate.setFullYear(parseInt(value));
    }
    setCurrentDate(new Date(newDate));
  };
  
  // Right Panel Info (বাংলা সন)
  const todayDateStr = toBengaliNumber(todayBnInfo.bnDate);
  const todayBnMonthName = todayBnInfo.bnMonthName;
  const todayBnYear = toBengaliNumber(todayBnInfo.bnYear);
  const todayDayName = DAYS_OF_WEEK[new Date().getDay()];
  
  const GR_MONTHS = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];

  return (
    <SpotlightCard 
      className="custom-spotlight-card max-w-lg md:max-w-4xl mx-auto" 
      spotlightColor="rgba(255, 80, 120, 0.25)">
      <div className="flex flex-col lg:flex-row w-full bg-transparent p-4 md:p-6 lg:p-8">
        <div className="w-full lg:w-3/4 pr-0 lg:pr-6 border-b lg:border-b-0 lg:border-r border-gray-700/50 pb-6 lg:pb-0">
          
          
          <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-3">
            
            {/* গ্রেগরিয়ান মাস ও বছর */}
            <div className='flex flex-col items-start min-w-[30%]'> 
                <p className='text-xs text-gray-500 mb-1'>গ্রেগরিয়ান</p>
                <p className='text-lg font-semibold text-white'>{GR_MONTHS[currentDate.getMonth()]} {currentGrYear}</p>
            </div>
            
            {/* বাংলা মাস */}
            <select
              value={currentBnMonthIndex}
              onChange={(e) => handleDropdownChange('month', e.target.value)}
              className="bg-gray-800 text-white p-2 rounded-lg text-base sm:text-m font-semibold border-none focus:ring-2 focus:ring-orange-500 cursor-pointer w-full sm:w-1/2 text-center"
            >
              {BANGLA_MONTHS.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
            
            {/* বাংলা বছর */}
            <select
              value={currentGrYear}
              onChange={(e) => handleDropdownChange('year', e.target.value)}
              className="bg-gray-800 text-white p-2 rounded-lg text-base sm:text-m font-semibold border-none focus:ring-2 focus:ring-orange-500 cursor-pointer w-full sm:w-1/2 text-center"
            >
              {yearOptions.map(year => (
                <option key={year} value={year}>
                  {toBengaliNumber(year - YEAR_OFFSET)} বঙ্গাব্দ 
                </option>
              ))}
            </select>
          </div>
          
          
          {/* Days of the Week Headers (Sun to Sat) */}
          <div className="grid grid-cols-7 text-center border-b pb-2 mb-2 text-xs md:text-sm font-medium text-red-400">
            {DAYS_OF_WEEK.map(day => (
              <div key={day} className="h-6 flex items-center justify-center">
                {day}
              </div>
            ))}
          </div>

          {/* The main Calendar Grid (Days) - Subscript Style Applied Here */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {days.map(dayInfo => (
              <div 
                key={dayInfo.key} 
                className={`
                  p-1 md:p-2 rounded-lg cursor-pointer transition-colors duration-200 
                  flex flex-col justify-center items-center h-14 md:h-16 text-sm 
                  ${dayInfo.day === null ? 'h-14 md:h-16' : 'text-gray-200 hover:bg-gray-700 hover:text-gray-50'}
                  ${dayInfo.isToday ? 'bg-red-500 text-white font-bold hover:bg-red-600 shadow-md' : ''}
                `}
              >
                {dayInfo.day !== null ? (
                    <>
                        {/* গ্রেগরিয়ান তারিখ (বড়) */}
                        <span className='text-lg font-bold leading-tight'>
                            {toBengaliNumber(dayInfo.day)}
                        </span>
                        
                        {/* বাংলা তারিখ (সাবস্ক্রিপ্ট স্টাইল) */}
                        <span className='text-xs text-gray-400 overflow-hidden leading-none mt-1'>
                            {toBengaliNumber(dayInfo.bnDate)}
                        </span>
                    </>
                ) : ''}
              </div>
            ))}
          </div>

        </div>

        {/* Right Section: Today's Date Info (বাংলা সন) */}
        <div className="w-full lg:w-1/4 pt-6 lg:pt-0 lg:pl-6 flex flex-col justify-center items-center text-center overflow-hidden">
            <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-1">
                আজকের বাংলা তারিখ
            </p>
            <h3 className="text-xl font-semibold text-red-400 mb-4">
                {todayDayName}
            </h3>
            <p className="text-4xl overflow-hidden sm:text-7xl lg:text-6xl font-bold text-white leading-none px-4">
                {todayDateStr}
            </p>
            <p className="text-lg text-gray-400 mt-2">
                {todayBnMonthName}, {todayBnYear} বঙ্গাব্দ
            </p>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default BnCalendarComponent;