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

    return { getBoard, selectSquare, printBoard };
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

    const playRound = (row, column) => {
        if (activePlayer === null) {
            console.log(`Refresh to start a new game!`);
        } else {
            let squareSelection = gameboard.selectSquare(row, column, activePlayer);
            if (squareSelection === false) {
            printNewRound();
            } else {
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
                    for (line of allLines) {
                        if (matches(line)) {
                            winner = 'yes'
                            break;
                        } else {
                            winner = 'no';
                        }
                    }
                    return winner;
                })();
            
                if (checkForWinner === 'yes') {
                    gameboard.printBoard();
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
                        console.log(`GAME OVER. It's a draw!`);
                        activePlayer = null;
                    } else {
                        switchPlayerTurn();
                        printNewRound();
                    }
                }
            }
        }
    };

    printNewRound();

    return { playRound };
})();