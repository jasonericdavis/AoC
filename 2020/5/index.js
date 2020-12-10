const fs = require("fs");
const seatLocator = (boardingTicket) => {
  let frontRow = 0;
  let backRow = 127;
  let leftSeat = 0;
  let rightSeat = 7;
  boardingTicket.split("").map((item) => {
    if (item === "F") {
      frontRow = frontRow;
      backRow = backRow - Math.ceil((backRow - frontRow) / 2);
    }
    if (item === "B") {
      backRow = backRow;
      frontRow = frontRow + Math.ceil((backRow - frontRow) / 2);
      //backRow = frontRow + spacing
    }

    if (item === "L") {
      leftSeat = leftSeat;
      rightSeat = rightSeat - Math.ceil((rightSeat - leftSeat) / 2);
    }
    if (item === "R") {
      rightSeat = rightSeat;
      leftSeat = leftSeat + Math.ceil((rightSeat - leftSeat) / 2);
      //backRow = frontRow + spacing
    }
    //console.log(`${item} => The rows have narrowed down between rows ${frontRow} - ${backRow}`)
  });
  console.log(`The seat is Row: ${frontRow} Col: ${leftSeat}`);
  return [frontRow, leftSeat];
};
try {
  const boardingTickes = fs
    .readFileSync("puzzle_input.txt", "utf8")
    .split("\n");
  console.log("-- Puzzle 1");
  let maxId = 0;
  boardingTickes.map((ticket) => {
    const [row, col] = seatLocator(ticket);
    const seatId = row * 8 + col;
    maxId = seatId > maxId ? seatId : maxId;
  });
  console.log(`The max seat Id is ${maxId}`);

  console.log("-- Puzzle 2");
  const seats = [];
  const notOnList = [];
  boardingTickes.map((ticket) => {
    const [row, col] = seatLocator(ticket);
    if (row === 1 || row === 127) {
      notOnList.push({ row, col });
      return;
    }
    seats.push({ row, col, id: row * 8 + col });
  });

  console.log(
    seats
      .sort((a, b) => a.id - b.id)
      .filter((item, index) => {
        if (index === 0) return false;
        if (index + 1 > seats.length - 1) return false;
        return (
          !(seats[index - 1].id === item.id - 1) ||
          !(seats[index + 1].id === item.id + 1)
        );
      })
  );
} catch (error) {
  console.log(error);
}
