/*jshint esversion: 6 */

/* While all of the code used in this file has been typed by the author, it is heavily influenced by a hybrid of designs from the following developers:
    Kyle from Web Dev Simplified using https://www.youtube.com/watch?v=Y-GkMjUZsmM&t=939s - index.html.old and script.js.old
    Ania Kubów from https://youtu.be/DRaWr0Dcbl0 - index.html.old and script.js.old
    Bro Code from https://youtu.be/AnmwHjpEhtA 
    Coding with Adam from https://www.youtube.com/watch?v=fPew9OI2PnA&t=1906s
    Adam Khoury from https://www.youtube.com/watch?v=hsSXzdn_0Gg - how to toggleMute in JS
    While some code just has to be the same, all Variable names, CSS names and Function names have been changed.  The design is fundamentally the same as Coding with Adam, with additional features such as the Mute/Unmute Audio button.  The .wav sounds are downloaded from CodingWithAdam channel, but were renamed before upload and are called by different names in JS.
    The Favicon comes from https://icon-icons.com/icon/tic-tac-toe/39453 but was resized, renamed and recolored before being uploaded.*/

//Define constants for every Game
const cells = document.querySelectorAll('.cell');
const player_x = "X";
const player_o = "O";
let score_x = 0;
let score_o = 0;
let score_d = 0;
let turn = player_x;
let showModal = true;
let computerPlayer = true;

// Create the Board Array to keep track of where players place their O's ans O's
const gameBoard = Array(cells.length);
gameBoard.fill("");

//Get element placeholders
const strike = document.getElementById('strike');
const gameMessages = document.getElementById('game-messages');
const gameResult = document.getElementById('game-result');
const gameScoreD = document.getElementById('game-score-d');
const gameScoreX = document.getElementById('game-score-x');
const gameScoreO = document.getElementById('game-score-o');
const restartButton = document.getElementById('restart-button');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
const openModal = document.getElementById('open-modal');
const muteButton = document.getElementById('mute-button');
const player = document.getElementById('number-of-players-one');
//Get sound placeholders
const clickSound = new Audio('assets/sounds/click-sound.wav');
const gameOverSound = new Audio('assets/sounds/game-over-sound.wav');

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

cells.forEach((cell) => cell.addEventListener('click', handleClickComputer));

/** togglePlayer toggles between playing against an opponent or against the computer 1 or 2 Player mode.  
* The default state is for 2 players.  
* Remove an Event Listener to each cell and determine what to do when a cell is clicked
* Add an Event Listener to each cell and determine what to do when a cell is clicked */
function togglePlayer() {
    if (player.id == ('number-of-players-one')) {
        restartGame();
        player.setAttribute('id', 'number-of-players-two');
        cells.forEach((cell) => cell.removeEventListener('click', handleClickPlayerVsPlayer));
        cells.forEach((cell) => cell.addEventListener('click', handleClickComputer));
        return handleClickComputer;
    } else {
        restartGame();
        player.setAttribute('id', 'number-of-players-one'); 
        computerPlayer = false;
        cells.forEach((cell) => cell.removeEventListener('click', handleClickComputer));
        cells.forEach((cell) => cell.addEventListener('click', handleClickPlayerVsPlayer));
        return handleClickPlayerVsPlayer;
    }  
}

//Add event listener to the number of players button
player.addEventListener('click', togglePlayer);


