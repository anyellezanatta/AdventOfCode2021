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
  Commands.map((command) => {
    const direction = command.split(" ");

    switch (direction[0]) {
      case "forward":
        horizontal = horizontal + parseInt(direction[1], 10);
        break;
      case "down":
        depth = depth + parseInt(direction[1], 10);
        break;
      case "up":
        depth = depth - parseInt(direction[1], 10);
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
