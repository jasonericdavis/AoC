const { exec } = require("child_process");
const { createCipher } = require("crypto");
const fs = require("fs");

const puzzle1 = (instructions) => {
  // An arry that stores what instructions where executed
  const executedInstructions = [];
  let accumulator = 0;
  let instructionPointer = 0;

  while (
    executedInstructions == [] ||
    !executedInstructions.includes(instructionPointer)
  ) {
    const instruction = instructions[instructionPointer];
    const [operation, iterator] = instruction.split(" ");

    console.log(
      `Accumlator = ${accumulator} | operation = ${operation} | iterator = ${iterator}`
    );
    executedInstructions.push(instructionPointer);
    if (operation === "acc") {
      if (iterator[0] === "+") {
        accumulator += Number(iterator.replace("+", ""));
      } else {
        accumulator -= Number(iterator.replace("-", ""));
      }
      instructionPointer++;
      continue;
    }

    if (operation === "jmp") {
      if (iterator[0] === "+") {
        instructionPointer += Number(iterator.replace("+", ""));
      } else {
        instructionPointer -= Number(iterator.replace("-", ""));
      }
      continue;
    }

    if (operation === "nop") {
      instructionPointer++;
      continue;
    }
  }
};

const puzzle2 = (instructions) => {
  // An arry that stores what instructions where executed
  const executedInstructions = [];
  let accumulator = 0;
  let instructionPointer = 0;

  while (
    executedInstructions == [] ||
    (!executedInstructions.includes(instructionPointer) &&
      !executedInstructions.includes(instructions.length - 1))
  ) {
    const instruction = instructions[instructionPointer];
    const [operation, iterator] = instruction.split(" ");

    //console.log(`Accumlator: ${accumulator} | operation: ${operation} | iterator: ${iterator} | pointer: ${instructionPointer}`)
    executedInstructions.push(instructionPointer);
    if (operation === "acc") {
      if (iterator[0] === "+") {
        accumulator += Number(iterator.replace("+", ""));
      } else {
        accumulator -= Number(iterator.replace("-", ""));
      }
      instructionPointer++;
      continue;
    }

    if (operation === "jmp") {
      if (iterator[0] === "+") {
        instructionPointer += Number(iterator.replace("+", ""));
      } else {
        instructionPointer -= Number(iterator.replace("-", ""));
      }
      continue;
    }

    if (operation === "nop") {
      instructionPointer++;
      continue;
    }
  }
  return [executedInstructions, accumulator];

  //if(executedInstructions.includes(instructions.length - 1)) console.log(`------${accumulator}----------`)
};
// answer 1: 1797
try {
  const instructions = fs.readFileSync("puzzle_input.txt", "utf-8").split("\n");
  // puzzle1(instructions)

  const indexes = instructions.reduce((accum, currentValue, index) => {
    if (currentValue.includes("jmp") || currentValue.includes("nop")) {
      accum.push(index);
    }
    return accum;
  }, []);

  indexes.map((index) => {
    const newInstruction = instructions[index].includes("jmp")
      ? instructions[index].replace("jmp", "nop")
      : instructions[index].replace("nop", "jmp");

    //console.log(`${index}: ${instructions[index]} => ${newInstruction}`)
    let newInstructions = [...instructions];
    newInstructions[index] = newInstruction;
    //console.log(newInstructions)
    const [results, accumulator] = puzzle2(newInstructions);
    //console.log(results)
    if (results.includes(newInstructions.length - 1)) {
      console.log(`I found it ${accumulator}`);
      return;
    }
  });
} catch (err) {
  console.log(err);
}
