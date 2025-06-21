export function findPlayer(map) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "P") return { x, y };
    }
  }
}

export function checkWin(map, defaultLevel) {
  let goals = 0;
  let blocksOnGoals = 0;

  for (let y = 0; y < defaultLevel.length; y++) {
    for (let x = 0; x < defaultLevel[y].length; x++) {
      if (defaultLevel[y][x] === "G") goals++;
      if (defaultLevel[y][x] === "G" && map[y][x] === "B") blocksOnGoals++;
    }
  }

  return goals > 0 && goals === blocksOnGoals;
}

export function movePlayer(map, dx, dy) {
  const { x, y } = findPlayer(map);
  const nx = x + dx,
    ny = y + dy;
  const bx = x + 2 * dx,
    by = y + 2 * dy;

  const target = map[ny]?.[nx];
  const beyond = map[by]?.[bx];

  if (!target || target === "#") return map;

  const newMap = map.map((row) => [...row]);

  if (target === "B") {
    if (beyond === "." || beyond === "G") {
      newMap[by][bx] = "B";
      newMap[ny][nx] = "P";
      newMap[y][x] = ".";
    }
  } else if (target === "." || target === "G") {
    newMap[ny][nx] = "P";
    newMap[y][x] = ".";
  }

  return newMap;
}
