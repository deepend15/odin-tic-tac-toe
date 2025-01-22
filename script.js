const gameboard = (function () {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(null);
        }
    }

    const getBoard = () => board;

    const selectSquare = (row, column, player) => {
        if (board[row][column] === null) {
            board[row][column] = player.token;
        } else {
            return false;
        }
    }

    function createSquareObjects(board) {
        function createSquare(row, column, token) {
            return { row, column, token };
        }
        
        const arr = [];

        for (const row of board) {
            for (let i = 0; i < row.length; i++) {
                let newSquare = createSquare(board.indexOf(row), i, board[board.indexOf(row)][i]);
                arr.push(newSquare);
            }
        }

        return arr;
    }

    const getAllSquares = () => createSquareObjects(board);

    const clearBoard = () => {
        for (let row of board) {
            for (let i = 0; i < row.length; i++) {
                row[i] = null;
            }
        }
    };

    function winningSquares(arr) {
        function getMatchingRow(arr) {
            function rowInstances(array) {
                let rows = [];
                for (const sq of array) {
                    if (!rows.includes(sq.row)) {
                        rows.push(sq.row);
                    }
                }
                let numberOfRows = rows.length;
                return numberOfRows;
            }
        
            let rows = rowInstances(arr);
        
            let rowObjects = [];
        
            for (let i = 0; i < rows; i++) {
                let rowSquares = [];
                for (const sq of arr) {
                    if (sq.row === i) {
                        rowSquares.push(sq);
                    };
                }
                rowObjects.push(rowSquares);
            }
        
            let matchingRow = [];
        
            for (let array of rowObjects) {
                let tokens = [];
                for (let obj of array) {
                    if (obj.token !== null) {
                        tokens.push(obj.token);
                        };
                    };
                let uniqueTokens = [];
                if (tokens.length === 3) {
                    for (let token of tokens) {
                        if (!uniqueTokens.includes(token)) {
                            uniqueTokens.push(token);
                        };
                    }
                };
                if (uniqueTokens.length === 1) {
                    matchingRow = array;
                    break;
                } 
            }
        
            if (matchingRow[0] === undefined) {
                return 'none';
            } else {
                return matchingRow;
            }
        }
    
        function getMatchingColumn(arr) {
            function columnInstances(array) {
                let columns = [];
                for (const sq of array) {
                    if (!columns.includes(sq.column)) {
                        columns.push(sq.column);
                    }
                }
                let numberOfColumns = columns.length;
                return numberOfColumns;
            }
        
            let columns = columnInstances(arr);
        
            let columnObjects = [];
        
            for (let i = 0; i < columns; i++) {
                let columnSquares = [];
                for (const sq of arr) {
                    if (sq.column === i) {
                        columnSquares.push(sq);
                    };
                }
                columnObjects.push(columnSquares);
            }
        
            let matchingColumn = [];
        
            for (let array of columnObjects) {
                let tokens = [];
                for (let obj of array) {
                    if (obj.token !== null) {
                        tokens.push(obj.token);
                        };
                    };
                let uniqueTokens = [];
                if (tokens.length === 3) {
                    for (let token of tokens) {
                        if (!uniqueTokens.includes(token)) {
                            uniqueTokens.push(token);
                        };
                    }
                };
                if (uniqueTokens.length === 1) {
                    matchingColumn = array;
                    break;
                } 
            }
        
            if (matchingColumn[0] === undefined) {
                return 'none';
            } else {
                return matchingColumn;
            }
        }
    
        function getMatchingDiag(arr) {
            function rowInstances(array) {
                let rows = [];
                for (const sq of array) {
                    if (!rows.includes(sq.row)) {
                        rows.push(sq.row);
                    }
                }
                let numberOfRows = rows.length;
                return numberOfRows;
            }
        
            let rows = rowInstances(arr);
        
            let downDiagSquares = [];
        
            for (let i = 0; i < rows; i++) {
                for (const sq of arr) {
                    if (sq.row === i && sq.column === i) {
                        downDiagSquares.push(sq);
                    };
                }
            }
        
            let downDiagTokens = [];
        
            for (const sq of downDiagSquares) {
                if (sq.token !== null) {
                    downDiagTokens.push(sq.token);
                };
            }
        
            let downDiagUniqueTokens = [];
        
            if (downDiagTokens.length === 3) {
                for (let token of downDiagTokens) {
                    if (!downDiagUniqueTokens.includes(token)) {
                        downDiagUniqueTokens.push(token);
                    };
                }
            };
        
            const upDiagSquares = (function () {
                let array = [];
                let currentColumn = 2;
                for (let i = 0; i < rows; i++) {
                    for (const sq of arr) {
                        if (sq.row === i && sq.column === currentColumn) {
                            array.push(sq);
                            currentColumn--;
                        };
                    }
                }
                return array;
            })();
        
            let upDiagTokens = [];
        
            for (const sq of upDiagSquares) {
                if (sq.token !== null) {
                    upDiagTokens.push(sq.token);
                };
            }
        
            let upDiagUniqueTokens = [];
        
            if (upDiagTokens.length === 3) {
                for (let token of upDiagTokens) {
                    if (!upDiagUniqueTokens.includes(token)) {
                        upDiagUniqueTokens.push(token);
                    };
                }
            };
        
            if (downDiagUniqueTokens.length === 1) {
                return downDiagSquares;
            } else if (upDiagUniqueTokens.length === 1) {
                return upDiagSquares;
            } else {
                return 'none';
            }
        }
    
        const winningRow = getMatchingRow(arr);
        const winningColumn = getMatchingColumn(arr);
        const winningDiag = getMatchingDiag(arr);
    
        const lines = [winningRow, winningColumn, winningDiag];
    
        let winningLine;
    
        for (const line of lines) {
            if (line !== 'none') {
                winningLine = line;     
                break;   
            }
        }
    
        return winningLine;
    }

    const getWinningSquares = () => winningSquares(getAllSquares());

    return { getBoard, selectSquare, getWinningSquares, clearBoard };
})();

