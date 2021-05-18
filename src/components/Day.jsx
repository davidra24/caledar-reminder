import React, { useState } from 'react';
import { isToday, sortByHour } from '../utils';
import { AddReminder } from '../containers/AddReminder';
import '../styles/components/day.css';
import { useDispatch, useSelector } from 'react-redux';
import { useExtractReminderList } from '../hooks/useReminder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useRemoveAllRemiders } from '../hooks/useReminder';

export const Day = ({ day, selectedMonth, selectedYear }) => {
  const [openModal, setOpenModal] = useState(false);
  const reminders = useSelector((state) => state.reminders);
  const extractReminder = useExtractReminderList();
  const dispatch = useDispatch();
  const extracted = extractReminder(
    selectedYear,
    selectedMonth,
    day,
    reminders
  );
  const removeAllRemindersHook = useRemoveAllRemiders();
  const viewPortWidth = window.visualViewport.width;
  const widthPort = (isPlus) =>
    extracted && viewPortWidth >= 768
      ? `${
          isPlus && extracted.length >= 1
            ? '20%'
            : extracted.length >= 1
            ? '75%'
            : extracted.length === 1
            ? '100%'
            : ''
        }`
      : '100%';
  const removeAllReminders = () => {
    if (extracted) {
      removeAllRemindersHook(selectedYear, selectedMonth, day, dispatch);
    } else {
      console.log('nel');
    }
  };
  return (
    <>
      <div
        className={`${'day-container'} ${
          isToday(day, selectedMonth, selectedYear) ? 'day-container_today' : ''
        }`}>
        {day !== null ? (
          <div className='day'>
            <div className='day__info-container'>
              <div className='day__number'>{day}</div>
              <div className='day__icon-container'>
                <FontAwesomeIcon
                  onClick={() => setOpenModal(true)}
                  className='day__icon-reminder icon-plus'
                  icon={faPlus}
                />
                <FontAwesomeIcon
                  onClick={removeAllReminders}
                  className='day__icon-reminder icon-trash'
                  icon={faTrashAlt}
                />
              </div>
            </div>
            <div className='day__reminder-container'>
              {extracted &&
                extracted
                  .sort((a, b) => sortByHour(a, b))
                  .map((reminder, index) => {
                    if (index === 0) {
                      return (
                        <div
                          className='day__reminder'
                          style={{
                            backgroundColor: reminder.color,
                            width: widthPort(false),
                          }}>
                          {reminder.text}
                        </div>
                      );
                    }
                  })}
              {extracted && extracted.length !== 0 && (
                <Link
                  to={`reminders?day=${day}&month=${selectedMonth}&year=${selectedYear}`}
                  className='day__reminder day__reminder-plus'
                  style={{ width: widthPort(true) }}>
                  {extracted.length >= 2 ? `+${extracted.length - 1}` : '+'}
                </Link>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <AddReminder
        day={day}
        month={selectedMonth}
        year={selectedYear}
        openModal={openModal}
        setOpenModal={setOpenModal}
        position={null}
      />
    </>
  );
};
