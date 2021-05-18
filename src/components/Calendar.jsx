import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/components/calendar.css';
import { DAYS_OF_WEEK } from '../utils/constants';
import { DateMonth } from './DateMonth';

export const Calendar = () => {
  const daysOfWeek = [...DAYS_OF_WEEK];
  const selectedMonth = useSelector((state) => state.selectedMonth);
  const selectedYear = useSelector((state) => state.selectedYear);
  return (
    <div className='calendar-container'>
      <div className='calendar-days'>
        {daysOfWeek.map((day) => (
          <p className='calendar-days_day' key={day}>
            {day}
          </p>
        ))}
      </div>
      {<DateMonth selectedMonth={selectedMonth} selectedYear={selectedYear} />}
    </div>
  );
};
