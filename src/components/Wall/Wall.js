import React from 'react';
import { Block } from '../Block/Block';
import './Wall.css';

export function Wall({ width, heigth }) {
  const wall = [];

  for (let block = 0; block < +width * +heigth; block++) {
    wall.push(<Block key={block} />)
  }

  return (
    <div
      className='wall'
      id='wall'
      style={{
        gridTemplateRows: `repeat(${heigth}, 50px)`,
        gridTemplateColumns: `repeat(${width}, 50px)`
      }}
    >
      {wall}
    </div>
  );
}
