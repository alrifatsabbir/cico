import React, { useState, useMemo } from 'react';
import SpotlightCard from '../SpotlightCard'; 

const CalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (year, monthIndex) => new Date(year, monthIndex + 1, 0).getDate();
  const getFirstDayOfMonth = (year, monthIndex) => new Date(year, monthIndex, 1).getDay();
  const today = new Date();

  const currentYear = currentDate.getFullYear();
  const currentMonthIndex = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(currentYear, currentMonthIndex);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonthIndex);
  const isCurrentMonthView = today.getMonth() === currentMonthIndex && today.getFullYear() === currentYear;

  const YEAR_RANGE = 5;
  const yearOptions = useMemo(() => {
    const years = [];
    for (let i = currentYear - YEAR_RANGE; i <= currentYear + YEAR_RANGE; i++) {
      years.push(i);
    }
    return years;
  }, [currentYear]);

  const handleDropdownChange = (type, value) => {
    const newDate = new Date(currentDate);
    if (type === 'month') {
      newDate.setMonth(parseInt(value));
    } else if (type === 'year') {
      newDate.setFullYear(parseInt(value));
    }
    setCurrentDate(new Date(newDate));
  };
  
  const days = [];
  
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`blank-${i}`} className="h-10"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = isCurrentMonthView && day === today.getDate();

    const dayClasses = `
      p-2 
      rounded-lg 
      cursor-pointer 
      transition-colors 
      duration-200 
      hover:bg-gray-700 
      flex 
      justify-center 
      items-center
      h-10 
      text-sm
      ${isToday 
        ? 'bg-green-500 text-white font-bold hover:bg-green-600 shadow-md'
        : 'text-gray-200 hover:text-gray-50' 
      }
    `;

    days.push(
      <div 
        key={day} 
        className={dayClasses}
      >
        {day}
      </div>
    );
  }

  const todayDateStr = today.getDate();
  const todayDayName = DAYS_OF_WEEK[today.getDay()];
  const todayMonthName = MONTHS[today.getMonth()];
  const todayYear = today.getFullYear();

  return (
    <SpotlightCard 
      className="custom-spotlight-card max-w-sm md:max-w-4xl mx-auto" 
      spotlightColor=" rgba(34, 197, 94, 0.25)">
      <div className="flex flex-col lg:flex-row w-full bg-transparent p-4 md:p-6 lg:p-8">
        <div className="w-full lg:w-3/4 pr-0 lg:pr-6 border-b lg:border-b-0 lg:border-r border-gray-700/50 pb-6 lg:pb-0">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-3">
            <select
              value={currentMonthIndex}
              onChange={(e) => handleDropdownChange('month', e.target.value)}
              className="bg-gray-800 text-white p-2 rounded-lg text-lg sm:text-xl font-semibold border-none focus:ring-2 focus:ring-green-500 cursor-pointer w-full sm:w-1/2"
            >
              {MONTHS.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
            
            <select
              value={currentYear}
              onChange={(e) => handleDropdownChange('year', e.target.value)}
              className="bg-gray-800 text-white p-2 rounded-lg text-lg sm:text-xl font-semibold border-none focus:ring-2 focus:ring-green-500 cursor-pointer w-full sm:w-1/2"
            >
              {yearOptions.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-7 text-center border-b pb-2 mb-2 text-xs md:text-sm font-medium text-green-400">
            {DAYS_OF_WEEK.map(day => (
              <div key={day} className="h-6 flex items-center justify-center">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {days}
          </div>

        </div>

        {/* Right Section: Today's Date Info - Adjusted text size and added overflow-hidden */}
        <div className="w-full lg:w-1/4 pt-6 lg:pt-0 lg:pl-6 flex flex-col justify-center items-center text-center overflow-hidden">
            <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-1">
                Today is
            </p>
            <h3 className="text-xl font-semibold text-green-400 mb-4">
                {todayDayName}
            </h3>
            {/* Reduced initial font size to 5xl for sure fit on small mobiles */}
            <p className="text-5xl overflow-hidden md:text-6xl lg:text-7xl font-bold text-white leading-none">
                {todayDateStr}
            </p>
            <p className="text-lg text-gray-400 mt-2">
                {todayMonthName}, {todayYear}
            </p>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default CalendarComponent;