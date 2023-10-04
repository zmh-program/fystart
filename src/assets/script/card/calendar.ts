import { solarToLunar } from "lunar-calendar";

const WEEKDAY = ["日", "一", "二", "三", "四", "五", "六"];

export type Calendar = {
  lunar: string;
  zodiac: string;
  solar: string;
  ganzhi: string;
  weekday: string;
  day: number;
  festival?: string;
};

export function getCalendar(): Calendar {
  const date = new Date();
  const weekday = WEEKDAY[date.getUTCDay()];
  const day = date.getUTCDate();
  const week = Math.ceil(day / 7);
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();
  const calendar = solarToLunar(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );
  return {
    lunar: calendar.lunarMonthName + calendar.lunarDayName,
    zodiac: calendar.zodiac,
    solar: `${year}年${month + 1}月`,
    ganzhi: `${calendar.GanZhiYear}年${calendar.GanZhiMonth}月${calendar.GanZhiDay}日`,
    weekday: `星期${weekday}`,
    day,
    festival: calendar.solarFestival,
  };
}
