const gameController = (() => {
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

    const initGame = () => {
        user = undefined;
        computer = undefined;
        winner = null;
        board = ["", "", "", "", "", "", "", "", ""];

        buttons.addEventListener("click", handleButtonClick);
        gameBoard.addEventListener("click", handleCellClick);
        restartBtn.addEventListener('click', resetGame);
    };

    const handleButtonClick = (event) => {
        if (!user) {
            event.target.classList.add('selected-value');
            user = event.target.id;
            computer = getComputerValue();
        }
    };

    const getComputerValue = () => (user === 'x') ? 'o' : 'x';

    const executeGame = (cel, player) => {
        gameBoard.children[cel].classList.add(player === 'x' ? 'ximg' : 'oimg');
        board[cel] = player;
    };

    getComputerGame = () => {
        if(!winner){
            if(board[recomendedGameUser] === ""){
                executeGame(recomendedGameUser, computer);
            }
            else if(board[recomendedGameComp] === ""){
                executeGame(recomendedGameComp, computer);
            }
            else if(board[4] === ""){
                executeGame(4, computer);
            }
            else if(board[0] === ""){
                executeGame(0, computer);
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
    }

    const resetGame = () => {
        winner = null;
        user = undefined;
        computer = undefined;
        recomendedGameComp = undefined;
        recomendedGameUser = undefined;
        for(let i = 0; i < 2; i++){
            buttons.children[i].classList.remove('selected-value');
        };
        board = ["", "", "","", "", "","", "", ""];
        for(let i = 0; i < 9; i++){
            gameBoard.children[i].classList.remove('ximg','oimg');
        };
        winnerContainer.style.display = 'none';
        winnerScreen.textContent = "";
};


    const showWinnerScreen = () => {
        winnerContainer.style.display = 'flex';
        winnerScreen.textContent = `"${winner}" wins`;
    };

    checkForWinner = () => {
        if (board[0] === board[4] && board[0] !== "") {
            if (board[4] === board[8]) {
                winner = board[4];
                showWinnerScreen();
            } else if (board[8] === "") {
                if(board[0] === user){
                    recomendedGameUser = 8;
                }
                else {
                    recomendedGameComp = 8;
                }
            }
        } 
    
        if (board[8] === board[4] && board[8] !== "") {
            if (board[4] === board[0]) {
                winner = board[4];
                showWinnerScreen();
            } else if (board[0] === "") {
                if(board[8] === user){
                    recomendedGameUser = 0;
                }
                else {
                    recomendedGameComp = 0;
                }
            }
        } 
    
        if (board[2] === board[4] && board[2] !== "") {
            if (board[4] === board[6]) {
                winner = board[4];
                showWinnerScreen();
            } else if (board[6] === "") {
                if(board[2] === user){
                    recomendedGameUser = 6;
                }
                else {
                    recomendedGameComp = 6;
                }
            }
        } 
    
        if (board[6] === board[4] && board[6] !== "") {
            if (board[4] === board[2]) {
                winner = board[4];
                showWinnerScreen();
            } else if (board[2] === "") {
                if(board[6] === user){
                    recomendedGameUser = 2;
                }
                else {
                    recomendedGameComp = 2;
                }
            }
        } 
    
        if (board.every(cell => cell !== "")){
            winnerContainer.style.display = 'flex';
            winnerScreen.textContent = "It's a draw";
        }
    
        for (let i = 0; i < 8; i += 3) {
            let smallBoard = [board[i], board[i + 1], board[i + 2]];
            let posibleWin = smallBoard.some((element, index, array) => {
                return array.indexOf(element) !== index && element !== "";
            });
            if(board[i] !== "" && board[i] === board[i + 1] && board[i + 1] === board[i + 2]){
                winner = board[i];
                return showWinnerScreen();
                
            }
            else if(posibleWin && smallBoard.some(element => element === "")){
                if(board[i] === user){
                    return recomendedGameUser = smallBoard.findIndex(element => element === "") + i;
                }
                else {
                    return recomendedGameComp = smallBoard.findIndex(element => element === "") + i;
                }
            }
        }
    
        for (let i = 0; i < 3; i++) {
            let smallBoard = [board[i], board[i + 3], board[i + 6]];
            let posibleWin = smallBoard.some((element, index, array) => {
                return array.indexOf(element) !== index && element !== "";
            });
            let value = smallBoard[smallBoard.findIndex(element => element !== "")]
            let emptyCel = smallBoard.findIndex(element => element === "");
            if(board[i] !== "" && board[i] === board[i + 3] && board[i + 3] === board[i + 6]){
                winner = board[i];
                return showWinnerScreen();
            }
            else if(posibleWin && emptyCel !== -1){
                if(value === user){
                    if(emptyCel === 0)
                        return recomendedGameUser = i;
                    else if(i === 0){
                        return recomendedGameUser = emptyCel * 3;
                    }
                    else {
                        return recomendedGameUser = (emptyCel * 3) + i;
                    }
                }
                else {
                    if(emptyCel === 0)
                        return recomendedGameComp = i;
                    else if(i === 0){
                        return recomendedGameComp = emptyCel * 3;
                    }
                    else {
                        return recomendedGameComp = (emptyCel * 3) + i;
                    }
                }
            }
        }
    };

    const handleCellClick = (event) => {
        const clickedCel = event.target;
        const celNum = Array.from(gameBoard.children).indexOf(clickedCel);
        
        if (!winner && user) {
            if (board[celNum] === "") {
                executeGame(celNum, user);
                checkForWinner();
                getComputerGame();
                checkForWinner();
            }
        }
    };

    return {
        initGame,
        handleButtonClick,
        getComputerValue,
        executeGame,
        getComputerGame,
        resetGame,
        showWinnerScreen,
        checkForWinner,
        handleCellClick
    };
})();

gameController.initGame();
