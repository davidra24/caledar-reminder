import { setReminders } from "../redux/actions";
import { searchReminder } from "../utils";

export const useInsertReminder =
  () => (year, month, day, text, city, color, time, dispatch, position) => {
    const reminderList = JSON.parse(localStorage.getItem('reminderList')) || {};
    if (Object.keys(reminderList).length === 0) {
      const newReminderList = {
        [year]: {
          [month]: {
            [day]: [{ text, city, time, color }],
          },
        },
      };
      localStorage.setItem('reminderList', JSON.stringify(newReminderList));
      dispatch(setReminders(newReminderList))
    } else {
      const newReminderList = searchReminder(year, month, day, reminderList, position, {text, city, time, color})
      localStorage.setItem('reminderList', JSON.stringify(newReminderList));
      dispatch(setReminders(newReminderList))
    }
  };

export const useExtractReminderList = () => (year, month, day, reminders) => {
    const myYear = reminders[year] ? reminders[year] : null;
    const myMonth = myYear
      ? reminders[year][month]
        ? reminders[year][month]
        : null
      : null;
    const myDay = myMonth
      ? reminders[year][month][day]
        ? reminders[year][month][day]
        : null
      : null;
    return myDay
}

export const useRemoveReminder = () => (year, month, day, dispatch, position) => {
  const reminderList = JSON.parse(localStorage.getItem('reminderList'));
  const newReminderList = searchReminder(year, month, day, reminderList, position, null)
  localStorage.setItem('reminderList', JSON.stringify(newReminderList));
  dispatch(setReminders(newReminderList))
}

export const useRemoveAllRemiders = () => (year, month, day, dispatch) => {
  const reminderList = JSON.parse(localStorage.getItem('reminderList'));
  const newReminderList = {...reminderList}
  delete newReminderList[year][month][day]
  localStorage.setItem('reminderList', JSON.stringify(newReminderList));
  dispatch(setReminders(newReminderList))
}