const game = (function() {
  let board = [
    ['.', '.', '.'],
    ['.', '.', '.'],
    ['.', '.', '.'],
  ];

  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let moveCount = 0;

  function playerToMove() {
    return moveCount % 2 === 0 ? 'Player 1' : 'Player 2';
  }

  function getCurrentSymbol() {
    return playerToMove() === 'Player 1' ? 'X' : 'O';
  }

  function printBoard() {
    console.log('\nCurrent Board:');
    for (let row of board) {
      console.log(row.join(' '));
    }
    console.log();
  }

  function getUserInput(playerName, callback) {
    printBoard();
    readline.question(`${playerName} (${getCurrentSymbol()}), enter your move as row column (0-2): `, input => {
      const coords = input.trim().split(/\s+/).map(x => Number(x));
      if (coords.length !== 2 || coords.some(isNaN) || coords.some(x => x < 0 || x > 2)) {
        console.log('Invalid input! Please enter two numbers between 0 and 2, separated by space.');
        getUserInput(playerName, callback);
      } else if (board[coords[0]][coords[1]] !== '.') {
        console.log('That position is already taken!');
        getUserInput(playerName, callback);
      } else {
        callback(coords[0], coords[1]);
      }
    });
  }

  function makeMove(i, j) {
    board[i][j] = getCurrentSymbol();
    moveCount++;
  }

  function whoWins() {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] !== '.' && board[i][0] === board[i][1] && board[i][1] === board[i][2])
        return board[i][0] === 'X' ? 1 : -1;
    }
    // Check columns
    for (let j = 0; j < 3; j++) {
      if (board[0][j] !== '.' && board[0][j] === board[1][j] && board[1][j] === board[2][j])
        return board[0][j] === 'X' ? 1 : -1;
    }
    // Check diagonals
    if (board[0][0] !== '.' && board[0][0] === board[1][1] && board[1][1] === board[2][2])
      return board[0][0] === 'X' ? 1 : -1;
    if (board[0][2] !== '.' && board[0][2] === board[1][1] && board[1][1] === board[2][0])
      return board[0][2] === 'X' ? 1 : -1;

    return 0; // No winner yet
  }

  function main() {
    const result = whoWins();
    if (result !== 0 || moveCount === 9) {
      // Game over
      printBoard();
      const finalResult = result === 1 ? 'Player 1 wins!' :
        result === -1 ? 'Player 2 wins!' : 'Draw!';
      console.log(finalResult);
      readline.close();
      return;
    }

    const currentPlayer = playerToMove();
    getUserInput(currentPlayer, (i, j) => {
      makeMove(i, j);
      main(); // Continue the game
    });
  }

  return { main };
})();

game.main();
