const game = (function() {
  let board, moveCount, timesPlayed = 0;
  const statusDisplay = document.querySelector(".status-display");
  const container = document.querySelector("#game-container");
  const playAgainField = document.querySelector("#playagain")

  function playerToMove() {
    return moveCount % 2 === 0 ? 'Player 1' : 'Player 2';
  }

  function getCurrentSymbol() {
    return playerToMove() === 'Player 1' ? 'X' : 'O';
  }

  function gameOver(result) {
    const finalResult = result === 1 ? 'Player 1 wins!' :
      result === -1 ? 'Player 2 wins!' : 'Draw!';
    statusDisplay.textContent = finalResult;
    timesPlayed++;
    removeChildrenEventListeners(container.firstElementChild)
    start();
  }

  function play(i, j) {
    if (board[i][j] === '.') {
      board[i][j] = getCurrentSymbol();
      moveCount++;
    }
    else {
      console.error("Invalid move. This field was already played!");
    }
    clear();
    render();
    const result = calculateRoundResult();
    if (result !== 0 || moveCount === 9) {
      gameOver(result);
    }
  }

  function calculateRoundResult() {
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

  function render() {
    statusDisplay.textContent = `${playerToMove()} to move!`;

    const gameBoard = document.createElement("div");
    gameBoard.classList.add("gameboard");
    container.appendChild(gameBoard);

    let row, field;
    for (let i = 0; i < 3; i++) {
      row = document.createElement("div");
      row.classList.add("row");
      gameBoard.appendChild(row);
      for (let j = 0; j < 3; j++) {
        field = document.createElement("div");
        field.classList.add("field");
        if ((field.textContent = board[i][j]) === '.')
          field.style.color = "transparent";
        field.addEventListener("click", () => {
          play(i, j);
        })
        row.appendChild(field);
      }
    }
  }

  function removeChildrenEventListeners(rootNode) {
    if (rootNode) {
      // removing event listeners
      rootNode.childNodes.forEach(elem => {
        elem.replaceWith(elem.cloneNode(true));
      });
    }
  }

  function clear() {
    let gameBoard = container.firstElementChild;
    if (gameBoard) {
      removeChildrenEventListeners(gameBoard);
      container.removeChild(gameBoard);
      gameBoard = null; // garbage collection
    }
  }

  function resetGameVariables() {
    moveCount = 0;
    board = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ];
  }

  function start() {
    playAgainField.style.visibility = "visible";
    playAgainField.textContent = `Click here to play${timesPlayed > 0 ? " again!" : "!"}`;

    playAgainField.addEventListener("click", () => {
      playAgainField.style.visibility = "hidden";
      clear();
      resetGameVariables();
      render();
    });
  }

  return { start };
})();

game.start();
