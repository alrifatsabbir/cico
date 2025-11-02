// src/hooks/useArabicCalendar.js

import { useMemo } from 'react';

const ARABIC_MONTHS = [
  'Muharram', 'Safar', "Rabi' al-Awwal", "Rabi' al-Thani", 'Jumada al-Ula',
  'Jumada al-Thaniyya', 'Rajab', "Sha'ban", 'Ramadan', 'Shawwal',
  "Dhu al-Qa'dah", 'Dhu al-Hijjah'
];

const ARABIC_DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const toEnglishNumber = (num) => {
  if (num === null || num === undefined) return '';
  return String(num);
};

// --- Tabular Islamic Calendar Algorithm ---

// Julian Day Number (JDN) Helper
// Standard astronomical JDN calculation for a Gregorian date
const gregorianToJDN = (year, month, day) => {
  // Month is 1-12 for this formula
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
};

// JDN to Hijri Date (Tabular)
const HIJRI_EPOCH_JDN = 1948440; // Standard Tabular Hijri epoch (July 16, 622 CE)
const LEAP_YEARS = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29];

// Checks if a Hijri year is a leap year based on the 30-year cycle
const isLeapHijriYear = (hyear) => {
  return LEAP_YEARS.includes(hyear % 30);
};

const jdnToHijri = (jd) => {
  let days_since_epoch = jd - HIJRI_EPOCH_JDN;
  let hyear = 1;
  
  while (days_since_epoch > (isLeapHijriYear(hyear) ? 355 : 354)) {
    days_since_epoch -= (isLeapHijriYear(hyear) ? 355 : 354);
    hyear++;
  }

  let days_into_year = days_since_epoch;
  let hmonth = 1;
  let daysInMonth;
  
  while (true) {
    daysInMonth = (hmonth % 2 !== 0) ? 30 : 29; 
    
    if (hmonth === 12 && isLeapHijriYear(hyear)) {
      daysInMonth = 30; // Leap year Dhu al-Hijjah
    }

    if (days_into_year < daysInMonth) {
      break;
    }

    days_into_year -= daysInMonth;
    hmonth++;
  }
  
  const hday = days_into_year + 1;

  return { day: hday, month: hmonth, year: hyear }; 
};


// --- React Hook with correction ---

const useArabicCalendar = (currentDate, hijriCorrection = 1) => {
  return useMemo(() => {
    const today = new Date();
    const grMonth = currentDate.getMonth();
    const grYear = currentDate.getFullYear();
    
    const firstGrDateOfMonth = new Date(grYear, grMonth, 1); 
    const startOfMonthDayIndex = firstGrDateOfMonth.getDay(); 
    const daysInGrMonth = new Date(grYear, grMonth + 1, 0).getDate();

    const days = [];
    
    for (let day = 1; day <= daysInGrMonth; day++) {
      const date = new Date(grYear, grMonth, day);
      const grJDN = gregorianToJDN(date.getFullYear(), date.getMonth() + 1, date.getDate());
      let hijriDate = jdnToHijri(grJDN);
      
      const hijriDateWithCorrection = new Date(hijriDate.year, hijriDate.month - 1, hijriDate.day);
      hijriDateWithCorrection.setDate(hijriDateWithCorrection.getDate() + hijriCorrection);
      
      hijriDate = {
          year: hijriDateWithCorrection.getFullYear(),
          month: hijriDateWithCorrection.getMonth() + 1,
          day: hijriDateWithCorrection.getDate(),
      };
      
      const isToday = date.toDateString() === today.toDateString();

      days.push({
        key: day,
        grDay: day, 
        hijriDay: hijriDate.day, 
        isToday: isToday,
      });
    }

    const todayJDN = gregorianToJDN(today.getFullYear(), today.getMonth() + 1, today.getDate());
    let todayHijri = jdnToHijri(todayJDN);
    const todayHijriWithCorrection = new Date(todayHijri.year, todayHijri.month - 1, todayHijri.day);
    todayHijriWithCorrection.setDate(todayHijriWithCorrection.getDate() + hijriCorrection);
    todayHijri = {
        year: todayHijriWithCorrection.getFullYear(),
        month: todayHijriWithCorrection.getMonth() + 1,
        day: todayHijriWithCorrection.getDate(),
    };


    const firstDayJDN = gregorianToJDN(firstGrDateOfMonth.getFullYear(), firstGrDateOfMonth.getMonth() + 1, firstGrDateOfMonth.getDate());
    let currentMonthHijriInfo = jdnToHijri(firstDayJDN);

    const currentMonthHijriWithCorrection = new Date(currentMonthHijriInfo.year, currentMonthHijriInfo.month - 1, currentMonthHijriInfo.day);
    currentMonthHijriWithCorrection.setDate(currentMonthHijriWithCorrection.getDate() + hijriCorrection);
    currentMonthHijriInfo = {
        year: currentMonthHijriWithCorrection.getFullYear(),
        month: currentMonthHijriWithCorrection.getMonth() + 1,
        day: currentMonthHijriWithCorrection.getDate(),
    };

    const currentHijriMonthIndex = currentMonthHijriInfo.month - 1;
    const currentHijriYear = currentMonthHijriInfo.year; 
    const currentMonthName = ARABIC_MONTHS[currentHijriMonthIndex];
    
    return {
      days,
      startOfMonthDayIndex, 
      currentGrYear: grYear,
      currentGrMonthIndex: grMonth,
      
      currentHijriMonthIndex,
      currentHijriYear,
      currentMonthName,
      todayHijriInfo: todayHijri,
    };

  }, [currentDate, hijriCorrection]);
};

export { useArabicCalendar, ARABIC_MONTHS, ARABIC_DAYS_OF_WEEK, toEnglishNumber };
