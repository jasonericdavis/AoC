const fs = require("fs");

const simulate = (map, slope, puzzleNumber) => {
  let x = 0;
  for (var y = 0; y < map.length - 1; y += slope.down) {
    map[y + slope.down][x + slope.right] =
      map[y + slope.down][x + slope.right] === "#" ? "X" : "O";
    x = x + slope.right;
  }

  let output = "";
  map.map((line) => {
    output += `${line.join("")}\n`;
  });
  fs.writeFileSync(`puzzle${puzzleNumber}.txt`, output);
  const treeHitCount = map.filter((x) => x.includes("X")).length;
  console.log(`The skier hit ${treeHitCount} trees`);
  return treeHitCount;
};

const createMap = (lines, right) => {
  const map = [];
  const numberOfPanels = Math.ceil(lines.length / lines[0].length) * right;
  lines.map((line) => {
    map.push(line.repeat(numberOfPanels).split(""));
  });
  return map;
};

try {
  const lines = fs.readFileSync("puzzle_input.txt", "utf8").split("\n");

  // console.log(`${lines.length} lines with a width of ${lines[0].length}`)
  // console.log(`We should add ${numberOfPanels} panels`)

  // const map = []
  // lines.map( line => {
  //     map.push(line.repeat(numberOfPanels).split(''))
  // })

  console.log(`--- Puzzle 1`);
  const slope1 = { right: 3, down: 1 };
  simulate(createMap(lines, slope1.right), slope1, 1);
  // let x = 3
  // for(var y=0; y < map.length - 1; y++) {
  //     map[y + 1][x] = map[y + 1][x] === '#'? 'X' : 'O'
  //     x = x + 3
  // }

  // let output = ''
  // map.map(line => {
  //     output += `${line.join('')}\n`
  // })

  //fs.writeFileSync('puzzle1.txt', output)
  // console.log(`The skier hit ${map.filter(x => x.includes('X')).length}`)

  console.log("--- Problem 2");
  let multipliers = [];
  const slopes = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ];

  slopes.map((slope, index) => {
    multipliers.push(simulate(createMap(lines, slope.right), slope, index + 1));
  });

  const multiplier = multipliers.reduce((val, current) => val * current);
  console.log(`Result is ${multiplier}`);
} catch (err) {
  console.error(err);
}
