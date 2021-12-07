const readline = require("readline");
const fs = require("fs");

const readFile = async () => {
  const path = "./input.txt";
  let bingoBoards: string[][][] = [];
  let sortedNumbers: string[] = [];
  let board: string[][] = [];
  let lnIndex = 0;

  const readInterface = readline.createInterface({
    input: fs.createReadStream(path),
  });

  for await (const line of readInterface) {
    if (lnIndex === 0) {
      sortedNumbers = line.split(",");
    } else {
      if (line === "") {
        if (board !== []) {
          bingoBoards.push(board);
          board = [];
        }
      } else if (board !== []) {
        board.push(line.match(/[^ ]+/g));
      }
    }

    ++lnIndex;
  }
  if (board !== []) {
    bingoBoards.push(board);
  }
  return { bingoBoards, sortedNumbers };
};

const searchSortedNumberInBoard = (
  sortedNumber: string,
  bingoBoards: string[][][]
) => {
  bingoBoards.map((board, bdIndex) => {
    board.map((numbers, lnbdIndex) => {
      numbers.map((number, numIndex) => {
        if (number === sortedNumber) {
          bingoBoards[bdIndex][lnbdIndex][numIndex] = "-";
        }
      });
    });
  });
};

const verifyBoardWinnerH = (bingoBoards: string[][][]) => {
  for (let bdIndex = 0; bdIndex < bingoBoards.length; bdIndex++) {
    const board = bingoBoards[bdIndex];
    for (let lnIndex = 0; lnIndex < board.length; lnIndex++) {
      const line = board[lnIndex];
      if (line.every((v) => v === "-")) {
        return board;
      }
    }
  }
};
const verifyBoardWinnerV = (bingoBoards: string[][][]) => {
  for (let bdIndex = 0; bdIndex < bingoBoards.length; bdIndex++) {
    const board = bingoBoards[bdIndex];
    for (let clIndex = 0; clIndex < board.length; clIndex++) {
      let lnIndex = 0;
      let column: string[] = [];

      while (board[lnIndex]) {
        column.push(board[lnIndex][clIndex]);
        console.log(column);
        ++lnIndex;
      }

      if (column.every((value) => value === "-")) {
        return board;
      }
    }
  }
};

const verifyBoardWinner = (bingoBoards: string[][][]) => {
  let boardWinner: string[][] = [];

  boardWinner = verifyBoardWinnerH(bingoBoards);

  if (boardWinner === undefined) {
    boardWinner = verifyBoardWinnerV(bingoBoards);
  }

  return boardWinner;
};

const calcScore = (sortedNumber: string, boardWinner: string[][]) => {
  let score = 0;
  const reducer = (previous: number, current: string) => {
    return previous + parseInt(current, 10);
  };
  for (let lnIndex = 0; lnIndex < boardWinner.length; lnIndex++) {
    const line = boardWinner[lnIndex].filter((num) => num !== "-");
    score = score + line.reduce(reducer, 0);
  }

  return score * parseInt(sortedNumber, 10);
};

async function main() {
  const { bingoBoards, sortedNumbers } = await readFile();
  let boardWinner: string[][];

  for (let nmIndex = 0; nmIndex < sortedNumbers.length; nmIndex++) {
    const sortedNumber = sortedNumbers[nmIndex];

    searchSortedNumberInBoard(sortedNumber, bingoBoards);
    boardWinner = verifyBoardWinner(bingoBoards);
    if (boardWinner) {
      console.log("sorted Number: " + sortedNumber);
      console.log("Score: " + calcScore(sortedNumber, boardWinner));
      break;
    }
  }

  //console.log(bingoBoards);
}

main();
