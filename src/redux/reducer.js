import { actualMonth, actualYear } from "../utils";
import { SET_ALL_CITIES, SET_REMINDERS, SET_SELECTED_CITY, SET_SELECTED_MONTH, SET_SELECTED_YEAR, SET_WEATHER } from "./constants.reducer";

export const initalState = {
    selectedMonth: actualMonth(),
    selectedYear: actualYear(),
    cities: [],
    selectedCity: localStorage.getItem('actualCity') || 3688689,
    weather: {},
    reminders: JSON.parse(localStorage.getItem('reminderList')) || {}
}

export const reducer = (state = initalState, action) => {
    switch (action.type) {
        case SET_SELECTED_MONTH:
            return { ...state, selectedMonth: action.payload }
        case SET_SELECTED_YEAR:
            return { ...state, selectedYear: action.payload }
        case SET_ALL_CITIES: 
            return { ...state, cities: action.payload }
        case SET_SELECTED_CITY:
            return { ...state, selectedCity: action.payload }
        case SET_WEATHER: 
            return {...state, weather: action.payload}
        case SET_REMINDERS:
            return {...state, reminders: action.payload}
        default: 
            return state;
    }
}