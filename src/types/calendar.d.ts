declare module "lunar-calendar" {
  interface LunarDate {
    GanZhiDay: string;
    GanZhiMonth: string;
    GanZhiYear: string;
    lunarDay: number;
    lunarDayName: string;
    lunarFestival?: string;
    lunarLeapMonth: number;
    lunarMonth: number;
    lunarMonthName: string;
    lunarYear: number;
  }

  interface SolarDate {
    solarFestival?: string;
    term?: string;
    worktime: number;
    zodiac: string;
  }

  interface CalendarData extends LunarDate, SolarDate {}

  export function solarToLunar(
    year: number,
    month: number,
    day: number,
  ): CalendarData;
}
