const readline = require("readline");
const fs = require("fs");

const readPositions = async () => {
  const path = "./input.txt";
  const positions = [];
  const readInterface = readline.createInterface({
    input: fs.createReadStream(path),
  });

  for await (const line of readInterface) {
    positions.push(Array.from(line));
  }

  return positions;
};

const calcPowerConsumption = (positions) => {
  const gammaRate0 = [];
  const gammaRate1 = [];
  let gammaRateBinary = "";
  let epsilonRateBinary = "";
  const powerConsumption = 0;

  positions.map((position) => {
    for (let i = 0; i < position.length; i++) {
      if (position[i] == 0) {
        if (gammaRate0[i] == null) {
          gammaRate0[i] = 0;
        }
        ++gammaRate0[i];
      }
      if (position[i] == 1) {
        if (gammaRate1[i] == null) {
          gammaRate1[i] = 0;
        }
        ++gammaRate1[i];
      }
    }
  });

  console.log("0 " + gammaRate0);
  console.log("1 " + gammaRate1);

  for (let index = 0; index < gammaRate0.length; index++) {
    if (gammaRate0[index] > gammaRate1[index]) {
      gammaRateBinary = gammaRateBinary + "0";
      epsilonRateBinary = epsilonRateBinary + "1";
    } else {
      gammaRateBinary = gammaRateBinary + "1";
      epsilonRateBinary = epsilonRateBinary + "0";
    }
  }

  return parseInt(gammaRateBinary, 2) * parseInt(epsilonRateBinary, 2);
};

async function main() {
  const positions = await readPositions();
  console.log(calcPowerConsumption(positions));
}

main();
