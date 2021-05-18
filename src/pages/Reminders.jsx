import React, { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { sortByHour } from '../utils';
import '../styles/pages/reminders.css';
import { get } from '../utils/http';
import { setCities } from '../redux/actions';
import { HTTP_LOCAL } from '../utils/constants';
import { Reminder } from '../components/Reminder';
import { v4 } from 'uuid';
import { useRemoveReminder } from '../hooks/useReminder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const Reminders = () => {
  const { search } = useLocation();
  const { day, month, year } = queryString.parse(search);
  const reminders = useSelector((state) => state.reminders);
  const cities = useSelector((state) => state.cities);
  const dispatch = useDispatch();
  const exist =
    reminders[year] && reminders[year][month] && reminders[year][month][day];

  const removeReminder = useRemoveReminder();
  useEffect(() => {
    callCities();
  }, []);
  const callCities = () => {
    if (cities.length === 0) {
      get(`${HTTP_LOCAL}cities`).then((data) => {
        dispatch(setCities(data));
      });
    }
  };
  const handleRemoveReminder = (position) => {
    removeReminder(year, month, day, dispatch, position);
  };
  if (!exist) {
    return <Redirect to='/' />;
  }
  const today = reminders[year][month][day];
  return (
    <>
      <div className='reminder__container'>
        <div className='reminder__container-title_icon'>
          <Link to='/' className='reminder__icon-link'>
            <FontAwesomeIcon
              className='reminder__data-icon'
              icon={faArrowCircleLeft}
            />
          </Link>
          <h2>{`${day}/${month}/${year}`}</h2>
        </div>
        <div className='reminder__container-list'>
          {[...today]
            .sort((a, b) => sortByHour(a, b))
            .map((reminderToday) => (
              <Reminder
                key={v4()}
                reminders={reminders}
                reminderToday={reminderToday}
                handleRemoveReminder={handleRemoveReminder}
                cities={cities}
                day={day}
                month={month}
                year={year}
              />
            ))}
        </div>
      </div>
    </>
  );
};
