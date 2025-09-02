//your JS code here. If required.
const submitBtn = document.getElementById("submit");
    const playerInputs = document.getElementById("player-inputs");
    const board = document.getElementById("board");
    const message = document.querySelector(".message");
    const cells = document.querySelectorAll(".cell");

    let player1 = "";
    let player2 = "";
    let currentPlayer = "";
    let currentSymbol = "X";
    let gameActive = true;

    const winningCombos = [
      [1,2,3], [4,5,6], [7,8,9], // rows
      [1,4,7], [2,5,8], [3,6,9], // cols
      [1,5,9], [3,5,7]           // diagonals
    ];

    submitBtn.addEventListener("click", () => {
      const p1 = document.getElementById("player-1").value.trim();
      const p2 = document.getElementById("player-2").value.trim();

      if (!p1 || !p2) {
        alert("Please enter names for both players!");
        return;
      }

      player1 = p1;
      player2 = p2;
      currentPlayer = player1;

      playerInputs.style.display = "none";
      board.style.display = "block";
      message.textContent = `${currentPlayer}, you're up`;
    });

    function checkWin() {
      return winningCombos.some(combo => {
        const [a,b,c] = combo;
        return (
          document.getElementById(a).textContent === currentSymbol &&
          document.getElementById(b).textContent === currentSymbol &&
          document.getElementById(c).textContent === currentSymbol
        );
      });
    }

    function checkDraw() {
      return [...cells].every(cell => cell.textContent !== "");
    }

    function handleClick(e) {
      if (!gameActive) return;

      const cell = e.target;
      if (cell.textContent !== "") return;

      cell.textContent = currentSymbol;
      cell.classList.add("taken");

      if (checkWin()) {
        message.textContent = `${currentPlayer}, congratulations you won!`;
        gameActive = false;
        return;
      }

      if (checkDraw()) {
        message.textContent = "It's a draw!";
        gameActive = false;
        return;
      }

      if (currentPlayer === player1) {
        currentPlayer = player2;
        currentSymbol = "O";
      } else {
        currentPlayer = player1;
        currentSymbol = "X";
      }

      message.textContent = `${currentPlayer}, you're up`;
    }

    cells.forEach(cell => {
      cell.addEventListener("click", handleClick);
    });
