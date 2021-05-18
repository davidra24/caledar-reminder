import React from 'react';
import { daysInMonth, getFirstDayOfMonth } from '../utils';
import '../styles/components/dateMonth.css';
import { Day } from './Day';
import { v4 } from 'uuid';

export const DateMonth = ({ selectedMonth, selectedYear }) => {
  let i = 1;
  const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear) + 1;
  const days = daysInMonth(selectedMonth, selectedYear);
  const dates = [];
  while (i < days + firstDay) {
    if (i >= firstDay) {
      dates.push(i - firstDay + 1);
    } else {
      dates.push(null);
    }
    i++;
  }
  return (
    <div className='calendar'>
      {dates.map((day) => (
        <Day
          key={v4()}
          day={day}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      ))}
    </div>
  );
};
