// Determines which css slass is assigned to .board and .cell when a cell is clicked
const crossClass = 'cross';
const circleClass = 'circle';
const winningPossibilities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Select cells from index.htmlb with attribute data-cell
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageTextElement = document.querySelector('[data-winning-message]');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton')
// Start the Game.  Initialise playersTurn to cross.  Add Event Listener to each cell in the board but only allow it to be clicked once.
gameStart();

function gameStart() {
    winningMessageElement.classList.remove('show');
    playersTurn = true;
    cellElements.forEach(_cell => {
        _cell.classList.remove(circleClass);
        _cell.classList.remove(crossClass);
        _cell.removeEventListener('click', handleClick)
        _cell.addEventListener('click', handleClick, { once: true });
    });

    //     console.log(playersTurn);
    setBoardHoverClass();
}

// this function Places a the Mark we defined in CSS, Checks to see if the has resulted in a Win or a Draw, if not, swap turns so that a new Mark can be placed.  Once this function completes either through a Win or a Draw, calls a restart  function to allow the users to play again.
function handleClick(e) {
    const clickedCell = e.target;
    // playersTurn determins whether a cross or a circle is to be placed in the cell
    const currentClass = playersTurn ? circleClass : crossClass;
    //Place Mark
    placeMark(clickedCell, currentClass);
    //Check for Win
    if (chechWin(currentClass)) {
        endGame(false);
    //Check for Draw
    } else if (CheckDraw()) {
        endGame(true);
    } else {
        //SwitchTurn between cross and circle
        switchTurns();
        //Set .board to show hover effect of whose turn it is next
        setBoardHoverClass(); 
    }

};

// identifies the clickedCell and adds the cross or circle class to the div
function placeMark(clickedCell, currentClass) {
    clickedCell.classList.add(currentClass);
};

// if the last mark placed is in the winningCombinations array
function chechWin(currentClass) {
    return winningPossibilities.some(currentMarksOnBoard => {
        return currentMarksOnBoard.every(index => {
            return cellElements[index].classList.contains(currentClass)
        });
    });

};


//checks to see if every cell in .cell has a class of .circle OR .cross then this.  
//I used destructuring here as cellElements is a variable and not an Array.  .every only works with Arrays.  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
function CheckDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(circleClass) || cell.classList.contains(crossClass)
    })

};

function endGame(draw) {
    if(draw) {
        winningMessageTextElement.innerText = `Draw!`
    } else {
        winningMessageTextElement.innerText = `${playersTurn ? "O" : "X" } Wins!`
    }
    winningMessageElement.classList.add('show');
}


// identifies the turn from the playersTurn and switches it from cross to circle or circle to cross 
function switchTurns() {
    playersTurn = !playersTurn;
};

// identifies which hover class to apply to the board to indicate which playerTurn it is next
function setBoardHoverClass() {
    board.classList.remove(crossClass);
    board.classList.remove(circleClass);
    playersTurn ? board.classList.add(circleClass) : board.classList.add(crossClass);
};

restartButton.addEventListener('click', gameStart);

