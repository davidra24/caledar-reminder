import React, { useState } from 'react';
import { Modal } from './Modal';
import '../styles/containers/addReminder.css';
import { useSelector, useDispatch } from 'react-redux';
import { CirclePicker } from 'react-color';
import {
  useInputValidator,
  useInputValidatorWithLimit,
} from '../hooks/useInput';
import { useInsertReminder } from '../hooks/useReminder';

import { DEFAULT_COLOR, LIMIT_REMINDER } from '../utils/constants';

export const AddReminder = ({
  openModal,
  setOpenModal,
  day,
  month,
  year,
  existReminder,
  position,
}) => {
  const cities = useSelector((state) => state.cities);
  const selectedCity = useSelector((state) => state.selectedCity);
  const allCities = [...cities];
  const insertReminder = useInsertReminder();
  const dispatch = useDispatch();
  const reminder = useInputValidatorWithLimit(
    existReminder ? existReminder.text : '',
    LIMIT_REMINDER
  );
  const [cityLocal, setCityLocal] = useState(
    existReminder ? existReminder.city : selectedCity
  );
  const time = useInputValidator(existReminder ? existReminder.time : '');
  const [color, setColor] = useState(
    existReminder ? existReminder.color : DEFAULT_COLOR
  );
  const handleChangeColor = (e) => {
    setColor(e.hex);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validator = validate();
    if (validator) {
      insertReminder(
        year,
        month,
        day,
        reminder.value,
        cityLocal,
        color,
        time.value,
        dispatch,
        position
      );
      reminder.clean();
      setCityLocal(selectedCity);
      setColor(DEFAULT_COLOR);
      time.clean();
      setOpenModal(false);
    }
  };
  const validate = () => {
    const reminderValidator = reminder.value !== null && reminder.value !== '';
    reminder.setValidator(reminder.value !== null && reminder.value !== '');

    const timeValidator = time.value !== null && time.value !== '';
    time.setValidator(time.value !== null && time.value !== '');

    const validator = reminderValidator && timeValidator;
    return validator;
  };
  return (
    <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
      <div className='reminder__container'>
        <form className='form__container' onSubmit={handleSubmit}>
          <div className='form__container-inputs'>
            <div className='form__inputs-reminder'>
              <div>
                <label
                  className='form__inputs-label'
                  htmlFor='date-picker__reminder'>
                  Reminder:{' '}
                </label>
                <div className='date-picker__select-container'>
                  <textarea
                    id='date-picker__reminder'
                    type='text-area'
                    value={reminder.value}
                    onChange={reminder.onChange}
                  />
                </div>
                {!reminder.validator && (
                  <p className='error'>Error! This field cannot ve empty</p>
                )}
              </div>
              <div>
                <label
                  className='form__inputs-label'
                  htmlFor='date-picker__cities'>
                  City:{' '}
                </label>
                <div className='date-picker__select-container'>
                  <select
                    name='cities'
                    id='date-picker'
                    value={cityLocal}
                    onChange={setCityLocal}>
                    {allCities.map((city) => (
                      <option value={city.id}>{city.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label
                  className='form__inputs-label'
                  htmlFor='date-picker__time'>
                  Time:{' '}
                </label>
                <div className='date-picker__select-container'>
                  <input
                    type='time'
                    name='time'
                    id='date-picker__time'
                    value={time.value}
                    onChange={time.onChange}
                  />
                </div>
                {!time.validator && (
                  <p className='error'>Error! This field cannot ve empty</p>
                )}
              </div>
            </div>
            <div className='date-picker__colors'>
              <div className='date-picker__color'>
                <p>Color:</p>
                <div
                  className='date-picker__color-selected'
                  style={{ backgroundColor: color }}
                />
              </div>
              <CirclePicker onChange={handleChangeColor} color={color} />
            </div>
          </div>
          <div className='form__container-button'>
            <button className='date-picker__button' type='submit'>
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
