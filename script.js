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
        if (row > board.length - 1 ||
            column > board[0].length - 1 ||
            (row || column) < 0) {
            console.log(`Invalid selection. Try again.`);
            return false;
        } else if (board[row][column] === null) {
            board[row][column] = player.token;
        } else {
            console.log(`You can't select that square! Try again.`);
            return false;
        }
    }

    const printBoard = () => console.log(board);

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

    return { getBoard, selectSquare, printBoard, getWinningSquares };
})();

function createPlayer(name, token) {
    return { name, token };
}

const game = (function (playerOneName = "Jim",
                        playerTwoName = "Bob"
) {
    const playerOne = createPlayer(playerOneName, 'x');
    const playerTwo = createPlayer(playerTwoName, 'o');

    let activePlayer = playerOne;

    const getActivePlayer = () => activePlayer;

    const switchPlayerTurn = () => {
        if (activePlayer === playerOne) {
            activePlayer = playerTwo;
        } else if (activePlayer === playerTwo) {
            activePlayer = playerOne;
        };
    };

    const printNewRound = () => {
        gameboard.printBoard();
        console.log(`${activePlayer.name}'s turn.`);
    };

    let gameStatus = "active";
    const getGameStatus = () => gameStatus;

    const playRound = (row, column) => {
        if (activePlayer === null) {
            console.log(`Refresh to start a new game!`);
        } else {
            let squareSelection = gameboard.selectSquare(row, column, activePlayer);
            if (squareSelection === false) {
                printNewRound();
                gameStatus = "invalid selection";
                displayController.updateScreen();
            } else {
                gameStatus = "active";

                console.log(`${activePlayer.name} selected row ${row}, column ${column}.`);

                const firstRow = gameboard.getBoard()[0];
                const secondRow = gameboard.getBoard()[1];
                const thirdRow = gameboard.getBoard()[2];
                const firstColumn = [firstRow[0], secondRow[0], thirdRow[0]];
                const secondColumn = [firstRow[1], secondRow[1], thirdRow[1]];
                const thirdColumn = [firstRow[2], secondRow[2], thirdRow[2]];
                const downDiag = [firstRow[0], secondRow[1], thirdRow[2]];
                const upDiag = [firstRow[2], secondRow[1], thirdRow[0]];

                const allLines = [firstRow, secondRow, thirdRow, firstColumn, secondColumn, thirdColumn, downDiag, upDiag];

                function containsNull(arr) {
                    const nulls = [];
                    for (const square of arr) {
                        if (square === null) {
                            nulls.push('null');
                        }
                    };
                    return nulls[0] !== undefined;
                }

                function matches(line) {
                    if (containsNull(line)) {
                        return false;
                    } else {
                        let nonMatchingValue = [];
                        for (let i = line.length - 1; i > 0; i--) {
                            if (line[i] !== line[i - 1]) {
                                nonMatchingValue.push(line[i]);
                                break;
                            }
                        }
                        if (nonMatchingValue[0] !== undefined) {
                            return false;
                        } else {
                            return true;
                        };
                    }; 
                }

                const checkForWinner = (function () {
                    let winner = '';
                    for (const line of allLines) {
                        if (matches(line)) {
                            winner = 'yes';
                            break;
                        } else {
                            winner = 'no';
                        }
                    }
                    return winner;
                })();
            
                if (checkForWinner === 'yes') {
                    gameboard.printBoard();
                    gameStatus = "winner";
                    displayController.updateScreen();
                    console.log(`GAME OVER. ${activePlayer.name} is the winner!`);
                    activePlayer = null;
                } else {
                    let allSquares = [];
                    let board = gameboard.getBoard();
                    for (const row of board) {
                        for (const square of row) {
                            allSquares.push(square);
                        };
                    }
                    if (!containsNull(allSquares)) {
                        gameboard.printBoard();
                        gameStatus = "draw";
                        displayController.updateScreen();
                        console.log(`GAME OVER. It's a draw!`);
                        activePlayer = null;
                    } else {
                        switchPlayerTurn();
                        displayController.updateScreen();
                        printNewRound();
                    }
                }
            }
        }
    };

    printNewRound();

    return { playRound, getActivePlayer, getGameStatus };
})();

const displayController = (function () {
    const boardDiv = document.querySelector(".board");
    const sideTextDiv = document.querySelector(".side-text");

    const updateScreen = () => {
        boardDiv.textContent = "";
        sideTextDiv.textContent = "";
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

        if (game.getGameStatus() === "active" ||
            game.getGameStatus() === "invalid selection") {
            squares.forEach((square) => {
                square.addEventListener("click", squareClickHandler);
            })
        }

        if (game.getGameStatus() === "active") {
            sideTextDiv.textContent = `${game.getActivePlayer().name}'s turn.`;
        } else if (game.getGameStatus() === "invalid selection") {
            sideTextDiv.textContent = `That square's taken! Try again, ${game.getActivePlayer().name}.`;
        } else {
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
        }
    }

    updateScreen();

    return { updateScreen };
})();