function createPlayer(name, token) {
    return { name, token };
}

const game = (function () {
    let playerOne;
    let playerTwo;
    let activePlayer;

    const getPlayerOne = () => playerOne;
    const getPlayerTwo = () => playerTwo;
    const getActivePlayer = () => activePlayer;

    const switchPlayerTurn = () => {
        if (activePlayer === playerOne) {
            activePlayer = playerTwo;
        } else if (activePlayer === playerTwo) {
            activePlayer = playerOne;
        };
    };

    let gameStatus = "new";
    const getGameStatus = () => gameStatus;

    const startGame = (playerOneName, playerTwoName) => {
        gameboard.clearBoard();

        playerOne = createPlayer(playerOneName, 'x');
        playerTwo = createPlayer(playerTwoName, 'o');

        activePlayer = playerOne;

        gameStatus = "active";

        displayController.updateScreen();
    }

    const playRound = (row, column) => {
        let squareSelection = gameboard.selectSquare(row, column, activePlayer);
        if (squareSelection === false) {
            gameStatus = "invalid selection";
            displayController.updateScreen();
        } else {
            gameStatus = "active";

            let winningSquares = gameboard.getWinningSquares();
        
            if (winningSquares !== undefined) {
                gameStatus = "winner";
                displayController.updateScreen();
            } else {
                function containsNull(arr) {
                    const nulls = [];
                    for (const square of arr) {
                        if (square === null) {
                            nulls.push('null');
                        }
                    };
                    return nulls[0] !== undefined;
                }
                let allSquares = [];
                let board = gameboard.getBoard();
                for (const row of board) {
                    for (const square of row) {
                        allSquares.push(square);
                    };
                }
                if (!containsNull(allSquares)) {
                    gameStatus = "draw";
                    displayController.updateScreen();
                } else {
                    switchPlayerTurn();
                    displayController.updateScreen();
                }
            }
        }
    };

    return { playRound, getActivePlayer, getPlayerOne, getPlayerTwo, getGameStatus, startGame };
})();

