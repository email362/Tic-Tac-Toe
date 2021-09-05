const gameBoard = (() => {
    const boardArr = [null,null,null,null,null,null,null,null,null];
    let turn = 1;
    let gameOver = false;
    const resetData = () => {
        while(boardArr.length > 0) {
            boardArr.pop();
        }
        for(let i = 1; i<10; i++) {
            boardArr.push(null);
        }
        turn = 1;
        gameOver = false;
    };

    const checkGame = () => gameOver;

    const winConditions = {
        0:[0,1,2],
        1:[3,4,5],
        2:[6,7,8],
        3:[0,3,6],
        4:[1,4,7],
        5:[2,5,8],
        6:[0,4,8],
        7:[2,4,6]
    };
    const winCheck = (board) => {
        // console.log(board.gameOver);
        let arrayX = [];
        let arrayO = [];
        board.boardArr.forEach( (item,index) => {
            if (item == 'O') {
                arrayO.push(index);
                console.log(arrayO);

            } else if(item == 'X') {
                arrayX.push(index);
                console.log(arrayX);

            }
        });

        let boardFull = arrayX.length + arrayO.length;


        let announce = document.getElementById('winner');
        for(const winArr in winConditions) {
            if(winConditions[winArr].every( element => arrayX.includes(element))) {
                board.gameOver = true;
                let player1 = document.getElementById('player-1').value;
                if(player1 == '') {
                    player1 = 'Player 1';
                }
                announce.textContent = `${player1} wins!`;
                window.alert(player1 + ' wins!');
                // console.log(winConditions[winArr]);
                console.log(player1 + ' wins!');

                return;
            } else if(winConditions[winArr].every(element => arrayO.includes(element))) {
                board.gameOver = true;
                let player2 = document.getElementById('player-2').value;
                if(player2 == '') {
                    player2 = 'Player 2';
                }
                announce.textContent = `${player2} wins!`;
                window.alert( player2 + ' wins!');
                // console.log(winConditions[winArr]);
                
                console.log(player2 + ' wins!');
                return;
            }
        }

        if(boardFull == 9) {
            board.gameOver = true;
            announce.textContent = 'Game Over! Tie!';
            window.alert('Game Over! Tie!');
            return;
        }

        
    };
    return {boardArr,turn,resetData,winCheck,gameOver,checkGame};
})();

const player = (name) => {
    const moves = [];
    return {name,moves};
};

const displayController = ((board) => {
    // const root = document.getElementById('root');
    let playerOne = player('Player 1');
    let playerTwo = player('Player 2');

    const startGame = () => {

        const boxHandler = (e) => {
            if(board.checkGame()) {
                console.log('game over');
            }
            else {
            let indexNum = e.target.dataset.index;

            console.log(indexNum);
            if(board.boardArr[indexNum] == null) {
                if(board.turn % 2 == 1) {
                    board.boardArr[indexNum] = 'X';
                    playerOne.moves.push(Number(indexNum));
                } else if(board.turn % 2 == 0){
                    board.boardArr[indexNum] = 'O';
                    playerTwo.moves.push(Number(indexNum));
                }
                board.turn += 1;
                
            }
            render();
            board.winCheck(board);                
            }


          
        }

        document.querySelectorAll("[data-index]").forEach(element => {

            element.addEventListener('click', boxHandler);
    
        });


    };

    const render = () => {

        board.boardArr.forEach((item,index) => {
            let box = document.querySelector("[data-index='"+index+"']");
            if(item == null) {
                box.textContent = "";
            } else {
                box.textContent = item;
            }
        });


    };

    const resetDisplay = () => {

        const boxHandler = (e) => {
            let samp = displayController.board.gameOver;
            if(samp == true) {
                console.log('game over');
            }
            else {
            let indexNum = e.target.dataset.index;

            console.log(indexNum);
            if(board.boardArr[indexNum] == null) {
                if(board.turn % 2 == 1) {
                    board.boardArr[indexNum] = 'X';
                    playerOne.moves.push(Number(indexNum));
                } else if(board.turn % 2 == 0){
                    board.boardArr[indexNum] = 'O';
                    playerTwo.moves.push(Number(indexNum));
                }
                board.turn += 1;
                
            }
            render();
            board.winCheck(board);                
            }


          
        }
        
        document.getElementById('winner').textContent = '';

        document.querySelectorAll("[data-index]").forEach(element => {

            element.removeEventListener('click', boxHandler);
    

    
        });

    };



    return {board,render,playerOne,playerTwo,resetDisplay,startGame};
})(gameBoard);

displayController.startGame();

document.getElementById('reset-button').addEventListener('click', () => {
    gameBoard.resetData();
    displayController.resetDisplay();
    displayController.render();
});


