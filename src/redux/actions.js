import {
  SET_ALL_CITIES,
  SET_REMINDERS,
  SET_SELECTED_CITY,
  SET_SELECTED_MONTH,
  SET_SELECTED_YEAR,
  SET_WEATHER,
} from './constants.reducer';

export const setSelectedMonth = (payload) => ({
  type: SET_SELECTED_MONTH,
  payload,
});
export const setSelectedYear = (payload) => ({
  type: SET_SELECTED_YEAR,
  payload,
});
export const setCities = (payload) => ({ type: SET_ALL_CITIES, payload });
export const setSelectedCity = (payload) => ({
  type: SET_SELECTED_CITY,
  payload,
});
export const setWeather = (payload) => ({ type: SET_WEATHER, payload });
export const setReminders = (payload) => ({ type: SET_REMINDERS, payload})