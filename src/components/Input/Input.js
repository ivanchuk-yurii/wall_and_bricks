import React from 'react';
import './Input.css';

export function Input({ id, text }) {
  return (
    <label className='form__question'>
      {text}
      <input
        type='number'
        className='form__input'
        id={id}
        min='1'
        placeholder='1'
        required
      />
    </label>
  );
}
