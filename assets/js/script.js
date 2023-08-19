// Determines which css slass is assigned to .board and .cell when a cell is clicked
const crossClass = 'cross';
const circleClass = 'circle';

// Select cells from index.htmlb with attribute data-cell
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');

// Start the Game.  Initialise playersTurn to cross.  Add Event Listener to each cell in the board but only allow it to be clicked once
playersTurn = true;
cellElements.forEach(_cell => {
    _cell.addEventListener('click', handleClick, { once: true });
});

// this function Places a the Mark we defined in CSS, Checks to see if the has resulted in a Win or a Draw, if not, swap turns so that a new Mark can be placed.  Once this function completes either through a Win or a Draw, calls a restart  function to allow the users to play again.
function handleClick(e) {
    const clickedCell = e.target;
    // playersTurn determins whether a cross or a circle is to be placed in the cell
    const currentClass = playersTurn ? circleClass : crossClass;
    //Place Mark
    placeMark(clickedCell, currentClass);
    //Check for Win
    //Check for Draw

    //SwitchTurn
    switchTurns()
}

// identifies the clickedCell and adds the cross or circle class to the div
function placeMark(clickedCell, currentClass) {
    clickedCell.classList.add(currentClass);
}

// identifies the turn from the playersTurn and switches it from cross to circle or circle to cross 
function switchTurns() {
    playersTurn = !playersTurn;
}