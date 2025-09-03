    let player1, player2, currentPlayer, currentSymbol;
    let board = [];
    let gameActive = false;

    document.getElementById("submit").addEventListener("click", startGame);

    function startGame() {
      // ✅ FIXED getElementById
      player1 = document.getElementById("player1").value || "Player 1";
      player2 = document.getElementById("player2").value || "Player 2";
      currentPlayer = player1;
      currentSymbol = "X";
      board = ["", "", "", "", "", "", "", "", ""];
      gameActive = true;

      document.querySelector(".message").innerText = `${currentPlayer}, you're up`;
      drawBoard();
    }

    function drawBoard() {
      const boardDiv = document.getElementById("board");
      boardDiv.innerHTML = "";
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = i + 1; // cells id = 1,2,3...
        cell.innerText = board[i];
        cell.onclick = () => makeMove(i);
        boardDiv.appendChild(cell);
      }
    }

    function makeMove(index) {
      if (!gameActive || board[index] !== "") return;

      board[index] = currentSymbol;
      drawBoard();

      if (checkWinner()) {
        document.querySelector(".message").innerText = `${currentPlayer}, congratulations you won!`;
        highlightWinningCells(checkWinner());
        gameActive = false;
        return;
      }

      if (!board.includes("")) {
        document.querySelector(".message").innerText = "It's a draw!";
        gameActive = false;
        return;
      }

      switchPlayer();
    }

    function switchPlayer() {
      if (currentPlayer === player1) {
        currentPlayer = player2;
        currentSymbol = "O";
      } else {
        currentPlayer = player1;
        currentSymbol = "X";
      }
      document.querySelector(".message").innerText = `${currentPlayer}, you're up`;
    }

    function checkWinner() {
      const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return combo;
        }
      }
      return null;
    }

    function highlightWinningCells(cells) {
      const boardDiv = document.getElementById("board").children;
      cells.forEach(i => {
        boardDiv[i].classList.add("winner");
      });
    }
