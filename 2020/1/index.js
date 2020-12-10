const fs = require("fs");

try {
  const data = fs.readFileSync("puzzle_input.txt", "utf8");
  const values = data.split("\n").map((val) => Number(val));
  values.sort((a, b) => a - b);
  console.log(values);

  for (var index = 0; index < values.length; index++) {
    for (var index2 = index; index2 < values.length; index2++) {
      if (values[index] + values[index2] + values[index3] == 2020) {
        console.log(
          `${values[index]} + ${values[index2]} = ${
            values[index] + values[index2]
          }`
        );
        console.log(
          `${values[index]} * ${values[index2]} = ${
            values[index] * values[index2]
          }`
        );
        break;
      }
    }
  }

  for (var index = 0; index < values.length; index++) {
    for (var index2 = index; index2 < values.length; index2++) {
      for (var index3 = index2; index3 < values.length; index3++) {
        if (values[index] + values[index2] + values[index3] == 2020) {
          console.log(
            `${values[index]} + ${values[index2]} + ${values[index3]} = ${
              values[index] + values[index2] + values[index3]
            }`
          );
          console.log(
            `${values[index]} * ${values[index2]} * ${values[index3]} = ${
              values[index] * values[index2] * values[index3]
            }`
          );
          break;
        }
      }
    }
  }
} catch (err) {
  console.error(err);
}
