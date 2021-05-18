import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSelectedCity,
  setSelectedMonth,
  setSelectedYear,
} from '../redux/actions';
import { MONTHS_OF_YEAR } from '../utils/constants';
import { actualMonth, actualYear, callImageWeather, isEmpty } from '../utils';
import '../styles/components/datePicker.css';

export const DatePicker = () => {
  const monthsOfYear = [...MONTHS_OF_YEAR];
  const dispatch = useDispatch();
  const selectedMonth = useSelector((state) => state.selectedMonth);
  const selectedYear = useSelector((state) => state.selectedYear);
  const cities = useSelector((state) => state.cities);
  const selectedCity = useSelector((state) => state.selectedCity);
  const weather = useSelector((state) => state.weather);
  const allYears = [];
  const allCities = [...cities];
  for (let i = 1900; i <= 2999; i++) {
    allYears.push(i);
  }
  const setActualMonth = (e) => {
    const index = monthsOfYear.findIndex((month) => month === e.target.value);
    dispatch(setSelectedMonth(index + 1));
  };
  const setActualYear = (e) => {
    const year = Number(e.target.value);
    dispatch(setSelectedYear(year));
  };
  const setCity = (e) => {
    const city = Number(e.target.value);
    dispatch(setSelectedCity(city));
    localStorage.setItem('actualCity', city);
  };
  const goToday = () => {
    dispatch(setSelectedMonth(actualMonth()));
    dispatch(setSelectedYear(actualYear()));
  };
  return (
    <div className='date-picker-container'>
      <div className='date-picker-dates'>
        <div className='date-picker_field-container'>
          <p className='date-picker__title-field'>Month</p>
          <div className='date-picker__select-container'>
            <select
              name='months'
              id='months'
              value={monthsOfYear[selectedMonth - 1]}
              onChange={setActualMonth}>
              {monthsOfYear.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='date-picker_field-container'>
          <p className='date-picker__title-field'>Year</p>
          <div className='date-picker__select-container'>
            <select
              name='years'
              id='years'
              value={selectedYear}
              onChange={setActualYear}>
              {allYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <button className='date-picker__button' onClick={goToday}>
            Go today
          </button>
        </div>
      </div>
      <div className='date-picker_field-container'>
        <p className='date-picker__title-field'>City</p>
        <div className='date-picker__select-container'>
          <select
            name='cities'
            id='cities'
            value={selectedCity}
            onChange={setCity}>
            {allCities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        {!isEmpty(weather) && (
          <div className='weather-container'>
            <img
              src={callImageWeather(weather.icon)}
              alt={weather.description}
            />
            <p className='weather__description'>{weather.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};
