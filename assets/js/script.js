//Define constants for every Game
// const crossClass = 'X';
// const circleClass = 'O';
const cells = document.querySelectorAll('.cell')
const player_x = "X";
const player_o = "O";
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

//Array containing Objects to determine if the last click produced a winner and if it did, apply a css strikeClass to the .gameBoard to the winning moves
const winningPossibilities = [
    //Row
    { combination: [0, 1, 2], strikeClass: "strike-row-1" },
    { combination: [3, 4, 5], strikeClass: "strike-row-2" },
    { combination: [6, 7, 8], strikeClass: "strike-row-3" },
    //Columns
    { combination: [0, 3, 6], strikeClass: "strike-col-1" },
    { combination: [1, 4, 7], strikeClass: "strike-col-2" },
    { combination: [2, 5, 8], strikeClass: "strike-col-3" },
    //Diagonals
    { combination: [2, 4, 6], strikeClass: "strike-diagonal-1" },
    { combination: [0, 4, 8], strikeClass: "strike-diagonal-2" }

];
//Add an Event Listener to each cell and determine what to do when a cell is clicked
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
    
    //Store the cell number that the user clicked on and get the cell number of that tile 
    const cell = clickedCell.target;
    const cellNumber = parseInt(cell.dataset.cellIndex) - 1;
    
    //If the cell is not empty, do not execute
    if (cell.innerText != "") {
        return;
    }; 
    // If the cell is empty, place a mark of an X or an O on the gameBoard
    if (turn === player_x) {
        cell.innerText = player_x
        gameBoard[cellNumber] = player_x;
        turn = player_o;
    } else {
        cell.innerText = player_o
        gameBoard[cellNumber] = player_o;
        turn = player_x;
    }
    //Play sound when a cell is clicked
    clickSound.volume = .05; 
    clickSound.play();

    //Indicate an X or an O for where the current player can choose his next cell
    hoverText();

    //Check to see if the last cell occupied produces a Winner or a Draw
    checkResult();

    // console.log(turn,  cells, cellNumber, gameBoard, checkResult)
};

function checkResult() {
    //Check for Winner
    for(const winningPosibility of winningPossibilities) {
        //If the clicked cells have the same number as the winningPossibility, identify the corresponding strikeClass
        // const combination = winningPossibilities.combination;
        // const strikeClass = winningPossibilities.strikeClass;
        //Object Destructuring, instead of using the two lines of code above
        const { combination, strikeClass } = winningPosibility;
        const cellContents1 = gameBoard[combination[0]]; 
        const cellContents2 = gameBoard[combination[1]]; 
        const cellContents3 = gameBoard[combination[2]]; 
        //If the first cell in the array is not empty and its equal to the two corresponding elements in the array, the game is over
        if (cellContents1 != "" && cellContents1 === cellContents2 && cellContents1 === cellContents3) {
            strike.classList.add(strikeClass);
            gameOver(cellContents1);
            return;
        };
        
    };
    
    //Check for Draw
    //If the previous check does not end the game, check to see if there are any remaining empty cells in the gameBoard.  If there are no emoty cells left, its a draw.  
    const noEmptyCells = gameBoard.every((cell) => cell !== "" );
    if (noEmptyCells) {
        gameOver("Draw");
    }
};


function gameOver(cellContents1) {
    let resultText = `Draw!`;
    if (cellContents1 != "Draw") {
        resultText = `Winner is ${cellContents1}!`
    };
    gameMessages.className = "show";
    gameResult.innerText = resultText;
    //Play sound when a cell is clicked
    gameOverSound.volume = .05;
    gameOverSound.play();
}

function restartGame () {
    strike.className = 'strike';
    gameMessages.className = 'hide';
    gameBoard.fill("");
    cells.forEach((cell) => (cell.innerText = ""));
    turn = player_x;
    hoverText();
}

restartButton.addEventListener('click', restartGame);

function showAlert() {
    var myText = "Would you like to play Tic Tac Toe?";
    alert(myText);
}