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

const winningPossibilities = [
    //Row
    {combination: [0, 1, 2], strikeClass: "strike-row-1"},
    {combination: [3, 4, 5], strikeClass: "strike-row-2"},
    {combination: [6, 7, 8], strikeClass: "strike-row-3"},
    //Columns
    {combination: [0, 3, 6], strikeClass: "strike-col-1"},
    {combination: [1, 4, 7], strikeClass: "strike-col-2"},
    {combination: [2, 5, 8], strikeClass: "strike-col-3"},
    //Diagonals
    { combination: [2, 4, 6], strikeClass: "strike-diagonal-1"},
    {combination: [0, 4, 8], strikeClass: "strike-diagonal-2"}
    
]


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

        if (cellContents1 != "" && cellContents1 === cellContents2 && cellContents1 === cellContents3) {
            strike.classList.add(strikeClass)
            console.log(combination, strikeClass)
        };
        
        // console.log(cellContents1, cellContents2, cellContents3);
    };
    //Check for Draw
    
    
};


