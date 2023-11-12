const gameBoard = document.getElementById('board');
const buttons = document.getElementById('buttons')
let user;
let computer;
let posibleComputerWin = false;
let recomendedGame;
let winner;
let userplayed = false;

const board = [
    "", "", "",
    "", "", "",
    "", "", ""
];

buttons.addEventListener("click", function(event){
    if(!user) {
    event.target.classList.add('selected-value');
    user = event.target.id;
    computer = getComputerValue();
    console.log(user);
    }
})

function getComputerValue() {
    if(user === 'x') {
        return 'o'
    } else {
        return 'x'
    }
}

function executeGame(cel, player){
    gameBoard.children[cel].classList.add(player === 'x' ? 'ximg' : 'oimg');
    board[cel] = player;
}

function getComputerGame(){
    if(board[recomendedGame] === ""){
        executeGame(recomendedGame, computer);
    }
    else if(board[4] === ""){
        executeGame(4, computer);
    }
    else if(board[2] === ""){
        executeGame(2, computer);
    }
    else if(board[6] === ""){
        executeGame(6, computer);
    }
    else if(board[8] === ""){
        executeGame(8, computer);
    }
    else {
        for(let i in board){
            if(board[i] === ""){
                executeGame(i, computer);
                break;
            }
        
        }
    }
}

function checkForWinner() {
    for (let i = 0; i < 8; i += 3) {
        if (board[i] === board[i + 1] && board[i] !== "") {
            if (board[i + 1] === board[i + 2]) {
                winner = board[i];
            } else if (board[i + 2] === "") {
                recomendedGame = i + 2;
            }
        }
    }

    for (let i = 0; i < 3; i++) {
        if (board[i] === board[i + 3] && board[i] !== "") {
            if (board[i + 3] === board[i + 6]) {
                winner = board[i];
            } else if (board[i + 6] === "") {
                recomendedGame = i + 6;
            }
        }
    }

    if (board[0] === board[4] && board[0] !== "") {
        if (board[4] === board[8]) {
            winner = board[4];
        } else if (board[8] === "") {
            recomendedGame = 8;
        }
    } else if (board[2] === board[4] && board[2] !== "") {
        if (board[4] === board[6]) {
            winner = board[4];
        } else if (board[6] === "") {
            recomendedGame = 6;
        }
    }
}

gameBoard.addEventListener('click', function(event) {
    const clickedCel = event.target;
    const celNum = Array.from(gameBoard.children).indexOf(clickedCel);
    if(board[celNum] === ""){
        executeGame(celNum, user);
        checkForWinner();
        getComputerGame();
        console.log(board);
    }
})

