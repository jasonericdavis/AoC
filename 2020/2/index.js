const fs = require("fs");

try {
  const values = [];
  const data = fs.readFileSync("puzzle_input.txt", "utf8");
  data.split("\n").map((line) => {
    vals = line.split(" ");
    values.push({
      min: Number(vals[0].split("-").sort((a, b) => a - b)[0]),
      max: Number(vals[0].split("-").sort((a, b) => a - b)[1]),
      letter: vals[1],
      password: vals[2],
    });
  });

  console.log("---- Puzzle 1");
  const results1 = values.filter((item) => {
    /* The trick here is that splitting on a string will return an array 
           the occurences is the length of the array - 1 because if the substring is not found
           the array size will be 1
        */
    const count = item.password.split(item.letter[0]).length - 1;
    return count >= item.min && count <= item.max;
  });
  console.log(results1.length);

  console.log("---- Puzzle 2");
  const results2 = values.filter((item) => {
    const letter = item.letter[0];

    // If both the of the letters exist at those positions the password is invalid
    if (
      item.password[item.min - 1] === letter &&
      item.password[item.max - 1] === letter
    )
      return false;

    // If neither the letters are at that position the password is invalid
    if (
      item.password[item.min - 1] != letter &&
      item.password[item.max - 1] != letter
    )
      return false;

    // if neither one of the above conditions are met then this password is valid
    return true;
  });
  console.log(results2.length);
} catch (err) {
  console.error(err);
}
