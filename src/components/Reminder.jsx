import React, { useState } from 'react';
import { v4 } from 'uuid';
import { AddReminder } from '../containers/AddReminder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export const Reminder = ({
  reminders,
  reminderToday,
  cities,
  day,
  month,
  year,
  handleRemoveReminder,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const position = reminders[year][month][day].findIndex(
    (reminder) =>
      reminder.text === reminderToday.text &&
      reminder.time === reminderToday.time &&
      reminder.color === reminderToday.color &&
      reminder.city === reminderToday.city
  );
  return (
    <>
      <div
        key={v4()}
        className='reminder__data'
        style={{
          backgroundColor: reminderToday.color,
        }}>
        <p className='reminder__data-title'>{reminderToday.text}</p>
        <p className='reminder__data-hour'>{reminderToday.time}</p>
        {cities.length > 0 && (
          <p className='reminder__data-city'>
            {cities.find((city) => city.id === reminderToday.city).name}
          </p>
        )}
        <div className='reminder__data-icon__container'>
          <FontAwesomeIcon
            className='reminder__data-icon'
            icon={faEdit}
            onClick={() => setOpenModal(true)}
          />
          <FontAwesomeIcon
            onClick={() => handleRemoveReminder(position)}
            className='reminder__data-icon'
            icon={faTrashAlt}
          />
        </div>
      </div>
      <AddReminder
        day={day}
        month={month}
        year={year}
        openModal={openModal}
        setOpenModal={setOpenModal}
        existReminder={reminderToday}
        position={position}
      />
    </>
  );
};