const displayController = (function () {
    const boardDiv = document.querySelector(".board");
    const newGameDialog = document.querySelector("#new-game-dialog");
    const p1NameInput = document.querySelector("#p1-name");
    const p2NameInput = document.querySelector("#p2-name");
    const cancelBtn = document.querySelector(".cancel-button");
    const okBtn = document.querySelector(".ok-button");
    const playerContainer = document.querySelector(".player-container");
    const gameContainer = document.querySelector(".game-container");
    const sideTextDiv = document.querySelector(".side-text");
    const restartDiv = document.querySelector(".restart");

    const updateScreen = () => {
        boardDiv.textContent = "";
        playerContainer.textContent = "";
        sideTextDiv.textContent = "";
        restartDiv.textContent = "";
        const board = gameboard.getBoard();

        board.forEach((row, index) => {
            let rowIndex = index;
            row.forEach((square, index) => {
                const newSquare = document.createElement("div");
                newSquare.classList.add("square");
                newSquare.dataset.row = rowIndex;
                newSquare.dataset.column = index;
                if (square !== null) {
                    newSquare.textContent = `${square.toUpperCase()}`;
                }
                boardDiv.appendChild(newSquare);
            })
        })

        const squares = document.querySelectorAll(".square");

        function squareClickHandler(e) {
            const selectedRow = e.target.dataset.row;
            const selectedColumn = e.target.dataset.column;
            game.playRound(selectedRow, selectedColumn);
        }

        function toggleSquareHover(e) {
            e.target.classList.toggle("hover");
        }

        if (game.getGameStatus() === "active" ||
            game.getGameStatus() === "invalid selection") {
                squares.forEach((square) => {
                    square.addEventListener("click", squareClickHandler);
                    square.addEventListener("mouseover", toggleSquareHover);
                    square.addEventListener("mouseout", toggleSquareHover);
                })
        }

        function defaultPlayerNames() {
            if (p1NameInput.value === '') {
                p1NameInput.value = 'Player 1';
            };
            if (p2NameInput.value === '') {
                p2NameInput.value = 'Player 2';
            };
        }

        function restartDefaultPlayerNames() {
            if (p1NameInput.value === '') {
                p1NameInput.value = `${game.getPlayerOne().name}`;
            };
            if (p2NameInput.value === '') {
                p2NameInput.value = `${game.getPlayerTwo().name}`;
            };
        }

        function activateNewGameModal() {
            newGameDialog.showModal();
            p1NameInput.value = '';
            p2NameInput.value = '';
            newGameDialog.returnValue = '';
            function dialogEscapeAndEnterBtns(e) {
                let clickEvent = new MouseEvent("click");
                if (e.key === "Escape") {
                    newGameDialog.returnValue = "cancel";
                } else if (e.key === "Enter") {
                    e.preventDefault();
                    okBtn.dispatchEvent(clickEvent);
                };
            };
            window.addEventListener("keydown", dialogEscapeAndEnterBtns);
            cancelBtn.addEventListener("click", (e) => {
                e.preventDefault();
                newGameDialog.close("cancel");
            });
            okBtn.addEventListener("click", defaultPlayerNames);
            newGameDialog.addEventListener("close", () => {
                window.removeEventListener("keydown", dialogEscapeAndEnterBtns);
                if (newGameDialog.returnValue === "cancel") {
                    return;
                } else {
                    game.startGame(p1NameInput.value, p2NameInput.value);
                };
            });
        }

        if (game.getGameStatus() === "new") {
            const newGameButton = document.createElement("button");
            newGameButton.classList.add("new-game-button");
            newGameButton.textContent = `New Game`;
            playerContainer.appendChild(newGameButton);
            newGameButton.addEventListener("click", activateNewGameModal);
        } else {
            const player1 = document.createElement("div");
            player1.classList.add("player");
            playerContainer.appendChild(player1);
            const player1Line1 = document.createElement("p");
            player1Line1.textContent = `Player 1: \u00A0${game.getPlayerOne().name}`;
            player1.appendChild(player1Line1);
            const player1line2 = document.createElement("p");
            player1line2.textContent = `"${game.getPlayerOne().token.toUpperCase()}"`;
            player1.appendChild(player1line2);
            const player2 = document.createElement("div");
            player2.classList.add("player");
            playerContainer.appendChild(player2);
            const player2Line1 = document.createElement("p");
            player2Line1.textContent = `Player 2: \u00A0${game.getPlayerTwo().name}`;
            player2.appendChild(player2Line1);
            const player2line2 = document.createElement("p");
            player2line2.textContent = `"${game.getPlayerTwo().token.toUpperCase()}"`;
            player2.appendChild(player2line2);
        }

        if (game.getGameStatus() !== "new") {
            gameContainer.classList.add("active-game");
            if (game.getGameStatus() === "active" ||
                game.getGameStatus() === "invalid selection") {
                const restartButton = document.createElement("button");
                restartButton.classList.add("new-game-button");
                restartButton.textContent = `Restart Game`;
                restartDiv.appendChild(restartButton);
                restartButton.addEventListener("click", () => {
                    restartDefaultPlayerNames();
                    game.startGame(p1NameInput.value, p2NameInput.value);
                });
                const changePlayersButton = document.createElement("button");
                changePlayersButton.classList.add("new-game-button");
                changePlayersButton.textContent = `Change Players`;
                restartDiv.appendChild(changePlayersButton);
                changePlayersButton.addEventListener("click", activateNewGameModal);
            }
            if (game.getGameStatus() === "active") {
                sideTextDiv.textContent = `${game.getActivePlayer().name}'s turn.`;
            } else if (game.getGameStatus() === "invalid selection") {
                sideTextDiv.textContent = `That square's taken! Try again, ${game.getActivePlayer().name}.`;
            } else if (game.getGameStatus() === "winner" ||
                       game.getGameStatus() === "draw") {
                const firstLine = document.createElement("div");
                firstLine.textContent = `GAME OVER`;
                firstLine.classList.add("first-line");
                sideTextDiv.appendChild(firstLine);
                const secondLine = document.createElement("div");
                if (game.getGameStatus() === "draw") {
                    secondLine.textContent = `It's a draw!`;
                    for (const square of squares) {
                        square.classList.add("draw");
                    }
                } else if (game.getGameStatus() === "winner") {
                    secondLine.textContent = `${game.getActivePlayer().name} is the winner!`;
                    function inWinningLine(sq) {
                        const winningSquares = gameboard.getWinningSquares();
                        let answer = 'no';
                        for (const square of winningSquares) {
                            if (Number(sq.dataset.row) === square.row &&
                                Number(sq.dataset.column) === square.column) {
                                    answer = 'yes';
                                    break;
                                }
                        }
                        return answer;
                    }
                    for (const square of squares) {
                        if (inWinningLine(square) === "yes") {
                            square.classList.add("winner");
                        } else {
                            square.classList.add("loser");
                        }
                    }
                };
                sideTextDiv.appendChild(secondLine);
                const endGameButtons = document.createElement("div");
                endGameButtons.classList.add("end-game-buttons");
                sideTextDiv.appendChild(endGameButtons);
                const newGameButton = document.createElement("button");
                newGameButton.classList.add("new-game-button");
                newGameButton.textContent = `New Game`;
                endGameButtons.appendChild(newGameButton);
                newGameButton.addEventListener("click", () => {
                    restartDefaultPlayerNames();
                    game.startGame(p1NameInput.value, p2NameInput.value);
                });
                const changePlayersButton = document.createElement("button");
                changePlayersButton.classList.add("new-game-button");
                changePlayersButton.textContent = `Change Players`;
                endGameButtons.appendChild(changePlayersButton);
                changePlayersButton.addEventListener("click", activateNewGameModal);
            }
        }
    }

    updateScreen();

    return { updateScreen };
})();