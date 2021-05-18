import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar } from '../components/Calendar';
import { DatePicker } from '../components/DatePicker';
import { setCities, setWeather } from '../redux/actions';
import { HTTP_LOCAL } from '../utils/constants';
import { get } from '../utils/http';
import '../styles/containers/calendarContainer.css';
import { Modal } from './Modal';

export const CalendarContainer = () => {
  const dispatch = useDispatch();
  const selectedCity = useSelector((state) => state.selectedCity);
  useEffect(() => {
    callCities();
  }, []);
  useEffect(() => {
    callWeather();
  }, [selectedCity]);
  const callCities = () => {
    get(`${HTTP_LOCAL}cities`).then((data) => {
      dispatch(setCities(data));
    });
  };
  const callWeather = () => {
    get(`${HTTP_LOCAL}weather/${selectedCity}`).then((data) => {
      dispatch(setWeather(data));
    });
  };
  return (
    <div className='calendar-container-component'>
      <DatePicker />
      <Calendar />
    </div>
  );
};
