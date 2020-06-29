function api(wallParams, wallMatrix, bricksNum, bricksMatrix) {
  const wall = wallMatrix.split(/\n/);

  if (wall.length != wallParams[2]) {
    throw new InputError('Incorect wall heigth');
  }

  for (const row of wall) {
    if (row.length != wallParams[0]) {
      throw new InputError('Incorect wall width');
    }
  }

  const bricks = bricksMatrix.split(/\n/)
    .map(row => row.split(/\s/).map(int => +int))
    .sort((brick1, brick2) => (
      brick2[0] * brick2[1] -
      brick1[0] * brick1[1]
    ));
  
  if (bricks.length != bricksNum) {
    throw new InputError('Incorect bricks count');
  }

  for (const brick of bricks) {
    if (brick.length !== 3) {
      throw new InputError('Invalid configuration of brick');
    }
  }

  function check(curWall, curBricks) {
    const curBrick = curBricks[0];
  
    let wallS = 0;
  
    for (const square of curWall) {
      const matches = square.match(/1/g);
      wallS += matches ? matches.length : 0;
    }
  
    let bricksS = 0;
  
    for (const brick of curBricks) {
      bricksS += brick[0] * brick[1] * brick[2];
    }
  
    if (wallS > bricksS) {
      return false;
    }
  
    for (let y = 0; y < curWall.length; y++) {
      for (let x = 0; x < curWall[y].length; x++) {
        if (curWall[y][x] === '1') {
          let isBrick = true;
  
          for (let y0 = y; y0 < y + curBrick[1]; y0++) {
            if (!curWall[y0] || curWall[y0].substr(x, curBrick[0]) !== '1'.repeat(curBrick[0])) {
              isBrick = false;
              break;
            }
          }
  
          if (isBrick) {
            const nextWall = [ ...curWall ];
            const nextBricks = [];
  
            for (const brick of curBricks) {
              nextBricks.push([ ...brick ]);
            }
  
            for (let y0 = y; y0 < y + curBrick[1]; y0++) {
              nextWall[y0] = nextWall[y0].slice(0, x) + '0'.repeat(curBrick[0]) + nextWall[y0].slice(x + curBrick[0]);
            }
            
            let isBuilt = true;
  
            for (const row of nextWall) {
              if (row !== '0'.repeat(nextWall[0].length)) {
                isBuilt = false;
                break;
              }
            }
  
            if (isBuilt) {
              return true;
            }
  
            if (--nextBricks[0][2] <= 0) {
              nextBricks.shift();
            }
  
            if (nextBricks.length !== 0 && check(nextWall, nextBricks)) {
              return true;
            }
          }
  
          if (curBrick[0] === curBrick[1]) {
            continue;
          }
  
          isBrick = true;
  
          for (let y0 = y; y0 < y + curBrick[0]; y0++) {
            if (!curWall[y0] || curWall[y0].substr(x, curBrick[1]) !== '1'.repeat(curBrick[1])) {
              isBrick = false;
              break;
            }
          }
  
          if (isBrick) {
            const nextWall = [ ...curWall ];
            const nextBricks = [];
  
            for (const i of curBricks) {
              nextBricks.push([ ...i ]);
            }
  
            for (let y0 = y; y0 < y + curBrick[0]; y0++) {
              nextWall[y0] = nextWall[y0].slice(0, x) + '0'.repeat(curBrick[1]) + nextWall[y0].slice(x + curBrick[1]);
            }
            
            let isBuilt = true;
  
            for (const row of nextWall) {
              if (row !== '0'.repeat(nextWall[0].length)) {
                isBuilt = false;
                break;
              }
            }
  
            if (isBuilt) {
              return true;
            }
  
            if (--nextBricks[0][2] <= 0) {
              nextBricks.shift();
            }
  
            if (nextBricks.length !== 0 && check(nextWall, nextBricks)) {
              return true;
            }
          }
        }
      }
    }
  
    const nextWall = [ ...curWall ];
    const nextBricks = [];
  
    for (const brick of curBricks) {
      nextBricks.push([ ...brick ]);
    }
  
    nextBricks.shift();
  
    return nextBricks.length === 0 ? false : check(nextWall, nextBricks);
  }

  const start = Date.now();
  const result = check(wall, bricks);
  const finish = Date.now();

  return (result ? 'yes, ' : 'no, ') + (finish - start) + 'ms';
}

class InputError extends Error {
  constructor(message) {
    super(message);
    this.name = "InputError";
  }
}

const wall1 = `101101
111111
111111`;
const wall1Params = '6 3';

const bricks1 = `1 1 4
2 1 6
1 3 1`;
const bricks1Params = '3';

console.log(api(wall1Params, wall1, bricks1Params, bricks1));

const wall2 = `001100
110011
111111`;
const wall2Params = '6 3';

const bricks2 = `2 2 4
4 1 6
1 3 1`;
const bricks2Params = '3';

console.log(api(wall2Params, wall2, bricks2Params, bricks2));
