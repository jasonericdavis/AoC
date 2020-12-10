const fs = require("fs");
try {
  const numbers = fs.readFileSync("puzzle_input.txt", "utf-8").split("\n");
  const preamble = 25;
  const invalidNumbers = [];

  for (var index = preamble; index < numbers.length; index++) {
    const setOfNumbers = [...numbers.slice(index - preamble, index)];

    let valid = false;
    console.log(setOfNumbers);
    setOfNumbers.map((value) => {
      const lookupNumber =
        Math.abs(Number(numbers[index]) - Number(value)) + "";
      const numberFound =
        setOfNumbers.includes(lookupNumber) && value != lookupNumber;
      valid = valid || numberFound;
    });
    if (!valid) invalidNumbers.push(numbers[index]);
  }

  console.log(invalidNumbers);
  const searchNumber = Number(invalidNumbers[0]);

  for (var searchIndex = 0; searchIndex < numbers.length; searchIndex++) {
    let contiguousIndex = 0;
    let accumulator = 0;
    while (contiguousIndex < numbers.length && accumulator < searchNumber) {
      accumulator += Number(numbers[searchIndex + contiguousIndex]);
      contiguousIndex++;
    }

    if (accumulator == searchNumber && numbers[searchIndex] != searchNumber) {
      const subset = numbers
        .slice(searchIndex, searchIndex + contiguousIndex)
        .sort((a, b) => Number(a) - Number(b));
      console.log(subset);
      console.log(Number(subset[0]) + Number(subset[subset.length - 1]));
      break;
    }
  }
} catch (err) {
  console.log(err);
}
