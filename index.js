const gameBoard = document.getElementById('board');
const buttons = document.getElementById('buttons');
const winnerContainer = document.getElementById('winner-container');
const winnerScreen = document.getElementById('winner');
const restartBtn = document.getElementById('Restart');

let user;
let computer;
let winner;
let board;
let recomendedGameComp;
let recomendedGameUser;

const handleButtonClick = (event) => {
    if (!user) {
        event.target.classList.add('selected-value');
        user = event.target.id;
        computer = getComputerValue();
    }
};