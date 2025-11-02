// src/components/logic/useChineseCalendar.js
import { useMemo } from "react";
import { Solar, Lunar } from "lunar-javascript";

// English week names
export const GR_DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Lunar month names
export const LUNAR_MONTHS = [
  "Zheng Yue", "Er Yue", "San Yue", "Si Yue", "Wu Yue", "Liu Yue",
  "Qi Yue", "Ba Yue", "Jiu Yue", "Shi Yue", "Shi Yi Yue", "Shi Er Yue"
];

// Helper for lunar day numbers
const CHINESE_DAY_NAMES = [
  "", "Chu Yi", "Chu Er", "Chu San", "Chu Si", "Chu Wu", "Chu Liu", "Chu Qi",
  "Chu Ba", "Chu Jiu", "Chu Shi", "Shi Yi", "Shi Er", "Shi San", "Shi Si", "Shi Wu",
  "Shi Liu", "Shi Qi", "Shi Ba", "Shi Jiu", "Er Shi", "Er Shi Yi", "Er Shi Er",
  "Er Shi San", "Er Shi Si", "Er Shi Wu", "Er Shi Liu", "Er Shi Qi", "Er Shi Ba", "Er Shi Jiu", "San Shi"
];

export const toLunarDayNumber = (num) => CHINESE_DAY_NAMES[num] || num;

export function useChineseCalendar(currentDate) {
  return useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // JS Date month 0-11, Lunar-JS expects 1-12

    const firstDay = new Date(year, month - 1, 1);
    const startOfMonthDayIndex = firstDay.getDay();

    // Number of days in current Gregorian month
    const daysInMonth = new Date(year, month, 0).getDate();

    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      const lunar = Lunar.fromDate(date);

      const isToday =
        date.toDateString() === new Date().toDateString();

      days.push({
        key: day,
        grDay: day,
        lunarDay: lunar.getDay(),
        lunarMonth: LUNAR_MONTHS[lunar.getMonth() - 1],
        isToday,
      });
    }

    // Today's Lunar info
    const todayLunar = Lunar.fromDate(new Date());
    const todayLunarInfo = {
      lunarDay: todayLunar.getDay(),
      lunarMonth: LUNAR_MONTHS[todayLunar.getMonth() - 1],
      yearGanzhi: todayLunar.getYearInGanZhi(),
      zodiac: todayLunar.getYearShengXiao(),
    };

    // Current lunar month
    const currentLunar = Lunar.fromDate(firstDay);

    return {
      days,
      startOfMonthDayIndex,
      currentGrYear: year,
      currentGrMonthIndex: month - 1,
      currentMonthName: LUNAR_MONTHS[currentLunar.getMonth() - 1],
      currentLunarYearZodiac: currentLunar.getYearShengXiao(),
      todayLunarInfo,
    };
  }, [currentDate]);
}
