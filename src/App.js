import React from 'react';
import { Wall } from './components/Wall/Wall';
import { Bricks } from './components/Bricks/Bricks';
import { Check } from './components/Check/Check';
import './App.css';

function App() {
  return (
    <>
      <Wall width='10' heigth='10' />
      <Bricks />
      <Check />
    </>
  );
}

export default App;
