const readline = require("readline");
const fs = require("fs");

const typeCriteriaEnum = {
  most: 0,
  least: 1,
};

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

const searchBitCriteria = (positions, column, typeCriteria) => {
  let bit0 = 0;
  let bit1 = 0;

  for (let liIndex = 0; liIndex < positions.length; liIndex++) {
    if (positions[liIndex][column] === "1") {
      ++bit1;
    } else {
      ++bit0;
    }
  }

  switch (typeCriteria) {
    case typeCriteriaEnum.most:
      return bit1 >= bit0 ? "1" : "0";

    case typeCriteriaEnum.least:
      return bit0 <= bit1 ? "0" : "1";

    default:
      break;
  }
};

const filter = (positions) => {
  const columnCount = positions[0].length;

  let resultOxygen = "";
  let filteredOxygen = positions;

  for (var clIndex = 0; clIndex < columnCount; clIndex++) {
    const bitCriteriaOxygen = searchBitCriteria(
      filteredOxygen,
      clIndex,
      typeCriteriaEnum.most
    );
    filteredOxygen = filteredOxygen.filter(
      (value) => value[clIndex] === bitCriteriaOxygen
    );
    console.log(filteredOxygen.length);
    console.log(bitCriteriaOxygen);

    if (filteredOxygen.length === 1) {
      resultOxygen = filteredOxygen[0].join("");
      break;
    }
  }

  //-------------------------------------//
  let resultCO2 = "";
  let filteredCO2 = positions;
  for (var clIndex = 0; clIndex < columnCount; clIndex++) {
    const bitCriteriaCO2 = searchBitCriteria(
      filteredCO2,
      clIndex,
      typeCriteriaEnum.least
    );

    filteredCO2 = filteredCO2.filter(
      (value) => value[clIndex] === bitCriteriaCO2
    );
    if (filteredCO2.length === 1) {
      resultCO2 = filteredCO2[0].join("");
      break;
    }
  }

  const resultOxygenDec = parseInt(resultOxygen, 2);
  const resultCO2Dec = parseInt(resultCO2, 2);
  console.log("OX " + resultOxygenDec);
  console.log("CO2 " + resultCO2Dec);
  return resultOxygenDec * resultCO2Dec;
};

async function main() {
  const positions = await readPositions();
  const filtered = filter(positions);
  console.log(filtered);
}

main();
