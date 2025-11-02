"use client";

import React, { useState } from "react";
import SpotlightCard from "../SpotlightCard";
import { useChineseCalendar, GR_DAYS_OF_WEEK } from "../logic/useChineseCalendar";

export default function CnCalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const {
    days,
    startOfMonthDayIndex,
    currentGrYear,
    currentGrMonthIndex,
    todayLunarInfo: { lunarDay, lunarMonth, yearGanzhi, zodiac },
  } = useChineseCalendar(currentDate);

  const GR_MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const YEAR_RANGE = 5;
  const yearOptions = Array.from({ length: YEAR_RANGE * 2 + 1 }, (_, i) => currentGrYear - YEAR_RANGE + i);

  const handleMonthChange = (e) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(parseInt(e.target.value));
    setCurrentDate(newDate);
  };

  const handleYearChange = (e) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(parseInt(e.target.value));
    setCurrentDate(newDate);
  };

  const handleNavClick = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === "prev") newDate.setMonth(newDate.getMonth() - 1);
    else newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const todayDayName = GR_DAYS_OF_WEEK[new Date().getDay()];

  return (
    <SpotlightCard className="custom-spotlight-card max-w-4xl mx-auto" spotlightColor="rgba(0, 150, 255, 0.25)">
      <div className="flex flex-col lg:flex-row w-full p-6">
        {/* Calendar Section */}
        <div className="w-full lg:w-3/4 border-b lg:border-b-0 lg:border-r border-gray-700/50 pb-6 lg:pb-0 lg:pr-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-5 gap-3">
            <div className="flex items-center">
              <button onClick={() => handleNavClick("prev")} className="text-gray-400 hover:text-white p-2 text-xl">{'<'}</button>
              <div className="flex flex-col items-start mx-2">
                <p className="text-xs text-gray-500 mb-1">Gregorian</p>
                <p className="text-lg font-semibold text-white">{GR_MONTHS[currentGrMonthIndex]} {currentGrYear}</p>
              </div>
              <button onClick={() => handleNavClick("next")} className="text-gray-400 hover:text-white p-2 text-xl">{'>'}</button>
            </div>

            {/* Month Dropdown */}
            <select value={currentGrMonthIndex} onChange={handleMonthChange} className="bg-gray-800 text-white p-2 rounded-lg text-base font-semibold border-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex-grow text-center">
              {GR_MONTHS.map((month, index) => (
                <option key={index} value={index}>{month}</option>
              ))}
            </select>

            {/* Year Dropdown */}
            <select value={currentGrYear} onChange={handleYearChange} className="bg-gray-800 text-white p-2 rounded-lg text-base font-semibold border-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex-grow text-center">
              {yearOptions.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 text-center border-b pb-2 mb-2 text-xs md:text-sm font-medium text-blue-400">
            {GR_DAYS_OF_WEEK.map((day, idx) => (
              <div key={idx} className="h-6 flex items-center justify-center">{day}</div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Blank days */}
            {[...Array(startOfMonthDayIndex)].map((_, i) => <div key={`blank-${i}`} className="h-14 md:h-16"></div>)}

            {days.map(day => (
              <div key={day.key} className={`h-14 md:h-16 flex flex-col justify-center items-center rounded-lg cursor-pointer transition-colors duration-200
                ${day.isToday ? 'bg-blue-500 text-white font-bold shadow-md' : 'text-gray-200 hover:bg-gray-700 hover:text-gray-50'}`}>
                <span className="text-lg overflow-hidden font-bold">{day.grDay}</span>
                <span className="text-xs overflow-hidden text-gray-400 mt-1">{day.lunarDay}</span>
                <span className="text-xs overflow-hidden text-gray-500">{day.lunarMonth}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/4 pt-6 lg:pt-0 lg:pl-6 flex flex-col justify-center items-center text-center overflow-hidden">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-1">TODAY'S LUNAR DATE</p>
          <h3 className="text-xl font-semibold text-blue-400 mb-4">{todayDayName}</h3>
          <p className="text-4xl sm:text-7xl lg:text-8xl overflow-hidden font-bold text-white leading-none px-4">{lunarDay}</p>
          <p className="text-lg text-gray-400 mt-2">{lunarMonth} ({zodiac})</p>
          <p className="mt-4 text-gray-400">Year Ganzhi: <span className="text-blue-400">{yearGanzhi}</span></p>
        </div>
      </div>
    </SpotlightCard>
  );
}
