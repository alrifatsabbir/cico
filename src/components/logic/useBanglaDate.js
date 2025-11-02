// src/hooks/useBanglaCalendar.js (useBanglaDate.js-এর পরিবর্তিত নাম)

import { useMemo } from 'react';

// বাংলা মাসের নাম
const BANGLA_MONTHS = [
  'বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 
  'আশ্বিন', 'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 
  'ফাল্গুন', 'চৈত্র'
];

// বাংলা সনের বছর শুরুর দিন: সাধারণত April 14
const BAISHAKH_1ST_DAY_GR = { month: 3, day: 14 }; // Month index 3 = April
const YEAR_OFFSET = 593;

// মাসের দিন সংখ্যা (সাধারণ বছর, ফাল্গুন ২৯) - এটি রেফারেন্সের জন্য
const DAYS_IN_BANGLA_MONTH_BASE = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 30];

const toBengaliNumber = (num) => {
    if (num === null || num === undefined) return '';
    const bengali = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num).split('').map(digit => bengali[parseInt(digit, 10)]).join('');
};

// গ্রেগরিয়ান বছরকে বাংলা বছরে রূপান্তর করে
const getBnYear = (grYear, grMonth, grDay) => {
  const isAfterBaishakh = grMonth > BAISHAKH_1ST_DAY_GR.month || 
                         (grMonth === BAISHAKH_1ST_DAY_GR.month && grDay >= BAISHAKH_1ST_DAY_GR.day);
  return isAfterBaishakh ? grYear - YEAR_OFFSET : grYear - YEAR_OFFSET - 1;
};

// গ্রেগরিয়ান তারিখকে বাংলা তারিখ, মাস ও বছরে রূপান্তর করে
const getBanglaDateInfo = (date) => {
  const grDay = date.getDate();
  const grMonth = date.getMonth();
  const grYear = date.getFullYear();
  
  const bnYear = getBnYear(grYear, grMonth, grDay);
  
  // Calculate day of the year (1-365/366) from Jan 1
  let dayOfYear = 0;
  for (let m = 0; m < grMonth; m++) {
    dayOfYear += new Date(grYear, m + 1, 0).getDate(); 
  }
  dayOfYear += grDay;
  
  // Calculate the actual day number of April 14 for the current Gregorian year.
  const baishakh1st = new Date(grYear, BAISHAKH_1ST_DAY_GR.month, BAISHAKH_1ST_DAY_GR.day);
  let baishakh1stDayOfYear = 0;
  for (let m = 0; m < baishakh1st.getMonth(); m++) {
      baishakh1stDayOfYear += new Date(grYear, m + 1, 0).getDate();
  }
  baishakh1stDayOfYear += baishakh1st.getDate();

  let totalDays = dayOfYear - baishakh1stDayOfYear; 
  
  const daysInGrYear = (grYear % 4 === 0 && grYear % 100 !== 0) || (grYear % 400 === 0) ? 366 : 365;

  if (totalDays < 0) {
    totalDays += daysInGrYear; 
  }
  totalDays += 1; // Normalize to 1-based index

  // Dynamic Bengali month days based on the current Bengali year's leap status
  const daysInMonth = [...DAYS_IN_BANGLA_MONTH_BASE];
  if ((bnYear + YEAR_OFFSET + 1) % 4 === 0) { 
      // Falgun (index 10) gets 31 days in a leap year (simplified logic)
      daysInMonth[10] = 31; 
  }
  
  let cumulativeDays = 0;
  let bnMonthIndex = 0;
  let bnDay = 0;
  
  for (let i = 0; i < 12; i++) {
    const daysInCurrentBnMonth = daysInMonth[i];
    if (totalDays <= cumulativeDays + daysInCurrentBnMonth) {
      bnMonthIndex = i;
      bnDay = totalDays - cumulativeDays;
      break;
    }
    cumulativeDays += daysInCurrentBnMonth;
  }
  
  if (bnDay === 0) {
      bnDay = 1; 
  }

  return { bnDate: bnDay, bnMonthIndex, bnYear, bnMonthName: BANGLA_MONTHS[bnMonthIndex] };
};

// ক্যালেন্ডার গ্রিডের জন্য ফাংশন
const useBanglaCalendar = (currentDate) => {
  return useMemo(() => {
    const today = new Date();
    const grMonth = currentDate.getMonth();
    const grYear = currentDate.getFullYear();
    
    // বর্তমান গ্রিডের মাসের (গ্রেগরিয়ান) প্রথম দিনটি বাংলাতে কত তারিখ
    const startOfMonthGr = new Date(grYear, grMonth, 1);
    const startOfMonthDay = startOfMonthGr.getDay(); // 0 (Sun) to 6 (Sat)
    
    // গ্রিডের দিনগুলোর তথ্য
    const days = [];
    const daysInGrMonth = new Date(grYear, grMonth + 1, 0).getDate();

    // Blank spaces before the 1st day
    for (let i = 0; i < startOfMonthDay; i++) {
      days.push({ key: `blank-${i}`, day: null, bnDate: null, isToday: false });
    }

    for (let day = 1; day <= daysInGrMonth; day++) {
      const date = new Date(grYear, grMonth, day);
      const bnDateInfo = getBanglaDateInfo(date);

      days.push({
        key: day,
        day: day, // Gregorian day number (for rendering)
        bnDate: bnDateInfo.bnDate, // Bangla date number
        isToday: date.toDateString() === today.toDateString(),
      });
    }

    // Current Header Info (বাংলা সন অনুযায়ী)
    const currentBnInfo = getBanglaDateInfo(currentDate);

    return {
      days,
      currentGrMonthIndex: grMonth,
      currentGrYear: grYear,
      currentBnMonthIndex: currentBnInfo.bnMonthIndex,
      currentBnYear: currentBnInfo.bnYear,
      currentMonthName: BANGLA_MONTHS[currentBnInfo.bnMonthIndex],
      todayBnInfo: getBanglaDateInfo(today)
    };

  }, [currentDate]);
};

export { useBanglaCalendar, toBengaliNumber, BANGLA_MONTHS };