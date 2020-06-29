import React from 'react';
import { Input } from '../Input/Input';
import './Bricks.css'

export function Bricks() {
  const inputs = [];
  const inputsData = [
    {id: 'width', text: 'Width:'},
    {id: 'heigth', text: 'Heigth:'},
    {id: 'count', text: 'Count:'},
  ];

  for (const input of inputsData) {
    inputs.push(<Input { ...input } key={input.id} />)
  }

  return (
    <form className='form' id='bricks'>
      <h2>Configurate</h2>

      {inputs}

      <button className='form__button' type='submit'>Add block</button>
    </form>
  );
}
