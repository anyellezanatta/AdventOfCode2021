const readline = require("readline");
const fs = require("fs");

const readReports = async () => {
  const path = "./input.txt";
  const reports = [];
  const readInterface = readline.createInterface({
    input: fs.createReadStream(path),
  });

  for await (const line of readInterface) {
    reports.push(parseInt(line, 10));
  }

  return reports;
};

const createWindows = async (reports) => {
  const windows = [];

  reports.map((report, index) => {
    if (reports[index + 1] && reports[index + 2]) {
      windows.push(report + reports[index + 1] + reports[index + 2]);
    }
    return windows;
  });
  return windows;
};

const compareReports = (previousValue, currentValue, currentIndex, array) => {
  if (currentIndex === 0) {
    return 0;
  }

  let previousReport = array[currentIndex - 1];
  if (currentValue > previousReport) {
    return previousValue + 1;
  }

  return previousValue;
};

async function main() {
  const reports = await readReports();
  const windows = await createWindows(reports);
  console.log(windows.reduce(compareReports, 0));
}

main();
