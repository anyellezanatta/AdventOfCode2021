const readline = require("readline");
const fs = require("fs");

const readFile = async () => {
  const path = "./input.txt";
  let linesPoints: string[][] = [];
  let points: number[][][] = [];

  const readInterface = readline.createInterface({
    input: fs.createReadStream(path),
  });

  for await (const line of readInterface) {
    linesPoints.push(line.split(" -> "));
  }
  linesPoints.map((positions) => {
    const positionSplited: number[][] = [];
    positions.map((point) => {
      const pointsSplited: number[] = point
        .split(",")
        .map((v: string) => parseInt(v, 10));
      positionSplited.push(pointsSplited);
    });
    points.push(positionSplited);
  });
  return points;
};

const range = (from: number, to: number): number[] => {
  const size = Math.max(from, to) - Math.min(from, to) + 1;
  const increment = from < to;
  return [...Array(size).keys()].map((i) => {
    return increment ? i + from : from - i;
  });
};

const createLines = (items: number[][][]) => {
  return items.map((points) => {
    const x1 = points[0][0];
    const y1 = points[0][1];
    const x2 = points[1][0];
    const y2 = points[1][1];

    // Non diagonal
    if (x1 === x2 || y1 === y2) {
      const rX = range(x1, x2);
      const rY = range(y1, y2);
      return rX.flatMap((x) => rY.map((y) => [x, y]));
    }

    // Diagonal
    return [];
  });
};

const flattenAsPoints = (items: number[][][]) => {
  return items.flatMap((points) => points);
};

const groupBy = (points: number[][], getKey: (point: number[]) => string) => {
  return points.reduce((acc, curr) => {
    const items = (acc[getKey(curr)] = acc[getKey(curr)] || []);
    items.push(curr);
    return acc;
  }, {} as Record<string, number[][]>);
};

async function main() {
  const items = await readFile();
  const lines = createLines(items);
  const points = flattenAsPoints(lines);
  const groups = groupBy(points, (p) => `${p[0]}-${p[1]}`);
  const intersectedPoints = Object.values(groups).filter(
    (v) => v.length > 1
  ).length;

  console.log(intersectedPoints);
}

main();
