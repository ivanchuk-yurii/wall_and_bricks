export function check(curWall, curBricks) {
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
