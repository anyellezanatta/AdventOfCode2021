const readline = require("readline");
const fs = require("fs");

const readCommands = async () => {
  const path = "./input.txt";
  const Commands = [];
  const readInterface = readline.createInterface({
    input: fs.createReadStream(path),
  });

  for await (const line of readInterface) {
    Commands.push(line);
  }

  return Commands;
};

const analiseCommands = (Commands) => {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;
  Commands.map((command) => {
    const direction = command.split(" ");
    const quant = parseInt(direction[1], 10);
    switch (direction[0]) {
      case "forward":
        horizontal = horizontal + quant;
        if (aim > 0) {
          depth = depth + quant * aim;
        }
        break;
      case "down":
        aim = aim + quant;
        break;
      case "up":
        aim = aim - quant;
        break;
    }
    return;
  });
  console.log("horizontal " + horizontal);
  console.log("depth " + depth);
  return horizontal * depth;
};

async function main() {
  const commands = await readCommands();
  console.log(analiseCommands(commands));
}

main();
