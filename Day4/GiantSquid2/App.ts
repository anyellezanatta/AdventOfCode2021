import { isUndefined } from "util";

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
  let boardWinners: string[][][] = [];
  for (let bdIndex = 0; bdIndex < bingoBoards.length; bdIndex++) {
    const board = bingoBoards[bdIndex];
    for (let lnIndex = 0; lnIndex < board.length; lnIndex++) {
      const line = board[lnIndex];
      if (line.every((v) => v === "-")) {
        bingoBoards.splice(bdIndex, 1);
        boardWinners.push(board);
      }
    }
  }
  return boardWinners;
};
const verifyBoardWinnerV = (bingoBoards: string[][][]) => {
  let boardWinners: string[][][] = [];
  for (let bdIndex = 0; bdIndex < bingoBoards.length; bdIndex++) {
    const board = bingoBoards[bdIndex];
    for (let clIndex = 0; clIndex < board.length; clIndex++) {
      let lnIndex = 0;
      let column: string[] = [];

      while (board[lnIndex]) {
        column.push(board[lnIndex][clIndex]);
        ++lnIndex;
      }

      if (column.every((value) => value === "-")) {
        bingoBoards.splice(bdIndex, 1);
        boardWinners.push(board);
      }
    }
  }
  return boardWinners;
};

const copyArray = (array: string[][]) => array.map((arr) => arr.slice());
const copyMatrix = (array: string[][][]) => array.map((arr) => copyArray(arr));

const verifyBoardWinner = (bingoBoards: string[][][]) => {
  let boardWinners: string[][][] = [];

  const boardWinnersH = verifyBoardWinnerH(bingoBoards);
  const boardWinnersV = verifyBoardWinnerV(bingoBoards);
  if (boardWinnersH.length > 0) {
    boardWinners.push(copyMatrix(boardWinnersH));
  }

  return boardWinnerH || boardWinnerV;
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
  bingoBoards.splice(0, 1);
  for (let nmIndex = 0; nmIndex < sortedNumbers.length; nmIndex++) {
    const sortedNumber = sortedNumbers[nmIndex];
    boardWinner = [];

    searchSortedNumberInBoard(sortedNumber, bingoBoards);
    boardWinner = verifyBoardWinner(bingoBoards);

    console.log(bingoBoards.length);
    //console.log(bingoBoards);
    console.log("Winner");
    console.log(boardWinner);
    console.log("sorted number " + sortedNumber);
    if (bingoBoards.length === 1) {
      //console.log("sorted Number: " + sortedNumber);
      console.log("Score: " + calcScore(sortedNumber, boardWinner));
      break;
    }
  }
}

main();