/** Apply a Hover Effect to indicate whose turn it is */
function hoverText() {
    //Remove existing hover classes
    cells.forEach((cell) => {
        cell.classList.remove('x-hover');
        cell.classList.remove('o-hover'); 
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

/** Playing the Computer - Logic to indicate whether a cell can be clicked, whose turn it is and evaluate the results each time a mark is placed on the gameBoard */
function handleClickComputer(clickedCell) {
    //If the game is over, do not execute
    if (gameMessages.classList.contains('show')) {
        return;
    }
    
    //Store the cell number that the user clicked on and get the cell number of that tile 
    const cell = clickedCell.target;
    const cellNumber = parseInt(cell.dataset.cellIndex) - 1;
    
    //If the cell is not empty, do not execute
    if (cell.innerText != "") {
        return;
    }
    cell.innerText = player_x;
    gameBoard[cellNumber] = player_x;

    // Play sound when a cell is clicked
    playClick();
    //Indicate an X or an O for where the current player can choose his next cell
    hoverText();
    //Check to see if the last cell occupied produces a Winner or a Draw
    if (checkResult() === false){
        computerPlay();
    }
}
/** Pick a number from 1 to 9 */
function computerMove(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/** check to see if the number chosen is free to place a mark, if not, pick another number */
function computerPlay(){
    let spaceFound = false;
    let randomIndex = computerMove(0, 8);
    while (spaceFound == false){
        if (gameBoard[randomIndex - 1]== "") {
            spaceFound = true;
        }
        else{
            randomIndex = computerMove(0, 8);
        }
    }
    gameBoard[randomIndex - 1] = player_o;
    document.querySelector(`[data-cell-index="${randomIndex}"]`).innerText = player_o;
    
    //Play sound when a cell is clicked
    playClick();
    
    //Indicate an X or an O for where the current player can choose his next cell
    hoverText();
    
    //Check to see if the last cell occupied produces a Winner or a Draw
    checkResult();
}

/** Playing another Player - Logic to indicate whether a cell can be clicked, whose turn it is and evaluate the results each time a mark is placed on the gameBoard */
function handleClickPlayerVsPlayer(clickedCell) {
    //If the game is over, do not execute
    if (gameMessages.classList.contains('show')) {
        return;
    }
    
    //Store the cell number that the user clicked on and get the cell number of that tile 
    const cell = clickedCell.target;
    const cellNumber = parseInt(cell.dataset.cellIndex) - 1;
    
    //If the cell is not empty, do not execute
    if (cell.innerText != "") {
        return;
    }

    // If the cell is empty, place a mark of an X or an O on the gameBoard
    if (turn === player_x) {
        cell.innerText = player_x;
        gameBoard[cellNumber] = player_x;
        turn = player_o;    
    } else {
        cell.innerText = player_o;
        gameBoard[cellNumber] = player_o;
        turn = player_x;
        // computerPlay();
    }
    //Play sound when a cell is clicked
    playClick();

    //Indicate an X or an O for where the current player can choose his next cell
    hoverText();

    //Check to see if the last cell occupied produces a Winner or a Draw
    checkResult();
}
function checkResult() {
    //Check for Winner
    let endGame = false;
    for(const winningPosibility of winningPossibilities) {
        //If the clicked cells have the same number as the winningPossibility, identify the corresponding strikeClass
        const { combination, strikeClass } = winningPosibility;
        const cellContents1 = gameBoard[combination[0]]; 
        const cellContents2 = gameBoard[combination[1]]; 
        const cellContents3 = gameBoard[combination[2]]; 
        //If the first cell in the array is not empty and its equal to the two corresponding elements in the array, the game is over
        if (cellContents1 != "" && cellContents1 === cellContents2 && cellContents1 === cellContents3) {
            strike.classList.add(strikeClass);
            gameOver(cellContents1);
            endGame = true;
            return;
        }
    }
    
    //Check for Draw
    //If the previous check does not end the game, check to see if there are any remaining empty cells in the gameBoard.  If there are no emoty cells left, its a draw.  
    const noEmptyCells = gameBoard.every((cell) => cell !== "" );
    if (noEmptyCells) {
        gameOver("Draw");
        endGame = true;
    }
    return endGame;
}

/** Displays the Result of the game and presents a button to restart the game. */
function gameOver(cellContents1) {
    let resultText = `Draw!`;
    if (cellContents1 != "Draw") {
        resultText = `Winner is ${cellContents1}!`;
        (cellContents1.toLowerCase() == "x") ? score_x++ : score_o++;
        gameScoreX.innerText = `X won: ${score_x}`;
        gameScoreO.innerText = `O won: ${score_o}`;
    } else {
        score_d++;
        gameScoreD.innerText = `Draws: ${score_d}`;
    }

    //Show the gameMessage div and the gameResult
    gameMessages.className = "show";
    gameResult.innerText = resultText;
    
    //Play sound when the game is Over
    playGameOverSound();
}

/** Reset the gameBoard, remove strikethrough classes, hide the gameMEssage div, replace the contents of the Xs and Os array with "" and make player_x the next player */
function restartGame () {
    strike.className = 'strike';
    gameMessages.className = 'hide';
    gameBoard.fill("");
    cells.forEach((cell) => (cell.innerText = ""));
    turn = player_x;
    hoverText();
}

//Add event listener to the restartButton
restartButton.addEventListener('click', restartGame);

// GameSounds, Mute and Unmute Function
/** toggleMute toggles the unmute button to On/Off.  It then sets the clickSound and gameOverSound from mute to unmute.  The default state is for the sound to be muted */
function toggleMute() {
    if (clickSound.muted) {
        clickSound.muted = false;
        gameOverSound.muted = false;
        muteButton.setAttribute('id', 'unmute-button'); 
    } else {
        clickSound.muted = true;
        gameOverSound.muted = true;
        muteButton.setAttribute('id', 'mute-button');
    }
}

//Add event listener to the muteButton and set both the clickedSound and gameOverSound to muted
muteButton.addEventListener('click', toggleMute);
clickSound.muted = true;
gameOverSound.muted = true;

/** playClick when a cell is clicked on, if toggleMute is unmuted  */
function playClick() {
    clickSound.volume = 0.05;
    clickSound.play();
}

/** playGameOverSound when the game is over, if toggleMute is unmuted */
function playGameOverSound() {
    gameOverSound.volume = 0.05;
    gameOverSound.play();
}

/** toggleInstructions on initial load, show instructions modal and toggle the css show/hide from a button */
function toggleInstructions(){
    if (showModal === true){
        modal.classList.remove('hide');
    }
    else{
        modal.classList.add('hide');
    }
    showModal = !showModal;
}

//Add event listeners to the toggleInstructions icons
closeModal.addEventListener('click', toggleInstructions);
openModal.addEventListener('click', toggleInstructions);

toggleInstructions();





 