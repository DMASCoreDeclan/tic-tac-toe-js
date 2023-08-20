//Define constants for every Game
const crossClass = 'X';
const circleClass = 'O';
const cells = document.querySelectorAll('.cell')
const player_x = "X";
const player_o = "O";

// Randomly pic the start player
// let startturn = ((Math.floor(Math.random() * 2) + 1) > 1) ? player_x : player_o;
let turn = player_x;

// Create the Board Array to keep track of where players place their O's ans O's
const gameBoard = Array(cells.length);
gameBoard.fill("");

//Get element and sound placeholders
const strike = document.getElementById('strike');
const gameMessages = document.getElementById('game-messages');
const gameResult = document.getElementById('game-result');
const restartButton = document.getElementById('restart-button');
const clickSound = new Audio('assets/sounds/clickSound.wav')
const gameOverSound = new Audio('assets/sounds/gameOverSound.wav')

cells.forEach((cell) => cell.addEventListener('click', handleClick));

//Apply a Hover Effect to indicate whose turn it is
function hoverText() {
    //Remove existing hover classes
    cells.forEach((cell) => {
        cell.classList.remove('x-hover')
        cell.classList.remove('o-hover')
    });

    const hoverClass = `${turn.toLowerCase()}-hover`;
    cells.forEach((cell) => {
        if (cell.innerText == "") {
            cell.classList.add(hoverClass);
        }
    });
}

//Initialise Hover Effect
hoverText();

// Logic to indicate whether a cell can be clicked, whose turn it is and evaluate the results each time a mark is placed on the gameBoard
function handleClick(clickedCell) {
    //If the game is over, do not execute
    if (gameMessages.classList.contains('show')) {
        return;
    };
    
    const cell = clickedCell.target;
    const cellNumber = parseInt(cell.dataset.cellIndex) - 1;
    
    //If the cell is not empty, do not execute
    if (cell.innerText != "") {
        return;
    }; 
    // Place a mark of an X or an O on the gameBoard
    if (turn === player_x) {
        cell.innerText = player_x
        gameBoard[cellNumber] = player_x;
        turn = player_o;
    } else {
        cell.innerText = player_o
        gameBoard[cellNumber] = player_o;
        turn = player_x;
    }

    clickSound.volume = .05; 
    clickSound.play();

    hoverText();
    console.log(turn,  cells, cellNumber, gameBoard)
};

