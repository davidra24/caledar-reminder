import { ICON_WEATHER } from './constants';

export const getFirstDayOfMonth = (month, year) => {
  return new Date(year, month - 1, 1).getDay();
};
export const daysInMonth = (month, year) => {
  const date = new Date(year, month, 0).getDate();
  return date;
};
export const actualMonth = () => new Date().getMonth() + 1;
export const actualYear = () => new Date().getFullYear();
export const actualDay = () => new Date().getDate();

export const isToday = (day, month, year) => {
  return (
    day === actualDay() && month === actualMonth() && year === actualYear()
  );
};

export const dateToUTC = (day, month, year) => {
  const dateStart = Math.floor(new Date(day, month, year).getTime() / 1000);
  const dateEnd = Math.floor(
    new Date(day, month, year, 23, 59, 59).getTime() / 1000
  );
  return { dateStart, dateEnd };
};

export const callImageWeather = (image) => `${ICON_WEATHER}${image}.png`;

export const isEmpty = (obj) => Object.keys(obj).length === 0;

export const sortByHour = (a, b) => {
  const time1 = parseFloat(a.time.replace(':', '.').replace(/[^\d.-]/g, ''));
  const time2 = parseFloat(b.time.replace(':', '.').replace(/[^\d.-]/g, ''));
  if (time1 < time2) return -1;
  if (time1 > time2) return 1;
  return 0;
};

export const searchReminder = (
  year,
  month,
  day,
  reminderList,
  position,
  insertInfo
) => {
  const myYear = reminderList[year] ? reminderList[year] : '';
  const myMonth = myYear
    ? reminderList[year][month]
      ? reminderList[year][month]
      : ''
    : '';
  const myDay = myMonth
    ? reminderList[year][month][day]
      ? reminderList[year][month][day]
      : ''
    : '';
  if (position !== null) {
    myDay.splice(position, 1);
  }
  const dayInsert =
    insertInfo !== null ? [...myDay, { ...insertInfo }] : [...myDay];
  const newReminderList = {
    ...reminderList,
    [year]: {
      ...myYear,
      [month]: {
        ...myMonth,
        [day]: dayInsert,
      },
    },
  };
  /*if (position !== null) {
    if (myMonth[day].length === 0) {
      delete newReminderList[year][month][day];
    }
    if (Object.keys(newReminderList[year][month]).length === 0) {
      delete newReminderList[year][month];
    }
    if (Object.keys(newReminderList[year]).length === 0) {
      delete newReminderList[year];
    }
  }*/
  return newReminderList;
};
