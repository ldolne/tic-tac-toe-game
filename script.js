// Global Variables declaration
const selectionScreen = document.querySelector(".selection");
const gameScreen = document.querySelector(".game");
const logElement = document.getElementById("log");
let isGameActive = false;
let firstPlayer;
let secondPlayer;
let currentPlayer;
let gridState;
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Add event listeners to elements in the game
document.getElementById("buttonStart").addEventListener("click", handleStartGame);
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game__restart').addEventListener('click', handleRestartGame);

// Helper functions
// Determinates first player
function determinateFirstTurn(player1, player2)
{
    let chance = Math.floor(Math.random() * 2);
    return chance === 0 ? player1 : player2;
}

// Gets current player's name for the turn
function getCurrentPlayerTurnMessage()
{
  return `It's ${currentPlayer}'s turn.`;
}

// Switch to next player's turn
function switchToNextPlayer() {
  currentPlayer = currentPlayer === firstPlayer ? secondPlayer : firstPlayer;
  addToLog(getCurrentPlayerTurnMessage());
}

// Add to log
function addToLog(newLog) {
  logElement.innerHTML += `${newLog}\n`;
}

// Main functions
// Reboot all info for new game & determinates first player
function handleStartGame() {
  gridState = ["", "", "", "", "", "", "", "", ""];
  logElement.innerHTML = "";
  document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
  isGameActive = true;

  firstPlayer = document.getElementById("markChoice").value;
  secondPlayer = firstPlayer === "x" ? "o" : "x";

  selectionScreen.style.display = "none";
  gameScreen.style.display = "flex";

  currentPlayer = determinateFirstTurn(firstPlayer, secondPlayer);
  addToLog(getCurrentPlayerTurnMessage());
}

// Handles a click on a cell
function handleCellClick(cellClickEvent) {
  const cell = cellClickEvent.target;
  const cellIndex = parseInt(cell.getAttribute('data-cell-index'));

  if (!isGameActive) {
    alert("Game's finished!");
    return;
  }
  
  if (gridState[cellIndex] !== "") {
    addToLog("Cell has already been played.");
    return;
  }

  gridState[cellIndex] = currentPlayer;
  cell.innerHTML = currentPlayer;

  checkGridState();
}

// Checks current state of the game grid
function checkGridState() {
  let isGameWon = false;

  // Check all winning combinations with our current grid state
  // to find a winning combination
  winningCombinations.forEach(winningCombination => {
    let firstPosition = gridState[winningCombination[0]];
    let secondPosition = gridState[winningCombination[1]];
    let thirdPosition = gridState[winningCombination[2]];

    if (firstPosition === currentPlayer && 
      secondPosition === currentPlayer && 
      thirdPosition === currentPlayer) {
        isGameWon = true;
        return;
    }
  });

  // If a winning combination is found, end of the game
  if (isGameWon) {
    addToLog(`${currentPlayer} player has won the game.`);
    isGameActive = false;
    return;
  }

  // If no winning combination, we check if the grid is full
  // If it is, end of the game
  let isGameTie = gridState.every(state => state !== "");

  if (isGameTie) {
    addToLog("Game's over. It's a tie!");
    isGameActive = false;
    return;
  }

  // If no winning combination and the grid is not full,
  // then we go to the next player's turn
  switchToNextPlayer();
}

// Handles the restart of the game
function handleRestartGame() {
  let answer = confirm("Do you wish to play again?");

  if(answer)
  {
      alert("Here we go again! Let's pick the mark for the first player !");
  } else
  {
      alert("Too bad, see you next time!");
  }

  selectionScreen.style.display = "flex";
  gameScreen.style.display = "none";
}