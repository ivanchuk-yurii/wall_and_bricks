import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { check } from './check';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

console.clear();

const wall = document.getElementById('wall');
const userBricks = [];

function wallClick(ev) {
  const block = ev.target.closest('.block');

  if (block) {
    const data = block.dataset;
    block.classList.toggle('block_active');
  
    if (data.bin === '0') {
      data.bin = 1;
    } else data.bin = 0;
  }
}

function onAddBlock(ev) {
  ev.preventDefault();

  const curBlock = [
    document.getElementById('width'),
    document.getElementById('heigth'),
    document.getElementById('count')
  ];

  userBricks.push(curBlock.map(param => +param.value));
  curBlock.forEach(param => param.value = '');

  console.clear();
  console.dir(userBricks);
}

function onCheck() {
  const wallData = [];
  let row = '';

  for (let i = 0; i < wall.children.length; i++) {
    row += wall.children[i].dataset.bin;

    if (i && (i + 1) % 10 === 0) {
      wallData.push(row);
      row = '';
    }
    
  }

  const sorted = userBricks.sort((brick1, brick2) => (
    brick2[0] * brick2[1] -
    brick1[0] * brick1[1]
  ));
  const start = Date.now();
  const result = check(wallData, sorted);
  const finish = Date.now();

  alert((result ? 'yes, ' : 'no, ') + (finish - start) + 'ms');

  console.clear();
  userBricks.length = 0;
}

wall.addEventListener('click', wallClick);
document.getElementById('bricks').addEventListener('submit', onAddBlock);
document.getElementById('check').addEventListener('click', onCheck);
