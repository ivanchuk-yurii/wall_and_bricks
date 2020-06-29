import React from 'react';
import { Brick } from '../Brick/Brick';
import './Block.css';

export function Block() {
  const block = [];

  for (let i = 0; i < 3; i++) {
    block.push(<Brick key={i} />);
  }

  return (
    <div className="block" data-bin='0'>{block}</div>
  );
}
