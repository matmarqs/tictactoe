const game = (function() {
  let board = [
    ['.', '.', '.'],
    ['.', '.', '.'],
    ['.', '.', '.'],
  ];

  let moveCount = 0;

  function playerToMove() {
    return moveCount % 2 === 0 ? 'Player 1' : 'Player 2';
  }

  function getCurrentSymbol() {
    return playerToMove() === 'Player 1' ? 'X' : 'O';
  }

  function gameOver(result) {
    const finalResult = result === 1 ? 'Player 1 wins!' :
      result === -1 ? 'Player 2 wins!' : 'Draw!';
    alert(finalResult);
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
    const result = whoWins();
    if (result !== 0 || moveCount === 9) {
      gameOver(result);
    }
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

  function render() {
    const statusDisplay = document.querySelector(".status-display");
    statusDisplay.textContent = `${playerToMove()} to move!`;

    const container = document.querySelector("#game-container");

    const boardElem = document.createElement("div");
    boardElem.classList.add("board");
    container.appendChild(boardElem);

    let row, field;
    for (let i = 0; i < 3; i++) {
      row = document.createElement("div");
      row.classList.add("row");
      boardElem.appendChild(row);
      for (let j = 0; j < 3; j++) {
        field = document.createElement("div");
        field.classList.add("field");
        field.textContent = board[i][j];
        field.addEventListener("click", () => {
          play(i, j);
        })
        row.appendChild(field);
      }
    }
  }

  function clear() {
    const container = document.querySelector("#game-container");
    let boardElem = container.firstElementChild;
    if (boardElem) {
      // removing event listeners
      boardElem.querySelectorAll(".field").forEach(elem => {
        elem.replaceWith(elem.cloneNode(true));
      });

      container.removeChild(boardElem);
      boardElem = null; // garbage collection
    }
    else {
      console.error(`clear(): board = ${boardElem}`)
    }
  }

  return { render };
})();

game.render();
